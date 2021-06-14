import Vue from 'vue';
import Vuex from 'vuex';
import {nullValidation} from '../../../../common/common';
import {commonCodeListFnc} from '../../../../common/common.js';
import {
	deleteList,
	getList,
	insertInStockWaitExcel,
	insertInStockWaitExcelException,
	insertList,
	insertWaitList,
} from '../../../../api/warehouse-mgmt/device-mgmt/NormalInStockApi.js';
import {
	getDeviceColorList,
	getGoodsSelectCapacityList,
	getGoodsSelectList,
	selectCodeList,
} from '../../../../api/common/common.js';
import bus from '@/common/bus';

Vue.use(Vuex);

const NormalInStockModule = {
	namespaced: true,
	state: {
		excelUploadDialog: false,
		allCheckedBox: '',
		checkListIdArray: [],
		getModelListData: [],
		getListData: [],
		formData: {
			ddctAmt: null,
			extrrStatus: 'T',
			inStockAmt: null,
			inStockMemo: null,
			inStockStatus: 'NORMAL',
			missProduct: null,
			productFaultyYn: null,
			productMissYn: null,
			provId: null,
			telecom: null,
			stockId: null,
			goodsId: null,
			ownStoreId: null,
			capacity: null,
			colorName: null,
			addDdctAmt: null,
			unLockYn: null,
			barcode: null,
			barcodeType: 'K',
		},
		codeList: {
			telecom: [],
			prov: [],
			stock: [],
			goodsItems: [],
			colorItems: [],
			capacityItems: [],
			unLockYn: [
				{ text: '예', value: 'Y' },
				{ text: '아니오', value: 'N' },
			],
		},
	},
	getters: {},
	mutations: {
		itemsInit(state) {
			state.formData.provId = '';
			state.formData.stockId = '';
			state.formData.goodsId = '';
			state.formData.telecom = '';
			state.formData.capacity = '';
			state.formData.colorName = '';
			state.formData.barcode = '';
			state.formData.inStockMemo = '';
			state.formData.unLockYn = '';
			state.checkListIdArray = [];
		},
		goodsCapacitySet(state, result) {
			state.codeList.capacityItems = result.data.data;
		},
		deviceColorList(state, result) {
			state.codeList.colorItems = result.data.data;
		},
		goodsItemsSet(state, result) {
			state.codeList.goodsItems = result.data.data;
		},
		getListDataSet(state, result) {
			state.getListData = result.data.data.inStockWaitDtoList;
			state.getModelListData = result.data.data.inStockWaitGroupDtoList;
		},
		resultListInit(state) {
			state.getListData = [];
			state.checkListIdArray = [];
			state.allCheckedBox = '';
		},
		setCommonCodeList(state, data) {
			state.codeList.telecom = data.codeList.TELECOM;
			state.codeList.prov = data.provList;
		},
		selectListSet(state, data) {
			state.codeList.stock = data.data.data;
		},
		filterInit(state) {
			state.formData.barcode = '';
			state.formData.inStockMemo = '';
			state.formData.telecom = '';
			state.formData.provId = '';
		},
	},
	actions: {
		// 겟 코드리스트
		async getCommonCodeList({ commit }) {
			try {
				let data = { code: ['TELECOM'], initData: ['provList'] };
				const result = await commonCodeListFnc(data);
				if (result) {
					commit('setCommonCodeList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		// 리스트콜
		async getList({ commit }, data) {
			try {
				commit('resultListInit');
				let result = await getList(data);
				if (result) {
					commit('getListDataSet', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		/* 등록 */
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

		/* 입고 대기 등록 */
		async insertWaitList({ commit }, formData) {
			try {
				const result = await insertWaitList(formData);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
						if (result.data.resultMsg === '동일한 기기가 존재합니다') {
							return;
						}
						if (
							!nullValidation(formData, [
								'ddctAmt',
								'extrrStatus',
								'inStockAmt',
								'inStockMemo',
								'inStockStatus',
								'missProduct',
								'productFaultyYn',
								'productMissYn',
								'ownStoreId',
								'addDdctAmt',
								'barcodeType',
							])
						) {
							return;
						}
					} else {
						alert('입고등록 되었습니다.');
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
		// 셀렉트 리스트콜
		async selectCodeList({ commit }, data) {
			const result = await selectCodeList(data);
			if (result) {
				commit('selectListSet', result);
			}
		},
		// 상품 셀렉트 목록 조회
		async getGoodsSelectList({ commit }, data) {
			const result = await getGoodsSelectList(data);
			if (result) {
				commit('goodsItemsSet', result);
			}
		},
		// 상품 색상 목록 조회
		async getDeviceColorList({ commit }, data) {
			const result = await getDeviceColorList(data);
			if (result) {
				commit('deviceColorList', result);
			}
		},
		// 상품 용량 셀렉트 목록 조회
		async getGoodsSelectCapacityList({ commit }, data) {
			const result = await getGoodsSelectCapacityList(data);
			if (result) {
				commit('goodsCapacitySet', result);
			}
		},
		// 입고대기 등록 엑셀업로드
		async insertInStockWaitExcel({ commit }, data) {
			try {
				const result = await insertInStockWaitExcel(data);
				if (result) {
					return result.data;
				}
			} catch (e) {
				alert('등록실패했습니다.');
				bus.$emit('end:spinner');
				console.log(e);
			}
		},
		// 입고대기 익셉션 등록 엑셀로드
		async insertInStockWaitExcelException({ commit }, data) {
			try {
				const result = await insertInStockWaitExcelException(data);
				if (result) {
					const url = window.URL.createObjectURL(
						new Blob([result.data], { type: result.headers['content-type'] }),
					);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `업로드실패.xlsx`);
					document.body.appendChild(link);
					link.click();
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default NormalInStockModule;
