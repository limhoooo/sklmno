import Vue from 'vue';
import Vuex from 'vuex';
import {
    deleteList,
    getMoveAndTrnsList,
    insertSellMove,
    updateSellMove,
} from '../../../../../api/warehouse-mgmt/device-mgmt/StockMoveTransfer/SalesMoveApi.js';
import {commonCodeListFnc} from '../../../../../common/common';

Vue.use(Vuex);

const SalesMoveModule = {
	namespaced: true,
	state: {
		totalCnt: 0,
		allCheckedBox: '',
		checkListIdArray: [],
		infoDialog: false,
		getListData: [],
		formData: {
			deliveryType: 'PS',
			cusName: '',
			cusPhone1: '',
			cusPhone2: '',
			cusPhone3: '',
			barcode: '',
			usimFullBarcode: '',
			zipCode: '',
			addr1: '',
			addr2: '',
			courier: '',
			invoiceNo: '',
			deliveryMemo: '',
			perPageCnt: 20,
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		codeList: {
			courierItems: [],
		},
	},
	getters: {},
	mutations: {
		fiterInit(state) {
			state.formData.deliveryType = 'PS';
			state.formData.cusName = '';
			state.formData.cusPhone1 = '';
			state.formData.cusPhone2 = '';
			state.formData.cusPhone3 = '';
			state.formData.barcode = '';
			state.formData.usimFullBarcode = '';
			state.formData.zipCode = '';
			state.formData.addr1 = '';
			state.formData.addr2 = '';
			state.formData.courier = '';
			state.formData.invoiceNo = '';
			state.formData.deliveryMemo = '';
		},
		setCommonCodeList(state, result) {
			state.codeList.courierItems = result.codeList.COURIER;
		},
		getListSet(state, result) {
			state.getListData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
	},
	actions: {
		async insertList({ commit }, data) {
			try {
				const result = await insertSellMove(data);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
					} else {
						alert('등록 되었습니다.');
					}
				}
			} catch (e) {
				console.log(e);
			}
		},

		async deleteList({ commit }, data) {
			try {
				if (data.length === 0)
					return alert('삭제 할 기기정보를 선택해주십시오.');
				const checklist = {
					moveStockId: data,
				};
				const conText = '삭제하시겠습니까?';
				if (confirm(conText) === true) {
					const result = await deleteList(checklist);
					if (result.data.status === 200) {
						if (result.data.data.length !== 0) {
							console.log(result.data.data);
							alert(`${result.data.data.length}개의 삭제가 실패하였습니다.`);
							return;
						}
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
		async commonCodeList({ commit }) {
			try {
				let data = { code: ['COURIER'] };
				const result = await commonCodeListFnc(data);
				if (result) {
					commit('setCommonCodeList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getList({ commit }, data) {
			const result = await getMoveAndTrnsList(data);
			if (result) {
				commit('getListSet', result);
			}
		},
		async updateInfoList({ commit }, data) {
			const result = await updateSellMove(data);
			if (result) {
				alert('수정 되었습니다.');
			} else {
				alert('알수없는 오류가 발생했습니다.');
			}
		},
	},
};

export default SalesMoveModule;
