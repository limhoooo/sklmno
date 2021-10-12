import Vue from 'vue';
import Vuex from 'vuex';
import {
	getCapacityList,
	getDeviceColorList,
	getDeviceList,
	getGoodsNameList,
	getSessOpeningStoreList,
	selectCodeList,
} from '../../api/common/common';
import { commonCodeListFnc } from '../../common/common';

Vue.use(Vuex);

const CodeModule = {
	namespaced: true,
	state: {
		codeList: {
			deviceList: [],
			colorList: [],
			capacityList: [],
			capacityListBasic: [],
			stockNameList: [],
			openingStoreList: [],
			// 카테고리
			addSvcTypeList: [
				{ name: '일반', value: 'NORMAL' },
				{ name: '보험', value: 'INSURANCE' },
			],
			// 기기 외장상태
			deviceExtrrStatusItems: [
				{ name: '상', value: 'T' },
				{ name: '중', value: 'M' },
				{ name: '하', value: 'B' },
				{ name: '파손', value: 'F' },
			],
			// 입고 상태
			inStockStatusItems: [
				{ name: '정상', value: 'NORMAL' },
				{ name: '개봉', value: 'OPEN' },
			],
			// 재고 구분
			stockStatStrItems: [
				{ name: '매장재고', value: 'I' },
				{ name: '이동재고', value: 'M' },
			],
			// 재고이동관련 재고구분
			moveStockStatStrItems: [
				{ name: '판매이동', value: 'SELL_MOVE' },
				{ name: '이동재고', value: 'STOCK_MOVE' },
				{ name: '재고이관', value: 'STOCK_TRNS' },
				{ name: '착하', value: 'FAULTY_TRNS' },
				{ name: '판매이관', value: 'SELL_TRNS' },
				{ name: '반품이관', value: 'RETURN_TRNS' },
			],
			deviceMoveStockStatStrItems: [
				{ name: '매장재고(입고)', value: 'IN_STOCK' },
				{ name: '판매이동', value: 'SELL_MOVE' },
				{ name: '이동재고', value: 'STOCK_MOVE' },
				{ name: '재고이관', value: 'STOCK_TRNS' },
				{ name: '착하', value: 'FAULTY_TRNS' },
				{ name: '판매이관', value: 'SELL_TRNS' },
				{ name: '매장재고(반품)', value: 'RETURN_STOCK' },
				{ name: '반품이관', value: 'RETURN_TRNS' },
			],
			// 재고현황 재고구분상제
			deviceMoveStockStatStrItems2: [
				{ name: '입고', value: 'IN_STOCK' },
				{ name: '이동재고', value: 'STOCK_MOVE' },
				{ name: '판매이동', value: 'SELL_MOVE' },
				{ name: '반품', value: 'RETURN_STOCK' },
			],
			// 제품 상태
			productFaultyYnItems: [
				{ name: '정상', value: 'N' },
				{ name: '불량', value: 'Y' },
			],
			// 바코드 타입
			barcodeType: [
				{ name: '스캐너', value: 'S' },
				{ name: '키보드', value: 'K' },
			],
			// 배송 방법
			deliveryType: [
				{ name: '택배', value: 'PS' },
				{ name: '퀵', value: 'QUICK' },
				{ name: '직접전달', value: 'DIRECT' },
			],
			deliveryStatus: [
				// {name: '-', value: 'NONE'},
				{ name: '배송중', value: 'PROGRESS' },
				{ name: '배송완료', value: 'COMPL' },
			],
			judgementStatus: [
				{ name: '판정대기', value: 'WAIT' },
				{ name: '판정진행중', value: 'PROGRESS' },
				{ name: '판정완료', value: 'COMPL' },
				{ name: '판정반려', value: 'REJECT' },
			],
			// 철회상태
			openingStatus: [
				{ name: '철회가능', value: 'OPENING' },
				{ name: '철회완료', value: 'CANCEL' },
				{ name: '철회불가', value: 'COMPL' },
			],
			ynList: [
				{ name: '전체', value: '' },
				{ name: '유', value: 'Y' },
				{ name: '무', value: 'N' },
			],
			// 판매현황 기존통신사
			exisTelecomSellList: [
				{ codeNm: '전체', codeSeq: '' },
				{ codeNm: '신규가입', codeSeq: 45 },
				{ codeNm: 'SKT', codeSeq: 42 },
				{ codeNm: 'KT', codeSeq: 43 },
				{ codeNm: 'LGU', codeSeq: 44 },
				{ codeNm: 'UNKNOWN', codeSeq: 41 },
				{ codeNm: '알뜰폰', codeSeq: 9999 },
			],
		},
	},
	mutations: {
		setCommonCodeList(state, data) {
			// eslint-disable-next-line no-prototype-builtins
			if (data.codeList && data.codeList.hasOwnProperty('TELECOM')) {
				state.codeList.telecom = data.codeList.TELECOM;
				state.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			}
			// eslint-disable-next-line no-prototype-builtins
			if (data.codeList && data.codeList.hasOwnProperty('EXISTELECOM')) {
				state.codeList.exisTelecom = data.codeList.EXISTELECOM;
				state.codeList.exisTelecom.unshift({ codeNm: '전체', codeSeq: '' });
			}
			// eslint-disable-next-line no-prototype-builtins
			if (data.codeList && data.codeList.hasOwnProperty('MAKER')) {
				state.codeList.maker = data.codeList.MAKER;
				state.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			}
			// eslint-disable-next-line no-prototype-builtins
			if (data.codeList && data.codeList.hasOwnProperty('NETWORK')) {
				state.codeList.network = data.codeList.NETWORK;
			}
			// eslint-disable-next-line no-prototype-builtins
			if (data.codeList && data.codeList.hasOwnProperty('CAPACITY')) {
				state.codeList.capacityListBasic = data.codeList.CAPACITY;
				state.codeList.capacityListBasic.unshift({
					codeNm: '전체',
					codeSeq: '',
				});
			}
			state.codeList.provList = data.provList;
		},

		filterInit(state) {
			state.codeList.telecom = [];
			state.codeList.maker = [];
			state.codeList.network = [];
			state.codeList.provList = [];
			state.codeList.deviceList = [];
			state.codeList.colorList = [];
			state.codeList.capacityList = [];
			state.codeList.stockNameList = [];
			state.codeList.stockList = [];
			state.codeList.goodsTypeItems = [];
		},
		setDeviceList(state, data) {
			if (data.data.resultCode === '9000') {
				state.codeList.deviceList = [];
			} else {
				state.codeList.deviceList = data.data.data;
			}
		},
		setColorList(state, data) {
			if (data.data.resultCode === '9000') {
				state.codeList.colorList = [];
			} else {
				state.codeList.colorList = data.data.data;
			}
		},
		setCapacityList(state, data) {
			if (data.data.resultCode === '9000') {
				state.codeList.capacityList = [];
			} else {
				state.codeList.capacityList = data.data.data;
			}
		},
		setSelectList(state, data) {
			if (data.data.resultCode === '9000') {
				state.codeList.stockNameList = [];
			} else {
				state.codeList.stockNameList = data.data.data;
			}
		},
		setOpeningStoreList(state, data) {
			if (data.data.resultCode === '9000') {
				state.codeList.openingStoreList = [];
			} else {
				state.codeList.openingStoreList = data.data.data;
			}
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
		async getDeviceList({ commit }, data) {
			try {
				let result = await getDeviceList(data);
				if (result) {
					commit('setDeviceList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getGoodsNameList({ commit }, data) {
			try {
				let result = await getGoodsNameList(data);
				if (result) {
					commit('setDeviceList', result);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getDeviceColorList({ commit }, data) {
			const result = await getDeviceColorList(data);
			if (result) {
				commit('setColorList', result);
			}
		},
		async getCapacityList({ commit }, data) {
			const result = await getCapacityList(data);
			if (result) {
				commit('setCapacityList', result);
			}
		},
		async getStockListFnc({ commit }, data) {
			const result = await selectCodeList(data);
			if (result) {
				commit('setSelectList', result);
			}
		},
		// 개통점 리스트 조회
		async getSessOpeningStoreList({ commit }, data) {
			const result = await getSessOpeningStoreList(data);
			if (result) {
				commit('setOpeningStoreList', result);
			}
		},
	},
};

export default CodeModule;
