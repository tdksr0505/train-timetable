import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuOptions: [
      {
        label: "首頁",
        path: "/",
      },
      {
        label: "依日期 / 起訖站查詢",
        path: "/date-query",
      },
    ],
  }),
  getters: {},
  actions: {},
});
