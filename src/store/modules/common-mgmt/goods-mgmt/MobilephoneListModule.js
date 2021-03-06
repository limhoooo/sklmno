import Vue from 'vue';
import Vuex from 'vuex';
import {
	deleteGoodsEosDate,
	getGoodsEosList,
	getList,
	insertGoodsEosDate,
} from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';

Vue.use(Vuex);

const MobilephoneListModule = {
	namespaced: true,
	state: {
		dateResetData: false,
		// storeSelect: [],
		getListData: [],
		infoDialog: false,
		registDialog: false,
		optionDialog: false,
		matchingDialog: false,
		goodsEosList: [],
		codeList: {
			network: [],
			telecom: [],
			maker: [],
			useYn: [
				{ name: '전체', value: 'all' },
				{ name: 'Y', value: 'Y' },
				{ name: 'N', value: 'N' },
			],
		},
		filterData: {
			goodsName: '',
			modelName: '',
			maker: '0',
			network: '0',
			telecom: '0',
			useYn: 'all',
			srhStartDate: '',
			srhEndDate: '',
		},
		totalCnt: 0,
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
	},
	mutations: {
		filterInit(state) {
			state.filterData.goodsName = '';
			state.filterData.modelName = '';
			state.filterData.maker = '0';
			state.filterData.network = '0';
			state.filterData.telecom = '0';
			state.filterData.useYn = 'all';
			state.filterData.srhStartDate = '';
			state.filterData.srhEndDate = '';
			state.dateResetData = !state.dateResetData;
		},
		setList(state, result) {
			state.getListData = result.data.data.resultList;
			state.totalCnt = result.data.data.totalCnt;
			state.pagingData.perPageCnt = result.data.data.perPageCnt;
			state.pagingData.pageNo = result.data.data.pageNo;
			state.pagingData.pageNumList = result.data.data.pageNumList;
			state.pagingData.pageLastNo = result.data.data.pageLastNo;
			state.pagingData.pageEndNo = result.data.data.pageEndNo;
		},
		setGoodsEosList(state, result) {
			state.goodsEosList = result.data.data.resultList || [];
		},
	},
	actions: {
		async getList({ commit }, data) {
			try {
				const result = await getList(data);
				if (result) {
					commit('setList', result);
				}
			} catch (error) {
				console.log(error);
			}
		},
		async insertGoodsEosDate({ commit }, data) {
			try {
				const result = await insertGoodsEosDate(data);
				if (result && '0000' === result.data.resultCode) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log(error);
			}
		},
		async deleteGoodsEosDate({ commit }, data) {
			try {
				const result = await deleteGoodsEosDate(data);
				if (result && '0000' === result.data.resultCode) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log(error);
			}
		},
		async getGoodsEosList({ commit }, data) {
			try {
				const result = await getGoodsEosList(data);
				if (result && '0000' === result.data.resultCode) {
					commit('setGoodsEosList', result);
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};

export default MobilephoneListModule;
