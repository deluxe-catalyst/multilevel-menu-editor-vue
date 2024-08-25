<script setup>
import { computed, onMounted } from 'vue';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs.vue';
  import Header from './components/Header/Header.vue'
  import Menu from './components/Menu/Menu.vue'
  import ModalWindow from './components/ModalWindow/ModalWindow.vue';
  import store from './store/store';
  
  
  const modalVisible = computed(() => store.getters['modalStore/getModalVisible']);
</script>

<template>
  
  <div class="app-container">
    <ModalWindow v-if="modalVisible"/>
    <Header></Header>
    <main class="main-container"> 
      <Breadcrumbs></Breadcrumbs>
      <Menu></Menu>
    </main>
  </div>
</template>

<style scoped>
</style>
