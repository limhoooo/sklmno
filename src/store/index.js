import Vue from 'vue';
import Vuex from 'vuex';

import {
	deleteCookie,
	getMfFromCookie,
	getMqFromCookie,
	getNameFromCookie,
	getPuFromCookie,
	getRoleFromCookie,
	getSctFromCookie,
	getSgFromCookie,
	getStFromCookie,
	saveMfToCookie,
	saveMqToCookie,
	savePuToCookie,
	saveRoleToCookie,
	saveSctToCookie,
	saveSgToCookie,
	saveStToCookie,
	saveUserToCookie,
} from '../common/cookies';
import {checkApplicationStatusUpdateFlag, getBookmarkList, maskingFnc, postBookmarkList} from '../api/common/common';
import {unescapeHtml} from '../common/common';
import {logout} from '../api/member/login';
import {router} from '../router/index';
import commonModule from './common/commonModule.js';
import CodeModule from './common/CodeModule.js';
import BookmarkModule from './common/BookmarkModule';
import memoModule from './common/MemoModule';
import OpeningStoreMgmtModule from './modules/common-mgmt/business-man-mgmt/OpeningStoreMgmtModule.js';
import SaleStoreMgmtModule from './modules/common-mgmt/business-man-mgmt/SaleStoreMgmtModule.js';
import ChargeListModule from './modules/common-mgmt/charge-mgmt/ChargeListModule.js';
import ChargeRequestModule from './modules/common-mgmt/charge-mgmt/ChargeRequestModule.js';
import MobilephoneListModule from './modules/common-mgmt/goods-mgmt/MobilephoneListModule.js';
import MobilephoneRequestModule from './modules/common-mgmt/goods-mgmt/MobilephoneRequestModule.js';
import AdditionServiceModule from './modules/common-mgmt/addition-service-mgmt/AdditionServiceModule.js';
import AdditionServiceRequestModule from './modules/common-mgmt/addition-service-mgmt/AdditionServiceRequestModule.js';
import OrganizationMgmtModule from './modules/common-mgmt/organization-mgmt/OrganizationMgmtModule.js';
import ProviderMgmtModule from './modules/warehouse-mgmt/stock-setting-mgmt/ProviderMgmtModule';
import InStockMgmtModule from './modules/warehouse-mgmt/device-mgmt/InStockMgmtModule.js';
import HoldStoreMgmtModule from './modules/warehouse-mgmt/stock-setting-mgmt/HoldStoreMgmtModule.js';
import NormalInStockModule from './modules/warehouse-mgmt/device-mgmt/NormalInStockModule.js';
import OpenInStockModule from './modules/warehouse-mgmt/device-mgmt/OpenInStockModule.js';
import MoveStockRtngudModule from './modules/warehouse-mgmt/device-mgmt/MoveStockRtngudModule.js';
import PnSupportMoneyMgmtModule from './modules/common-mgmt/pn-support-money-mgmt/PnSupportMoneyMgmtModule.js';
import StockStatusModule from './modules/warehouse-mgmt/stock-mgmt/StockStatusModule.js';
import MoveStatusModule from './modules/warehouse-mgmt/device-mgmt/MoveStatusModule.js';
import DeviceStatusModule from './modules/warehouse-mgmt/device-mgmt/DeviceStatusModule.js';
import SalesMoveModule from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/SalesMoveModule.js';
import StockMoveModule from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockMoveModule.js';
import StockTransferModule from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockTransferModule.js';
import FaultyTransferModule from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/FaultyTransferModule.js';
import SalesTransferModule from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/SalesTransferModule.js';
import LongtimeStockModule from './modules/warehouse-mgmt/stock-mgmt/LongtimeStockModule';
import FaultyDeviceStatusModule from './modules/warehouse-mgmt/stock-mgmt/FaultyDeviceStatusModule';
import MediationReleaseModule from './modules/warehouse-mgmt/stock-mgmt/MediationReleaseModule.js';
import StockMoveFilterCommonModules
	from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockMoveFilterCommonModules';
import OpenStoreDeviceStatusModule from './modules/warehouse-mgmt/device-mgmt/OpenStoreDeviceStatusModule.ts';
import ReturnTransferModule from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/ReturnTransferModule.js';
import SellStatusModule from './modules/supply-chain-mgmt/sell-mgmt/SellStatusModule';
import QuickOpeningPopModule from './modules/supply-chain-mgmt/sell-mgmt/QuickOpeningPopModule';
import ApplicationFormCreationModule
	from './modules/supply-chain-mgmt/application-form-creation/ApplicationFormCreationModule.ts';
