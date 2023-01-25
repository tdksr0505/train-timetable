<script setup lang="ts">
import TimeTable from "../components/TimeTable.vue";
import { onMounted, ref, reactive } from "vue";
import { NTabs, NTabPane } from "naive-ui";
interface IStationInfo {
  id: number;
  stationName: string;
  liveBoardData: object | null;
}

const stationInfo: IStationInfo[] = [
  {
    id: 1070,
    stationName: "鶯歌",
    liveBoardData: null,
  },
  {
    id: 1020,
    stationName: "板橋",
    liveBoardData: null,
  },
  {
    id: 1000,
    stationName: "台北",
    liveBoardData: null,
  },
];
const loading = ref(false);
const timeTableData = ref<object | null>(null);
const fetchData = (stationId: number) => {
  loading.value = true;
  fetch(
    "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/LiveBoard/Station/" +
      stationId +
      "?$top=1000&$format=JSON"
  )
    .then((res) => res.json())
    .then((json) => {
      timeTableData.value = json;
      stationInfo.filter(
        (station) => station.id === stationId
      )[0].liveBoardData = json;
      loading.value = false;
    });
};
const handleValueChange = (value: number) => {
  let currentStationInfo = stationInfo.filter(
    (station) => station.id === value
  )[0];
  if (currentStationInfo.liveBoardData) {
    timeTableData.value = currentStationInfo.liveBoardData;
  } else {
    fetchData(value);
  }
};
onMounted(async () => {
  fetchData(1070);
});
</script>

<template>
  <n-tabs type="line" size="large" :on-update:value="handleValueChange">
    <n-tab-pane
      v-for="station in stationInfo"
      :key="station.id"
      :name="station.id"
      :tab="station.stationName"
    >
      <TimeTable :data="timeTableData" :loading="loading"></TimeTable>
    </n-tab-pane>
  </n-tabs>
</template>
