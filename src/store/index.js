import Vue from 'vue';
import Vuex from 'vuex';
import {
	deleteCookie,
	getNameFromCookie,
	getRoleFromCookie,
	saveRoleToCookie,
	saveUserToCookie,
} from '../common/cookies';
import { logout } from '../api/member/login';
import { router } from '../router/index';
import commonModule from './common/commonModule.js';
import CodeModule from './common/CodeModule.js';
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
import StockMoveFilterCommonModules from './modules/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockMoveFilterCommonModules';
import OpenStoreDeviceStatusModule from './modules/warehouse-mgmt/device-mgmt/OpenStoreDeviceStatusModule.ts';
import SellStatusModule from './modules/supply-chain-mgmt/sell-mgmt/SellStatusModule.ts';
import ApplicationFormCreationModule
	from './modules/supply-chain-mgmt/application-form-creation/ApplicationFormCreationModule.ts';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		drawer: false,
		name: getNameFromCookie() || '',
		role: getRoleFromCookie() || '',
		//name: '',
	},
	getters: {
		isLogin(state) {
			return state.name !== '';
		},
	},
	mutations: {
		setUserInfo(state, token) {
			state.name = token;
		},
		setRoleInfo(state, token) {
			state.role = token;
		},
		clearUserInfo(state) {
			state.name = '';
		},
		clearRoleInfo(state) {
			state.role = '';
		},
		redirectLogin() {
			router.push('/login');
		},
	},
	actions: {
		async LOGIN({ commit }, data) {
			commit('setUserInfo', data.name);
			saveUserToCookie(data.name);
			if (data.role) {
				commit('setRoleInfo', data.role);
				saveRoleToCookie(data.role);
			}
		},
		async LOGOUT({ commit }, tokenDel) {
			if (tokenDel === 'Y') {
				await logout();
			}
			commit('clearUserInfo');
			commit('clearRoleInfo');
			deleteCookie('name');
			deleteCookie('role');
			// httponly token 삭제 필요시 구분
			commit('redirectLogin');
		},
		async LOGOUT2({ commit }, tokenDel) {
			if (tokenDel === 'Y') {
				await logout();
			}
			commit('clearUserInfo');
			commit('clearRoleInfo');
			deleteCookie('name');
			deleteCookie('role');
			// httponly token 삭제 필요시 구분`
		},
	},
	modules: {
		commonModule: commonModule,
		CodeModule: CodeModule,
		OpeningStoreMgmtModule: OpeningStoreMgmtModule, // 개통점관리
		SaleStoreMgmtModule: SaleStoreMgmtModule, //영업점관리
		MobilephoneListModule: MobilephoneListModule, // 상품관리-상품목록
		MobilephoneRequestModule: MobilephoneRequestModule, // 상품관리-상품요청목록
		AdditionServiceModule: AdditionServiceModule, //부가서비스관리 - 요금목록
		AdditionServiceRequestModule: AdditionServiceRequestModule, //부가서비스관리 - 요금요청목록
		ProviderMgmtModule: ProviderMgmtModule, // 공급처관리
		ChargeListModule: ChargeListModule, //요금관리 - 요금목록
		ChargeRequestModule: ChargeRequestModule, // 요금관리 - 요금요청목록
		InStockMgmtModule: InStockMgmtModule, // 입고현황
		HoldStoreMgmtModule: HoldStoreMgmtModule, // 보유처관리
		NormalInStockModule: NormalInStockModule, // 정상입고
		OpenInStockModule: OpenInStockModule, // 개봉입고
		MoveStockRtngudModule: MoveStockRtngudModule, // 반품현황
		MoveStatusModule: MoveStatusModule, // 이동/이관현황
		DeviceStatusModule: DeviceStatusModule, // 기기현황
		OrganizationMgmtModule: OrganizationMgmtModule, // 조직관리
		SalesMoveModule: SalesMoveModule, // 판매이동
		StockMoveModule: StockMoveModule, // 이동재고
		StockTransferModule: StockTransferModule, // 재고이관
		FaultyTransferModule: FaultyTransferModule, // 불량이관
		SalesTransferModule: SalesTransferModule, // 판매이관
		StockStatusModule: StockStatusModule, // 재고현황
		LongtimeStockModule: LongtimeStockModule, // 장기재고
		FaultyDeviceStatusModule: FaultyDeviceStatusModule, // 불량기기현황
		StockMoveFilterCommonModules: StockMoveFilterCommonModules, // 이동재고/이관 공통 필터
		PnSupportMoneyMgmtModule: PnSupportMoneyMgmtModule, // 공시지원금관리
		SellStatusModule: SellStatusModule, // 판매현황
		ApplicationFormCreationModule: ApplicationFormCreationModule, // 신청서작성
		OpenStoreDeviceStatusModule: OpenStoreDeviceStatusModule, // 개통기기현황
	},
});
