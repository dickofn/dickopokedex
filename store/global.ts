import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      backUrl: "",
      error: "",
    };
  },

  actions: {
    setError(error) {
      this.error = `Error (${error.response?.status})`;
    },
    clearError() {
      this.error = "";
    },
  },
});
