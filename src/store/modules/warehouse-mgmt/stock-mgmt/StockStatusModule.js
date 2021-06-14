import Vue from 'vue';
import Vuex from 'vuex';
import {
	checkStoreStock,
	getStoreStockCheckHistory,
	getStoreStockList,
} from '../../../../api/warehouse-mgmt/stock-mgmt/StockStatusApi';

Vue.use(Vuex);

const StockStatusModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		totalCnt: 0,
		listData: [],
		deviceHistory: [],
		chkFullBarcode: '',
		checkStoreStockChk: false,
		filterData: {
			telecom: '',
			inStockRegiDate: '',
			storeStockCheckDate: '',
			nextStockId: '',
			statusStr: '',
			maker: '',
			goodsId: '',
			capacity: '전체',
			colorName: '전체',
			inStockStatus: '',
			productFaultyYn: '',
			extrrStatus: '',
			barcode: '',
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
	getters: {},
	mutations: {
		filterInit(state) {
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.capacity = '전체';
			state.filterData.colorName = '전체';
		},
		setList(state, result) {
			state.listData = result.data.data.resultList || [];
			state.totalCnt = result.data.data.totalCnt || 0;
			state.pagingData.perPageCnt = result.data.data.perPageCnt || 0;
			state.pagingData.pageNo = result.data.data.pageNo || 0;
			state.pagingData.pageNumList = result.data.data.pageNumList || [];
			state.pagingData.pageLastNo = result.data.data.pageLastNo || 0;
			state.pagingData.pageEndNo = result.data.data.pageEndNo || 0;

			if (result.checkStoreStockChk) {
				// 재고조회시 0번지 list에 구분자 추가
				state.listData[0].checkStoreStockChk = result.checkStoreStockChk;
			}
		},
		setDeviceHistory(state, data) {
			state.deviceHistory = data.data.data || [];
		},
		setCheckStoreStock(state) {
			state.checkStoreStockChk = true;
		},
	},
	actions: {
		async getList({ commit }, data) {
			try {
				if (data.data && data.data.capacity === '전체') {
					data.data.capacity = '';
				}
				if (data.data && data.data.colorName === '전체') {
					data.data.colorName = '';
				}
				const result = await getStoreStockList(data.data);
				if (result) {
					result.checkStoreStockChk = data.checkStoreStockChk;
					commit('setList', result);
					if (data.data && data.data.capacity === '') {
						data.data.capacity = '전체';
					}
					if (data.data && data.data.colorName === '') {
						data.data.colorName = '전체';
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getStoreStockCheckHistory({ commit }, data) {
			try {
				let result = await getStoreStockCheckHistory(data);
				if (result) {
					commit('setDeviceHistory', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async checkStoreStock({ commit }, data) {
			try {
				let result = await checkStoreStock(data);
				if (result && result.data.resultCode === '0000') {
					alert('조회완료 됐습니다.');
					commit('setCheckStoreStock');
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default StockStatusModule;
