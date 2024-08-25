<template>
    <div class="modal-container">
        <div class="modal-container__box">
            <div class="box__close-btn" @click="closeModal">✕</div>
            <div class="box__content">
                <h2 class="content__title">{{ modalActions[action] }}</h2>
                <form class="content__form" @submit.prevent="axiosSubmit">
                    <div class="form__inputs" v-if="action === 'delete' ? false : true">
                        <DropdownMenu :title="parentTitle" :menuItems="menuItems" :advancedItems="advancedEditModalItem"
                            @update:title="updateTitle" :name="'Родитель:'" />
                        <Input v-model="inputs.title" :placeholder="'Название пункта'" :type="'title'"
                            :error="formErrors.title" />
                        <Input v-model="inputs.link" :placeholder="'Ссылка'" :type="'link'" :error="formErrors.link" />
                        <Input v-model="inputs.content" :placeholder="'Контент по ссылке'" :type="'content'"
                            :error="formErrors.content" />
                    </div>
                    <h3 class="delete-info" v-if="action === 'delete' ? true : false">
                        Вы действительно хотите удалить пункт меню и его дочерние подпункты?
                    </h3>

                    <Button :classProp="action === 'delete'
                            ? 'button-red'
                            : formDone === true
                                ? 'button-blue'
                                : 'button-gray'
                        " @click.prevent="axiosSubmit">
                        {{ buttonActions[action] }}
                    </Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "../../store/store";
import Button from "../Button/Button.vue";
import DropdownMenu from "../DropdownMenu/DropdownMenu.vue";
import Input from "../Input/Input.vue";
import { onMounted, ref, watch } from "vue";
import validate from "./validate";

const inputs = ref({
    title: "",
    link: "",
    content: "",
});

const formDone = ref(false);
const formErrors = ref({
    title: "",
    link: "",
    content: "",
});

const menuItems = store.getters["menuStore/getMenuItems"];

const action = store.getters["modalStore/getModalAction"];

const advancedEditModalItem = [{ title: "Главное меню", id: null }];

const parentTitle = ref("");

const modalActions = {
    create: "Создание пункта меню",
    edit: "Редактирование пункта меню",
    delete: "Удаление пункта меню",
};
const buttonActions = {
    create: "Создать",
    edit: "Редактировать",
    delete: "Удалить",
};

const handleModalItem = store.getters["modalStore/getHandleItem"];

onMounted(() => {    
    if (action === "create" || action === "edit") {
        setErrors(inputs.value, action);
        if (handleModalItem.parent_id === null) {
            parentTitle.value = advancedEditModalItem[0].title;
        } else {
            parentTitle.value = menuItems.find(
                (item) => item.id === handleModalItem.parent_id
            ).title;
        }
    }
});

inputs.value = {
    title: handleModalItem.title,
    link: handleModalItem.link,
    content: handleModalItem.content,
};

const updateTitle = (newTitle) => (parentTitle.value = newTitle);

watch(
    inputs,
    (newVal) => {
        setErrors(newVal);

        store.dispatch("modalStore/setModalContentItem", {
            title: newVal.title,
            link: newVal.link,
            content: newVal.content,
        });
    },
    { deep: true }
);

function axiosSubmit() {
    if (formDone.value === true) store.dispatch("modalStore/axiosSubmit", action);
}

const closeModal = () => store.dispatch("modalStore/resetStore");

function setErrors(inputs, action) {
    const errors = validate(inputs, formErrors.value, action);
    formErrors.value = errors;
    if (!errors.title && !errors.link && !errors.content) {
        formDone.value = true;
    } else {
        formDone.value = false;
    }
}
</script>

<style src="./ModalWindow.css" scoped />