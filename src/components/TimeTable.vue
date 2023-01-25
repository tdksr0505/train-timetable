<script setup lang="ts">
import { NList, NListItem } from "naive-ui";
const { data, loading } = defineProps(["data", "loading"]);

const getDepartureTime = (scheduledDepartureTime: string) => {
  let timeSplit = scheduledDepartureTime.split(":");
  return `${timeSplit[0]}：${timeSplit[1]}`;
};

const getDirection = (direction: number) => {
  return direction === 0 ? "北上" : "南下";
};

const getDelay = (delay: number) => {
  return delay === 0 ? `準點` : `${delay}分`;
};
</script>

<template>
  <div v-if="data && !loading">
    <n-list :bordered="true">
      <n-list-item v-for="row in data" :key="row.TrainNo">
        <div>
          <span class="text-green-600"> 發車時間：</span
          >{{ getDepartureTime(row.ScheduledDepartureTime) }}
        </div>
        <div>
          <span class="text-green-600"> 北上/南下：</span
          >{{ getDirection(row.Direction) }}
        </div>
        <div><span class="text-green-600"> 車次：</span>{{ row.TrainNo }}</div>
        <div>
          <span class="text-green-600"> 車種：</span
          >{{ row.TrainTypeName.Zh_tw }}
        </div>
        <div>
          <span class="text-green-600"> 開往：</span
          >{{ row.EndingStationName.Zh_tw }}
        </div>
        <div>
          <span class="text-green-600"> 準點/誤點：</span
          >{{ getDelay(row.DelayTime) }}
        </div>
      </n-list-item>
    </n-list>
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
