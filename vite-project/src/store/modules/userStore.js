import axiosInstance from "../../utils/axios.config";

const initialState = {
    userToken: null,
    rules: false,
    userId: null
};

const userStore = {
    namespaced: true,
    state: { ...initialState },
    getters: {
        getUserToken: (state) => state.userToken,
        getRules: (state) => state.rules,
    },
    mutations: { setStore: (state, payload) => Object.assign(state, payload) },
    actions: {
        async setAuthToken({ commit }, { username, password }) {
            await axiosInstance
                .post("/login", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    localStorage.setItem("USER_TOKEN", response.data.token);
                    localStorage.setItem("USER_ID", response.data.userId);
                    
                    commit("setStore", { 
                        userToken: response.data.token,
                        rules: response.data.rules,
                        userId: response.data.userId,
                    });
                });
        },
        async setRules({ commit }, userId) {
            await axiosInstance
                .get("/rules",  { params: { userId: userId } })
                .then((response) => commit("setStore", { rules: response.data.rules }));
        },
        setUserToken({ commit }) {
            const token = localStorage.getItem("USER_TOKEN");
            commit("setStore", { userToken: token });
        },
        setLogOut({ commit }) {
            localStorage.clear();
            commit("setStore", { ...initialState });
        },
    },
};

export default userStore;
