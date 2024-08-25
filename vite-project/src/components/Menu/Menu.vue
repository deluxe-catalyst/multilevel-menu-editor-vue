<template>
  <div class="menu-container">
    <div class="menu-wrapper">
      <div class="manage-buttons" v-if="rules"> 
        <Button @click="createMenuItem()" :classProp="'button-green'">Добавить пункт в меню</Button>
      </div>
      <menu-point-vue
        v-for="item in computedItems" 
        :key="item.id"
        :item="item"
        :data-arr="menuItems"
        :rules = rules
      ></menu-point-vue>
    </div>
    <router-view/>
  </div>
</template>

<script setup>
    import Button from '../Button/Button.vue'
    import MenuPointVue from "../MenuPoint/MenuPoint.vue";
    import { computed, onMounted } from "vue";
    import store from "../../store/store";

    const rules = computed(() => store.getters['userStore/getRules']);
    
    const menuItems = computed(() => store.getters['menuStore/getMenuItems']);
    const computedItems = computed(() => {
        return menuItems.value.filter(item => item.parent_id === null);
    });

    function createMenuItem(){
      store.dispatch('modalStore/setModalAction', 'create');
      store.dispatch('modalStore/setModalContentItem', {parent_id: null})
    }

    onMounted(() => {
      const currentUserId = localStorage.getItem('USER_ID');
      if(currentUserId){
        store.dispatch('userStore/setRules', currentUserId);
      }
      store.dispatch('menuStore/axiosMenuItems');
    });
</script>

<style src="./Menu.css" scoped />
