import {commonCodeEnumList, commonCodeList} from '../api/common/common';
import {blueStatus, dataCodeName, greenStatus, redStatus} from './enum';
import epostHtml from '../common/epostHtml';
// formData validation
// formData 의 모든 프로퍼티 null check
// 상단 dataCodeName 와 연계해서 alert 메세지

// nullCheck 안할 파라미터만 빼고 체크
export const nullValidation = (formData, noneValidation) => {
	if (!noneValidation) {
		noneValidation = [];
	}
	for (let data in formData) {
		if (!formData[data] && !noneValidation.includes(data)) {
			// 값이
			console.log(data);
			alert(dataCodeName[data] + ' 을(를) 입력해주세요.');
			return false;
		}
	}
	return true;
};
// nullCheck 할 파라미터만 체크
export const nullValidation2 = (formData, validation) => {
	for (let data in formData) {
		if (!formData[data] && validation.includes(data)) {
			console.log(data);
			alert(dataCodeName[data] + ' 을(를) 입력해주세요.');
			return false;
		}
	}
	return true;
};
// email 정규식
export const validateEmail = email => {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(String(email).toLowerCase())) {
		alert('이메일형식이 맞지않습니다. \n(ex: abc@naver.com)');
	}
	return re.test(String(email).toLowerCase());
};

// GET call 시 queryString 변환
export const jsonToQueryString = json => {
	return (
		'?' +
		Object.keys(json)
			.map(function (key) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
			})
			.join('&')
	);
};

// GET 코드리스트
export const commonCodeListFnc = async data => {
	try {
		const result = await commonCodeList(data);
		return result.data.data;
	} catch (e) {
		console.log(e);
	}
};

// GET ENUM 코드리스트
export const commonCodeEnumListFnc = async data => {
	try {
		const result = await commonCodeEnumList(data);
		return result.data.data;
	} catch (e) {
		console.log(e);
	}
};

// GET telecomName
export const getTelecomName = data => {
	if (data === 5) {
		return 'SKT';
	} else if (data === 6) {
		return 'KT';
	} else if (data === 7) {
		return 'LGU';
	}
};

// GET InStockStatusName
export const getInStockStatusName = data => {
	if (data === 'NORMAL') {
		return '정상';
	} else if (data === 'OPEN') {
		return '개봉';
	}
};

// GET productFaultyYnItemsName
export const getProductFaultyYnName = data => {
	if (data === 'N') {
		return '정상';
	} else if (data === 'Y') {
		return '불량';
	}
};

// GET deviceExtrrStatusName
export const getExtrrStatusName = data => {
	if (data === 'T') {
		return '상';
	} else if (data === 'M') {
		return '중';
	} else if (data === 'B') {
		return '하';
	} else if (data === 'F') {
		return '파손';
	}
};

// 날짜 버튼
export const setDate = criteria => {
	let now = new Date(); // 현재 날짜 및 시간
	let week7 = new Date(new Date().setDate(new Date().getDate() - 7)); // 일주일전
	let week15 = new Date(new Date().setDate(new Date().getDate() - 15)); // 보름 전
	let month = new Date(new Date().setMonth(new Date().getMonth() - 1)); // 한달 전
	let start_dt;
	let end_dt;
	if (criteria === 'day') {
		start_dt = getFormatDate(now);
		end_dt = getFormatDate(now);
	} else if (criteria === 'week7') {
		start_dt = getFormatDate(week7);
		end_dt = getFormatDate(now);
	} else if (criteria === 'week15') {
		start_dt = getFormatDate(week15);
		end_dt = getFormatDate(now);
	} else if (criteria === 'month') {
		start_dt = getFormatDate(month);
		end_dt = getFormatDate(now);
	} else if (criteria === 'all') {
		start_dt = '';
		end_dt = '';
	}
	let result = {
		start_dt: start_dt,
		end_dt: end_dt,
	};
	return result;
};
// 날짜 변환
export const getFormatDate = date => {
	let year = date.getFullYear(); //yyyy
	let month = 1 + date.getMonth(); //M
	month = month >= 10 ? month : '0' + month; //month 두자리로 저장
	let day = date.getDate(); //d
	day = day >= 10 ? day : '0' + day; //day 두자리로 저장
	return year + '-' + month + '-' + day;
};

export const isNumber = value => {
	// value에는 문자로된 숫자, 음수도 true
	// 실수(소수점) 체크 안됨 false
	let reg = /^[-|+]?\d+$/;
	return reg.test(value);
};