import BlackListModule from './modules/supply-chain-mgmt/black-list/BlackListModule';
import TaskHistoryModule from './common/task-history/TaskHistory.js';
import MgmtTargetDeviceModule from '@/store/modules/warehouse-mgmt/stock-mgmt/MgmtTargetDeviceModule';
import UsimInStockModule from '@/store/modules/warehouse-mgmt/device-mgmt/UsimInStockModule';
import UsimStatusModule from '@/store/modules/warehouse-mgmt/device-mgmt/UsimStatusModule';
import ApplicationMatchingModule from './modules/supply-chain-mgmt/application-matching/ApplicationMatchingModule';
import StatsMgmtModule from '@/store/modules/supply-chain-mgmt/stats-mgmt/StatsMgmtModule';
import CreditCheckModule from '@/store/modules/credit-check-mgmt/credit-check/CreditCheckModule';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		drawer: false,
		name: getNameFromCookie() || '',
		role: getRoleFromCookie() || '',
		sct: getSctFromCookie() || '',
		mq: getMqFromCookie() || '',
		mf: getMfFromCookie() || '',
		pu: getPuFromCookie() || null,
		st: getStFromCookie() || null,
		sg: getSgFromCookie() || null,
		bookmarkList: [],
		bookmarkUseYn: '',
		alarm: false,
		alarmData: [],
		//name: '',
	},
	getters: {
		isLogin(state) {
			return state.name !== '';
		},
	},
	mutations: {
		setInfo(state, data) {
			if (data.name) {
				state.name = data.name || '';
				saveUserToCookie(data.name);
			}
			if (data.sct) {
				state.sct = data.sct || '';
				saveSctToCookie(data.sct);
			}
			if (data.mq) {
				state.mq = data.mq || '';
				saveMqToCookie(data.mq);
			}
			if (data.mf) {
				state.mf = data.mf || '';
				saveMfToCookie(data.mf);
			}
			if (data.pu) {
				state.pu = data.pu || '';
				savePuToCookie(data.pu);
			}
			if (data.role) {
				state.role = data.role || '';
				saveRoleToCookie(data.role);
			}
			if (data.st) {
				state.st = data.st || '';
				saveStToCookie(data.st);
			}
			if (data.sg) {
				state.sg = data.sg || '';
				saveSgToCookie(data.sg);
			}
		},
		clearInfo(state) {
			state.name = '';
			state.role = '';
			state.sct = '';
			state.mq = '';
			state.mf = '';
			state.pu = '';
			state.st = '';
			state.sg = '';
		},
		redirectLogin() {
			router.push('/login');
		},
		alarmFnc(state) {
			if (!state.alarm) {
				state.alarm = true;
				setTimeout(() => {
					state.alarm = false;
				}, 10000);
			}
		},
		alarmPush(state, data) {
			state.alarmData.push(data);
		},
		// ???????????? ??????
		setBookmarkList(state, result) {
			state.bookmarkList = JSON.parse(unescapeHtml(result.bookmarkList));
		},
		// ???????????? ??????
		addMark(state, data) {
			state.bookmarkList.push(data);
		},
		// ???????????? ??????
		removeMark(state, index) {
			state.bookmarkList.splice(index, 1);
		},
	},
	actions: {
		async LOGIN({ commit }, data) {
			commit('setInfo', data);
		},
		async LOGOUT({ commit }, tokenDel) {
			if (tokenDel === 'Y') {
				await logout();
			}
			commit('clearInfo');
			deleteCookie(['name', 'role', 'sct', 'mq', 'mf', 'pu', 'st', 'sg']);
			commit('redirectLogin');
		},
		async LOGOUT2({ commit }, tokenDel) {
			if (tokenDel === 'Y') {
				await logout();
			}
			deleteCookie(['name', 'role', 'sct', 'mq', 'mf', 'pu', 'st', 'sg']);
			commit('redirectLogin');
		},
		//???????????? ??????
		async addBookmark({ commit, dispatch }, data) {
			commit('addMark', data);
			dispatch('saveBookmarkList');
		},
		// ???????????? ??????
		async removeBookmark({ commit, dispatch }, index) {
			commit('removeMark', index);
			dispatch('saveBookmarkList');
		},
		// ???????????? ??????
		async getBookmarkList({ commit }) {
			try {
				const result = await getBookmarkList();
				if (result) {
					commit('setBookmarkList', result.data.data);
				}
			} catch {
				// alert('???????????? ?????? ??????.');
			}
		},
		// ???????????? ??????/????????????
		async saveBookmarkList({ state }) {
			try {
				let bookmarkList = JSON.stringify(state.bookmarkList);
				let data = {
					bookmarkList: bookmarkList,
				};
				await postBookmarkList(data);
			} catch (e) {
				alert('???????????? ?????? ?????????.');
				console.log(e);
			}
		},
		async maskingFnc({state}){
			try {
				await maskingFnc();
				location.reload();
			} catch (e) {
				alert('???????????? ?????? ?????????.');
				console.log(e);
			}
		},
		async checkApplicationStatusUpdateFlag({ commit }, data) {
			try {
				const result = await checkApplicationStatusUpdateFlag(data);
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
	modules: {
		commonModule: commonModule,
		CodeModule: CodeModule,
		memoModule: memoModule,
		BookmarkModule: BookmarkModule,
		OpeningStoreMgmtModule: OpeningStoreMgmtModule, // ???????????????
		SaleStoreMgmtModule: SaleStoreMgmtModule, //???????????????
		MobilephoneListModule: MobilephoneListModule, // ????????????-????????????
		MobilephoneRequestModule: MobilephoneRequestModule, // ????????????-??????????????????
		AdditionServiceModule: AdditionServiceModule, //????????????????????? - ????????????
		AdditionServiceRequestModule: AdditionServiceRequestModule, //????????????????????? - ??????????????????
		ProviderMgmtModule: ProviderMgmtModule, // ???????????????
		ChargeListModule: ChargeListModule, //???????????? - ????????????
		ChargeRequestModule: ChargeRequestModule, // ???????????? - ??????????????????
		InStockMgmtModule: InStockMgmtModule, // ????????????
		HoldStoreMgmtModule: HoldStoreMgmtModule, // ???????????????
		NormalInStockModule: NormalInStockModule, // ????????????
		OpenInStockModule: OpenInStockModule, // ????????????
		MoveStockRtngudModule: MoveStockRtngudModule, // ????????????
		MoveStatusModule: MoveStatusModule, // ??????/????????????
		DeviceStatusModule: DeviceStatusModule, // ????????????
		OrganizationMgmtModule: OrganizationMgmtModule, // ????????????
		SalesMoveModule: SalesMoveModule, // ????????????
		StockMoveModule: StockMoveModule, // ????????????
		StockTransferModule: StockTransferModule, // ????????????
		FaultyTransferModule: FaultyTransferModule, // ????????????
		SalesTransferModule: SalesTransferModule, // ????????????
		StockStatusModule: StockStatusModule, // ????????????
		LongtimeStockModule: LongtimeStockModule, // ????????????
		FaultyDeviceStatusModule: FaultyDeviceStatusModule, // ??????????????????
		MediationReleaseModule: MediationReleaseModule, //????????????
		StockMoveFilterCommonModules: StockMoveFilterCommonModules, // ????????????/?????? ?????? ??????
		PnSupportMoneyMgmtModule: PnSupportMoneyMgmtModule, // ?????????????????????
		SellStatusModule: SellStatusModule, // ????????????
		ApplicationFormCreationModule: ApplicationFormCreationModule, // ???????????????
		OpenStoreDeviceStatusModule: OpenStoreDeviceStatusModule, // ??????????????????
		QuickOpeningPopModule: QuickOpeningPopModule, //????????????
		ReturnTransferModule: ReturnTransferModule, // ????????????
		MgmtTargetDeviceModule: MgmtTargetDeviceModule, // ??????????????????
		UsimInStockModule: UsimInStockModule, // ????????????
		UsimStatusModule: UsimStatusModule, // ????????????
		BlackListModule: BlackListModule, // ?????????????????????
		TaskHistoryModule: TaskHistoryModule, // ?????? ??????
		ApplicationMatchingModule: ApplicationMatchingModule, // ???????????????
		StatsMgmtModule: StatsMgmtModule, // ????????????
		CreditCheckModule: CreditCheckModule, // ????????????
	},
});
