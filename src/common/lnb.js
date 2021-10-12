function lnb(data, st) {
	let menu = [
		{
			title: '사업자관리',
			icon: 'fab fa-black-tie',
			child: [
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
			],
		},
		{
			title: '조직관리',
			icon: 'fas fa-sitemap',
			child: [
				{
					href: '/organization-mgmt',
					title: '조직관리',
				},
				{
					href: '/userrole-mgmt',
					title: '역할관리',
				},
			],
		},
		{
			title: '상품관리',
			icon: 'fa fa-balance-scale',
			href: '/goods-mgmt',
			alias: [
				'/goods-mgmt/mobilephonelist',
				'/goods-mgmt/mobilephone-requestlist',
			],
		},
		{
			title: '요금관리',
			icon: 'fa fa-calculator',
			href: '/charge-mgmt',
			alias: ['/charge-mgmt/chargelist', '/charge-mgmt/chargerequest-list'],
		},
		{
			title: '부가서비스관리',
			icon: 'fa fa-chart-area',
			href: '/additionservice-mgmt',
			alias: [
				'/additionservicelist/additionservice-list',
				'/additionservicelist/additionservicerequest-list',
			],
		},
	];
	if (data === 'CW' || data === 'CWS') {
		let obj = {
			title: '기기관리',
			icon: 'fas fa-tablet-alt',
			child: [
				{
					title: '입고/입고현황',
					href: '/device',
					alias: [
						'/device/normal-in-stock',
						'/device/open-in-stock',
						'/device/usim-in-stock',
						'/device/in-stock-status',
					],
				},
				{
					title: '반품현황',
					href: '/move-stock-rtngud',
				},
				{
					title: '기기이동/이관',
					href: '/stock-move-transfer',
					alias: [
						'/stock-move-transfer/sales-move',
						'/stock-move-transfer/stock-move',
						'/stock-move-transfer/stock-transfer',
						'/stock-move-transfer/faulty-transfer',
						'/stock-move-transfer/sales-transfer',
						'/stock-move-transfer/rtn-transfer',
					],
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
					title: '기기/유심현황',
					href: '/device-usim',
					alias: ['/device-usim/device-status', '/device-usim/usim-status'],
				},
			],
		};
		if (data === 'CWS') {
			obj.child.push({
				title: '신청서매칭',
				href: '/application-matching',
			});
		}
		menu.push(obj);
		menu.push({
			title: '재고관리',
			icon: 'fab fa-stack-overflow',
			child: [
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
					href: '/mgmt-target',
					alias: [
						'/mgmt-target/mgmt-target-device',
						'/mgmt-target/mediation-release',
					],
				},
			],
		});
		menu.push({
			title: '재고 환경 설정',
			icon: 'fas fa-layer-group',
			child: [
				{
					title: '공급처관리',
					href: '/provider-mgmt',
				},
				{
					title: '보유처관리',
					href: '/hold-store-mgmt',
				},
			],
		});
	}
	if (data === 'CS' || data === 'CWS') {
		menu.push({
			title: '판매관리',
			icon: 'fas fa-coins',
			child: [
				// 상용 배포시 주석처리
				{
					title: '신용조회',
					href: '/credit-check',
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
			],
		});
	}
	if (st === '3b14c9d61a1ce5782698616844edc9ee') {
		menu.push({
			title: '통계관리',
			icon: 'fas fa-chart-line',
			href: '/stats-mgmt',
		});
	}
	return menu;
}

module.exports = lnb;
