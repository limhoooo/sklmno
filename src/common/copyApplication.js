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
주민번호>${regi} 
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
