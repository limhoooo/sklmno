import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const BookmarkModule = {
	namespaced: true,
	state: {
		menu: [
			{
				href: '/openingstore-mgmt',
				title: '개통점관리',
			},
			{
				href: '/salestore-mgmt',
				title: '영업점관리',
			},
			{
				href: '/openingstorebcnc-matching',
				title: '개통점/영업점매칭',
			},
			{
				href: '/openingstoreuser-matching',
				title: '개통점/사용자매칭',
			},
			{
				href: '/userrole-mgmt',
				title: '역할관리',
			},
			{
				href: '/organization-mgmt',
				title: '조직관리',
			},
			{
				href: '/goods-mgmt/mobilephonelist',
				title: '상품관리',
			},
			{
				href: '/charge-mgmt/chargelist',
				title: '요금관리',
			},
			{
				href: '/additionservice-mgmt/additionservice-list',
				title: '부가서비스관리',
			},
			{
				href: '/device/normal-in-stock',
				title: '입고/입고현황',
			},
			{
				title: '반품현황',
				href: '/move-stock-rtngud',
			},
			{
				href: '/stock-move-transfer/sales-move',
				title: '기기이동/이관',
			},
			{
				title: '이동/이관현황',
				href: '/move-status',
			},
			{
				title: '개통이력기기현황',
				href: '/open-store-device-status',
			},
			{
				title: '기기현황',
				href: '/device-status',
			},
			{
				title: '기기/유심현황',
				href: '/device-usim/device-status',
			},
			{
				title: '유심현황',
				href: '/usim-status',
			},
			{
				title: '기기/유심현황',
				href: '/device-usim/device-status',
			},
			{
				title: '신청서매칭',
				href: '/application-matching',
			},
			{
				title: '재고현황',
				href: '/stock-status',
			},
			{
				title: '장기재고',
				href: '/longtime-stock',
			},
			{
				title: '불량기기현황',
				href: '/faulty-device-status',
			},
			{
				title: '관리대상기기',
				href: '/mgmt-target/mgmt-target-device',
			},
			{
				title: '공급처관리',
				href: '/provider-mgmt',
			},
			{
				title: '보유처관리',
				href: '/hold-store-mgmt',
			},
			{
				title: '신청서작성',
				href: '/application-form-creation',
			},
			{
				title: '판매현황',
				href: '/sell-status',
			},
			{
				title: '블랙리스트 관리',
				href: '/black-list',
			},
			{
				title: '신용조회',
				href: '/credit-check',
			},
		],
	},
	actions: {
		checkBookmark({ state }, path) {
			return !!state.menu.find(menu => menu.href === path);
		},
	},
};
export default BookmarkModule;
