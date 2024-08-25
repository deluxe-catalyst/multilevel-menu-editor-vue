<template>
  <div class="container__crumb">
    <img class="img" src="../../../assets/svg/ph_caret-down-bold.svg"/>
    <router-link :to="item.link">
        <div class="container__link">
          {{ item.title }}
        </div>
    </router-link>


  </div>
</template>

<script setup>
    const props = defineProps({item: Object});


</script>

<style src="./Crumb.css" scoped />