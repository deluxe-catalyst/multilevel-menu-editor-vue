<template>
  <button @click="onClick" :class="classProp">
    <slot></slot>
  </button>
</template>

<script setup>
    const props = defineProps({
        onClick: Function,
        classProp: String
    })
</script>

<style src='./Button.css' scoped />