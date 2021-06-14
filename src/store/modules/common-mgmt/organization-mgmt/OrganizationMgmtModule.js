import Vue from 'vue';
import Vuex from 'vuex';
// import { fetchJobsList } from '../../api/organization-mgmt/OrganizationMgmtApi'
import {
	deleteOrgnzt,
	deleteUser,
	getOrgnztList,
	insertOrgnzt,
	insertUser,
	updateOrgnzt,
	updateUser,
	updateUserUse,
} from '../../../../api/common-mgmt/organization-mgmt/OrganizationMgmtApi.js';

Vue.use(Vuex);

const OrganizationMgmtModule = {
	namespaced: true,
	state: {
		teamRegiPop: false,
		teamUpdPop: false,
		userRegiPop: false,
		userInfoPop: false,
		organizationList: [],
		defaultMemberList: [],
		storeRoleList: [],
		activeGroupData: [],
		userList: [],
		filterData: {
			storeId: 0,
			name: '',
			email: '',
			phone: '',
		},
	},
	getters: {},
	mutations: {
		setOrgnztList(state, result) {
			state.organizationList = result.data.data.orgnztList;
			state.defaultMemberList = result.data.data.memberList;
			state.storeRoleList = result.data.data.storeRoleList;
		},
		closeDialog(state, name) {
			if (name === 'teamRegiPop') {
				state.teamRegiPop = false;
			} else if (name === 'teamUpdPop') {
				state.teamUpdPop = false;
			} else if (name === 'userRegiPop') {
				state.userRegiPop = false;
			} else if (name === 'userInfoPop') {
				state.userInfoPop = false;
			}
		},
		setUserList(state, newVal) {
			if (newVal.length !== 0) {
				state.userList = [];
				const hierarchy = newVal[0].hierarchy;
				const memberList = state.defaultMemberList;
				for (let i = 0; i < memberList.length; i++) {
					if (memberList[i].member.memberHierarchy.startsWith(hierarchy)) {
						state.userList.push(memberList[i]);
					}
				}
			} else {
				state.userList = state.defaultMemberList;
			}
		},
	},
	actions: {
		async getOrgnztListFnc({ commit }, data) {
			try {
				const result = await getOrgnztList(data);
				if (result) {
					commit('setOrgnztList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertOrgnztFnc({ commit }, data) {
			try {
				const result = await insertOrgnzt(data);
				if (result.data.status === 200) {
					alert('등록되었습니다.');
					commit('closeDialog', 'teamRegiPop');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async updateOrgnztFnc({ commit }, data) {
			try {
				const result = await updateOrgnzt(data);
				if (result.data.status === 200) {
					alert('수정되었습니다.');
					commit('closeDialog', 'teamUpdPop');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deleteOrgnztFnc({ commit }, data) {
			try {
				const result = await deleteOrgnzt(data);
				if (result.data.status === 200) {
					alert('삭제되었습니다.');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertUserFnc({ commit }, data) {
			try {
				const result = await insertUser(data);
				if (result.data.status === 200) {
					alert('등록되었습니다.');
					commit('closeDialog', 'userRegiPop');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async updateUserFnc({ commit }, data) {
			try {
				// null check
				const result = await updateUser(data);
				if (result.data.status === 200) {
					alert('수정됐습니다.');
					commit('closeDialog', 'userInfoPop');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deleteUserFnc({ commit }, data) {
			try {
				// null check
				const result = await deleteUser(data);
				if (result.data.status === 200) {
					alert('삭제됐습니다.');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async updateUserUseFnc({ commit }, data) {
			try {
				// null check
				const result = await updateUserUse(data);
				if (result.data.status === 200) {
					alert('승인됐습니다.');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default OrganizationMgmtModule;
