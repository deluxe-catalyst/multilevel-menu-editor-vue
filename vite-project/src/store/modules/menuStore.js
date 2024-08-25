import calculatePath from "../../utils/calculatePath";
import axiosInstance from "../../utils/axios.config";
import router, { calculateRoute } from "../../utils/router";
import store from "../store";

const menuStore = {
    namespaced: true,
    state: {
        menuItems: [],
        computedLinksItems: [],
        currentPageContent: {},
        breadcrumbs: [],
    },
    getters: {
        getMenuItems: state => state.menuItems,
        currentPageContent: state => state.currentPageContent,
        computedLinksItems: state => state.computedLinksItems,
    },
    mutations: {
        setStore: (state, payload) => Object.assign(state, payload),
    },
    actions: {
        async axiosMenuItems({commit, state}) {
            await axiosInstance
            .get('/menu')
            .then(response => {
                commit('setStore', {menuItems: response.data});
                
                const computedLinks = [];
                response.data.forEach(item => {
                    computedLinks.push({
                        link: calculatePath(response.data, item.id),
                        title: item.title,
                        id: item.id,
                        parent_id: item.parent_id
                      });
                })
                updateRouter(response.data);
                commit('setStore', {computedLinksItems: computedLinks}); 
            });
        },

        //------------------------------------------------- Действия с пунктами

        async axiosEditMenuItem({}, payload) {
            await axiosInstance
            .put(`/menu/${payload.id}`, {
                title: payload.title,
                parent_id: payload.parent_id,
                link: payload.link,
                content: payload.content,
            })
            .then(() => {
                store.dispatch('menuStore/axiosMenuItems');
                updateAndFollowRoute(payload);
            })
        },
        async axiosCreateMenuItem({}, payload) {
            await axiosInstance
                .post('/menu', payload)
                .then(() => {
                    store.dispatch('menuStore/axiosMenuItems');              
                });
        },
        async axiosDeleteMenuItem({state}, payload) {  
            const arr = calculateChildrens(state.menuItems, payload);
            arr.push(payload);

            const deleteItems = arr.map(item => axiosInstance.delete(`/menu/${item.id}`))
            await Promise.all(deleteItems)
                .then(() => {
                    store.dispatch('menuStore/axiosMenuItems');
                });
        },
        setCurrentPageContent: ({commit}, payload) => commit('setStore', {currentPageContent: payload}),
        setComputedLinksItems: ({commit}, payload) => commit('setStore', {computedLinksItems: payload}),
    }
};
function calculateChildrens(array, parentItem){
    let result = [];

    function findChildren(item) {
        const children = array.filter(child => child.parent_id === item.id);
        result.push(...children);
        children.forEach(child => findChildren(child));
    }

    findChildren(parentItem);

    return result;
}
function updateRouter(array){
    router.getRoutes().forEach(route => {
        if (route.name) router.removeRoute(route.name);
    });
    array.forEach(item => {
        router.addRoute(calculateRoute(array, item));
    })
}

function updateAndFollowRoute(item){
    const oldRoute = router.getRoutes().find(route => route.name === item.id);
    if (oldRoute) router.removeRoute(oldRoute.name);

    const newRoute = calculateRoute(store.state.menuStore.menuItems, item);
    router.addRoute(newRoute);
    router.push(newRoute.path);
}

export default menuStore;