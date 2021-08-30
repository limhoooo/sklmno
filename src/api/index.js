import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// public API
function createInstanceAuthNone() {
	return axios.create({
		baseURL: process.env['VUE_APP_SERVER_AUTH'],
	});
}
// private API
function createInstanceAuth() {
	const instance = axios.create({
		baseURL: process.env['VUE_APP_SERVER_AUTH'],
		withCredentials: true,
	});
	return setInterceptors(instance);
}
// private API
function createInstance() {
	const instance = axios.create({
		baseURL: process.env['VUE_APP_SERVER'],
		withCredentials: true,
	});
	return setInterceptors(instance);
}
// public API
function excelInstance() {
	return axios.create({
		baseURL: process.env['VUE_APP_SERVER_AUTH'],
		responseType: 'blob',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export const instanceAuth = createInstanceAuth();
export const instance = createInstance();
export const instanceAuthNone = createInstanceAuthNone();
export const instanceExcel = excelInstance();
