import { AllPokemonsResponse, PokemonResponse } from "@/types/pokemon";
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
    const preloadPokemons = await db.collection("pokemons").find({}).toArray();

    const resAllPokemons = await axios(`${pokeApiUrl}/pokemon`, {
      params: { limit: 100000, offset: 0 },
    });
    const dataAllPokemons: AllPokemonsResponse = resAllPokemons.data;

    const needUpdate =
      dataAllPokemons.results.length !== preloadPokemons.length;

    if (needUpdate) {
      async function loadAllPokemons() {
        const arr = preloadPokemons;
        try {
          await Promise.all(
            dataAllPokemons.results.map(async ({ name }) => {
              try {
                if (preloadPokemons.find((i) => i.name === name)) return false;
                const resPokemon = await axios(`${pokeApiUrl}/pokemon/${name}`);
                const dataPokemon: PokemonResponse = resPokemon.data;
                await db.collection("pokemons").insertOne(dataPokemon);
              } catch (err) {}
            })
          );
        } catch (error) {}
      }

      await loadAllPokemons();
    }
  } catch (err) {
    throw err;
  }

  client.close();
};
