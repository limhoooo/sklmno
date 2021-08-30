import Vue from 'vue';
import Vuex from 'vuex';
import { getRegReqList } from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneRequestListApi';

Vue.use(Vuex);

const MobilephoneRequestModule = {
	namespaced: true,
	state: {
		dateResetData: false,
		rejectDialog: false,
		reqData: [],
		filterData: {
			goodsName: '',
			modelName: '',
			maker: '0',
			network: '0',
			telecom: '0',
			srhStartDate: '',
			srhEndDate: '',
			reqStatus: 0,
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
			network: [],
			telecom: [],
			maker: [],
			reqStatus: [
				{ name: '전체', value: 0 },
				{ name: '대기', value: 1 },
				{ name: '승인', value: 6 },
				{ name: '반려', value: 9 },
			],
		},
		getRegReqList: [],
	},
	mutations: {
		filterInit(state) {
			state.filterData.goodsName = '';
			state.filterData.modelName = '';
			state.filterData.maker = '0';
			state.filterData.network = '0';
			state.filterData.telecom = '0';
			state.filterData.reqStatus = '0';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.getRegReqList = result.data.data.resultList;
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
			try {
				const result = await getRegReqList(data);
				if (result) {
					commit('setList', result);
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};

export default MobilephoneRequestModule;
