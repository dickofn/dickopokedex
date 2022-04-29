import { defineStore } from "pinia";

export const useUserStore = defineStore("pokemonStore", {
  state: () => {
    return {
      pokemons: {
        list: [],
        offset: 0,
        limit: 9,
      },
    };
  },
  getters: {},
  actions: {},
});
