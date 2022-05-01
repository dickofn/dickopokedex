import { defineStore } from "pinia";
import { AllPokemonsPayload, PokemonResponse } from "~~/types/pokemon";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => {
    return {
      pokemons: [] as PokemonResponse[],
      offset: 0,
      limit: 24,
      filter: "",
      favorites: [] as string[],
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
    addFavorites(pokemonName: string) {
      this.favorites.push(pokemonName);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    removeFavorites(pokemonName: string) {
      this.favorites = this.favorites.filter(
        (name: string) => name !== pokemonName
      );
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    clientUpdateFavorites(favorites: string[]) {
      this.favorites = favorites;
    },
  },
});
