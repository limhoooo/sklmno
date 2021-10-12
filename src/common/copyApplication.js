const KTMN = data => {
	let addServiceList = '';
	if (data.join.addServiceList.length > 0) {
		for (let i = 0; i < data.join.addServiceList.length; i++) {
			addServiceList += data.join.addServiceList[i].addSvcName + ',';
		}
	}
	let regi;
	if (data.customer.cusType === 'CORP') {
		regi = data.customer.bizNum;
	} else {
		regi = `${data.customer.cusRegiNum1}-${data.customer.cusRegiNum2}`;
	}
	let msg = `
▶개통요청 
▶고객명:${data.customer.cusName || data.customer.bizName}
▶생년월일:${regi} 
▶개통번호:${data.customer.cusPhone1}-${data.customer.cusPhone2}-${
		data.customer.cusPhone3
	}
▶모델/색상:${data.join.modelName}/${data.join.color}
▶모델일련번호:${data.join.deviceRawBarcode || ''}
▶유심일련번호:${data.join.usimRawBarcode || ''}
▶할인: ${data.join.agreementTypeMsg || ''}
▶할부개월/할부원금:${data.join.instlPeriodTypeMsg || ''}
▶요금제:${data.join.chargeIdString}
▶포인트파크:
▶부가서비스:${data.customer.chargeReductTypeMsg}/${addServiceList}
▶보류사유동의:
    `;
	return msg;
};

const KTJS = data => {
	let addServiceList = '';
	if (data.join.addServiceList.length > 0) {
		for (let i = 0; i < data.join.addServiceList.length; i++) {
			addServiceList += data.join.addServiceList[i].addSvcName + ',';
		}
	}
	let msg = `
[개통요청] 
▶고객명:${data.customer.cusName || data.customer.bizName}
▶개통번호:${data.customer.cusPhone1}-${data.customer.cusPhone2}-${
		data.customer.cusPhone3
	}
▶모델/색상:${data.join.modelName}/${data.join.color}
▶일련번호:${data.join.deviceRawBarcode || ''}
▶유심번호:${data.join.usimRawBarcode || ''}
▶할인옵션: ${data.join.agreementTypeMsg || ''}
▶할부개월수:${data.join.instlPeriodTypeMsg}
▶요금제:${data.join.chargeIdString}
▶부가서비스:${data.customer.chargeReductTypeMsg}/${addServiceList}
    `;
	return msg;
};
const KTCB = data => {
	let addServiceList = '';
	if (data.join.addServiceList.length > 0) {
		for (let i = 0; i < data.join.addServiceList.length; i++) {
			addServiceList += data.join.addServiceList[i].addSvcName + ',';
		}
	}
	// let instlPeriodType;
	// if (data.join.instlPeriodType === 'CASH') {
	// 	instlPeriodType = '현금개통';
	// } else {
	// 	instlPeriodType = '할부개통';
	// }
	let regi;
	if (data.customer.cusType === 'CORP') {
		regi = data.customer.bizNum;
	} else {
		regi = `${data.customer.cusRegiNum1}-${data.customer.cusRegiNum2}`;
	}
	let msg = `
개통요청 
개통유형>${data.basic.beforeOpeningTypeMsg}
고객명>${data.customer.cusName || data.customer.bizName}
개통번호>${data.customer.cusPhone1}-${data.customer.cusPhone2}-${
		data.customer.cusPhone3
	}
주민등록번호>${regi} 
단말모델명>${data.join.modelName}
단말색상> ${data.join.color}
일련번호>${data.join.deviceRawBarcode || ''}
유심번호/선,후불:${data.join.usimRawBarcode || ''} / ${
		data.join.usimPaymentTypeMsg || ''
	}
요금제>${data.join.chargeIdString}
부가서비스>${data.customer.chargeReductTypeMsg}/${addServiceList}
약정유형>${data.join.instlPeriodTypeMsg} ${data.join.agreementTypeMsg || ''}
할부/현금유형>${data.join.instlPeriodTypeMsg}
    `;
	return msg;
};
export { KTMN, KTJS, KTCB };

