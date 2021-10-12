import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import {
	filterData,
	listData,
	pagingData,
} from '@/store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import {
	deleteBlackList,
	deleteBlackListGroup,
	getBlackDetailList,
	getList,
	insertBlack,
	updateBlackList,
} from '../../../../api/supply-chain-mgmt/black-list/BlackListApi';
import { commonCodeEnumListFnc } from '../../../../common/common';

Vue.use(Vuex);

interface State {
	blackList: listData[];
	blackTypeCount: number;
	totalCnt: number;
	statusList: any;
	groupCountList: any;
	dateResetData: any;
	filterData: filterData;
	pagingData: pagingData;
}

const state: State = {
	blackList: [],
	blackTypeCount: 0,
	totalCnt: 0,
	filterData: {
		perPageCnt: 20,
		blackType: '',
	},
	statusList: [],
	groupCountList: [],
	dateResetData: false,
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
			// @ts-ignore
		}
		state.filterData.perPageCnt = 20;
		state.dateResetData = !state.dateResetData;
	},
	setList(state: State, result: any) {
		state.blackList = result.blackPageDtoList.resultList || [];
		if (
			!result.filterData ||
			((result.filterData.blackName || result.filterData.blackName === '') &&
				!result.filterData.blackType) ||
			((result.filterData.blackPhone || result.filterData.blackPhone === '') &&
				!result.filterData.blackType) ||
			((result.filterData.srhStartDate ||
				result.filterData.srhStartDate === '') &&
				!result.filterData.blackType) ||
			((result.filterData.srhEndDate || result.filterData.srhEndDate === '') &&
				!result.filterData.blackType) ||
			((result.filterData.blackAddr || result.filterData.blackAddr === '') &&
				!result.filterData.blackType)
		) {
			// 카운트 리프레쉬
			state.totalCnt = result.blackPageDtoList.totalCnt || 0;
			state.groupCountList = result.groupCountList || [];
		}
		state.pagingData.perPageCnt = result.blackPageDtoList.perPageCnt || 0;
		state.pagingData.pageNo = result.blackPageDtoList.pageNo || 0;
		state.pagingData.pageNumList = result.blackPageDtoList.pageNumList || [];
		state.pagingData.pageLastNo = result.blackPageDtoList.pageLastNo || 0;
		state.pagingData.pageEndNo = result.blackPageDtoList.pageEndNo || 0;
	},
	setStatusList(state: State, result: any) {
		state.statusList = result || [];
	},
};
const actions = {
	async getList({ commit }: ActionContext<State, State>, data: filterData) {
		try {
			const result = await getList(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					result.data.data['filterData'] = data;
					// @ts-ignore
					commit('setList', result.data.data);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getBlackDetailList(
		{ commit }: ActionContext<State, State>,
		data: filterData,
	) {
		try {
			const result = await getBlackDetailList(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					console.log('블랙리스트 조회 오류.');
				} else {
					return result.data.data;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},

	async deleteBlackListGroup(
		{ commit }: ActionContext<State, State>,
		data: Array<number>,
	) {
		try {
			const result = await deleteBlackListGroup(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async deleteBlackList(
		{ commit }: ActionContext<State, State>,
		data: Array<number>,
	) {
		try {
			const result = await deleteBlackList(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async updateBlackList(
		{ commit }: ActionContext<State, State>,
		data: Array<number>,
	) {
		try {
			const result = await updateBlackList(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async insertBlack(
		{ commit }: ActionContext<State, State>,
		data: Array<number>,
	) {
		try {
			const result = await insertBlack(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					alert('등록 되었습니다.');
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getStatusList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await commonCodeEnumListFnc(data);
			if (result) {
				commit('setStatusList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
};
const BlackListModule = {
	namespaced: true,
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
};
export default BlackListModule;
