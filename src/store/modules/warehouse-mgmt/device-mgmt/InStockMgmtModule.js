import Vue from 'vue';
import Vuex from 'vuex';
import {
	getInStockList,
	updateInStock,
} from '../../../../api/warehouse-mgmt/device-mgmt/InStockStatusApi';
import {
	getDeviceColorList,
	getDeviceList,
	getGoodsSelectCapacityList,
	selectCodeList,
} from '../../../../api/common/common';
import { commonCodeListFnc } from '../../../../common/common';
import { excelDownLoad } from '../../../../api/common/common.js';
import { commonCodeEnumList } from '../../../../api/warehouse-mgmt/device-mgmt/NormalInStockApi.js';

Vue.use(Vuex);

const InStockMgmtModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		regiDialog: false,
		getInStockListData: [],
		checkListIdArray: [],
		totalCnt: 0,
		formData: {},
		filterData: {
			perPageCnt: 20,
			inStockStartRegiDate: '',
			inStockEndRegiDate: '',
			telecom: '',
			provIds: '',
			stockIds: '',
			statusStr: '',
			productFaultyYn: '',
			extrrStatus: '',
			inStockStatus: '',
			capacity: '',
			goodsId: '',
			maker: '',
			colorName: '',
			barcode: '',
			goodsType: '',
			pageNo: 1,
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		codeList: {
			telecom: [],
			prov: [],
			maker: [],
			stock: [],
			goodsTypeItems: [],
		},
		deviceItems: [],
		colorItems: [],
		capacityItems: [],
	},
	getters: {},
	mutations: {
		deviceSet(state, data) {
			state.deviceItems = [];
			state.deviceItems = data.data.data;
			if (state.deviceItems !== undefined) {
				state.deviceItems.unshift({ modelName: '전체', goodsId: '' });
			}
		},
		capacitySet(state, data) {
			state.capacityItems = data.data.data;
		},
		selectListSet(state, data) {
			state.codeList.stock = data.data.data;
			state.filterData.stockIds = '';
		},
		setCommonCodeList(state, data) {
			state.codeList.telecom = data.codeList.TELECOM;
			state.codeList.maker = data.codeList.MAKER;
			state.codeList.prov = data.provList;
			state.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			state.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
		},
		closeDialog(state, name) {
			if (name === 'infoDialog') {
				state.infoDialog = false;
			} else if (name === 'regiDialog') state.regiDialog = false;
		},
		getInStockListSet(state, result) {
			state.getInStockListData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		filterInit(state) {
			state.codeList.stock = [];
			state.deviceItems = [];
			state.deviceItems.unshift({ modelName: '전체', goodsId: '' });
			state.capacityItems = [];
			state.capacityItems.unshift({ capacity: '전체', value: '' });
			state.colorItems = [];
			state.colorItems.unshift({ colorName: '전체', value: '' });
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
		},
		colorSet(state, data) {
			state.colorItems = [];
			state.colorItems = data.data.data;
			state.colorItems.unshift({ colorName: '전체', value: '' });
		},
		setUsimTypeItems(state, data) {
			state.codeList.goodsTypeItems = [];
			state.codeList.goodsTypeItems = data.data.data.GoodsType;
			state.codeList.goodsTypeItems.unshift({ name: '전체', value: '' });
		},
	},
	actions: {
		async commonCodeEnumList({ commit }) {
			let data = { initEnumData: ['GoodsType'] };
			const result = await commonCodeEnumList(data);
			if (result) {
				commit('setUsimTypeItems', result);
			}
		},
		// 코드리스트 조회
		async getCommonCodeList({ commit }) {
			try {
				let data = { code: ['TELECOM', 'MAKER'], initData: ['provList'] };
				const result = await commonCodeListFnc(data);
				if (result) {
					commit('setCommonCodeList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		// 입고현황 조회
		async getInStockList({ commit }, data) {
			let result = await getInStockList(data);
			if (result) {
				commit('getInStockListSet', result);
			}
		},
		// 입고현황 수정
		async updateInStock({ commit }, data) {
			try {
				const result = await updateInStock(data);
				if (result.data.status === 200) {
					alert('수정되었습니다.');
					commit('closeDialog', 'infoDialog');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
				// null 체크
			} catch (e) {
				console.log(e);
			}
		},
		// 셀렉트 코드리스트콜
		async selectCodeList({ commit }, data) {
			const result = await selectCodeList(data);
			if (result) {
				commit('selectListSet', result);
			}
		},
		// 용량목록 코드리스트 콜
		async getCapacityList({ commit }, data) {
			const result = await getGoodsSelectCapacityList(data);
			if (result) {
				commit('capacitySet', result);
			}
		},
		// 기기목록 리스트콜
		async getDeviceList({ commit }, data) {
			const result = await getDeviceList(data);
			if (result) {
				commit('deviceSet', result);
			}
		},
		// 기기 색상 리스트콜
		async getDeviceColorList({ commit }, data) {
			const result = await getDeviceColorList(data);
			if (result) {
				commit('colorSet', result);
			}
		},
		// 공통 엑셀 다운로드
		async excelDownLoad({ commit }, data) {
			await excelDownLoad(data);
		},
	},
};

export default InStockMgmtModule;
