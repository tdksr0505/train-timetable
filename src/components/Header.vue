<script setup lang="ts">
defineEmits(["setSidebarOpen"]);
</script>

<template>
  <header class="h-12 shadow flex items-center justify-between">
    <div class="text-[30px] font-bold text-green-600 pl-4">
      <RouterLink to="/">火車時刻表</RouterLink>
    </div>
    <div
      class="w-[50px] px-3 py-[14px] h-full flex flex-col justify-between cursor-pointer"
      @click="$emit('setSidebarOpen', true)"
    >
      <span class="w-full h-[3px] bg-green-600"></span>
      <span class="w-full h-[3px] bg-green-600"></span>
      <span class="w-full h-[3px] bg-green-600"></span>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
