import Vue from 'vue';
import Vuex from 'vuex';
import { insertStockMove } from '../../../../../api/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockMoveApi.js';

Vue.use(Vuex);

const StockMoveModule = {
	namespaced: true,
	state: {
		getListData: [],
	},
	getters: {},
	mutations: {},
	actions: {
		async insertList({ commit }, data) {
			try {
				const result = await insertStockMove(data);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
						return;
					}
					alert('등록 되었습니다.');
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default StockMoveModule;
