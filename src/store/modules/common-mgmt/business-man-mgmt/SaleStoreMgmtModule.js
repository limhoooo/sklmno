import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreList } from '../../../../api/common-mgmt/businessman-mgmt/SaleStoreMgmtApi.js';

Vue.use(Vuex);

const SaleStoreMgmtModule = {
	namespaced: true,
	state: {
		saleStoreData: [], // 영업점 데이터 리스트
		regiDialog: false, // 등록팝업 컨트롤러
		infoDialog: false,
		dateResetData: false,
		regiUrl: '',
		totalCnt: 0,
		// pageListData: ['20', '50', '100'], // 노출페이지 숫자데이터

		codeList: {
			telecom: [],
		},
		filterData: {
			saleStoreName: '',
			telecom: [],
			bizNo: '',
			chargerName: '',
			chargerPhone: '',
			returnAddr: '',
			useYn: 'all',
			srhStartDate: '',
			srhEndDate: '',
			telecomAll: '0',
			storeId: '0',
			perPageCnt: '20',
			parentStoreId: 0,
			pageNo: 1,
		},
		// 참고용 from 이전
		// filterData: {
		// 	saleStoreName: '',
		// 	telecom: [],
		// 	bizNo: '',
		// 	chargerName: '',
		// 	chargerPhone: '',
		// 	returnAddr: '',
		// 	useYn: 'all',
		// 	srhStartDate: '',
		// 	srhEndDate: '',
		// 	telecomAll: '0',
		// 	perPageCnt: '20',
		// 	pageNo: '',
		// },
		// 참고용 from 개통점관리
		// filterData: {
		// 	saleStoreName: '',
		// 	telecom: [5, 6, 7],
		// 	bizNo: '',
		// 	chargerName: '',
		// 	chargerPhone: '',
		// 	returnAddr: '',
		// 	useYn: 'all',
		// 	srhStartDate: '',
		// 	srhEndDate: '',
		// 	telecomAll: '0',
		// 	pageNo: 1,
		// },
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
		setList(state, result) {
			state.saleStoreData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		filterInit(state) {
			state.filterData.saleStoreName = '';
			state.filterData.telecom = ['5', '6', '7'];
			state.filterData.bizNo = '';
			state.filterData.chargerPhone = '';
			state.filterData.returnAddr = '';
			state.filterData.useYn = 'all';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.filterData.telecomAll = 'all';
			state.dateResetData = !state.dateResetData;
		},
	},
	actions: {
		async getList({ commit }, data) {
			try {
				this.saleStoreData = [];
				const result = await getStoreList(data);
				if (result) {
					commit('setList', result);
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};
export default SaleStoreMgmtModule;
