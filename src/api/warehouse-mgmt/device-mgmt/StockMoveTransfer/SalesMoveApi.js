import { instance } from '../../../index.js';
import { jsonToQueryString } from '@/common/common';

const domain = 'DeviceManagement/';

const insertSellMove = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/insertSellMove`,
		data,
	);
	return response;
};

const deleteList = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/deleteMoveStock`,
		data,
	);
	return response;
};

const getMoveAndTrnsList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`DeviceManagement/MoveStockMgmt/getMoveAndTrnsList/SELL_MOVE${param}`,
	);
	return response;
};

const updateSellMove = async data => {
	const response = await instance.post(
		`${domain}MoveStockMgmt/updateSellMove`,
		data,
	);
	return response;
};

export { insertSellMove, deleteList, getMoveAndTrnsList, updateSellMove };
