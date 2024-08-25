<template>
  <div class="container">
    <crumb v-for="item in breadcrumbs"
      :key = 'item.id'
      :item = 'item'
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import store from "../../store/store";
import Crumb from "./Crumb/Crumb.vue";

const computedLinksItems = computed(
  () => store.getters["menuStore/computedLinksItems"]
);

const route = useRoute();
const breadcrumbs = ref([]);

function updateBreadcrumbs() {
  const currentPath = route.path;
  const currentItem = computedLinksItems.value.find(item => item.link === currentPath);
  
  breadcrumbs.value = [];

  if (currentItem) {
    calculateBreadcrumbs(currentItem.id);
    breadcrumbs.value.reverse();
  }
}

function calculateBreadcrumbs(itemId) {
  const item = computedLinksItems.value.find((item) => item.id === itemId);
  
  if (item) {
    breadcrumbs.value.push(item);
    if (item.parent_id !== null) {
      calculateBreadcrumbs(item.parent_id);
    }
  }
}

watch([computedLinksItems, route], updateBreadcrumbs, { immediate: true });

// watchEffect(() => {
//   const currentPath = route.path;
//   const currentItem = computedLinksItems.find(item => item.link === currentPath);
//   breadcrumbs.value = [];

//   function calculateBreadcrumbs(itemId) {
    
//     const item = computedLinksItems.find((item) => item.id === itemId);
//     breadcrumbs.value.push(item);
//     if (item.parent_id !== null) {
//       calculateBreadcrumbs(item.parent_id);
//     }
//     return;
//   }
//   calculateBreadcrumbs(currentItem.id);
//   breadcrumbs.value.reverse();

// })
</script>

<style src="./Breadcrumbs.css" scoped />