import Vue from 'vue';
import Vuex from 'vuex';
import {
	commonCodeListFnc,
	nullValidation,
} from '../../../../common/common.js';
import {
	deleteList,
	getList,
	insertInStockWaitExcel,
	insertInStockWaitExcelException,
	insertList,
	insertWaitList,
} from '../../../../api/warehouse-mgmt/device-mgmt/OpenInStockApi.js';
import {
	getDeviceColorList,
	getGoodsSelectCapacityList,
	getGoodsSelectList,
	selectCodeList,
} from '../../../../api/common/common.js';
import bus from '@/common/bus';

Vue.use(Vuex);

const OpenInStockModule = {
	namespaced: true,
	state: {
		allCheckedBox: '',
		checkListIdArray: [],
		MissDialog: false,
		registDialog: false,
		excelUploadDialog: false,
		getModelListData: [],
		getListData: [],
		formData: {
			provId: null,
			telecom: null,
			stockId: null,
			goodsId: null,
			barcode: null,
			inStockStatus: 'OPEN',
			productFaultyYn: 'N',
			extrrStatus: 'T',
			productMissYn: 'N',
			ddctAmt: null,
			missProduct: null,
			addDdctAmt: null,
			capacity: null,
			colorName: null,
			unLockYn: null,
			inStockMemo: null,
			ddctReleaseAmtYn: 'N',
			barcodeType: 'K',
			inStockType: 'INSTOCK_TYPE_01',
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
			state.formData.barcode = '';
			state.formData.unLockYn = null;
			state.formData.inStockMemo = null;
			state.checkListIdArray = [];
		},
		deviceColorList(state, result) {
			state.codeList.colorItems = result.data.data;
		},
		goodsItemsSet(state, result) {
			state.codeList.goodsItems = result.data.data;
		},
		goodsCapacitySet(state, result) {
			state.codeList.capacityItems = result.data.data;
		},
		getListDataSet(state, result) {
			state.getListData = result.data.data.inStockWaitDtoList;
			state.getModelListData = result.data.data.inStockWaitGroupDtoList;
		},
		resultListInit(state) {
			state.getListData = [];
			state.formData.inStockMemo = '';
			state.formData.missProduct = '';
			state.formData.addDdctAmt = '';
			state.formData.ddctAmt = '';
			state.formData.productMissYn = '';
		},
		setCommonCodeList(state, data) {
			state.codeList.telecom = data.codeList.TELECOM;
			state.codeList.prov = data.provList;
			state.codeList.stock = data.stockList;
		},
		selectListSet(state, data) {
			state.codeList.stock = data.data.data;
		},
	},
	actions: {
		// 공통코드 리스트콜
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
		// 입고등록
		async insertList({ commit }, formData) {
			try {
				const result = await insertList(formData);
				if (result.data.status === 200) {
					alert('입고되었습니다.');
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
				// null 체크
			} catch (e) {
				alert(`입고 데이터가 없습니다.`);
			}
		},
		/* 입고 정보등록 */
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
								'inStockType',
							])
						) {
							return;
						}
						return;
					}
					alert('입고되었습니다.');
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
				// null 체크
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
			}
		},
		// 셀렉트 코드리스트콜
		async selectCodeList({ commit }, data) {
			const result = await selectCodeList(data);
			if (result) {
				commit('selectListSet', result);
			}
		},
		// 기기명 셀렉트 리스트콜
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

export default OpenInStockModule;
