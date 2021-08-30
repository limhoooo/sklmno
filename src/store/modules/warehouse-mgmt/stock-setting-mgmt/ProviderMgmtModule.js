import Vue from 'vue';
import Vuex from 'vuex';
import {
	deleteProvider,
	getProviderList,
	insertProviderFnc,
	updateProvider,
	updateProviderUse,
} from '../../../../api/warehouse-mgmt/stock-setting-mgmt/ProviderMgmtApi';

Vue.use(Vuex);
const ProviderMgmtModule = {
	namespaced: true,
	state: {
		infoDialog: false,
		regiDialog: false,
		dialogData: [],
		providerListData: [],
		totalCnt: 0,
		checkListIdArray: [],
		dateBtn: 'all',
		allCheckedBox: '',
		filterData: {
			provId: '',
			chargerName: '',
			chargerPhone: '',
			chargerEmail: '',
			useYn: 'all',
			returnAddr: '',
			perPageCnt: 20,
			srhStartDate: '',
			srhEndDate: '',
		},
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
		providerListDataSet(state, result) {
			state.providerListData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		resultListInit(state) {
			state.providerListData = [];
			state.checkListIdArray = [];
			state.allCheckedBox = '';
		},
		closeDialog(state, name) {
			if (name === 'infoDialog') {
				state.infoDialog = false;
			} else if (name === 'regiDialog') state.regiDialog = false;
		},
		filterInit(state) {
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.useYn = 'all';
		},
	},
	actions: {
		// 공급처 조회
		async getProviderList({ commit }, data) {
			try {
				commit('resultListInit');
				let result = await getProviderList(data);
				if (result) {
					commit('providerListDataSet', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		// 공급처 등록
		async insertProvider({ commit }, formData) {
			try {
				const result = await insertProviderFnc(formData);
				if (result && result.data.resultCode === '0000') {
					alert('등록되었습니다.');
					commit('closeDialog', 'regiDialog');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
				// null 체크
			} catch (e) {
				console.log(e);
			}
		},
		// 공급처 삭제
		async deleteProvider({ commit }, data) {
			try {
				if (data.length === 0) return alert('삭제 할 공급처를 선택해주십시오.');
				const checklist = {
					delProvId: data,
				};
				const conText = '삭제하시겠습니까?';
				if (confirm(conText) === true) {
					const result = await deleteProvider(checklist);
					if (result && result.data.resultCode === '0000') {
						alert('삭제되었습니다.');
						return true;
					} else {
						alert(`알수없는 오류가 발생했습니다.`);
						return false;
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		// 공급처 수정
		async updateProvider({ commit }, data) {
			try {
				const result = await updateProvider(data);
				if (result && result.data.resultCode === '0000') {
					alert('수정되었습니다.');
					commit('closeDialog', 'infoDialog');
					return true;
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
					return false;
				}
				// null 체크
			} catch (e) {
				console.log(e);
			}
		},
		// 공급처 사용여부 수정
		async updateStoreUse({ commit }, data) {
			try {
				const result = await updateProviderUse(data);
				if (result && result.data.resultCode === '0000') {
				} else {
					alert('수정 실패했습니다.');
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};

export default ProviderMgmtModule;
