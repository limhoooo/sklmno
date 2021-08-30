import Vue from 'vue';
import Vuex from 'vuex';
import { getStatisticsList } from '../../../../api/supply-chain-mgmt/stats-mgmt/StatsMgmtApi.js';

Vue.use(Vuex);

const StatsMgmtModule = {
	namespaced: true,
	state: {},
	mutations: {},
	actions: {
		async getStatisticsList({ commit }) {},
	},
};

export default StatsMgmtModule;
