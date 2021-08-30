import { instance } from '../../index.js';

const domain = 'DeviceManagement/';

const insertList = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/insertInStock`,
		data,
	);
	return response;
};

const insertWaitList = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/insertWaitInStock`,
		data,
	);
	return response;
};

const deleteList = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/deleteWaitInStock`,
		data,
	);
	return response;
};

const getWaitInStockUsimList = async data => {
	const response = await instance.get(
		`${domain}InStockMgmt/getWaitInStockUsimList`,
		data,
	);
	return response;
};

export { insertList, insertWaitList, deleteList, getWaitInStockUsimList };
