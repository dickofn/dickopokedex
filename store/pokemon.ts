import { defineStore } from "pinia";
import { AllPokemonsPayload } from "~~/types/pokemon";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => {
    return {
      offset: 0,
      limit: 20,
    };
  },
  actions: {
    setParams(payload: AllPokemonsPayload) {
      this.offset = payload.offset;
      this.limit = payload.limit;
    },
  },
});
