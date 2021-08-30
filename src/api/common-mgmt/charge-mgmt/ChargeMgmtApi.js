import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`ChargeManagement/ChargeMgmt/getList${param}`,
	);
	return response;
};

// 등록팝업
const insertStore = async data => {
	const response = await instance.post(
		`ChargeManagement/ChargeMgmt/insertData`,
		data,
	);
	return response;
};

// 요금 삭제
const deleteData = async data => {
	const response = await instance.post(
		`ChargeManagement/ChargeMgmt/deleteData`,
		data,
	);
	return response;
};

// 사용 여부
const updateStoreUse = async data => {
	const response = await instance.post(
		`ChargeManagement/ChargeMgmt/updateUseYn`,
		data,
	);
	return response;
};

// 매칭팝업
const getMatchList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`ChargeManagement/ChargeMgmt/getMatchList${param}`,
	);
	return response;
};

const applyMatchStatus = async data => {
	const response = await instance.post(
		`ChargeManagement/ChargeMgmt/applyMatchStatus`,
		data,
	);
	return response;
};

// 요금수정 팝업
const updateData = async data => {
	const response = await instance.post(
		`ChargeManagement/ChargeMgmt/updateData`,
		data,
	);
	return response;
};

export {
	getList,
	insertStore,
	deleteData,
	getMatchList,
	applyMatchStatus,
	updateData,
	updateStoreUse,
};
