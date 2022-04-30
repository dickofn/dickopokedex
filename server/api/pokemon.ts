import { AllPokemonsResponse, PokemonResponse } from "@/types/pokemon";
import fs from "fs";
import axios from "axios";

export default async (req) => {
  const config = useRuntimeConfig();
  const { pokeApiUrl } = config.public;

  const pokemonsPath = "/pokemons.json";
  let file = null;
  try {
    file = fs.readFileSync(pokemonsPath);
  } catch (error) {}
  if (!file) {
    fs.writeFileSync(pokemonsPath, JSON.stringify([]));
    file = fs.readFileSync(pokemonsPath);
  }

  const pokemons = JSON.parse(file);
  const resAllPokemons = await axios(`${pokeApiUrl}/pokemon`, {
    params: { limit: 100000, offset: 0 },
  });

  const dataAllPokemons: AllPokemonsResponse = resAllPokemons.data;

  const needUpdate = dataAllPokemons.results.length !== pokemons.length;
  console.log("[LOG] | pokemons.length", pokemons.length);
  console.log(
    "[LOG] | dataAllPokemons.results.length",
    dataAllPokemons.results.length
  );

  if (needUpdate) {
    async function loadAllPokemons() {
      const arr = pokemons;
      try {
        await Promise.all(
          dataAllPokemons.results.map(async ({ name }) => {
            try {
              if (pokemons.find((i) => i.name === name)) return false;

              const resPokemon = await axios(`${pokeApiUrl}/pokemon/${name}`);
              const dataPokemon: PokemonResponse = resPokemon.data;
              arr.push(dataPokemon);
            } catch (error) {}
          })
        );
      } catch (error) {}
      return arr;
    }

    const loadedAllPokemons: PokemonResponse[] = await loadAllPokemons();
    fs.writeFileSync(pokemonsPath, JSON.stringify(loadedAllPokemons));
  }
};
