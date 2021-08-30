import {instance, instanceAuth} from '../../../index.js';
import {jsonToQueryString} from '../../../common/common';

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
const selectStatusList = async data => {
	const response = await instanceAuth.post(
		`dataHandle/retrieveInitEnumData`,
		data,
	);
	return response;
};

export { insertStockMove, innerStockList, selectStatusList };
