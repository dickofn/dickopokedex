import axios from "axios";
import { defineStore } from "pinia";
import { AllPokemonsPayload, AllPokemonsResponse } from "~~/types/pokemon";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => {
    return {
      pokemons: {
        data: {} as AllPokemonsResponse,
        offset: 0,
        limit: 9,
      },
    };
  },
  getters: {
    AllPokemons(state) {
      return state.pokemons.data.results;
    },
  },
  actions: {
    async getAllPokemons(payload: AllPokemonsPayload) {
      const config = useRuntimeConfig();
      const { pokeApiUrl } = config.public;

      this.limit = payload.limit;
      this.offset = payload.offset;

      try {
        const { data } = await axios(`${pokeApiUrl}/pokemon`, {
          params: payload,
        });
        this.pokemons.data = data;
      } catch (e) {
        throw e;
      }
    },
  },
});
