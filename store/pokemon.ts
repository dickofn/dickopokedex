import { defineStore } from "pinia";
import { AllPokemonsPayload, PokemonResponse } from "~~/types/pokemon";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => {
    return {
      pokemons: [] as PokemonResponse[],
      offset: 0,
      limit: 24,
      filter: "",
    };
  },
  actions: {
    setParams(payload: AllPokemonsPayload) {
      this.offset = payload.offset;
      this.limit = payload.limit;
      this.filter = payload.filter;
    },
    setPokemons(pokemons: PokemonResponse[]) {
      this.pokemons = pokemons;
    },
  },
});
