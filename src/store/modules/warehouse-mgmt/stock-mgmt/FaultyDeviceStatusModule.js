import Vue from 'vue';
import Vuex from 'vuex';
import {
	getList,
	updateJudgementStatus,
} from '../../../../api/warehouse-mgmt/stock-mgmt/FaultyDeviceStatusApi';
import { getRetrieveDeviceHistory } from '../../../../api/common/common';

Vue.use(Vuex);

const FaultyDeviceStatusModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		modifyDialog: false,
		totalCnt: 0,
		deviceHistory: [],
		listData: [],
		filterData: {
			telecom: '',
			inStockRegiDate: '',
			prevStockId: '',
			provId: '',
			statusStr: '',
			maker: '',
			goodsId: '',
			capacity: '전체',
			colorName: '',
			deliveryStatus: '',
			judgeStatus: '',
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
	},
	actions: {
		async getList({ commit }, data) {
			try {
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				const result = await getList(data);
				if (result) {
					commit('setList', result);
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
		async updateJudgementStatus({ commit }, data) {
			try {
				let result = await updateJudgementStatus(data);
				if (result) {
					alert('변경되었습니다.');
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default FaultyDeviceStatusModule;
