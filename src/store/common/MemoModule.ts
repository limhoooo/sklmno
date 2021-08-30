import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { memoList } from '../interface/supply-chain-mgmt/interface';
import { getList, insertMemo } from '../../api/common/memo/Memo';

Vue.use(Vuex);

interface State {
	inputValue: string;
	memoList: memoList[];
	tabValue: string;
	applId: number;
}

const state: State = {
	inputValue: '',
	memoList: [],
	tabValue: 'ALL',
	applId: 0,
};

//const getters: {};
const mutations = {
	setList(state: State, result: any) {
		state.memoList = result || [];
	},
};

const actions = {
	async addList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await insertMemo(data);
			if (result.data.resultCode === '0000') {
				return true;
			} else {
				alert(result.data.resultMsg);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getMemoList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await getList(data);
			if (result) {
				commit('setList', result.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
};

const memoModule = {
	namespaced: true,
	state: state,
	// getters: getters,
	mutations: mutations,
	actions: actions,
};

export default memoModule;
