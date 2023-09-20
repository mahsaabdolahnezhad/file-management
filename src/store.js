import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    
    usernames: [],
    tableData: [],
    tableData2: [],
    namesFromRoute2: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    SET_USERNAMES(state, usernames) {
      state.usernames = usernames;
    },
    setTableData(state, newData) {
      state.tableData = newData;

      // Update session storage whenever data changes
      window.sessionStorage.setItem("tableData", JSON.stringify(newData));
    },
    SET_TABLE_DATA(state, data) {
      state.tableData2 = data;
      sessionStorage.setItem("tableData2", JSON.stringify(data));
    },
    setNamesFromRoute2(state, names) {
      state.namesFromRoute2 = names;
    },
  },
  actions: {
    setUsernames({ commit }, usernames) {
      commit("SET_USERNAMES", usernames);
    },
    setTableData({ commit }, data) {
      commit("SET_TABLE_DATA", data);
    },
  },
  getters: {
    getTableData: (state) => state.tableData,
  },
});
