<script setup lang="ts">
import LiveBoardTable from "../components/LiveBoardTable.vue";
import { onMounted, ref } from "vue";
import { NTabs, NTabPane, useMessage } from "naive-ui";
import { useStationInfoStore } from "../store/stationInfo";
import type { TStationLiveBoardData } from "../type";
import { useLoadingStore } from "../store/loading";

const TDX_API_BASE = import.meta.env.VITE_TDX_API_BASE;
const message = useMessage();

const tableData = ref<TStationLiveBoardData[] | null>(null);
const stationInfoStore = useStationInfoStore();
const loadingStore = useLoadingStore();

const fetchData = (stationId: number) => {
  loadingStore.setLoading(true);
  fetch(
    `${TDX_API_BASE}/v2/Rail/TRA/LiveBoard/Station/${stationId}?$top=1000&$format=JSON`
  )
    .then((res) => {
      if (res.status === 429) {
        // status 429:請求api次數過多
        message.error("請求api次數過多");
      }
      return res.json();
    })
    .then((resJson) => {
      tableData.value = resJson;
      stationInfoStore.setLiveBoardData(stationId, resJson);
      loadingStore.setLoading(false);
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
      <LiveBoardTable :data="tableData"></LiveBoardTable>
    </n-tab-pane>
  </n-tabs>
</template>
