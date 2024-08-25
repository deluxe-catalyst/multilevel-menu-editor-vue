<template>
    <header class="container">
        <div class="container__wrapper">
            <h1 class="container__title">Редактор многоуровнего меню</h1>
            <form @submit.prevent = '' class="container__form">
                <div v-if="!userToken" class="form__login">
                    <Input v-model="username" :placeholder="'Логин'"/>
                    <Input v-model="password" :placeholder="'Пароль'"/>
                    <Button :classProp = "'button-blue'" @click="auth">
                        Войти
                    </Button>
                </div>
                <Button v-if='userToken' :classProp = "'button-red'" @click="logOut">
                    Выйти
                </Button>
            </form>

        </div>
    </header>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import Button from '../Button/Button.vue';
    import Input from '../Input/Input.vue';
    import store from '../../store/store';

    const username = ref('');
    const password = ref('');

    store.dispatch('userStore/setUserToken', localStorage.getItem('USER_TOKEN'));
    const userToken = computed(() => store.getters['userStore/getUserToken']);

    const logOut = () => store.dispatch('userStore/setLogOut');
    
    async function auth() {
        store.dispatch('userStore/setAuthToken', {
            username: username.value,
            password: password.value
        })
    }
</script>

<style lang="css" scoped src="./Header.css" />