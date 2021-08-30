import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'ProviderManagement/ProviderMgmt/';

const getProviderList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getProviderList${param}`);
	return response;
};
const insertProviderFnc = async data => {
	const response = await instance.post(`${domain}insertProvider`, data);
	return response;
};
const deleteProvider = async data => {
	const response = await instance.post(`${domain}deleteProvider`, data);
	return response;
};

const updateProvider = async data => {
	const response = await instance.post(`${domain}updateProvider`, data);
	return response;
};

const updateProviderUse = async data => {
	const response = await instance.post(`${domain}updateProviderUse`, data);
	return response;
};

export {
	getProviderList,
	insertProviderFnc,
	deleteProvider,
	updateProviderUse,
	updateProvider,
};
