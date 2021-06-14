import { instance } from '../../../index.js';

const domain = 'DeviceManagement/';

const insertStockTrans = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/insertStockTrans`,
		data,
	);
	return response;
};

export { insertStockTrans };
