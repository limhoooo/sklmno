import Vue from 'vue';
import Vuex from 'vuex';
import {
	getDeviceProvInfo,
	getDeviceStock,
	getMoveAndTrnsList,
	getTransStoreList,
} from '../../../../../api/common/common.js';
import {commonCodeListFnc} from '../../../../../common/common';
import {
	innerStockList,
	selectStatusList
} from '../../../../../api/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockMoveApi';

Vue.use(Vuex);

const StockMoveFilterCommonModules = {
	namespaced: true,
	state: {
		checkListIdArray: [],
		totalCnt: 0,
		formData: {
			provId: '',
			provName: '',
			holdPlc: '',
			transStoreId: '',
			nextStockId: '',
			barcode: '',
			deliveryType: 'PS',
			courier: '',
			invoiceNo: '',
			deliveryMemo: '',
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		codeList: {
			transItems: [],
			holdItems: [],
			provItems: [],
			courierItems: [],
			moveItems: [],
		},
		optionList : [],
		getListData: [],
	},
	getters: {},
	mutations: {
		filterInit(state) {
			state.formData.holdPlc = '';
			state.formData.nextStockId = '';
			state.formData.barcode = '';
			state.formData.deliveryType = 'PS';
			state.formData.courier = '';
			state.formData.invoiceNo = '';
			state.formData.deliveryMemo = '';
			state.formData.provId = '';
			state.formData.provName = '';
			state.formData.transStoreId = '';
		},
		transItemsSet(state, result) {
			state.codeList.transItems = result.data.data;
		},
		holdItemsSet(state, result) {
			state.codeList.holdItems = result.data.data;
			state.formData.holdPlc = state.codeList.holdItems.stockName;
		},
		provItemsSet(state, result) {
			state.codeList.provItems = result.data.data;
			state.formData.provId = state.codeList.provItems.provId;
			state.formData.provName = state.codeList.provItems.provName;
		},
		setCommonCodeList(state, result) {
			state.codeList.courierItems = result.codeList.COURIER;
		},
		moveStockItemSet(state, result) {
			state.codeList.moveItems = result.data.data;
		},
		getListSet(state, result) {
			state.getListData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		setStatusList(state, result) {
			if(result.data.data.DeliveryType){
				result.data.data.DeliveryType.splice(0,1)
			}
			state.optionList = result.data.data;
		}
	},
	actions: {
		async getTransStoreList({ commit }, data) {
			const result = await getTransStoreList(data);
			if (result) {
				commit('transItemsSet', result);
			}
		},
		async getDeviceStock({ commit }, data) {
			try {
				if (data.barcode === '') {
					alert('기기 일련번호 를 입력해주세요.');
					return;
				}
				const result = await getDeviceStock(data);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
						return;
					} else {
						commit('holdItemsSet', result);
					}
				}
			} catch (e) {
				alert('알수없는 오류가 발생했습니다.');
			}
		},
		async getDeviceProvInfo({ commit }, data) {
			if (data.barcode === '') {
				return;
			}
			const result = await getDeviceProvInfo(data);
			if (result) {
				commit('provItemsSet', result);
			}
		},
		async commonCodeList({ commit }) {
			try {
				let data = { code: ['COURIER'] };
				const result = await commonCodeListFnc(data);
				if (result) {
					commit('setCommonCodeList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getStatusList({ commit }) {
			try {
				let data = {
					initEnumData: [
						'DeliveryType'
					],
				}
				const result = await selectStatusList(data);
				if (result) {
					commit('setStatusList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getList({ commit }, data) {
			const result = await getMoveAndTrnsList(data);
			if (result) {
				commit('getListSet', result);
			}
		},
		async moveStockItems({ commit }, data) {
			const result = await innerStockList(data);
			if (result) {
				commit('moveStockItemSet', result);
			}
		},
	},
};

export default StockMoveFilterCommonModules;
