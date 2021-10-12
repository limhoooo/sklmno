import Vue from 'vue';
import Vuex from 'vuex';
import { commonCodeEnumListFnc } from '@/common/common';
import {
	getOpeningStoreList,
	getSaleStoreList,
} from '../../../../api/supply-chain-mgmt/application-form-creation/ApplicationFromApi';
import {
	cancelDeliveryMatching,
	cancelDeviceTypeMatching,
	changeCourier,
	deliveryCompleted,
	deliveryCompletedCancel,
	deliveryMatching,
	deviceMatching,
	getCourierInfo,
	getDetailList,
	getList,
} from '../../../../api/supply-chain-mgmt/application-matching/ApplicationMatchingApi';

Vue.use(Vuex);

const ApplicationMatchingModule = {
	namespaced: true,
	state: {
		applMatchingList: [],
		applMatchingDetailObj: {},
		totalCnt: 0,
		filterData: {
			perPageCnt: 20,
			taskStatus: '',
			OpeningTaskStatus: '',
			ConsultTaskStatus: '',
			LogisticsTaskStatus: '',
			goodsName: '전체',
			capacity: '전체',
			colorName: '전체',
			saleStoreId: '',
			searchStoreId: '',
			openingStoreId: '',
			usimPaymentType: '',
			beforeReserveYn: '전체',
			deliveryType: '',
			JoinType: '',
			telecom: '',
		},
		statusList: [],
		saleStoreList: [],
		openingStoreList: [],
		dateResetData: false,
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
		setList(state, result) {
			state.applMatchingList = result.resultList || [];
			state.totalCnt = result.totalCnt || 0;
			state.pagingData.perPageCnt = result.perPageCnt || 0;
			state.pagingData.pageNo = result.pageNo || 0;
			state.pagingData.pageNumList = result.pageNumList || [];
			state.pagingData.pageLastNo = result.pageLastNo || 0;
			state.pagingData.pageEndNo = result.pageEndNo || 0;
		},
		setDetailList(state, result) {
			state.applMatchingDetailObj = result || [];
		},
		filterInit(state) {
			for (const data in state.filterData) {
				state.filterData[data] = '';
			}
			state.filterData.perPageCnt = 20;
			state.filterData.goodsName = '전체';
			state.filterData.capacity = '전체';
			state.filterData.colorName = '전체';
			state.filterData.beforeReserveYn = '전체';
			state.dateResetData = !state.dateResetData;
			state.openingStoreList = [];
		},
		setStatusList(state, result) {
			state.statusList = result || [];
			state.statusList.OpeningTaskStatus.unshift({ name: '전체', value: '' });
			state.statusList.ConsultTaskStatus.unshift({ name: '전체', value: '' });
			state.statusList.LogisticsTaskStatus.unshift({ name: '전체', value: '' });
			state.statusList.JoinType.unshift({ name: '전체', value: '' });
			state.statusList.UsimPaymentType.unshift({ name: '전체', value: '' });
			state.statusList.DeliveryType.unshift({ name: '전체', value: '' });
		},
		setSaleStoreList(state, result) {
			state.saleStoreList = result || [];
		},
		setOpeningStoreList(state, result) {
			state.openingStoreList = result || [];
			state.openingStoreList.unshift({
				openStoreName: '전체',
				openStoreId: '',
			});
		},
	},
	actions: {
		async getList({ commit }, data) {
			try {
				if (data && data.beforeReserveYn === '전체') {
					data.beforeReserveYn = '';
				}
				if (data && data.goodsName === '전체') {
					data.goodsName = '';
				}
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				const result = await getList(data);
				if (data && data.beforeReserveYn === '') {
					data.beforeReserveYn = '전체';
				}
				if (data && data.goodsName === '') {
					data.goodsName = '전체';
				}
				if (data && data.capacity === '') {
					data.capacity = '전체';
				}
				if (data && data.colorName === '') {
					data.colorName = '전체';
				}
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						return false;
						//alert(result.data.resultMsg);
					} else {
						commit('setList', result.data.data);
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getStatusList({ commit }, data) {
			try {
				const result = await commonCodeEnumListFnc(data);
				commit('setStatusList', result);
			} catch (e) {
				console.log(e);
			}
		},
		async getSaleStoreList({ commit }, data) {
			try {
				const result = await getSaleStoreList(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						return false;
						//alert(result.data.resultMsg);
					} else {
						commit('setSaleStoreList', result.data.data);
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getOpeningStoreList({ commit }, data) {
			try {
				const result = await getOpeningStoreList(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						return false;
						//alert(result.data.resultMsg);
					} else {
						commit('setOpeningStoreList', result.data.data);
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getDetailList({ commit }, data) {
			try {
				const result = await getDetailList(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						return false;
						//alert(result.data.resultMsg);
					} else {
						commit('setDetailList', result.data.data);
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},

		async deviceMatching({ commit }, data) {
			try {
				// 신청서에 이미 매칭되어있는지 체크
				data['matchingDvcChangeYn'] = 'N';
				const result = await deviceMatching(data);
				if (200 === result.data.status) {
					if ('3001' === result.data.resultCode) {
						if (
							!confirm('이미 다른신청서에 매칭된 기기입니다\n매칭하시겠습니까?')
						) {
							return;
						}
						data['matchingDvcChangeYn'] = 'Y';
						const result2 = await deviceMatching(data);
						if ('0000' !== result2.data.resultCode) {
							alert(result2.data.resultMsg);
							return false;
						} else {
							return true;
						}
					} else if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async cancelDeviceTypeMatching({ commit }, data) {
			try {
				const result = await cancelDeviceTypeMatching(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deliveryMatching({ commit }, data) {
			try {
				const result = await deliveryMatching(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async cancelDeliveryMatching({ commit }, data) {
			try {
				const result = await cancelDeliveryMatching(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},

		async getCourierInfo({ commit }, data) {
			try {
				const result = await getCourierInfo(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return result.data.data;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deliveryCompleted({ commit }, data) {
			try {
				const result = await deliveryCompleted(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deliveryCompletedCancel({ commit }, data) {
			try {
				const result = await deliveryCompletedCancel(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async changeCourier({ commit }, data) {
			try {
				const result = await changeCourier(data);
				if (200 === result.data.status) {
					if ('0000' !== result.data.resultCode) {
						alert(result.data.resultMsg);
						return false;
					} else {
						return true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default ApplicationMatchingModule;
