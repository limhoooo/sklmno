import Vue from 'vue';
import Vuex from 'vuex';
import { getRegReqList } from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtRequestApi.js';

Vue.use(Vuex);

const ChargeRequestModule = {
	namespaced: true,
	state: {
		dateResetData: false,
		reqData: [],
		getRegReqListData: [],
		rejectDialog: false,
		delStoreId: [],
		filterData: {
			network: '0',
			telecom: [],
			telecomAll: '0',
			chargeName: '',
			reqStatus: '0',
			srhStartDate: '',
			srhEndDate: '',
			category: '',
			perPageCnt: '20',
			pageNo: '1',
		},
		totalCnt: 0,
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		codeList: {
			telecom: [],
			network: [],
			reqStatus: [
				{ name: '전체', value: 0 },
				{ name: '대기', value: 1 },
				{ name: '승인', value: 6 },
				{ name: '반려', value: 9 },
			],
		},
	},
	getters: {},
	mutations: {
		filterInit(state) {
			state.filterData.network = '0';
			state.filterData.chargeName = '';
			state.filterData.reqStatus = '0';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.filterData.category = '';
			state.filterData.telecomAll = '0';
			state.dateResetData = !state.dateResetData;
			state.filterData.telecom = ['5', '6', '7'];
		},
		setList(state, result) {
			state.getRegReqListData = result.data.data.resultList;
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
			const result = await getRegReqList(data);
			if (result) {
				commit('setList', result);
			}
		},
	},
};
export default ChargeRequestModule;
