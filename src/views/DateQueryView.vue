<script setup lang="ts">
import DateQueryTable from "../components/DateQueryTable.vue";
import DateQueryBox from "../components/DateQueryBox.vue";
import { ref, reactive, watch } from "vue";
import { useStationInfoStore } from "../store/stationInfo";
import { useLoadingStore } from "../store/loading";
import { getTodayDate } from "../utils";
import { getDailyTrainTimetable } from "../api";
import { useMessage } from "naive-ui";
import type { TDateQueryData } from "../type";

// import queryFakeData from "../../queryFakeData.json"; // debug用
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
const fromDefaultValue = stationsInfo[0].id;
const toDefaultValue = stationsInfo[2].id;
const fromStation = ref<string>(fromDefaultValue);
const toStation = ref<string>(toDefaultValue);
const message = useMessage();

const fetchData = async (date: string, from: string, to: string) => {
  loadingStore.setLoading(true);
  const dailyTrainTimetable = await getDailyTrainTimetable(date, from, to);
  if (dailyTrainTimetable) {
    dateQueryData.tableData = dailyTrainTimetable?.TrainTimetables;
    loadingStore.setLoading(false);
    // dateQueryData.tableData = queryFakeData.TrainTimetables;  // debug用
    dateQueryData.date = pickDate.value;
    dateQueryData.toStationName = stationInfoStore.getStaionName(
      toStation.value
    );
    dateQueryData.fromStationName = stationInfoStore.getStaionName(
      fromStation.value
    );
  } else {
    message.error("請求api次數過多, 請明天再試");
  }
};

const onClickQuery = (
  pickDate: string,
  fromStation: string,
  toStation: string
) => {
  fetchData(pickDate, fromStation, toStation);
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
  <DateQueryBox
    :stationOption="stationInfoStore.getStaionsSelectOption"
    @onClickQuery="onClickQuery"
  />
  <div v-if="dateQueryData.tableData" class="pt-4">
    <DateQueryTable :data="dateQueryData"></DateQueryTable>
  </div>
</template>
