import axios from 'axios';
import {setInterceptors} from './common/interceptors';

function createInstanceAuthNone() {
	return axios.create({
		// 동혁씨 ip로 잠시 바꿈
		//baseURL: process.env['VUE_APP_SERVER'],
		baseURL: process.env['VUE_APP_SERVER_AUTH'],
	});
}

// 액시오스 초기화 함수
function createInstanceAuth() {
	const instance = axios.create({
		// 동혁씨 ip로 잠시 바꿈
		baseURL: process.env['VUE_APP_SERVER_AUTH'],
		withCredentials: true,
	});
	return setInterceptors(instance);
}

// 액시오스 초기화 함수
function createInstance() {
	const instance = axios.create({
		baseURL: process.env['VUE_APP_SERVER'],
		withCredentials: true,
	});
	return setInterceptors(instance);
}
// 액시오스 초기화 함수
function excelInstance() {
	return axios.create({
		baseURL: process.env['VUE_APP_SERVER_AUTH'],
		responseType: 'blob',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
function instanceNone() {
	return axios.create({
		withCredentials: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
			'Access-Control-Max-Age': '86400',
		},
	});
}
export const instanceAuth = createInstanceAuth();
export const instance = createInstance();
export const instanceAuthNone = createInstanceAuthNone();
export const instanceExcel = excelInstance();
export const instanceNone1 = instanceNone();
