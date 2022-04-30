import axios from "axios";
import { defineStore } from "pinia";
import { AllPokemonsPayload, PokemonResponse } from "~~/types/pokemon";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => {
    return {
      pokemons: {
        data: [] as PokemonResponse[],
        offset: 0,
        limit: 9,
      },
    };
  },
  getters: {
    AllPokemons(state) {
      return state.pokemons.data;
    },
  },
  actions: {
    async getAllPokemons(payload: AllPokemonsPayload) {
      this.limit = payload.limit;
      this.offset = payload.offset;

      try {
        const { data } = await axios(`api/pokemon/getAll`, {
          params: payload,
        });
        this.pokemons.data = data;
      } catch (e) {
        throw e;
      }
    },
  },
});
