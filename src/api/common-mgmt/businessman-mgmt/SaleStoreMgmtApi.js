import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common.js';

const getStoreList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`BusinessManManagement/SaleStoreMgmt/getStoreList${param}`,
	);
	return response;
};

const updateStore = async data => {
	const response = await instance.post(
		`BusinessManManagement/SaleStoreMgmt/updateStore`,
		data,
	);
	return response;
};

const updateStoreUse = async data => {
	const response = await instance.post(
		`BusinessManManagement/SaleStoreMgmt/updateStoreUse`,
		data,
	);
	return response;
};

const deleteStore = async data => {
	const response = await instance.post(
		`BusinessManManagement/SaleStoreMgmt/deleteStore`,
		data,
	);
	return response;
};

const insertStoreMap = async data => {
	const response = await instance.post(
		`BusinessManManagement/SaleStoreMgmt/insertStoreMap`,
		data,
	);
	return response;
};

export {
	insertStoreMap,
	getStoreList,
	deleteStore,
	updateStore,
	updateStoreUse,
};
