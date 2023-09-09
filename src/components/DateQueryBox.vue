<script setup lang="ts">
import { ref } from "vue";
import { NDatePicker, NSelect, NButton } from "naive-ui";
import { ArrowsLeftRight } from "@vicons/tabler";
import { getTodayDate } from "@/utils";
import { useStationInfoStore } from "@/store/stationInfo";
import type { TSelectOption } from "@/type";

const stationInfoStore = useStationInfoStore();
const stationsInfo = stationInfoStore.stationsInfo;
const stationOption = stationInfoStore.getStaionsSelectOption;
const fromStation = ref<string>(stationsInfo[0].id);
const toStation = ref<string>(stationsInfo[2].id);
const emit = defineEmits<{
  (
    e: "onClickQuery",
    pickDate: string,
    fromStation: string,
    toStation: string
  ): void;
  (e: "onClickExchange"): void;
}>();

const pickDate = ref<string>(getTodayDate());
const onClickExchange = () => {
  [fromStation.value, toStation.value] = [toStation.value, fromStation.value];
};
const onClickQuery = () => {
  emit("onClickQuery", pickDate.value, fromStation.value, toStation.value);
};
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
          :options="stationOption"
          size="large"
        />
      </div>
      <div class="flex-initial px-2">~</div>
      <div class="flex-1">
        <n-select
          v-model:value="toStation"
          :options="stationOption"
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
</template>
