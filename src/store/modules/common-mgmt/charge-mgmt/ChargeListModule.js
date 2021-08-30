import Vue from 'vue';
import Vuex from 'vuex';
import { getList } from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtApi.js';

Vue.use(Vuex);

const ChargeListModule = {
	namespaced: true,
	state: {
		registDialog: false,
		infoDialog: false,
		matchingDialog: false,
		dateResetData: false,
		chargeId: [],
		getListData: [],
		totalCnt: 0,
		codeList: {
			telecom: [],
			network: [],
			useYn: [
				{ name: '전체', value: 'all' },
				{ name: 'Y', value: 'Y' },
				{ name: 'N', value: 'N' },
			],
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		filterData: {
			useYn: 'all',
			telecom: '',
			srhStartDate: '',
			srhEndDate: '',
			chargeName: '',
			telecomAll: '0',
			network: '0',
			perPageCnt: '20',
			pageNo: 1,
		},
	},
	getters: {},
	mutations: {
		filterInit(state) {
			// 초기화 버튼 클릭 메소드
			state.filterData.telecom = [5, 6, 7];
			state.filterData.telecomAll = '0';
			state.filterData.network = state.codeList.network[0].codeSeq;
			state.filterData.chargeName = '';
			state.filterData.useYn = 'all';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.getListData = result.data.data.resultList || [];
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
	},
	actions: {
		async getList({ commit }, data) {
			const result = await getList(data);
			if (result) {
				commit('setList', result);
			}
		},
	},
};
export default ChargeListModule;
