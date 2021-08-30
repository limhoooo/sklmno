import Vue from 'vue';
import Vuex from 'vuex';
import { insertReturnTrans } from '../../../../../api/warehouse-mgmt/device-mgmt/StockMoveTransfer/ReturnTransferApi.js';

Vue.use(Vuex);

const ReturnTransferModule = {
	namespaced: true,
	state: {
		getListData: [],
	},
	getters: {},
	mutations: {},
	actions: {
		async insertList({ commit }, data) {
			try {
				const result = await insertReturnTrans(data);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
					} else {
						alert('등록 되었습니다.');
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default ReturnTransferModule;
