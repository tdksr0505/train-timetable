<script setup lang="ts">
import { ref } from "vue";
import { CloseOutline } from "@vicons/ionicons5";
import { useMenuStore } from "../store/menu";
import { RouterLink } from "vue-router";

const { open } = defineProps(["open"]);

const menuStore = useMenuStore();
</script>
<template>
  <div v-show="open" class="z-[2] fixed top-0 right-0 w-screen h-screen">
    <div class="bg-black w-full h-full opacity-50"></div>
    <Transition name="fade">
      <div
        v-show="open"
        class="absolute top-0 right-0 w-[250px] h-full bg-green-700"
      >
        <div
          class="flex justify-end pt-3 pb-1 pr-2 text-white border-b-[1px] border-b-green-600"
        >
          <CloseOutline
            class="w-[50px] cursor-pointer"
            color="white"
            @click="$emit('setSidebarOpen', false)"
          />
        </div>
        <div
          v-for="option in menuStore.menuOptions"
          :key="option.path"
          class="text-base text-white border-b-[1px] border-b-green-600"
        >
          <RouterLink
            :to="option.path"
            @click="$emit('setSidebarOpen', false)"
            class="block px-10 py-5"
            >{{ option.label }}</RouterLink
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}

.fade-enter-from {
  transform: translateX(100%);
}
.fade-leave-to {
  transform: translateX(0);
}
</style>