// 구전산 common.js
export const g_getCmnBarcode = _barcode => {
	//debugger;
	let barcode = _barcode;
	let barcodeSize = barcode.length;
	let cmn_barcode = '';
	let isS20 = false; // 맨뒷자리 문자 제거 여부

	// 1. 바코드의 뒷자리 8자리를 구한다.
	let digit8 = barcode.substring(barcodeSize - 8, barcodeSize);

	// 2. 마지막 문자제거 ( s20은 바코드를 스캔하면 마지막에 문자하나가 추가된다. )
	let digitFirst7 = digit8.substring(0, digit8.length - 1);

	// 3. 7자리가 숫자인지 확인
	if (!isNumber(digitFirst7)) {
		// 8자리중 뒤에서 7자리 구한다. ( s10은 s20과 다르게 바코드를 찍으면 문자가 추가되지 않는다. )
		let digitLast7 = digit8.substring(1, digit8.length);
		if (!isNumber(digitLast7)) {
			// 애플 (문자숫자조합) // 전체 바코드 중 뒤에서 4자리가 공통
			cmn_barcode = _barcode.substring(barcodeSize - 4, barcodeSize);
		} else {
			// S10을 포함한 삼성  //
			cmn_barcode = _barcode.substring(0, 8);
		}
	} else {
		// 바코드 전체가 숫자면 LG ( 현재는 velvet-KT 만 확인함 )
		if (isNumber(_barcode)) {
			cmn_barcode = _barcode.substring(0, 7);
		} else {
			// S20 //
			let uniq_barcode = _barcode.substring(
				_barcode.length,
				_barcode.length - 8,
			);
			cmn_barcode = _barcode.replace(uniq_barcode, '');
			isS20 = true; // S20이면 맨 마지막 바코드를 제거하고 INSERT한다
		}
	}

	return { cmn_barcode: cmn_barcode, isS20: isS20 };
};

export const productCount = dataList => {
	let list = dataList;

	// 정렬
	list.sort(function (a, b) {
		if (a.telecom < b.telecom) return -1;
		if (a.telecom > b.telecom) return 1;
		if (a.stockName < b.stockName) return -1;
		if (a.stockName > b.stockName) return 1;
		if (a.makerName < b.makerName) return -1;
		if (a.makerName > b.makerName) return 1;
		if (a.goodsName < b.goodsName) return -1;
		if (a.goodsName > b.goodsName) return 1;
		if (a.capacity < b.capacity) return -1;
		if (a.capacity > b.capacity) return 1;
		if (a.colorName < b.colorName) return -1;
		if (a.colorName > b.colorName) return 1;
		return 0;
	});

	for (let i = 0; i < list.length; i++) {
		list[i].telcomChk = false;
		list[i].holdStoreChk = false;
		list[i].manufacturerChk = false;
		list[i].deviceChk = false;
		list[i].volumeChk = false;
		list[i].colorChk = false;
		list[i].cntCheck = false;
	}
	for (let i = 0; i < list.length; i++) {
		let cnt = 1;
		let telcomCnt = 1;
		let telcomCheck = false;
		let holdStoreCnt = 1;
		let holdStoreCheck = false;
		let manufacturerCnt = 1;
		let manufacturerCheck = false;
		let deviceCnt = 1;
		let deviceCheck = false;
		let volumeCnt = 1;
		let volumeCheck = false;
		let colorCnt = 1;
		let colorCheck = false;
		list[i].cnt = cnt;
		for (let j = i + 1; j < list.length; j++) {
			if (!list[i].telcomChk && list[i].telecom === list[j].telecom) {
				list[j].telcomChk = true;
				telcomCnt = telcomCnt += 1;
				telcomCheck = true;
			}
			if (
				!list[i].holdStoreChk &&
				list[i].telecom === list[j].telecom &&
				list[i].stockName === list[j].stockName
			) {
				list[j].holdStoreChk = true;
				holdStoreCnt = holdStoreCnt += 1;
				holdStoreCheck = true;
			}
			if (
				!list[i].manufacturerChk &&
				list[i].telecom === list[j].telecom &&
				list[i].stockName === list[j].stockName &&
				list[i].makerName === list[j].makerName
			) {
				list[j].manufacturerChk = true;
				manufacturerCnt = manufacturerCnt += 1;
				manufacturerCheck = true;
			}
			if (
				!list[i].deviceChk &&
				list[i].telecom === list[j].telecom &&
				list[i].stockName === list[j].stockName &&
				list[i].makerName === list[j].makerName &&
				list[i].goodsName === list[j].goodsName
			) {
				list[j].deviceChk = true;
				deviceCnt = deviceCnt += 1;
				deviceCheck = true;
			}
			if (
				!list[i].volumeChk &&
				list[i].telecom === list[j].telecom &&
				list[i].stockName === list[j].stockName &&
				list[i].makerName === list[j].makerName &&
				list[i].goodsName === list[j].goodsName &&
				list[i].capacity === list[j].capacity
			) {
				list[j].volumeChk = true;
				volumeCnt = volumeCnt += 1;
				volumeCheck = true;
			}
			if (
				!list[i].colorChk &&
				list[i].telecom === list[j].telecom &&
				list[i].stockName === list[j].stockName &&
				list[i].makerName === list[j].makerName &&
				list[i].goodsName === list[j].goodsName &&
				list[i].capacity === list[j].capacity &&
				list[i].colorName === list[j].colorName
			) {
				list[j].colorChk = true;
				colorCnt = colorCnt += 1;
				colorCheck = true;
				list[j].cntCheck = true;
				list[i].cnt = cnt += 1;
			}
		}
		// 추가영역
		if (!list[i].telcomChk && telcomCnt === 1) list[i].telcomRow = true;
		if (telcomCheck) list[i].telcomCount = telcomCnt; // 동일한값이 있을시

		if (!list[i].holdStoreChk && holdStoreCnt === 1)
			list[i].holdStoreRow = true;
		if (holdStoreCheck) list[i].holdStoreCount = holdStoreCnt; // 동일한값이 있을시

		if (!list[i].manufacturerChk && manufacturerCnt === 1)
			list[i].manufacturerRow = true;
		if (manufacturerCheck) list[i].manufacturerCount = manufacturerCnt; // 동일한값이 있을시

		if (!list[i].deviceChk && deviceCnt === 1) list[i].deviceRow = true;
		if (deviceCheck) list[i].deviceCount = deviceCnt; // 동일한값이 있을시

		if (!list[i].volumeChk && volumeCnt === 1) list[i].volumeRow = true;
		if (volumeCheck) list[i].volumeCount = volumeCnt; // 동일한값이 있을시

		if (!list[i].colorChk && colorCnt === 1) list[i].colorRow = true;
		if (colorCheck) list[i].colorCount = colorCnt; // 동일한값이 있을시
	}
	return list;
};

