import Vue from 'vue';
import Vuex from 'vuex';
import {
	getList,
	insertTask,
} from '../../../api/common/task-history/TaskHistory';
import { commonCodeEnumList } from '../../../api/common/common';

Vue.use(Vuex);

const TaskHistoryModule = {
	namespaced: true,
	state: {
		activeAccordion: false,
		taskHistoryList: [],
		statusList: [],
	},
	getters: {},
	mutations: {
		setList(state, result) {
			state.taskHistoryList = result || [];
		},
		setStatusList(state, result) {
			state.statusList = result || [];
		},
		filterInit(state) {
			for (const data in state.filterData) {
				state.filterData[data] = '';
			}
		},
	},
	actions: {
		async getHistoryList({ commit }, data) {
			try {
				const result = await getList(data);
				if (result) {
					commit('setList', result.data.data);
				}
			} catch (e) {
				console.log(e);
			}
		},

		async getStatusList({ commit }, data) {
			try {
				const result = await commonCodeEnumList(data);
				if (result) {
					commit('setStatusList', result.data.data);
				}
			} catch (e) {
				console.log(e);
			}
		},

		async insertTask({ commit }, data) {
			try {
				const result = await insertTask(data);
				if (result.data.resultCode === '0000') {
					return true;
				} else {
					alert(result.data.resultMsg);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default TaskHistoryModule;
