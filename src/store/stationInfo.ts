import { defineStore } from "pinia";
import type { TStationLiveBoardData } from "../type";

export const useStationInfoStore = defineStore("stationInfo", {
  state: () => ({
    stationsInfo: [
      {
        id: 1070,
        stationName: "鶯歌",
        liveBoardData: null as Array<TStationLiveBoardData> | null,
      },
      {
        id: 1020,
        stationName: "板橋",
        liveBoardData: null as Array<TStationLiveBoardData> | null,
      },
      {
        id: 1000,
        stationName: "台北",
        liveBoardData: null as Array<TStationLiveBoardData> | null,
      },
    ],
  }),
  getters: {
    getLiveBoardData: (state) => {
      return (stationId: number) =>
        state.stationsInfo.find((station) => station.id === stationId)
          ?.liveBoardData;
    },
    getStaionsName: (state) => {
      return (stationId: number) =>
        state.stationsInfo.find((station) => station.id === stationId)
          ?.stationName!;
    },
    getStaionsSelectOption: (state) => {
      return state.stationsInfo.reduce((pre, cur) => {
        pre.push({
          label: cur.stationName,
          value: cur.id.toString(),
        });
        return pre;
      }, [] as { label: string; value: string }[]);
    },
  },
  actions: {
    setLiveBoardData(
      stationId: number,
      liveBoardData: Array<TStationLiveBoardData>
    ) {
      const foundStation = this.stationsInfo.find((station) => {
        return station.id === stationId;
      });
      if (foundStation) foundStation.liveBoardData = liveBoardData;
    },
  },
});
