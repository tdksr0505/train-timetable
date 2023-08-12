<script setup lang="ts">
import { onMounted, ref } from "vue";
import LiveBoardTable from "../components/LiveBoardTable.vue";
import { NTabs, NTabPane, useMessage } from "naive-ui";
import { useStationInfoStore } from "../store/stationInfo";
import type { TStationLiveBoardData } from "../type";
import { useLoadingStore } from "../store/loading";
import { getLiveBoardData } from "../api";
import { DIRECTION, DIRECTION_TAB, STATION_ID_INFO } from "../constants";
// import liveTablefakeData from "../../liveTablefakeData.json"; // debug用

const DEFAULT_STATION_ID = STATION_ID_INFO.YINGGE.id; // 鶯歌
const DEFAULT_DIRECTION = DIRECTION.Both; // 全部方向
const tableData = ref<TStationLiveBoardData[] | null>(null);
const stationInfoStore = useStationInfoStore();
const loadingStore = useLoadingStore();
const currentStationId = ref<string>(DEFAULT_STATION_ID);
const currentDirection = ref<number>(DEFAULT_DIRECTION);
const message = useMessage();

const onChangeDirection = (value: number) => {
  currentDirection.value = value;
  tableData.value = stationInfoStore.getLiveBoardData(currentStationId.value);
  if (value !== DIRECTION.Both) {
    // 非點選全部
    tableData.value = tableData.value.filter(
      (elem) => elem.Direction === value
    );
  }
};
const fetchData = async (stationId: string) => {
  loadingStore.setLoading(true);
  const liveBoardData = await getLiveBoardData(stationId);
  if (liveBoardData) {
    tableData.value = liveBoardData;
    stationInfoStore.setLiveBoardData(stationId, liveBoardData);
    loadingStore.setLoading(false);
  } else {
    message.error("請求api次數過多, 請明天再試");
  }
};
const handleValueChange = (value: string) => {
  currentStationId.value = value;
  currentDirection.value = DEFAULT_DIRECTION;
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
