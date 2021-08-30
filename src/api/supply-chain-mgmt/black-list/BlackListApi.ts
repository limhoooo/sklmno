import { jsonToQueryString } from '../../../common/common';
import { filterData } from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import { instance } from '../../../api/index';

const domain = '/BlackManagement/BlackMgmt/';

const getList = async (data: filterData) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getBlackPage${param}`);
	return response;
};
const getBlackDetailList = async (data: filterData) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getBlackDetailList${param}`);
	return response;
};

const deleteBlackListGroup = async (data: Array<number>) => {
	const response = await instance.post(`${domain}deleteBlackListGroup`, data);
	return response;
};
const deleteBlackList = async (data: Array<number>) => {
	const response = await instance.post(`${domain}deleteBlackList/${data}`);
	return response;
};

const insertBlack = async (data: any) => {
	const response = await instance.post(`${domain}insertBlack`, data);
	return response;
};
const updateBlackList = async (data: any) => {
	const response = await instance.post(`${domain}updateBlackList`, data);
	return response;
};

export {
	getList,
	deleteBlackListGroup,
	insertBlack,
	getBlackDetailList,
	deleteBlackList,
	updateBlackList,
};
