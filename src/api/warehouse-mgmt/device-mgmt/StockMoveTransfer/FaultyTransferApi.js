import { instance } from '../../../index.js';

const domain = 'DeviceManagement/';

const insertFaultyTrans = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/insertFaultyTrans`,
		data,
	);
	return response;
};

export { insertFaultyTrans };
