import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/StatisticsManagement/StatisticsMgmt/';

const getStatisticsList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getStatisticsList${param}`);
	return response;
};

export { getStatisticsList };
