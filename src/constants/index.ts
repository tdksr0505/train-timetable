import type { TSelectOption } from "../type";

export const TDX_API_BASE = import.meta.env.VITE_TDX_API_BASE;
export enum DIRECTION {
  Both = -1,
  Northbound,
  Southbound,
}
export const DIRECTION_TAB: Array<{ label: string; value: number }> = [
  { label: "全部", value: DIRECTION.Both },
  { label: "北上", value: DIRECTION.Northbound },
  { label: "南下", value: DIRECTION.Southbound },
];

export const STATION_ID_INFO = {
  TAIPEI: {
    id: "1000",
    title: "台北",
  },
  BANQIAO: {
    id: "1020",
    title: "板橋",
  },
  YINGGE: {
    id: "1070",
    title: "鶯歌",
  },
};
