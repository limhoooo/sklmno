import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'BusinessManManagement/OpeningStoreMgmt/';

const getStoreList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getStoreList${param}`);
	return response;
};
const updateStoreUse = async data => {
	const response = await instance.post(`${domain}updateStoreUse`, data);
	return response;
};
const deleteStore = async data => {
	const response = await instance.post(`${domain}deleteStore`, data);
	return response;
};
const updateStore = async data => {
	const response = await instance.post(`${domain}updateStore`, data);
	return response;
};
const insertStore = async data => {
	const response = await instance.post(`${domain}insertStore`, data);
	return response;
};

export { getStoreList, updateStoreUse, deleteStore, updateStore, insertStore };
