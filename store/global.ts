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
      if (error.value || error.message || error.value)
        this.error = `Error (${
          error.response?.status || error.message || error.value
        })`;
    },
    clearError() {
      this.error = "";
    },
  },
});
