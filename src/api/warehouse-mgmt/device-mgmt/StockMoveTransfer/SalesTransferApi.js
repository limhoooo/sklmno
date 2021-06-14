import { instance } from '../../../index.js';

const domain = 'DeviceManagement/';

const insertSellTrans = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/insertSellTrans`,
		data,
	);
	return response;
};

export { insertSellTrans };
