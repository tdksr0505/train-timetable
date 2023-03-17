<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import { ref } from "vue";
import { ArrowUp } from "@vicons/ionicons5";
import { NMessageProvider } from "naive-ui";

const GOTOP_THRESHOLD = 250;
const isSidebarOpen = ref<boolean>(false);
const setSideBarOpen = (isOpen: boolean) => {
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
    <Header @set-sidebar-open="setSideBarOpen"></Header>
    <Sidebar :open="isSidebarOpen" @set-sidebar-open="setSideBarOpen" />
    <div class="container px-4 py-8 m-auto">
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
