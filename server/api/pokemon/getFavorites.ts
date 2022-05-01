import { MongoClient } from "mongodb";
import { PokemonResponse } from "~~/types/pokemon";

export default async (req) => {
  const { limit, offset, filter } = useQuery(req);
  let { favorites } = useQuery(req);
  // Parse favorite to string, single query array acted like string

  if (typeof favorites === "string") favorites = [favorites as string];

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
    // See: https://developerslogblog.wordpress.com/2019/11/27/mongodb-sort-how-to-fix-maximum-ram-exceeded-error/
    db.collection("pokemons").createIndex({ id: 1 });
    pokemons = (await db
      .collection("pokemons")
      .find(
        {
          // Search either pokemon have that wildcard-ed name or tag
          $or: [
            { name: new RegExp(".*" + filter + ".*") },
            { types: { $elemMatch: { "type.name": filter } } },
          ],
          name: { $in: favorites || [] },
        },
        { projection: { _id: 0, name: 1, types: 1, sprites: 1 } }
      )
      .skip(+offset * +limit)
      .limit(+limit)
      .sort({ id: 1 })
      .allowDiskUse()
      .toArray()) as unknown as PokemonResponse[];
  } catch (err) {
    throw err;
  }

  client.close();

  return pokemons;
};
