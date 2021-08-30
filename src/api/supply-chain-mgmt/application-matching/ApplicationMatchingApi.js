import {instance} from '../../index.js';
import {jsonToQueryString} from '../../../common/common';

const domain = '/DeviceManagement/ApplicationMatch/';

// 첫 화면데이터
const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getApplicationMatchPage${param}`,
	);
	return response;
};
const getDetailList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getApplicationMatchDetail
${param}`,
	);
	return response;
};
const deviceMatching = async data => {
	const response = await instance.post(`${domain}deviceTypeMatching`, data);
	return response;
};
const cancelDeviceTypeMatching = async data => {
	const response = await instance.post(
		`${domain}cancelDeviceTypeMatching`,
		data,
	);
	return response;
};
const deliveryMatching = async data => {
	const response = await instance.post(`${domain}deliveryMatching`, data);
	return response;
};
const cancelDeliveryMatching = async data => {
	const response = await instance.post(`${domain}cancelDeliveryMatching`, data);
	return response;
};
const getCourierInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getCourierInfo${param}`);
	return response;
};
const deliveryCompleted = async data => {
	const response = await instance.post(`${domain}deliveryCompleted`, data);
	return response;
};
const deliveryCompletedCancel = async data => {
	const response = await instance.post(`${domain}deliveryCompletedCancel`, data);
	return response;
};
const changeCourier = async data => {
	const response = await instance.post(`${domain}changeCourier`, data);
	return response;
};

export {
	getList,
	getDetailList,
	deviceMatching,
	cancelDeviceTypeMatching,
	deliveryMatching,
	cancelDeliveryMatching,
	getCourierInfo,
	deliveryCompleted,
	deliveryCompletedCancel,
	changeCourier
};
