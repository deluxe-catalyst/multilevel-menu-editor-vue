<template>
        <div class="menu-point">
            <router-link :to="computedLink">
                <div class="menu-point__title" draggable="true">
                    {{ item.title }}
                    <div class="menu-point__buttons"> 
                        <div class="buttons__manage-menu" v-if="rules">
                            <img 
                                class="menu-point__settings" 
                                src="../../assets/svg/gear.svg"
                                @click.prevent=""
                             />
                            <MenuPointOptions>
                                <Button :classProp="'button-blue'" @click.prevent = 'buttonAction("edit")'>
                                    <img class="manage-btn" src="../../assets/svg/edit.svg" />
                                </Button>
                                <Button :classProp="'button-red'" @click.prevent = 'buttonAction("delete")'>
                                    <img class="manage-btn" src="../../assets/svg/trash.svg" />
                                </Button>
                                <Button :classProp="'button-green'" @click.prevent = 'buttonAction("create")'>
                                    <img class="manage-btn" src="../../assets/svg/plus.svg" />
                                </Button>
                            </MenuPointOptions>
                        </div>
                        <img 
                            :class="'menu-point__icon' + (isSubmenuVisible ? '--open' : '--close')" 
                            src="../../assets/svg/ph_caret-down-bold.svg" 
                            v-if="arrowVisible" 
                            @click.prevent="toggleMenu()"
                        />
                    </div>
                </div>
            </router-link>
            <div v-if="isSubmenuVisible" class="submenu">
                <MenuPointVue 
                    v-for="child in children" 
                    :key="child.id" 
                    :item="child" 
                    :data-arr="dataArr"
                    :rules = "rules"
                />
            </div>
        </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import MenuPointVue from "./MenuPoint.vue";
import calculatePath from "../../utils/calculatePath";
import Button from "../Button/Button.vue";
import MenuPointOptions from "./MenuPointOptions/MenuPointOptions.vue";
import store from "../../store/store";

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    dataArr: {
        type: Array,
        required: true
    },
    rules: {
        type: Boolean,
        required: true
    }
});


const isSubmenuVisible = ref(false);

const children = computed(() => {
    return props.dataArr.filter((child) => child.parent_id === props.item.id);
});

const computedLink = computed(() => {
    return calculatePath(props.dataArr, props.item.id);
})

const arrowVisible = computed(() => {
    if(children.value.length > 0) return true;
})

function toggleMenu(){
    isSubmenuVisible.value = !isSubmenuVisible.value;
}

function buttonAction(action){
    store.dispatch('modalStore/setModalAction', action);
    if(action === "edit"){   
        store.dispatch('modalStore/setModalContentItem', props.item);
        return;
    }
    if(action === "create"){
        store.dispatch('modalStore/setModalContentItem', {parent_id: props.item.id,});
        return;
    }
    if(action === "delete"){
        store.dispatch('modalStore/setModalContentItem', {id: props.item.id});
        return;
    }
}

</script>

<style src='./MenuPoint.css'></style>