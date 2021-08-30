// 옵션리스트 직렬화
export const optionListJson = optionList => {
	let jsonData = {};

	function extracted(key, item, title, id, name) {
		jsonData[title + optionList[key][item][id]] = optionList[key][item][name];
	}

	for (let key in optionList) {
		for (let item in optionList[key]) {
			if (optionList[key][item].value)
				jsonData[optionList[key][item].value] = optionList[key][item].name;
			extracted(key, item, 'charge_', 'chargeId', 'chargeName');
			extracted(key, item, 'courier_', 'codeSeq', 'codeNm');
			extracted(key, item, 'goods_', 'goodsId', 'goodsName');
			if (key === 'openingStoreItems')
				extracted(key, item, 'openingStore_', 'openStoreId', 'openStoreName');
			if (key === 'saleStoreItems')
				extracted(key, item, 'saleStore_', 'storeId', 'storeName');
			if (key === 'storeMemberItems')
				extracted(key, item, 'storeMember_', 'seq', 'name');
			if (key === 'existTelecomItems')
				extracted(key, item, 'existTelecomCode_', 'codeSeq', 'codeNm');
		}
	}
	// 하드코딩 value 값
	jsonData['BEFORE_OPENING'] = '선개통';
	jsonData['AFTER_OPENING'] = '후개통';
	jsonData['CHOICE_AGRMN'] = '선택약정';
	jsonData['PUBNOTI_SUPAMT'] = '공시지원금';
	jsonData['PS'] = '택배';
	jsonData['QUICK'] = '퀵';
	jsonData['DIRECT'] = '직접전달';
	jsonData['ACC_TRNS'] = '계좌이체';
	jsonData['CARD_PAY'] = '카드';
	jsonData['GIRO'] = '지로';

	console.log(jsonData);
	return jsonData;
};
export const changeDataText = (temp, optionListJsonData) => {
	let changeDataList = [];
	for (let i = 0; i < temp.length; i++) {
		for (let j = 0; j < temp[i].length; j++) {
			changeDataList.unshift(temp[i][j]);
		}
	}

	console.log(changeDataList);
	for (let i = 0; i < changeDataList.length; i++) {
		if (optionListJsonData[changeDataList[i].data]) {
			changeDataList[i].data = optionListJsonData[changeDataList[i].data];
		}
		if (optionListJsonData[changeDataList[i].changeData]) {
			changeDataList[i].changeData =
				optionListJsonData[changeDataList[i].changeData];
		}
		// 요금제
		if (
			changeDataList[i].value === 'chargeId' &&
			optionListJsonData['charge_' + changeDataList[i].data]
		) {
			changeDataList[i].data =
				optionListJsonData['charge_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'chargeId' &&
			optionListJsonData['charge_' + changeDataList[i].changeData]
		) {
			changeDataList[i].changeData =
				optionListJsonData['charge_' + changeDataList[i].changeData];
		}
		// 택배사
		if (
			changeDataList[i].value === 'courierCodeId' &&
			optionListJsonData[`courier_${changeDataList[i].data}`]
		) {
			changeDataList[i].data =
				optionListJsonData['courier_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'courierCodeId' &&
			optionListJsonData[`courier_${changeDataList[i].changeData}`]
		) {
			changeDataList[i].changeData =
				optionListJsonData['courier_' + changeDataList[i].changeData];
		}
		// 기기
		if (
			changeDataList[i].value === 'goodsId' &&
			optionListJsonData['goods_' + changeDataList[i].data]
		) {
			changeDataList[i].data =
				optionListJsonData['goods_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'goodsId' &&
			optionListJsonData['goods_' + changeDataList[i].changeData]
		) {
			changeDataList[i].changeData =
				optionListJsonData['goods_' + changeDataList[i].changeData];
		}
		// 개통점
		if (
			changeDataList[i].value === 'openingStoreId' &&
			optionListJsonData['openingStore_' + changeDataList[i].data]
		) {
			changeDataList[i].data =
				optionListJsonData['openingStore_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'openingStoreId' &&
			optionListJsonData['openingStore_' + changeDataList[i].changeData]
		) {
			changeDataList[i].changeData =
				optionListJsonData['openingStore_' + changeDataList[i].changeData];
		}
		// 영업점
		if (
			changeDataList[i].value === 'saleStoreId' &&
			optionListJsonData['saleStore_' + changeDataList[i].data]
		) {
			changeDataList[i].data =
				optionListJsonData['saleStore_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'saleStoreId' &&
			optionListJsonData['saleStore_' + changeDataList[i].changeData]
		) {
			changeDataList[i].changeData =
				optionListJsonData['saleStore_' + changeDataList[i].changeData];
		}
		// 등록자
		if (
			changeDataList[i].value === 'applRegiUserId' &&
			optionListJsonData['storeMember_' + changeDataList[i].data]
		) {
			changeDataList[i].data =
				optionListJsonData['storeMember_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'applRegiUserId' &&
			optionListJsonData['storeMember_' + changeDataList[i].changeData]
		) {
			changeDataList[i].changeData =
				optionListJsonData['storeMember_' + changeDataList[i].changeData];
		}
		// 기존통신사
		if (
			changeDataList[i].value === 'existTelecomCodeId' &&
			optionListJsonData['existTelecomCode_' + changeDataList[i].data]
		) {
			changeDataList[i].data =
				optionListJsonData['existTelecomCode_' + changeDataList[i].data];
		}
		if (
			changeDataList[i].value === 'existTelecomCodeId' &&
			optionListJsonData['existTelecomCode_' + changeDataList[i].changeData]
		) {
			changeDataList[i].changeData =
				optionListJsonData['existTelecomCode_' + changeDataList[i].changeData];
		}
	}
	return changeDataList;
};
