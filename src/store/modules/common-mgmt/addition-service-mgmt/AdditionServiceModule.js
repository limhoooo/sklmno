import Vue from 'vue';
import Vuex from 'vuex';
import { getList } from '../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceMgmtApi.js';

Vue.use(Vuex);

const AdditionServiceModule = {
	namespaced: true,
	state: {
		dateResetData: false,
		reqYn: '',
		registDialog: false,
		infoDialog: false,
		getListData: [],
		filterData: {
			telecom: '',
			srhStartDate: '',
			srhEndDate: '',
			addSvcName: '',
			addSvcType: '',
			// addSvcCharge: '',
			useYn: 'all',
			telecomAll: '0',
		},
		codeList: {
			telecom: [],
			addSvcType: [],
			useYn: [
				{ name: '전체', value: 'all' },
				{ name: 'Y', value: 'Y' },
				{ name: 'N', value: 'N' },
			],
		},
		totalCnt: 0,
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
	},
	mutations: {
		filterInit(state) {
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.filterData.addSvcName = '';
			state.filterData.useYn = 'all';
			state.filterData.telecomAll = '0';
			state.filterData.telecom = ['5', '6', '7'];
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.getListData = result.data.data.resultList;
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
export default AdditionServiceModule;
