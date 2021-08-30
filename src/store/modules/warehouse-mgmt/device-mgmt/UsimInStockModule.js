import Vue from 'vue';
import Vuex from 'vuex';
import { commonCodeListFnc } from '@/common/common';
import {
	getGoodsSelectCapacityList,
	getUsimSelectList,
} from '../../../../api/common/common.js';
import {
	deleteList,
	getWaitInStockUsimList,
	insertList,
	insertWaitList,
} from '../../../../api/warehouse-mgmt/device-mgmt/UsimInStockApi.js';

Vue.use(Vuex);

const UsimInStockModule = {
	namespaced: true,
	state: {
		allCheckedBox: '',
		uploadDialog: false,
		listData: [],
		modelListData: [],
		checkListIdArray: [],
		formData: {
			provId: null,
			telecom: null,
			stockId: null,
			usimBarcode: null,
			usimName: null,
			usimType: null,
		},
		codeList: {
			telecomItems: [],
			provItems: [],
			stockListItems: [],
			usimItems: [],
			usimTypeItems: [],
		},
	},
	mutations: {
		setCommonCodeList(state, data) {
			state.codeList.telecomItems = data.codeList.TELECOM;
			state.codeList.provItems = data.provList;
			state.codeList.stockListItems = data.stockList;
		},
		async usimItemsSet(state, result) {
			state.codeList.usimItems = [];
			state.codeList.usimTypeItems = [];
			state.codeList.usimItems = result.data.data;
			state.formData.usimName = result.data.data[0].goodsId;
		},
		goodsCapacitySet(state, result) {
			state.codeList.usimTypeItems = result.data.data;
			state.formData.usimType = result.data.data[0].capacity;
		},
		setListData(state, result) {
			state.listData = result.data.data.inStockWaitDtoList;
			state.modelListData = result.data.data.inStockWaitGroupDtoList;
		},
	},
	actions: {
		// 겟 코드리스트
		async getCommonCodeList({ commit }) {
			try {
				let data = { code: ['TELECOM'], initData: ['provList', 'stockList'] };
				const result = await commonCodeListFnc(data);
				if (result) {
					commit('setCommonCodeList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		// 입고
		async insertList({ commit }, formData) {
			try {
				const result = await insertList(formData);
				if (result.data.status === 200) {
					alert('입고되었습니다.');
				}
				// null 체크
			} catch (e) {
				console.log(e);
				alert(`알수없는 오류가 발생했습니다.`);
			}
		},
		// 입고대기등록
		async insertWaitList({ commit }, formData) {
			try {
				const result = await insertWaitList(formData);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
						if (result.data.resultMsg === '동일한 기기가 존재합니다') {
							return;
						}
					}
				}
			} catch (e) {
				console.log(e);
				alert(`알수없는 오류가 발생했습니다.`);
			}
		},
		// 삭제
		async deleteList({ commit }, data) {
			try {
				if (data.length === 0)
					return alert('삭제 할 기기정보를 선택해주십시오.');
				const checklist = {
					waitId: data,
				};
				const conText = '삭제하시겠습니까?';
				if (confirm(conText) === true) {
					const result = await deleteList(checklist);
					if (result.data.status === 200) {
						alert('삭제되었습니다.');
						return true;
					} else {
						alert(`알수없는 오류가 발생했습니다.`);
						return false;
					}
				}
			} catch (error) {
				console.log(error);
				alert(`알수없는 오류가 발생했습니다.`);
			}
		},
		// 유심명 조회
		async getUsimSelectList({ commit }, data) {
			const result = await getUsimSelectList(data);
			if (result) {
				commit('usimItemsSet', result);
			}
		},
		// 상품 용량 셀렉트 목록 조회
		async getGoodsSelectCapacityList({ commit }, data) {
			const result = await getGoodsSelectCapacityList(data);
			if (result) {
				commit('goodsCapacitySet', result);
			}
		},
		// 유심 리스트콜
		async getWaitInStockUsimList({ commit }, data) {
			const result = await getWaitInStockUsimList(data);
			if (result) {
				commit('setListData', result);
			}
		},
	},
};

export default UsimInStockModule;
