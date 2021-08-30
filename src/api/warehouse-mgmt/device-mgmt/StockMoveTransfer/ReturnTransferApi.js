import { instance } from '../../../index.js';

const domain = 'DeviceManagement/';

const insertReturnTrans = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/insertReturnTrans`,
		data,
	);
	return response;
};

export { insertReturnTrans };
