import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const UsimStatusModule = {
	namespaced: true,
	state: {
		totalCnt: 0,
		filterData: {
			telecom: '',
			inStockStartRegiDate: '',
			inStockEndRegiDate: '',
			moveStartRegiDate: '',
			moveEndRegiDate: '',
			provId: '',
			stockId: '',
			개통점: '',
			영업점: '',
			재고구분: '',
			개통상태: '',
			유심종류: '',
			모델명: '',
			배송방법: '',
			배송시작일: '',
			배송종료일: '',
			송장번호: '',
			perPageCnt: 20,
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
	},
	mutations: {},
	actions: {},
};

export default UsimStatusModule;
