import Vue from 'vue';
import Vuex from 'vuex';
import {
	getDeviceInfo,
	getReturnStockList,
	insertReturnStock,
	insertReturnStockExcel,
	insertReturnStockExcelException,
} from '../../../../api/warehouse-mgmt/device-mgmt/MoveStockRtngudApi';
import {commonCodeListFnc} from '../../../../common/common';
import {getRetrieveDeviceHistory} from '../../../../api/common/common';
import bus from '@/common/bus';

Vue.use(Vuex);
const MoveStockRtngudModule = {
	namespaced: true,
	state: {
		overlapDevicePop: false,
		infoDialog: false,
		regiDialog: false,
		excelUploadDialog: false,
		totalCnt: 0,
		deviceInfo: {},
		deviceInfoChk: false,
		moveStockList: [],
		deviceHistory: [],
		filterData: {
			telecom: '',
			inStockRegiDate: '',
			returnStockRegiDate: '',
			nextStockId: '',
			statusStr: '',
			maker: '',
			goodsId: '',
			capacity: '전체',
			colorName: '',
			barcode: '',
			perPageCnt: 20,
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
		codeList: {},
	},
	getters: {},
	mutations: {
		returnStockListDataSet(state, result) {
			state.moveStockList = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		setCommonCodeList(state, data) {
			state.codeList = data.codeList;
			state.codeList.provList = data.provList;
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
			state.filterData.capacity = '전체';
		},
		setDeviceInfo(state, data) {
			state.deviceInfoChk = true;
			state.deviceInfo = data.data.data;
		},
		setDeviceHistory(state, data) {
			state.deviceHistory = data.data.data;
		},
	},
	actions: {
		async getCommonCodeList({ commit }, data) {
			try {
				const result = await commonCodeListFnc(data);
				if (result) {
					commit('setCommonCodeList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertReturnStock({ commit }, formData) {
			try {
				const result = await insertReturnStock(formData);
				if (result.data.status === 200) {
					if (result.data.data.length > 0) {
						alert(`${result.data.data.length}개 등록 실패`);
						return result.data.data;
					} else {
						alert('등록되었습니다.');
						commit('closeDialog', 'regiDialog');
						return [];
					}
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
			} catch (e) {
				console.log(e);
				alert(`알수없는 오류가 발생했습니다.`);
			}
		},
		async getReturnStockList({ commit }, data) {
			try {
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				let result = await getReturnStockList(data);
				if (result) {
					commit('returnStockListDataSet', result);
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
		async getDeviceInfo({ commit }, data) {
			try {
				let result = await getDeviceInfo(data);
				if (result.data.resultCode === '0000') {
					// 성공
					commit('setDeviceInfo', result);
					return true;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getRetrieveDeviceHistory({ commit }, data) {
			try {
				let result = await getRetrieveDeviceHistory(data);
				if (result) {
					commit('setDeviceHistory', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertReturnStockExcel({ commit }, data) {
			try {
				let result = await insertReturnStockExcel(data);
				if (result) {
					return result.data;
				}
			} catch (e) {
				alert('등록실패했습니다.');
				bus.$emit('end:spinner');
				console.log(e);
			}
		},
		async insertReturnStockExcelException({ commit }, data) {
			try {
				let result = await insertReturnStockExcelException(data);
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
				bus.$emit('end:spinner');
				console.log(e);
			}
		},
	},
};

export default MoveStockRtngudModule;
