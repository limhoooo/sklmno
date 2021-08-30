import Vue from 'vue';
import Vuex from 'vuex';
import {
	getList,
	getLongTimeStoreStockAlarm,
	setLongTimeStoreStockAlarm,
} from '../../../../api/warehouse-mgmt/stock-mgmt/LongtimeStockApi';
import { getRetrieveDeviceHistory } from '../../../../api/common/common';

Vue.use(Vuex);

const LongtimeStockModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		notiDialog: false,
		totalCnt: 0,
		listData: [],
		deviceHistory: [],
		alarmData: [],
		filterData: {
			telecom: '',
			inStockRegiDate: '',
			moveStockRegiDate: '',
			provId: '',
			nextStockId: '',
			statusStr: '',
			maker: '',
			goodsName: '전체',
			capacity: '전체',
			colorName: '전체',
			inStockStatus: '',
			productFaultyYn: '',
			extrrStatus: '',
			barcode: '',
			orderMoveDate: '',
			perPageCnt: 20,
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		// 기기 외장상태
	},
	getters: {},
	mutations: {
		filterInit(state) {
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.orderMoveDate = 'ASC';
			state.filterData.goodsName = '전체';
			state.filterData.capacity = '전체';
			state.filterData.colorName = '전체';
		},
		setList(state, result) {
			state.listData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		setDeviceHistory(state, data) {
			state.deviceHistory = data.data.data;
		},
		setLongTimeStoreStockAlarm(state, data) {
			state.alarmData = data.data.data;
		},
	},
	actions: {
		async getList({ commit }, data) {
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
				const result = await getList(data);
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
		async setLongTimeStoreStockAlarm({ commit }, data) {
			try {
				const result = await setLongTimeStoreStockAlarm(data);
				if (result) {
					alert('저장되었습니다.');
					return true;
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
		async getLongTimeStoreStockAlarm({ commit }, data) {
			try {
				let result = await getLongTimeStoreStockAlarm(data);
				if (result) {
					commit('setLongTimeStoreStockAlarm', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default LongtimeStockModule;
