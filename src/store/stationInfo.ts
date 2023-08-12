import { defineStore } from "pinia";
import { STATION_ID_INFO } from "../constants";
import type { TSelectOption, TStationLiveBoardData } from "../type";

export const useStationInfoStore = defineStore("stationInfo", {
  state: () => ({
    stationsInfo: [
      {
        id: STATION_ID_INFO.YINGGE.id,
        stationName: STATION_ID_INFO.YINGGE.title,
        liveBoardData: null as Array<TStationLiveBoardData> | null,
      },
      {
        id: STATION_ID_INFO.BANQIAO.id,
        stationName: STATION_ID_INFO.BANQIAO.title,
        liveBoardData: null as Array<TStationLiveBoardData> | null,
      },
      {
        id: STATION_ID_INFO.TAIPEI.id,
        stationName: STATION_ID_INFO.TAIPEI.title,
        liveBoardData: null as Array<TStationLiveBoardData> | null,
      },
    ],
  }),
  getters: {
    getLiveBoardData: (state) => {
      return (stationId: string) =>
        state.stationsInfo.find((station) => station.id === stationId)
          ?.liveBoardData!;
    },
    getStaionName: (state) => {
      return (stationId: string) =>
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
      }, [] as TSelectOption[]);
    },
  },
  actions: {
    setLiveBoardData(
      stationId: string,
      liveBoardData: Array<TStationLiveBoardData>
    ) {
      const foundStation = this.stationsInfo.find((station) => {
        return station.id === stationId;
      });
      if (foundStation) foundStation.liveBoardData = liveBoardData;
    },
  },
});
