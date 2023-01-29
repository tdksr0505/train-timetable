<script setup lang="ts">
import LiveBoardTable from "../components/LiveBoardTable.vue";
import { onMounted, ref } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import { useStationInfoStore } from "../store/stationInfo";
import type { TStationLiveBoardData } from "../type";

const TDX_API_BASE = import.meta.env.VITE_TDX_API_BASE;
const loading = ref(false);
const tableData = ref<TStationLiveBoardData[] | null>(null);
const stationInfoStore = useStationInfoStore();

const fetchData = (stationId: number) => {
  loading.value = true;
  fetch(
    `${TDX_API_BASE}/v2/Rail/TRA/LiveBoard/Station/${stationId}?$top=1000&$format=JSON`
  )
    .then((res) => res.json())
    .then((resJson) => {
      tableData.value = resJson;
      stationInfoStore.setLiveBoardData(stationId, resJson);
      loading.value = false;
    });
};
const handleValueChange = (value: number) => {
  let currentLiveBoardData = stationInfoStore.getLiveBoardData(value);
  if (currentLiveBoardData) {
    tableData.value = currentLiveBoardData;
  } else {
    fetchData(value);
  }
};
onMounted(async () => {
  handleValueChange(1070);
});
</script>

<template>
  <n-tabs type="line" size="large" :on-update:value="handleValueChange">
    <n-tab-pane
      v-for="station in stationInfoStore.stationsInfo"
      :key="station.id"
      :name="station.id"
      :tab="station.stationName"
    >
      <LiveBoardTable :data="tableData" :loading="loading"></LiveBoardTable>
    </n-tab-pane>
  </n-tabs>
</template>
