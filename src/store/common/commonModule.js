import Vue from 'vue';
import Vuex from 'vuex';
import {deviceOverlapCheck, excelDownLoad, excelFormDownload} from '../../api/common/common';

Vue.use(Vuex);
const commonModule = {
	namespaced: true,
	state: {
		excelFormDownloadUrl: `${process.env['VUE_APP_SERVER_AUTH']}download/file/excel/template/`,
		excelDownloadUrl: 'http://192.168.0.19:8080/download/excel/',
	},
	mutations: {},
	actions: {
		// 엑셀 다운로드
		async excelDownload({ commit }, data) {
			try {
				let result = await excelDownLoad(data);
				if (result) {
					const url = window.URL.createObjectURL(
						new Blob([result.data], { type: result.headers['content-type'] }),
					);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `${data.fileName}.xlsx`);
					document.body.appendChild(link);
					link.click();
				}
			} catch (e) {
				alert('알수없는 에러 입니다.');
				console.log(e);
			}
		},
		// 엑셀양식 다운로드
		async excelFormDownload({ commit }, data) {
			try {
				let result = await excelFormDownload(data);
				if (result) {
					return true;
				}
			} catch (e) {
				alert('알수없는 에러 입니다.');
				console.log(e);
			}
		},
		async deviceOverlapCheck({ commit }, data) {
			try {
				let result = await deviceOverlapCheck(data);
				return result.data.data;
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default commonModule;
