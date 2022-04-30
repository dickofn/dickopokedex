import { PokemonResponse } from "@/types/pokemon";
import axios from "axios";
import { MongoClient } from "mongodb";

export default async (req) => {
  const config = useRuntimeConfig();
  const { mongoUrl, mongoDb, mongoUser, mongoPassword } = config;
  const { pokeApiUrl } = config.public;

  let client: MongoClient;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/${mongoDb}?retryWrites=true&w=majority`
    );
  } catch (err) {
    throw err;
  }

  const db = client.db();

  try {
    // Only get count data for faster operation
    const preloadPokemonsCount = await db
      .collection("pokemons")
      .countDocuments();

    const resAllPokemons = await axios(`${pokeApiUrl}/pokemon`, {
      params: { limit: 100000, offset: 0 },
    });
    const dataAllPokemons = resAllPokemons.data;

    // Check if we need to update pokemon data based on the count
    const needUpdate = dataAllPokemons.results.length !== preloadPokemonsCount;

    if (needUpdate) {
      async function loadAllPokemons() {
        // Get all pokemons but only name attribute for faster operation
        const preloadPokemons = await db
          .collection("pokemons")
          .find({}, { projection: { _id: 0, name: 1 } })
          .toArray();
        try {
          // This code below allow waiting all async operation inside map
          await Promise.all(
            dataAllPokemons.results.map(async ({ name }) => {
              try {
                // Check if pokemon already exist in database by name
                if (preloadPokemons.find((i) => i.name === name)) return false;
                // Only update new pokemon
                const resPokemon = await axios(`${pokeApiUrl}/pokemon/${name}`);
                const dataPokemon: PokemonResponse = resPokemon.data;
                await db.collection("pokemons").insertOne(dataPokemon);
              } catch (err) {}
            })
          );
        } catch (error) {}
      }

      // Execute the function above
      await loadAllPokemons();
    }
  } catch (err) {
    throw err;
  }

  client.close();
};
