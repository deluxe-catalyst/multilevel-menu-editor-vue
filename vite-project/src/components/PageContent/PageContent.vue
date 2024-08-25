<template>
  <div class="page-container">
        {{ content }}
  </div>

</template>

<script setup>
    const props = defineProps({
        title: String,
        content: String,
    })
</script>

<style scoped>
  .page-container{
    display: flex;
    justify-content: center;
    font-size: 60px;
    padding-block: 40px;
    width: 100%;
  }
</style>