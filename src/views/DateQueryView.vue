<script setup lang="ts">
import DateQueryTable from "../components/DateQueryTable.vue";
import { ref, reactive } from "vue";
import { NDatePicker, NSelect, NButton, useMessage } from "naive-ui";
import { useStationInfoStore } from "../store/stationInfo";
import { useLoadingStore } from "../store/loading";
import { ArrowsLeftRight } from "@vicons/tabler";
// import queryFakeData from "../../queryFakeData.json";
import type { TDateQueryData } from "../type";
import { watch } from "vue";

const TDX_API_BASE = import.meta.env.VITE_TDX_API_BASE;
const message = useMessage();

const getTodayDate = () => {
  let date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const dateQueryData = reactive<TDateQueryData>({
  date: null,
  fromStationName: null,
  toStationName: null,
  tableData: null,
});
const pickDate = ref<string>(getTodayDate());

const loadingStore = useLoadingStore();
const stationInfoStore = useStationInfoStore();
const stationsInfo = stationInfoStore.stationsInfo;
const fromDefaultValue = stationsInfo[0].id.toString();
const toDefaultValue = stationsInfo[2].id.toString();
const fromStation = ref<string>(fromDefaultValue);
const toStation = ref<string>(toDefaultValue);

const fetchData = (date: string, from: string, to: string) => {
  loadingStore.setLoading(true);
  fetch(
    `${TDX_API_BASE}/v3/Rail/TRA/DailyTrainTimetable/OD/${from}/to/${to}/${date}?$top=1000&$format=JSON`
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
      // console.log(resJson);
      if (resJson) dateQueryData.tableData = resJson?.TrainTimetables;
      loadingStore.setLoading(false);
    });
  // dateQueryData.tableData = queryFakeData.TrainTimetables;
  dateQueryData.date = pickDate.value;
  dateQueryData.toStationName = stationInfoStore.getStaionName(
    parseInt(toStation.value)
  );
  dateQueryData.fromStationName = stationInfoStore.getStaionName(
    parseInt(fromStation.value)
  );
};

const onClickQuery = () => {
  fetchData(pickDate.value, fromStation.value, toStation.value);
};

const onClickExchange = () => {
  [fromStation.value, toStation.value] = [toStation.value, fromStation.value];
};

watch(
  () => dateQueryData.tableData,
  (newValue) => {
    if (newValue) {
      newValue?.sort((a, b) => {
        if (a.StopTimes[0].DepartureTime < b.StopTimes[0].DepartureTime) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }
);
</script>

<template>
  <div class="md:flex md:items-center">
    <div class="md:w-1/4 md:pr-4">
      <n-date-picker
        v-model:formatted-value="pickDate"
        value-format="yyyy-MM-dd"
        type="date"
        size="large"
      />
    </div>
    <div class="flex items-center mt-3 md:mt-0 md:w-1/2 md:pr-4">
      <div class="flex-1">
        <n-select
          v-model:value="fromStation"
          :options="stationInfoStore.getStaionsSelectOption"
          size="large"
        />
      </div>
      <div class="flex-initial px-2">～</div>
      <div class="flex-1">
        <n-select
          v-model:value="toStation"
          :options="stationInfoStore.getStaionsSelectOption"
          size="large"
        />
      </div>
    </div>
    <div class="mt-3 h-9 text-center md:mt-0 md:w-[100px] md:mr-4">
      <n-button @click="onClickExchange" class="w-full h-full" type="info">
        <ArrowsLeftRight class="w-7" />
      </n-button>
    </div>
    <div class="mt-3 md:mt-0 md:w-[100px]">
      <n-button
        @click="onClickQuery"
        class="w-full text-base h-9"
        type="primary"
        >查詢</n-button
      >
    </div>
  </div>
  <div v-if="dateQueryData.tableData" class="pt-4">
    <DateQueryTable :data="dateQueryData"></DateQueryTable>
  </div>
</template>
