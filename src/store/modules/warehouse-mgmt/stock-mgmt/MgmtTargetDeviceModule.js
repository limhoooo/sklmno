import Vue from 'vue';
import Vuex from 'vuex';
import {
	getMgmtTargetDevicePage,
	insertMediationOut,
} from '../../../../api/warehouse-mgmt/stock-mgmt/MgmtTargetDeviceApi.js';
import {getRetrieveDeviceHistory} from '../../../../api/common/common.js';

Vue.use(Vuex);

const MgmtTargetDeviceModule = {
	namespaced: true,
	state: {
		detailDialog: false,
		mediationDialog: false,
		totalCnt: 0,
		listData: [],
		detailData: [],
		detailHistory: [],
		mediationFormData: {
			dvcId: '',
			mediationOutDate: '',
			mediationOutMemo: '',
		},
		filterData: {
			telecom: '',
			inStockStratRegiDate: '',
			inStockEndRegiDate: '',
			moveStartRegiDate: '',
			moveEndRegiDate: '',
			stockType: '',
			makerId: '',
			goodsName: '전체',
			capacity: '전체',
			colorName: '전체',
			barcode: '',
			inStockStatus: '',
			openingHistYn: '',
			eosYn: '',
			perPageCnt: 20,
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
	},
	mutations: {
		setGetListData(state, result) {
			state.listData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		setDeviceHistory(state, result) {
			state.detailHistory = [];
			state.detailHistory = result.data.data;
		},
	},
	actions: {
		async getMgmtTargetDevicePage({ commit }, data) {
			try {
				if (data && data.goodsName === '전체') {
					data.goodsName = '';
				}
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				const result = await getMgmtTargetDevicePage(data);
				if (result) {
					commit('setGetListData', result);
					if (data && data.goodsName === '') {
						data.goodsName = '전체';
					}
					if (data && data.capacity === '') {
						data.capacity = '전체';
					}
					if (data && data.colorName === '') {
						data.colorName = '전체';
					}
				}

			} catch (e) {
				console.log(e);
			}
		},
		async getRetrieveDeviceHistory({ commit }, data) {
			try {
				let result = await getRetrieveDeviceHistory(data);
				if (result) {
					commit('setDeviceHistory', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertMediationOut({ commit }, data) {
			try {
				let result = await insertMediationOut(data);
				if (result.data.resultCode === '0000') {
					alert('저장되었습니다.');
					return true;
				} else {
					alert(result.data.resultMsg);
				}
			} catch (e) {
				console.log(e);
				return false;
			}
		},
	},
};

export default MgmtTargetDeviceModule;
