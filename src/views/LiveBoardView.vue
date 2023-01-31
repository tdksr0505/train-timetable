<script setup lang="ts">
import LiveBoardTable from "../components/LiveBoardTable.vue";
import { onMounted, ref } from "vue";
import { NTabs, NTabPane, useMessage } from "naive-ui";
import { useStationInfoStore } from "../store/stationInfo";
import type { TStationLiveBoardData } from "../type";
import { useLoadingStore } from "../store/loading";
// import liveTablefakeData from "../../liveTablefakeData.json";

type TDirection = {
  label: string;
  value: number;
};
const DIRECTION_TAB: Array<TDirection> = [
  { label: "全部", value: -1 },
  { label: "北上", value: 0 },
  { label: "南下", value: 1 },
];

const DEFAULT_STATION_ID = 1070; //鶯歌
const TDX_API_BASE = import.meta.env.VITE_TDX_API_BASE;
const message = useMessage();
const tableData = ref<TStationLiveBoardData[] | null>(null);
const stationInfoStore = useStationInfoStore();
const loadingStore = useLoadingStore();
const currentStationId = ref<number>(DEFAULT_STATION_ID);
const currentDirection = ref<number>(-1);

const onChangeDirection = (value: number) => {
  currentDirection.value = value;
  tableData.value = stationInfoStore.getLiveBoardData(currentStationId.value);
  if (value !== -1) {
    // 非點選全部
    tableData.value = tableData.value.filter(
      (elem) => elem.Direction === value
    );
  }
};
const fetchData = (stationId: number) => {
  loadingStore.setLoading(true);
  fetch(
    `${TDX_API_BASE}/v2/Rail/TRA/LiveBoard/Station/${stationId}?$top=1000&$format=JSON`
  )
    .then((res) => {
      if (res.status === 429) {
        // status 429:請求api次數過多
        message.error("請求api次數過多");
        return null;
      } else {
        return res.json();
      }
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
  handleValueChange(DEFAULT_STATION_ID);
});
</script>

<template>
  <n-tabs type="line" size="large" :on-update:value="handleValueChange">
    <n-tab-pane
      v-for="station in stationInfoStore.stationsInfo"
      :key="station.id"
      :name="station.id"
      :tab="station.stationName"
      class="text-lg"
    >
      <div v-if="tableData">
        <div class="flex items-center mb-3 text-base">
          <div v-for="elem in DIRECTION_TAB">
            <div
              class="border border-green-600 rounded-[100px] px-4 py-1 mr-3 cursor-pointer"
              :class="{
                'bg-green-600 text-white': currentDirection === elem.value,
              }"
              @click="onChangeDirection(elem.value)"
            >
              {{ elem.label }}
            </div>
          </div>
        </div>
        <LiveBoardTable :data="tableData"></LiveBoardTable>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>
