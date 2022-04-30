import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      backUrl: "",
      error: "",
    };
  },

  actions: {
    setError(error: any) {
      this.error = `Error (${error.response?.status || error.message})`;
    },
    clearError() {
      this.error = "";
    },
  },
});
