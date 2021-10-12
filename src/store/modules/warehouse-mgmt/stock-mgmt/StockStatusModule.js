import Vue from 'vue';
import Vuex from 'vuex';
import {
	checkStoreStock,
	checkStoreStockDto,
	commonCodeEnumList,
	getStoreStockCheckCount,
	getStoreStockCheckHistory,
	getStoreStockList,
} from '../../../../api/warehouse-mgmt/stock-mgmt/StockStatusApi';

Vue.use(Vuex);

const StockStatusModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		stockCheckPop: false,
		totalCnt: 0,
		listData: [],
		deviceHistory: [],
		chkFullBarcode: '',
		checkStoreStockChk: false,
		dateResetData: false,
		statusList: [],
		headerCount: [],
		filterData: {
			telecom: '',
			inStockRegiDate: '',
			storeStockCheckDate: '',
			stockManualCheckStatus: '',
			nextStockId: '',
			statusStr: '',
			maker: '',
			provId: '',
			goodsName: '전체',
			capacity: '전체',
			colorName: '전체',
			inStockStatus: '',
			goodsType: '',
			productFaultyYn: '',
			extrrStatus: '',
			barcode: '',
			stockTab: '',
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
				// if ('stockTab' !== data) {
				// 	state.filterData[data] = '';
				// }
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.goodsName = '전체';
			state.filterData.capacity = '전체';
			state.filterData.colorName = '전체';
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.listData = result.data.data.resultList || [];
			state.totalCnt = result.data.data.totalCnt || 0;
			state.pagingData.perPageCnt = result.data.data.perPageCnt || 0;
			state.pagingData.pageNo = result.data.data.pageNo || 0;
			state.pagingData.pageNumList = result.data.data.pageNumList || [];
			state.pagingData.pageLastNo = result.data.data.pageLastNo || 0;
			state.pagingData.pageEndNo = result.data.data.pageEndNo || 0;

			if (state.listData[0] && result.checkStoreStockChk) {
				// 재고조회시 0번지 list에 구분자 추가
				state.listData[0].checkStoreStockChk = result.checkStoreStockChk;
			}
		},
		setListCount(state, result) {
			state.headerCount = result.data.data;
			for (let i = 0; i < result.data.data.checkTypeCountList.length; i++) {
				state.headerCount[
					result.data.data.checkTypeCountList[i].stockCheckType + 'cnt'
				] = result.data.data.checkTypeCountList[i].stockCheckTypeCnt;
			}
			state.headerCount['NONEcnt'] =
				Number(state.headerCount['totalStoreStockCnt'] || 0) -
				(Number(state.headerCount['AUTOcnt'] || 0) +
					Number(state.headerCount['MANUALcnt'] || 0));
		},
		setDeviceHistory(state, data) {
			state.deviceHistory = data.data.data || [];
		},
		setCheckStoreStock(state) {
			state.checkStoreStockChk = true;
		},
		setCommonCodeNewList(state, data) {
			state.statusList.goodsTypeItems = [];
			state.statusList.goodsTypeItems = data.GoodsType;
			state.statusList.goodsTypeItems.unshift({ name: '전체', value: '' });
			state.statusList = data;
		},
	},
	actions: {
		async getList({ commit }, data) {
			try {
				if (data.data && data.data.goodsName === '전체') {
					data.data.goodsName = '';
				}
				if (data.data && data.data.capacity === '전체') {
					data.data.capacity = '';
				}
				if (data.data && data.data.colorName === '전체') {
					data.data.colorName = '';
				}
				const result = await getStoreStockList(data.data);
				const result2 = await getStoreStockCheckCount(data.data);
				if (result && result2) {
					result.checkStoreStockChk = data.checkStoreStockChk;
					commit('setList', result);
					commit('setListCount', result2);
					if (data.data && data.data.goodsName === '') {
						data.data.goodsName = '전체';
					}
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
				if (result && '0000' === result.data.resultCode) {
					commit('setCheckStoreStock');
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getEnumCommonCodeList({ commit }) {
			try {
				/* 신규 ENUM 데이터 */
				const newEnum = {
					initEnumData: [
						'stockCheckType',
						'stockManualCheckStatus',
						'GoodsType',
					],
				};
				const result = await commonCodeEnumList(newEnum);
				if (result) {
					commit('setCommonCodeNewList', result.data.data);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async checkStoreStockDto({ commit }, data) {
			try {
				const result = await checkStoreStockDto(data);
				if (result && '0000' === result.data.resultCode) {
					// commit('setCommonCodeNewList', result.data.data);
					return true;
				} else {
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default StockStatusModule;
