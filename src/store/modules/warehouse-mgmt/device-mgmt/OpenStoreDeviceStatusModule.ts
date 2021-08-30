import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import {
	deviceHistory,
	filterData,
	openStoreDeviceList,
	pagingData,
	resultApiData,
} from '../../../interface/warehouse-mgmt/interface';
import {getOpeningCurrentList, updateCancel,} from '@/api/warehouse-mgmt/device-mgmt/OpenStoreDeviceStatusApi';
import {getRetrieveDeviceHistory} from '../../../../api/common/common';
import {commonCodeEnumList} from '@/api/warehouse-mgmt/device-mgmt/NormalInStockApi';

Vue.use(Vuex);

interface State {
	repealDialog: boolean;
	infoDialog: boolean;
	totalCnt: number;
	filterData: filterData;
	pagingData: pagingData;
	openStoreDeviceList: openStoreDeviceList[];
	deviceHistory: deviceHistory[];
	enumCodeList: any;
	statusList: any;
}

const state: State = {
	repealDialog: false,
	infoDialog: false,
	totalCnt: 0,
	openStoreDeviceList: [],
	deviceHistory: [],
	statusList: [],
	filterData: {
		barcode: '',
		goodsName: '',
		inStockRegiDate: '',
		inStockEndDate: '',
		stockIds: '',
		provIds: 0,
		openingHistoryStoreIds: 0,
		openingDate: '',
		openingEndDate: '',
		stockTypes: '',
		telecom: '',
		goodsType: '',
		maker: '',
		capacity: '',
		colorName: '',
		cusName: '',
		cusPhone: '',
		openingStatus: '',
		perPageCnt: 20,
		cancelDate: '',
		cancelEndDate: '',
	},
	pagingData: {
		pageNo: 0,
		pageLastNo: 0,
		pageEndNo: 0,
		perPageCnt: 20,
		pageNumList: [],
	},
	enumCodeList: {},
};
const getters = {};
const mutations = {
	filterInit(state: State) {
		for (const data in state.filterData) {
			// @ts-ignore
			state.filterData[data] = '';
		}
		state.filterData.telecom = '';
		state.filterData.maker = '';
		state.filterData.perPageCnt = 20;
		state.filterData.goodsName = '전체';
		state.filterData.capacity = '전체';
		state.filterData.colorName = '전체';
	},
	setList(state: State, result: resultApiData) {
		state.openStoreDeviceList = result.resultList;
		state.totalCnt = result.totalCnt;
		state.pagingData.perPageCnt = result.perPageCnt;
		state.pagingData.pageNo = result.pageNo;
		state.pagingData.pageNumList = result.pageNumList;
		state.pagingData.pageLastNo = result.pageLastNo;
		state.pagingData.pageEndNo = result.pageEndNo;
	},
	setDeviceHistory(state: State, result: any) {
		state.deviceHistory = result;
	},
	setUsimTypeItems(state: State, data: any) {
		state.enumCodeList.goodsTypeItems = [];
		state.enumCodeList.goodsTypeItems = data.data.data.GoodsType;
		state.enumCodeList.goodsTypeItems.unshift({ name: '전체', value: '' });
	},
	setCommonCodeNewList(state: State, result: any) {
		state.statusList = result;
	},
};
const actions = {
	async getList({ commit }: ActionContext<State, State>, data: filterData) {
		try {
			if (data && data.goodsName === '전체') {
				data.goodsName = '';
			}
			if (data && data.capacity === '전체') {
				data.capacity = '';
			}
			if (data && data.colorName === '전체') {
				data.colorName = '';
			}
			const result = await getOpeningCurrentList(data);
			if (result) {
				commit('setList', result.data.data);
				if (data && data.goodsName === '') {
					data.goodsName = '전체';
				}
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
	// 이력 리스트 조회
	async getRetrieveDeviceHistory(
		{ commit }: ActionContext<State, State>,
		data: number,
	) {
		try {
			const result = await getRetrieveDeviceHistory(data);
			if (result) {
				commit('setDeviceHistory', result.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
	// updateRepeal Type이 다른곳에서도
	// 쓰이는 타입이 아니기때문에 바로선언해놓음
	async updateCancel(
		{ commit }: ActionContext<State, State>,
		data: { openingId: number; cancelDate: string; cancelMemo: string },
	) {
		const result = await updateCancel(data);
		if (result && result.data.resultCode === '0000') {
			alert('철회 완료되었습니다.');
			return true;
		} else {
			alert('알수없는 오류가 발생했습니다.');
		}
	},
	async commonCodeEnumList({ commit }: ActionContext<State, State>) {
		const data = { initEnumData: ['GoodsType'] };
		const result = await commonCodeEnumList(data);
		if (result) {
			commit('setUsimTypeItems', result);
		}
	},
	async getEnumCommonCodeList({ commit }: ActionContext<State, State>) {
		try {
			/* 신규 ENUM 데이터 */
			const newEnum = {
				initEnumData: ['RetractType'],
			};
			const result = await commonCodeEnumList(newEnum);
			if (result) {
				commit('setCommonCodeNewList', result.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
};
const OpenStoreDeviceStatusModule = {
	namespaced: true,
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
};

export default OpenStoreDeviceStatusModule;