export const productCountTo = dataList => {
	let resultArray = [];

	dataList.sort(function (a, b) {
		if (a.telecom < b.telecom) return -1;
		if (a.telecom > b.telecom) return 1;
		if (a.stockName < b.stockName) return -1;
		if (a.stockName > b.stockName) return 1;
		if (a.makerName < b.makerName) return -1;
		if (a.makerName > b.makerName) return 1;
		if (a.goodsName < b.goodsName) return -1;
		if (a.goodsName > b.goodsName) return 1;
		if (a.capacity < b.capacity) return -1;
		if (a.capacity > b.capacity) return 1;
		if (a.colorName < b.colorName) return -1;
		if (a.colorName > b.colorName) return 1;
		return 0;
	});

	dataList.map(item => {
		if (
			resultArray.find(object => {
				if (
					object.telecom === item.telecom &&
					object.stockName === item.stockName &&
					object.makerName === item.makerName &&
					object.goodsName === item.goodsName &&
					object.capacity === item.capacity &&
					object.colorName === item.colorName
				) {
					object.cnt++;
					return true;
				} else {
					return false;
				}
			})
		) {
		} else {
			item.cnt = 1;
			resultArray.push(item);
		}
	});

	console.log(resultArray);
	return resultArray;
};

// 객체 복사
export const objectClone = data => {
	let output = [];
	for (let i in data) {
		output[i] = data[i];
	}
	return output;
};

export const copyObj = obj => {
	const result = {};
	for (let key in obj) {
		if (Array.isArray(obj[key])) {
			let arr = [];
			for (let i = 0; i < obj[key].length; i++) {
				arr.push(obj[key][i]);
			}
			result[key] = arr;
		} else if (obj[key] && typeof obj[key] === 'object') {
			result[key] = copyObj(obj[key]);
		} else {
			if (!obj[key] && obj[key] !== 0) {
				result[key] = '';
			} else if (!obj[key] && obj[key] === 0) {
				result[key] = 0;
			} else {
				result[key] = obj[key];
			}
		}
	}
	return result;
};

// 객체 비교
export const objectCompare = (modifyObj, copyObj) => {
	let result = [];
	for (let data in modifyObj) {
		if (Array.isArray(modifyObj[data])) {
		}
		//객체 안의 객체
		else if (typeof modifyObj[data] == 'object') {
			let depsObj = objectCompare(modifyObj[data], copyObj[data]); // 재귀
			// 객체안의 key 가 0개가 아닐때
			if (depsObj.length !== 0) {
				result.push(depsObj);
			}
		} else if (modifyObj[data] !== copyObj[data]) {
			let obj = {
				title: dataCodeName[data],
				value: data,
				data: copyObj[data],
				changeData: modifyObj[data],
			};
			result.push(obj);
		}
	}
	return result;
};

