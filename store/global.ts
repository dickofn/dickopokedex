import { defineStore } from "pinia";

export const useUserStore = defineStore("globalStore", {
  state: () => {
    return {
      backUrl: "",
    };
  },
  getters: {},
  actions: {},
});
