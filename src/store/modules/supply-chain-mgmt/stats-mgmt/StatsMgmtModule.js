import Vue from 'vue';
import Vuex from 'vuex';
import { getStatisticsList } from '../../../../api/supply-chain-mgmt/stats-mgmt/StatsMgmtApi.js';

Vue.use(Vuex);

const StatsMgmtModule = {
	namespaced: true,
	state: {
		formData: {
			srhStartDate: '',
			srhEndDate: '',
			telecomId: '',
		},
		totalList: [],
		openStoreList: [],
		saleStoreList: [],
		storeId: '',
	},
	mutations: {
		statisticsSet(state, result) {
			result.data.data.totConsultCancel = String(
				result.data.data.totConsultCancel,
			).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.data.data.totConsultCompl = String(
				result.data.data.totConsultCompl,
			).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.data.data.totOpeningCancel = String(
				result.data.data.totOpeningCancel,
			).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.data.data.totOpeningCompl = String(
				result.data.data.totOpeningCompl,
			).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.data.data.totOpeningDmnd = String(
				result.data.data.totOpeningDmnd,
			).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			result.data.data.totOpeningProg = String(
				result.data.data.totOpeningProg,
			).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			state.totalList = result.data.data;
			state.saleStoreList = result.data.data.saleStoreList;
			state.openStoreList = result.data.data.openStoreList;
		},
	},
	actions: {
		async getStatisticsList({ commit }, data) {
			try {
				const result = await getStatisticsList(data);
				if (result) {
					commit('statisticsSet', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default StatsMgmtModule;
