import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
