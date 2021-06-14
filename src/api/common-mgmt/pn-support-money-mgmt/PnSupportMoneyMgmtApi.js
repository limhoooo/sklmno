import { instance, instanceAuth } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'PubNotiManagement/PubNotiMgmt/';

const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getList${param}`);
	return response;
};
const deleteData = async data => {
	const response = await instance.post(`${domain}deleteData`, data);
	return response;
};
const getHistoryList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getHistoryList${param}`);
	return response;
};
const insertData = async data => {
	const response = await instance.post(`${domain}insertData`, data);
	return response;
};

const getrowDataList = async () => {
	const response = await instance.get(`${domain}getRawDataList`);
	return response;
};
const migrationSmartChoiceData = async () => {
	const response = await instanceAuth.post(
		`/dataHandle/migrationSmartChoiceData`,
	);
	return response;
};
const goodsGetList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`GoodsManagement/GoodsMgmt/getList${param}`,
	);
	return response;
};
const chargeGetList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`ChargeManagement/ChargeMgmt/getList${param}`,
	);
	return response;
};

export {
	getList,
	deleteData,
	getHistoryList,
	insertData,
	getrowDataList,
	migrationSmartChoiceData,
	goodsGetList,
	chargeGetList,
};
