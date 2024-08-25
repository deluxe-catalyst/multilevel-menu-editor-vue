import { toDisplayString } from "vue";
import store from "../store";

const initialState = {
    modalAction: "",
    modalVisible: false,
    handleItem: {},
};

const modalStore = {
    namespaced: true,
    state: { ...initialState },
    getters: {
        getModalAction: (state) => state.modalAction,
        getModalVisible: (state) => state.modalVisible,
        getHandleItem: (state) => state.handleItem,
    },
    mutations: { setStore: (state, payload) => Object.assign(state, payload) },
    actions: {
        setModalContentItem({ commit, state }, item) {
            commit("setStore", {
                handleItem: {
                    ...state.handleItem,
                    ...item,
                },
            });            
        },
        setModalAction({ commit }, action) {
            commit("setStore", {
                modalAction: action,
                modalVisible: true,
                handleItem: {
                    title: '',
                    content: '',
                    link: ''
                },
            });
        },

        axiosSubmit({ state, commit }) {
            if(state.modalAction === "") commit('resetStore');

            if(state.modalAction === "create") {
                store.dispatch('menuStore/axiosCreateMenuItem', state.handleItem);
                store.dispatch('modalStore/resetStore');
            };
            if(state.modalAction === "edit") {                
                store.dispatch('menuStore/axiosEditMenuItem', state.handleItem);
                store.dispatch('modalStore/resetStore');
            };
            if(state.modalAction === "delete") {
                store.dispatch('menuStore/axiosDeleteMenuItem', state.handleItem);
                store.dispatch('modalStore/resetStore');
            }
        },

        //------------------------------------- Очистка стора

        resetStore: ({ commit }) => commit("setStore", { ...initialState }),
    },
};

export default modalStore;
