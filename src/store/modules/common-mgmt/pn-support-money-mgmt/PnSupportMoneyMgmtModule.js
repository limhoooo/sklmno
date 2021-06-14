import Vue from 'vue';
import Vuex from 'vuex';
import {
	chargeGetList,
	deleteData,
	getHistoryList,
	getList,
	goodsGetList,
	insertData,
} from '../../../../api/common-mgmt/pn-support-money-mgmt/PnSupportMoneyMgmtApi';

Vue.use(Vuex);

const PnSupportMoneyMgmtModule = {
	namespaced: true,
	state: {
		regiDialog: false,
		infoDialog: false,
		pnSupportMoneyData: [],
		telecomData: '',
		serviceData: '',
		chargeList: [],
		goodsList: [],
		historyList: [],
	},
	getters: {},
	mutations: {
		setList(state, result) {
			state.pnSupportMoneyData = result.data.data;
		},
		setChargeList(state, result) {
			state.chargeList = result.data.data.resultList;
		},
		setGoodsList(state, result) {
			state.goodsList = result.data.data.resultList;
		},
		setHistoryList(state, result) {
			state.historyList = result.data.data.resultList;
		},
	},
	actions: {
		async getList({ commit }, data) {
			try {
				const result = await getList(data);
				if (result) {
					commit('setList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertData({ commit }, data) {
			try {
				const result = await insertData(data);
				if (result) {
					alert('등록되었습니다.');
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async chargeGetList({ commit }, data) {
			try {
				const result = await chargeGetList(data);
				if (result) {
					commit('setChargeList', result);
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async goodsGetList({ commit }, data) {
			try {
				const result = await goodsGetList(data);
				if (result) {
					commit('setGoodsList', result);
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getHistoryList({ commit }, data) {
			try {
				const result = await getHistoryList(data);
				if (result) {
					commit('setHistoryList', result);
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deleteData({ commit }, data) {
			try {
				const result = await deleteData(data);
				if (result) {
					alert('삭제되었습니다.');
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default PnSupportMoneyMgmtModule;