// 신용조회 복사기능
// 1. 신용조회 고객유형별 Copy 내용
export const copyInfoByCusType = (copyText, item) => {
	switch (item.cusType) {
		case 'INDV':
			copyText.value = `고객명: ${item.cusName}
주민등록번호: ${item.cusRegiNum1}-${item.cusRegiNum2}
`;
			if (item.joinType === 'DVC_CHANGE') {
				copyText.value =
					copyText.value +
					`휴대폰번호: ${item.cusPhone1}-${item.cusPhone2}-${item.cusPhone3}
`;
			}
			break;
		case 'MINORS':
			copyText.value = `고객명: ${item.cusName}
주민등록번호: ${item.cusRegiNum1}-${item.cusRegiNum2}
`;
			if (item.joinType === 'DVC_CHANGE') {
				copyText.value =
					copyText.value +
					`휴대폰번호: ${item.cusPhone1}-${item.cusPhone2}-${item.cusPhone3}
`;
			}
			copyText.value =
				copyText.value +
				`법정대리인 성명: ${item.courtProctorName}
법정대리인 주민등록번호: ${item.courtProctorRegiNum1}-${item.courtProctorRegiNum2}
법정대리인 휴대폰번호: ${item.courtProctorPhone1}-${item.courtProctorPhone2}-${item.courtProctorPhone3}
`;
			break;
		case 'INDV_BSNM':
			copyText.value = `사업자명: ${item.bizName}
사업자번호: ${item.bizNum}
`;
			if (item.joinType === 'DVC_CHANGE') {
				copyText.value =
					copyText.value +
					`휴대폰번호: ${item.bizPhone1}-${item.bizPhone2}-${item.bizPhone3}
`;
			}
			break;
		case 'CORP':
			copyText.value = `법인명: ${item.bizName}
사업자번호: ${item.bizNum}
`;
			if (item.joinType !== 'DVC_CHANGE') {
				copyText.value =
					copyText.value +
					`법인번호: ${item.bizRegiNum1}-${item.bizRegiNum2} 
`;
			}
			if (item.joinType === 'DVC_CHANGE') {
				copyText.value =
					copyText.value +
					`휴대폰번호: ${item.bizPhone1}-${item.bizPhone2}-${item.bizPhone3}
`;
			}
			break;
		case 'FOREIGN':
			copyText.value = `고객명: ${item.cusName}
외국인등록번호: ${item.licenseNum1}-${item.licenseNum2}
`;
			if (item.joinType === 'DVC_CHANGE') {
				copyText.value =
					copyText.value +
					`휴대폰번호: ${item.cusPhone1}-${item.cusPhone2}-${item.cusPhone3}
`;
			}
			if (
				item.telecomName !== 'SKT' ||
				(item.telecomName === 'SKT' && item.joinType !== 'DVC_CHANGE')
			) {
				copyText.value =
					copyText.value +
					`국적: ${item.ntnlCodeMsg}
`;
			}
			if (item.telecomName === 'SKT') {
				copyText.value =
					copyText.value +
					`체류코드: ${item.stayCode} ${item.stayCodeMsg}
`;
			}
			if (
				item.telecomName !== 'SKT' ||
				(item.telecomName === 'SKT' && item.joinType !== 'DVC_CHANGE')
			) {
				copyText.value =
					copyText.value +
					`발급일자: ${item.licenseIssueDate}
`;
			}
			if (item.telecomName === 'SKT') {
				copyText.value =
					copyText.value +
					`만료일자: ${item.licenseExpiredDate}
`;
			}
			break;
	}
};

// 2. 신용조회 result 복사
export const copyCreditResult = (copyText, creditInquiries) => {
	console.log(copyText);
	console.log(creditInquiries);
	if (creditInquiries.length !== 0) {
		for (let i in creditInquiries) {
			copyText.value =
				copyText.value +
				`${i}: ${creditInquiries[i]}
`;
		}
	}
	return creditInquiries;
};
