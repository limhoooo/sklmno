import Vue from 'vue';
import Vuex from 'vuex';
import {
	deleteStock,
	getStockList,
	insertStock,
	updateStock,
} from '../../../../api/warehouse-mgmt/stock-setting-mgmt/holdStoreMgmtApi';

Vue.use(Vuex);
const HoldStoreMgmtModule = {
	namespaced: true,
	state: {
		stockList: [],
		stockDeviceList: [],
		stockDeviceTableList: [],
		storeName: '',
		regiDialog: false,
		infoDialog: false,
		filterData: {
			stockId: '',
			telecom: '',
			maker: '',
			goodsName: '전체',
			capacity: '전체',
			colorName: '전체',
			fullBarcode: '',
		},
		activeGroupData: [],
	},
	getters: {},
	mutations: {
		setStockList(state, result) {
			state.stockList = result.data.data.stockList;
			state.stockDeviceList = result.data.data.stockDeviceList;
			state.storeName = result.data.data.storeName;
			// 영업점 개통점 구분
			for (let i = 0; i < state.stockList.length; i++) {
				let storeName;
				if (state.stockList[i].stockType === 'S') {
					storeName = '영업점';
				} else if (state.stockList[i].stockType === 'O') {
					storeName = '개통점';
				} else {
					storeName = '';
				}
				state.stockList[
					i
				].stockName = `${state.stockList[i].stockName} (${storeName} / ${state.stockList[i].chargerName} / ${state.stockList[i].chargerPhone})`;
			}
		},

		closeDialog(state, name) {
			if (name === 'infoDialog') {
				state.infoDialog = false;
			} else if (name === 'regiDialog') state.regiDialog = false;
		},
		filterInit(state) {
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.goodsName = '전체';
			state.filterData.capacity = '전체';
			state.filterData.colorName = '전체';
		},
		setDeviceList(state, newVal) {
			if (newVal.length !== 0) {
				state.stockDeviceTableList = [];
				const hierarchy = newVal[0].hierarchy;
				const deviceList = state.stockDeviceList;
				for (let i = 0; i < deviceList.length; i++) {
					if (deviceList[i].hierarchy.startsWith(hierarchy)) {
						state.stockDeviceTableList.push(deviceList[i]);
					}
				}
			} else {
				state.stockDeviceTableList = state.stockDeviceList;
			}
		},
	},
	actions: {
		async getStockList({ commit }, data) {
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
				const result = await getStockList(data);
				if (result) {
					commit('setStockList', result);
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
		async insertStock({ commit }, data) {
			try {
				const result = await insertStock(data);
				if (result && result.data.resultCode === '0000') {
					alert('등록되었습니다.');
					commit('closeDialog', 'regiDialog');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async updateStock({ commit }, data) {
			try {
				const result = await updateStock(data);
				if (result && result.data.resultCode === '0000') {
					alert('수정되었습니다.');
					commit('closeDialog', 'infoDialog');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deleteStock({ commit }, data) {
			try {
				const result = await deleteStock(data);
				if (result && result.data.resultCode === '0000') {
					alert('삭제되었습니다.');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default HoldStoreMgmtModule;
