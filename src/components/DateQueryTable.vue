<script setup lang="ts">
import { NList, NListItem } from "naive-ui";
import type { TDateQueryData } from "../type";
import { ArrowForward } from "@vicons/ionicons5";
import { Clock } from "@vicons/tabler";
import moment from "moment";

const props = defineProps<{
  data: TDateQueryData | null;
  loading?: boolean;
}>();

const getDuration = (startTime: string, endTime: string): string => {
  let duration = moment.duration(
    moment(endTime, "HH:mm").add(1, "days").diff(moment(startTime, "HH:mm"))
  );
  let hour = duration.hours().toString().padStart(2, "0");
  let minutes = duration.minutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
};
</script>

<template>
  <div v-if="props.data?.tableData && !props.loading">
    <div v-if="props.data.tableData.length === 0">無列車資訊</div>
    <div v-else>
      <div class="flex mb-5 text-xl">
        <div class="mr-5 text-blue-700">{{ props.data.date }}</div>
        <div class="flex items-center text-green-600">
          <div>
            {{ props.data.fromStationName }}
          </div>
          <div><ArrowForward class="w-6 mx-4" /></div>
          <div>{{ props.data.toStationName }}</div>
        </div>
      </div>
      <n-list :bordered="true">
        <n-list-item
          v-for="(row, index) in props.data.tableData"
          :key="row.TrainInfo.TrainNo"
        >
          <div class="absolute top-1 left-1">{{ index + 1 }}</div>
          <div class="flex items-center mt-5">
            <div class="text-green-600 text-[18px]">
              {{ row.StopTimes[0].DepartureTime }}
            </div>
            <div class="px-1"><ArrowForward class="text-green-600 w-5" /></div>
            <div class="text-green-600 text-[18px]">
              {{ row.StopTimes[1].ArrivalTime }}
            </div>
          </div>
          <div class="flex items-center">
            <div><Clock class="w-4 mr-1" /></div>
            <div>
              {{
                getDuration(
                  row.StopTimes[0].DepartureTime,
                  row.StopTimes[1].ArrivalTime
                )
              }}
            </div>
          </div>
          <div class="flex items-center mt-2">
            <div class="mr-1">{{ row.TrainInfo.TrainTypeName.Zh_tw }}</div>
            <div>{{ row.TrainInfo.TrainNo }}</div>
          </div>
        </n-list-item>
      </n-list>
    </div>
  </div>
  <div v-else>loading...</div>
</template>

<style lang="scss" scoped>
$borderColor: #6ed8b5;

.n-list {
  &.n-list--bordered {
    border: $borderColor 1px solid !important;
  }
}

:deep() {
  .n-list-item {
    padding: 10px 10px;
    font-size: 16px;
    &.mark {
      background-color: #d1f0e0;
    }
    &:not(:last-child) .n-list-item__divider {
      background-color: $borderColor !important;
    }
  }
}
</style>
