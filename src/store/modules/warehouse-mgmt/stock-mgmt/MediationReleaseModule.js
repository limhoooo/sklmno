import Vue from 'vue';
import Vuex from 'vuex';
import { getMadiationOutPage } from '../../../../api/warehouse-mgmt/stock-mgmt/MediationReleaseApi';
import { getRetrieveDeviceHistory } from '../../../../api/common/common';

Vue.use(Vuex);

const MediationReleaseModule = {
	namespaced: true,
	state: {
		detailDialog: false,
		totalCnt: 0,
		listData: [],
		detailData: [],
		deviceHistory: [],
		filterData: {
			telecom: '',
			inStockStartRegiDate: '',
			inStockEndRegiDate: '',
			moveStartRegiDate: '',
			moveEndRegiDate: '',
			statusStr: '',
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
		setList(state, result) {
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
		async getMadiationOutPage({ commit }, data) {
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
				const result = await getMadiationOutPage(data);
				if (result) {
					commit('setList', result);
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
	},
};

export default MediationReleaseModule;
