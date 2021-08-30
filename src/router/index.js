import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import ChargeList from '../views/common-mgmt/charge-mgmt/ChargeList.vue';
import ChargeRequestList from '../views/common-mgmt/charge-mgmt/ChargeRequestList.vue';

Vue.use(VueRouter);
export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			// 로그인
			path: '/',
			redirect: '/dashboard',
		},
		{
			// 로그인
			path: '/login',
			component: () => import(`../views/member/Login`),
			meta: { auth: true },
		},
		{
			// 회원가입
			path: '/sign-up',
			component: () => import('../views/member/SignUp.vue'),
			meta: { auth: true },
		},
		{
			// 영업점 회원가입 (초대링크를 통한 회원가입)
			path: '/store/sign-up',
			component: () => import('../views/member/SignUp.vue'),
			meta: { auth: true },
		},
		{
			// 회원정보 수정
			path: '/change-user-info',
			component: () => import('../views/member/ChangeUserInfo.vue'),
		},
		{
			// 비밀번호 수정
			path: '/change-password',
			component: () => import('../views/member/ChangePassword.vue'),
		},
		{
			// 사용자 생성 (초대링크를 통한 회원가입)
			path: '/user/sign-up',
			component: () => import('../views/member/UserSignUp.vue'),
			meta: { auth: true },
		},
		{
			// 대시보드
			path: '/dashboard',
			component: () => import('../components/dashboard'),
		},
		// ...MemberRouters,
		// 사업자 관리
		{
			// 개통점관리
			path: '/openingstore-mgmt',
			component: () =>
				import('../views/common-mgmt/business-man-mgmt/OpeningStoreMgmt.vue'),
		},
		{
			//영업점관리
			path: '/salestore-mgmt',
			component: () =>
				import('../views/common-mgmt/business-man-mgmt/SaleStoreMgmt.vue'),
		},
		{
			//개통점 영업점매칭
			path: '/openingstorebcnc-matching',
			component: () =>
				import(
					'../views/common-mgmt/business-man-mgmt/OpeningStoreBcncMatching.vue'
				),
		},
		{
			//개통점 사용자매칭
			path: '/openingstoreuser-matching',
			component: () =>
				import(
					'../views/common-mgmt/business-man-mgmt/OpeningStoreUserMatching.vue'
				),
		},
		// 조직관리
		{
			// 조직관리
			path: '/organization-mgmt',
			component: () =>
				import('../views/common-mgmt/organization-mgmt/OrganizationMgmt.vue'),
		},
		{
			// 사용자 역할관리
			path: '/userrole-mgmt',
			component: () =>
				import('../views/common-mgmt/organization-mgmt/UserRoleMgmt.vue'),
		},
		{
			// 사용자기능관리
			path: '/userskill-mgmt',
			component: () =>
				import('../views/common-mgmt/organization-mgmt/UserSkillMgmt.vue'),
		},
		// 상품관리
		{
			// 상품관리
			path: '/goods-mgmt',
			component: () => import('../views/common-mgmt/goods-mgmt/GoodsMgmt.vue'),
			redirect: '/goods-mgmt/mobilephonelist',
			children: [
				{
					// 상품 목록
					path: 'mobilephonelist',
					component: () =>
						import('../views/common-mgmt/goods-mgmt/MobilephoneList.vue'),
				},
				{
					// 휴대폰 요청목록
					path: 'mobilephone-requestlist',
					component: () =>
						import(
							'../views/common-mgmt/goods-mgmt/MobilephoneRequestList.vue'
						),
				},
			],
		},
		{
			// 상품데이터관리
			path: '/goodsdata-mgmt',
			component: () =>
				import('../views/common-mgmt/goods-mgmt/GoodsDataMgmt.vue'),
		},
		// 요금관리
		{
			// 요금관리
			path: '/charge-mgmt',
			component: () =>
				import('../views/common-mgmt/charge-mgmt/ChargeMgmt.vue'),
			redirect: '/charge-mgmt/chargelist',
			children: [
				{
					// 요금목록
					path: 'chargelist',
					component: ChargeList,
				},
				{
					// 요금요청목록
					path: 'chargerequest-list',
					component: ChargeRequestList,
				},
			],
		},
		{
			// 요금데이터관리
			path: '/chargedata-mgmt',
			component: () =>
				import('../views/common-mgmt/charge-mgmt/ChargeDataMgmt.vue'),
		},
		// 공시지원금 관리
		{
			// 공시지원금 관리
			path: '/pnsupportmoney-mgmt',
			component: () =>
				import(
					'../views/common-mgmt/pn-support-money-mgmt/PnSupportMoneyMgmt.vue'
				),
		},
		{
			// 공시지원금 데이터 관리
			path: '/pnsupportmoneydata-mgmt',
			component: () =>
				import(
					'../views/common-mgmt/pn-support-money-mgmt/PnSupportMoneyDataMgmt.vue'
				),
		},
		//부가서비스 관리

		{
			// 부가서비스목록
			path: '/additionservice-mgmt',
			component: () =>
				import(
					'../views/common-mgmt/addition-service-mgmt/AdditionServiceMgmt.vue'
				),
			redirect: '/additionservice-mgmt/additionservice-list',
			children: [
				{
					// SKT
					path: 'additionservice-list',
					component: () =>
						import(
							'../views/common-mgmt/addition-service-mgmt/AdditionServiceList.vue'
						),
				},
				{
					// KT
					path: 'additionservicerequest-list',
					component: () =>
						import(
							'../views/common-mgmt/addition-service-mgmt/AdditionServiceRequestList.vue'
						),
				},
			],
		},
		{
			// 부가서비스 요청목록
			path: '/additionservice-requestList',
			component: () =>
				import(
					'../views/common-mgmt/addition-service-mgmt/AdditionServiceRequestList'
				),
		},
		{
			path: '/goods-mgmt/resultPage',
			component: () =>
				import('../views/common-mgmt/organization-mgmt/resultPage.vue'),
		},
		{
			path: '/goods-mgmt/',
			component: () => import('../views/common-mgmt/goods-mgmt/test.vue'),
		},
		{
			// 입고현황
			path: '/device/',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/InStockStatusMgmt.vue'),
			redirect: '/device/normal-in-stock',
			children: [
				{
					path: 'in-stock-status',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockInStatusMgmt/InStockStatus.vue'
						),
				},
				{
					path: 'normal-in-stock',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockInStatusMgmt/NormalInStock.vue'
						),
				},
				{
					path: 'usim-in-stock',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockInStatusMgmt/UsimInStock.vue'
						),
				},
				{
					path: 'open-in-stock',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockInStatusMgmt/OpenInStock.vue'
						),
				},
			],
		},
		{
			// 유심현황
			path: '/usim-status',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/UsimStatus.vue'),
		},
		{
			// 관리대상기기
			path: '/mgmt-target/',
			component: () =>
				import('../views/warehouse-mgmt/stock-mgmt/MgmtTargetDevice.vue'),
			redirect: '/mgmt-target/mgmt-target-device',
			children: [
				{
					path: 'mgmt-target-device',
					component: () =>
						import(
							'../views/warehouse-mgmt/stock-mgmt/MgmtTargetDevice/MgmtTargetDeviceMgmt.vue'
						),
				},
				{
					path: 'mediation-release',
					component: () =>
						import(
							'../views/warehouse-mgmt/stock-mgmt/MgmtTargetDevice/MediationRelease.vue'
						),
				},
			],
		},
		{
			// 이동재고 반품
			path: '/move-stock-rtngud',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/MoveStockRtngud.vue'),
		},
		{
			// 재고현황
			path: '/stock-status',
			component: () =>
				import('../views/warehouse-mgmt/stock-mgmt/StockStatus.vue'),
		},
		{
			// 장기재고
			path: '/longtime-stock',
			component: () =>
				import('../views/warehouse-mgmt/stock-mgmt/LongtimeStock.vue'),
		},
		{
			// 불량기기현황
			path: '/faulty-device-status',
			component: () =>
				import('../views/warehouse-mgmt/stock-mgmt/FaultyDeviceStatus.vue'),
		},
		{
			// 기기이동/이관
			path: '/stock-move-transfer/',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt.vue'),
			redirect: '/stock-move-transfer/stock-move',
			children: [
				{
					path: '/stock-move-transfer/stock-move',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt/StockMove.vue'
						),
				},
				{
					path: '/stock-move-transfer/stock-transfer',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt/StockTransfer.vue'
						),
				},
				{
					path: '/stock-move-transfer/faulty-transfer',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt/FaultyTransfer.vue'
						),
				},
				{
					path: '/stock-move-transfer/sales-transfer',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt/SalesTransfer.vue'
						),
				},
				{
					path: '/stock-move-transfer/rtn-transfer',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt/RtnTransfer.vue'
						),
				},
				{
					path: '/stock-move-transfer/sales-move',
					component: () =>
						import(
							'../views/warehouse-mgmt/device-mgmt/StockMoveTransferMgmt/SalesMove.vue'
						),
				},
			],
		},
		{
			// 이동/이관현황
			path: '/move-status',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/MoveStatus.vue'),
		},
		{
			// 개통이력기기현황
			path: '/open-store-device-status',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/OpenStoreDeviceStatus.vue'),
		},
		{
			// 기기현황
			path: '/device-status',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/DeviceStatus.vue'),
		},
		{
			// 기기/유심현황
			path: '/device-usim/',
			component: () =>
				import('../views/warehouse-mgmt/device-mgmt/DeviceUsimStatus.vue'),
			redirect: '/device-usim/device-status',
			children: [
				{
					path: '/device-usim/device-status',
					component: () =>
						import('../views/warehouse-mgmt/device-mgmt/DeviceStatus.vue'),
				},
				{
					path: '/device-usim/usim-status',
					component: () =>
						import('../views/warehouse-mgmt/device-mgmt/UsimStatus.vue'),
				},
			],
		},
		{
			// 공급처관리
			path: '/provider-mgmt',
			component: () =>
				import('../views/warehouse-mgmt/stock-setting-mgmt/ProviderMgmt.vue'),
		},
		{
			// 보유처관리
			path: '/hold-store-mgmt',
			component: () =>
				import('../views/warehouse-mgmt/stock-setting-mgmt/HoldStoreMgmt.vue'),
		},
		{
			// 신청서작성
			path: '/application-form-creation',
			component: () =>
				import('../views/supply-chain-mgmt/ApplicationFormCreation.vue'),
			props: true,
		},
		{
			// 판매현황
			path: '/sell-status',
			component: () => import('../views/supply-chain-mgmt/SellStatus.vue'),
		},
		{
			// 블랙리스트
			path: '/black-list',
			component: () => import('../views/supply-chain-mgmt/BlackListMgmt.vue'),
		},
		{
			// 신청서매칭
			path: '/application-matching',
			component: () =>
				import('../views/supply-chain-mgmt/ApplicationMatching.vue'),
		},
		{
			// 통계현황
			path: '/stats-mgmt',
			component: () =>
				import('../views/supply-chain-mgmt/StatsMgmt.vue'),
		},
	],
});
// 라우터 네이게이션 가드
// // 라우터에 설정해놓은 meta.auth 와 로그인한 정보가 없을시 login page 로 이동
router.beforeEach((to, from, next) => {
	if (!to.meta.auth && !store.getters.isLogin) {
		console.log('인증이 필요합니다');
		next('/login');
		return;
	}
	// 로그인 한 정보가 있을시 /login url 이동하면 logout 기능요청 후 /login 으로 리다이렉트
	if (to.path === '/login' && store.getters.isLogin) {
		store.dispatch('LOGOUT', 'Y');
	}
	if (to.path === '/sign-up' && store.getters.isLogin) {
		store.dispatch('LOGOUT', 'Y');
	}
	if (to.path === '/user/sign-up' && store.getters.isLogin) {
		store.dispatch('LOGOUT2', 'Y');
	}
	if (to.path === '/store/sign-up' && store.getters.isLogin) {
		store.dispatch('LOGOUT2', 'Y');
	}
	next();
});
