import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreList } from '../../../../api/common-mgmt/businessman-mgmt/OpeningStoreMgmtApi';

Vue.use(Vuex);

const OpeningStoreMgmtModule = {
	namespaced: true,
	state: {
		regiDialog: false,
		infoDialog: false,
		openingStoreData: [],
		storeSelectList: [],
		dateResetData: false,
		totalCnt: 0,
		storeId: 1,
		// pageNumList: [],
		filterData: {
			openStoreName: '', // 개통점명
			parentStoreId: 0,
			telecom: [5, 6, 7],
			bizNo: '',
			chargerName: '',
			chargerPhone: '',
			returnAddr: '',
			useYn: 'all',
			srhStartDate: '',
			srhEndDate: '',
			telecomAll: [0],
			perPageCnt: '20',
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
			useYn: [
				{ name: '전체', value: 'all' },
				{ name: 'Y', value: 'Y' },
				{ name: 'N', value: 'N' },
			],
		},
	},
	getters: {},
	mutations: {
		filterInit(state) {
			state.filterData.openStoreName = '';
			state.filterData.telecomAll = '0';
			state.filterData.telecom = [5, 6, 7];
			state.filterData.bizNo = '';
			state.filterData.chargerPhone = '';
			state.filterData.returnAddr = '';
			state.filterData.useYn = 'all';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.openingStoreData = [];
			state.openingStoreData = result.data.data.resultList || [];
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
	},
	// 개통점 리스트 조회
	actions: {
		async getList({ commit }, data) {
			try {
				const result = await getStoreList(data);
				if (result) {
					commit('setList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};
export default OpeningStoreMgmtModule;
