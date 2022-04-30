import { MongoClient } from "mongodb";
import { PokemonResponse } from "~~/types/pokemon";

export default async (req) => {
  const { limit, offset } = useQuery(req);

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

  let pokemons: PokemonResponse[];
  try {
    pokemons = (await db
      .collection("pokemons")
      .find({}, { projection: { _id: 0, name: 1, types: 1, sprites: 1 } })
      .skip(+offset * +limit)
      .limit(+limit)
      .sort({ id: 1 })
      .toArray()) as unknown as PokemonResponse[];
  } catch (err) {
    throw err;
  }

  client.close();

  return { pokemons };
};
