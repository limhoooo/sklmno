import Vue from 'vue';
import Vuex from 'vuex';
import {getMoveStatusList} from '../../../../api/warehouse-mgmt/device-mgmt/MoveStatusApi.js';
import {getRetrieveDeviceHistory} from '../../../../api/common/common';
import {excelDownLoad} from '../../../../api/common/common.js';
import {commonCodeEnumList} from '@/api/warehouse-mgmt/device-mgmt/NormalInStockApi';

Vue.use(Vuex);

const MoveStatusModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		totalCnt: 0,
		// allCheckedBox: '',
		// checkListIdArray: [],
		moveStatusList: [],
		deviceHistory: [],
		deviceOpenHistory: [],
		filterData: {
			telecom: '',
			prevStockId: '',
			prevStockName: '',
			stockIds: '',
			stockType: '',
			provIds: '',
			openingHistoryStoreIds: '',
			maker: '',
			goodsName: '전체',
			capacity: '전체',
			colorName: '전체',
			inStockStatus: '',
			productFaultyYn: '',
			extrrStatus: '',
			deliveryType: '',
			deliveryStatus: '',
			goodsType: '',
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
		enumCodeList: {},
	},
	getters: {},
	mutations: {
		filterInit(state) {
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.goodsName = '전체';
			state.filterData.capacity = '전체';
			state.filterData.colorName = '전체';
		},
		setList(state, result) {
			state.moveStatusList = result.data.data.resultList;
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
		setUsimTypeItems(state, data) {
			state.enumCodeList.goodsTypeItems = [];
			state.enumCodeList.goodsTypeItems = data.data.data.GoodsType;
			state.enumCodeList.goodsTypeItems.unshift({ name: '전체', value: '' });
		},
	},
	actions: {
		// 기기현황 리스트 조회
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
				const result = await getMoveStatusList(data);
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
		// 이력 리스트 조회
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
		async excelDownLoad({ commit }, data) {
			await excelDownLoad(data);
		},
		async commonCodeEnumList({ commit }) {
			let data = { initEnumData: ['GoodsType'] };
			const result = await commonCodeEnumList(data);
			if (result) {
				commit('setUsimTypeItems', result);
			}
		},
	},
};
export default MoveStatusModule;
