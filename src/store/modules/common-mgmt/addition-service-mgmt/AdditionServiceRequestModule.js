import Vue from 'vue';
import Vuex from 'vuex';
import { getRegReqList } from '../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceRequestApi.js';

Vue.use(Vuex);

const AdditionServiceRequestModule = {
	namespaced: true,
	state: {
		getRegReqData: [],
		dateResetData: false,
		rejectDialog: false,
		filterData: {
			telecom: '',
			telecomAll: '0',
			srhStartDate: '',
			srhEndDate: '',
			addSvcName: '',
			addSvcType: '',
			charge: '',
			reqStatus: '0',
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
		},
	},
	mutations: {
		filterInit(state) {
			state.filterData.telecom = ['5', '6', '7'];
			state.filterData.telecomAll = '0';
			state.filterData.addSvcName = '';
			state.filterData.addSvcType = '';
			state.filterData.reqStatus = '0';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			// state.filterData.charge = '';
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.getRegReqData = result.data.data.resultList;
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
export default AdditionServiceRequestModule;
