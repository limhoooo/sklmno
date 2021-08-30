import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import {
	filterData,
	listData,
	pagingData,
} from '@/store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import {
	getSellCurrentPage,
	updateDocTargetYn,
} from '../../../../api/supply-chain-mgmt/sell-status/SellStatusApi';
import { resultApiData } from '@/store/interface/warehouse-mgmt/interface';
// @ts-ignore
import { commonCodeEnumList } from '../../../../api/common/common';
import {
	getOpeningStoreList,
	getSaleStoreList,
} from '../../../../api/supply-chain-mgmt/application-form-creation/ApplicationFromApi';

Vue.use(Vuex);

interface State {
	quickOpeningDialog: boolean;
	cancelQuick: boolean;
	memoDialog: boolean;
	sellCurrentPageList: listData[];
	totalCnt: number;
	filterData: filterData;
	pagingData: pagingData;
	statusList: any;
	saleStoreList: any;
	openingStoreList: any;
	dateResetData: any;
	checkListIdArray: any;
	allCheckedBox: any;
}

const state: State = {
	allCheckedBox: '',
	checkListIdArray: [],
	quickOpeningDialog: false,
	cancelQuick: false,
	memoDialog: false,
	sellCurrentPageList: [],
	totalCnt: 0,
	filterData: {
		perPageCnt: 20,
		taskStatus: '',
		goodsName: '',
		capacity: '',
		colorName: '',
		OpeningTaskStatus: '',
		ConsultTaskStatus: '',
		LogisticsTaskStatus: '',
		saleStoreId: '',
		openingStoreId: '',
		JoinType: '',
		telecom: '',
		existTelecom: '',
		applIds: '',
	},
	statusList: [],
	saleStoreList: [],
	openingStoreList: [],
	pagingData: {
		pageNo: 0,
		pageLastNo: 0,
		pageEndNo: 0,
		perPageCnt: 20,
		pageNumList: [],
	},
	dateResetData: false,
};
const getters = {};
const mutations = {
	filterInit(state: State) {
		for (const data in state.filterData) {
			// @ts-ignore
			state.filterData[data] = '';
		}
		state.filterData.perPageCnt = 20;
		state.filterData.goodsName = '전체';
		state.filterData.capacity = '전체';
		state.filterData.colorName = '전체';
		state.dateResetData = !state.dateResetData;
		state.openingStoreList = [];
	},
	setList(state: State, result: resultApiData) {
		state.sellCurrentPageList = result.resultList || [];
		state.totalCnt = result.totalCnt || 0;
		state.pagingData.perPageCnt = result.perPageCnt || 0;
		state.pagingData.pageNo = result.pageNo || 0;
		state.pagingData.pageNumList = result.pageNumList || [];
		state.pagingData.pageLastNo = result.pageLastNo || 0;
		state.pagingData.pageEndNo = result.pageEndNo || 0;
	},
	setStatusList(state: State, result: any) {
		state.statusList = result || [];
	},
	setSaleStoreList(state: State, result: any) {
		state.saleStoreList = result || [];
	},
	setOpeningStoreList(state: State, result: any) {
		state.openingStoreList = result || [];
		state.openingStoreList.unshift({ openStoreName: '전체', openStoreId: '' });
	},
};
const actions = {
	async getSellCurrentPage(
		{ commit }: ActionContext<State, State>,
		data: filterData,
	) {
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
			const result = await getSellCurrentPage(data);
			if (result) {
				commit('setList', result.data.data);
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
	async getStatusList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await commonCodeEnumList(data);
			if (result) {
				commit('setStatusList', result.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getSaleStoreList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await getSaleStoreList(data);
			if (result) {
				commit('setSaleStoreList', result.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getOpeningStoreList(
		{ commit }: ActionContext<State, State>,
		data: any,
	) {
		try {
			const result = await getOpeningStoreList(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					return false;
					//alert(result.data.resultMsg);
				} else {
					commit('setOpeningStoreList', result.data.data);
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async updateDocTargetYn({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await updateDocTargetYn(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					return false;
				} else {
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
};
const SellStatusModule = {
	namespaced: true,
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
};
export default SellStatusModule;
