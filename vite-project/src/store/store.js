import { createStore } from "vuex/dist/vuex.cjs.js";
import menuStore from "./modules/menuStore";
import modalStore from "./modules/modalStore";
import userStore from "./modules/userStore";

const store = createStore({
    modules:{
        menuStore,
        modalStore,
        userStore
    }
});

export default store;