export const htmlParse = changeDataTextList => {
	let html = '';
	for (let i = 0; i < changeDataTextList.length; i++) {
		if (changeDataTextList[i].changeData) {
			html += `<span style="font-weight: bold">${changeDataTextList[i].title} : </span>
                <span>${changeDataTextList[i].data}</span> >
                   <span>${changeDataTextList[i].changeData}</span><br/>`;
		} else {
			html += `<span style="font-weight: bold">${changeDataTextList[i].title} : </span>
                <span>${changeDataTextList[i].data}</span><br/>`;
		}
	}
	return html;
};
export const setNewDataFnc = (obj, key, value) => {
	if (Object.keys(obj).includes(key)) {
		obj[key] = value;
	} else {
		for (let key1 in obj) {
			if (
				typeof obj[key1] === 'object' &&
				Object.keys(obj[key1]).includes(key)
			) {
				obj[key1] = setNewDataFnc(obj[key1], key, value);
			}
		}
	}
	return obj;
};

export const formatToNumber = value => {
	return Number(value.replace(/,/gi, ''));
};

export const confirmFor = state => {
	let text = '';
	switch (state) {
		case 'modify':
			text = '수정하시겠습니까?';
			break;
		case 'save':
			text = '저장하시겠습니까?';
			break;
		case 'return':
			text = '변경을 취소하시겠습니까?';
			break;
	}
	return confirm(text);
};

export const alertFor = state => {
	let text = '';
	switch (state) {
		case 'noChange':
			text = '변경된 내용이 없습니다.';
			break;
		case 'successToSave':
			text = '등록되었습니다.';
			break;
		case 'error':
			text = '등록에 실패하였습니다.';
			break;
	}
	alert(text);
};
export const compareTime = Time => {
	const today = new Date();
	const timeValue = new Date(Time);

	const betweenTime = Math.floor(
		(today.getTime() - timeValue.getTime()) / 1000 / 60,
	);
	if (betweenTime < 1) return '방금전';
	if (betweenTime < 60) {
		return `${betweenTime}분전`;
	}
	const betweenTimeHour = Math.floor(betweenTime / 60);
	if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간전`;
	}

	const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
	if (betweenTimeDay < 365) {
		return `${betweenTimeDay}일전`;
	}
	return `${Math.floor(betweenTimeDay / 365)}년전`;
};
export const statusColor = status => {
	// eslint-disable-next-line no-prototype-builtins
	if (redStatus.hasOwnProperty(status)) {
		return 'font-hotpink';
	}
	// eslint-disable-next-line no-prototype-builtins
	if (blueStatus.hasOwnProperty(status)) {
		return 'font-royalblue';
	}
	// eslint-disable-next-line no-prototype-builtins
	if (greenStatus.hasOwnProperty(status)) {
		return 'font-green';
	}
};
export const unescapeHtml = str => {
	if (str == null) {
		return '';
	}
	return str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&#39;/g, "'");
};
export const epostPrint = data => {
	data.delivAreaCd1 = data.delivAreaCd.substring(0, 2);
	data.delivAreaCd2 = data.delivAreaCd.substring(2, 5);
	data.delivAreaCd3 = data.delivAreaCd.substring(5, data.delivAreaCd.length);
	if (data.barcode) {
		// 기기 바코드
		data.barcode = `기기 고유번호 : ******${data.barcode.slice(
			-4,
			data.barcode.length,
		)}`;
	} else {
		data.barcode = '';
	}
	if (data.usimBarcode) {
		// 유심 바코드
		data.usimBarcode = `유심 고유번호 : ******${data.usimBarcode.slice(
			-4,
			data.usimBarcode.length,
		)}`;
	} else {
		data.usimBarcode = '';
	}
	if (!data.recMob) {
		// 고객 비상연락처
		data.recMob = '';
	}

	let html = epostHtml(data);
	let OpenWindow = window.open(
		'',
		'_blank',
		'width=1365, height=850, menubars=no, scrollbars=auto',
	);
	OpenWindow.document.write(html);
	setTimeout(() => {
		OpenWindow.print();
		OpenWindow.close();
	}, 500);
};

export const initData = data => {
	for (let i in data) {
		if (typeof data[i] == 'object') {
			initData(data[i]);
		}
		if (typeof data[i] == 'number') {
			data[i] = 0;
		}
		if (typeof data[i] == 'string') {
			data[i] = '';
		}
	}
};
// YY-MM-DD 날짜 포맷
export const getToday = () => {
	let date = new Date();
	let year = date.getFullYear();
	let month = ('0' + (1 + date.getMonth())).slice(-2);
	let day = ('0' + date.getDate()).slice(-2);

	return year + '-' + month + '-' + day;
};
// 용량 중복체크
export const findCapacity = (text) => {
	return !(
		text.includes('(64G)') ||
		text.includes('(128G)') ||
		text.includes('(256G)') ||
		text.includes('(512G)') ||
		text.includes('(128G)')
	);
};