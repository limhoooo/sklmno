import Vue from 'vue';
import Vuex from 'vuex';
import { insertStockTrans } from '../../../../../api/warehouse-mgmt/device-mgmt/StockMoveTransfer/StockTransferApi.js';

Vue.use(Vuex);

const StockTransferModule = {
	namespaced: true,
	state: {
		getListData: [
			{
				아이디: 2,
				번호: '2',
				통신사: 'SKT',
				입고일: '0000-00-00 00:00:00',
				경과일: '000',
				이동일: '0000-00-00 00:00:00',
				재고구분: '판매이동',
				보유처before: '대마',
				보유처after: '최대몇글자가될까요',
				제조사: '삼성전자',
				기기명: '갤럭시노트20울트라',
				모델명: 'SM-998NK',
				기기일련번호: '000000000',
				용량: '512',
				색상: '팬텀블랙',
				입고상태: '정상',
				제품상태: '-',
				외장상태: '구성품누락',
				수량: '1000',
				총입고단가: '10000000',
			},
		],
	},
	getters: {},
	mutations: {},
	actions: {
		async insertList({ commit }, data) {
			try {
				const result = await insertStockTrans(data);
				if (result.data.status === 200) {
					if (result.data.resultCode !== '0000') {
						alert(result.data.resultMsg);
					} else {
						alert('등록 되었습니다.');
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
};

export default StockTransferModule;
