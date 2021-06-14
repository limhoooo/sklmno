import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import {filterData, listData, pagingData,} from '@/store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import {getList} from '../../../../api/supply-chain-mgmt/sell-status/SellStatusApi';
import {resultApiData} from '@/store/interface/warehouse-mgmt/interface';

Vue.use(Vuex);

interface State {
	quickOpeningDialog: boolean;
	sellStatusList: listData[];
	totalCnt: number;
	filterData: filterData;
	pagingData: pagingData;
}

const state: State = {
	quickOpeningDialog: false,
	sellStatusList: [
		{
			openingId: 1,
		},
	],
	totalCnt: 0,
	filterData: {
		telecom: '',
		maker: '',
	},
	pagingData: {
		pageNo: 0,
		pageLastNo: 0,
		pageEndNo: 0,
		perPageCnt: 20,
		pageNumList: [],
	},
};
const getters = {};
const mutations = {
	filterInit(state: State) {
		for (const data in state.filterData) {
			// @ts-ignore
			state.filterData[data] = '';
		}
		state.filterData.telecom = '';
		state.filterData.maker = '';
		state.filterData.perPageCnt = 20;
		state.filterData.capacity = '전체';
		state.filterData.colorName = '전체';
	},
	setList(state: State, result: resultApiData) {
		state.sellStatusList = result.resultList || [];
		state.totalCnt = result.totalCnt || 0;
		state.pagingData.perPageCnt = result.perPageCnt || 0;
		state.pagingData.pageNo = result.pageNo || 0;
		state.pagingData.pageNumList = result.pageNumList || [];
		state.pagingData.pageLastNo = result.pageLastNo || 0;
		state.pagingData.pageEndNo = result.pageEndNo || 0;
	},
};
const actions = {
	async getList({ commit }: ActionContext<State, State>, data: filterData) {
		try {
			if (data && data.capacity === '전체') {
				data.capacity = '';
			}
			if (data && data.colorName === '전체') {
				data.colorName = '';
			}
			const result = await getList(data);
			if (result) {
				commit('setList', result.data.data);
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
};
const SellStatusModule = {
	namespaced: true,
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
};
export default SellStatusModule;
