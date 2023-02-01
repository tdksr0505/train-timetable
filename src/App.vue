<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import { ref } from "vue";
import { ArrowUp } from "@vicons/ionicons5";
import { NMessageProvider } from "naive-ui";

const GOTOP_THRESHOLD = 250;
const isSidebarOpen = ref<boolean>(false);
const setSideBaropen = (isOpen: boolean) => {
  isSidebarOpen.value = isOpen;
};

const isShowGoTop = ref<boolean>(false);
const handleScroll = () => {
  isShowGoTop.value = window.top!.scrollY >= GOTOP_THRESHOLD ? true : false;
};
window.addEventListener("scroll", handleScroll);
const onClickGoTop = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <n-message-provider>
    <header class="h-12 shadow flex items-center justify-between">
      <div class="text-[30px] font-bold text-green-600 pl-4">
        <RouterLink to="/">火車時刻表</RouterLink>
      </div>
      <div
        class="w-[50px] px-3 py-[14px] h-full flex flex-col justify-between cursor-pointer"
        @click="setSideBaropen(true)"
      >
        <span class="w-full h-[3px] bg-green-600"></span>
        <span class="w-full h-[3px] bg-green-600"></span>
        <span class="w-full h-[3px] bg-green-600"></span>
      </div>
    </header>
    <Sidebar :open="isSidebarOpen" @set-sidebar-open="setSideBaropen" />
    <div class="container px-4 m-auto pt-8">
      <RouterView />
    </div>
    <div
      v-show="isShowGoTop"
      class="fixed right-10 bottom-10 w-10 h-10 bg-green-600 rounded pt-[4px] cursor-pointer"
      @click="onClickGoTop"
    >
      <ArrowUp class="w-8 mx-auto" color="white" />
    </div>
  </n-message-provider>
</template>
