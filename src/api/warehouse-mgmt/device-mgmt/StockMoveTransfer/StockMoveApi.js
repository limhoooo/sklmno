import { instance } from '../../../index.js';

const domain = 'DeviceManagement/';

const innerStockList = async data => {
	const response = await instance.get(
		`StockManagement/StockMgmt/innerStockList`,
		data,
	);
	return response;
};

const insertStockMove = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/insertStockMove`,
		data,
	);
	return response;
};

export { insertStockMove, innerStockList };
