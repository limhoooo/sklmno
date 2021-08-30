import { instance, instanceExcel } from '../../index.js';

const domain = 'DeviceManagement/';

const getList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(
		`${domain}InStockMgmt/getWaitInStockList/${param}`,
	);
	return response;
};

const insertList = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/insertInStock`,
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

const insertWaitList = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/insertWaitInStock`,
		data,
	);
	return response;
};

const insertInStockWaitExcel = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/insertInStockWaitExcel`,
		data,
	);
	return response;
};
const insertInStockWaitExcelException = async data => {
	const response = await instanceExcel.post(
		`/download/excel/insertInStockWaitExcelException`,
		data,
	);
	return response;
};

export {
	getList,
	insertList,
	deleteList,
	insertWaitList,
	insertInStockWaitExcel,
	insertInStockWaitExcelException,
};
