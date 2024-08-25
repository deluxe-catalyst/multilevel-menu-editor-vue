<template>
    <div class="dropdown__container">
        <div class="dropdown__name">
            {{ name }}
        </div>
        <div class="dropdown__title" @click="toggleMenu">
            {{ title }}
            <img class="arrow-btn" src="../../assets/svg/ph_caret-down-bold.svg" />
            <div v-if="menuVisible" class="dropdown__menu">
                <div class="menu__item advanced-item" v-for="item in advancedItems" :key="item.id"
                    @click.stop="setParentItem(item)">
                    {{ item.title }}
                </div>
                <div class="menu__item" v-for="item in menuItems" :key="item.id" @click.stop="setParentItem(item)">
                    {{ item.title }}
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../../store/store';

const props = defineProps({
    title: String,
    menuItems: Array,
    advancedItems: Array,
    name: String,
});

const emit = defineEmits(['update:title']);

const menuVisible = ref(false);

function toggleMenu() {
    menuVisible.value = !menuVisible.value;
}

function setParentItem(parentItem) {
    menuVisible.value = false;
    store.dispatch('modalStore/setModalContentItem', { parent_id: parentItem.id });
    emit('update:title', parentItem.title)
}
</script>

<style src = './DropdownMenu.css' scoped />