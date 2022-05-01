import { MongoClient } from "mongodb";
import { PokemonResponse } from "~~/types/pokemon";

export default async (req) => {
  const { name } = useQuery(req);

  const config = useRuntimeConfig();
  const { mongoUrl, mongoDb, mongoUser, mongoPassword } = config;

  let client: MongoClient;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/${mongoDb}?retryWrites=true&w=majority`
    );
  } catch (err) {
    throw err;
  }

  const db = client.db();

  let pokemon: PokemonResponse;
  try {
    pokemon = (await db
      .collection("pokemons")
      .findOne({ name })) as unknown as PokemonResponse;
  } catch (err) {
    throw err;
  }

  client.close();

  if (!pokemon) {
    const error = new Error("Pokemon not found");
    throw error;
  }

  return pokemon;
};
