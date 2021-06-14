<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="1100">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>매칭 관리</h2>
				</v-card-title>

				<v-card-text>
					<div class="titleCont" style="display: block !important">
						<p class="subTitle">매칭 대기 및 중복 목록</p>
						<div id="SearchBoxCont">
							<div>
								<div class="filterCont">
									<p>통신사</p>
									<v-select
										class="select_custom1"
										:items="codeList.telecom"
										item-text="codeNm"
										item-value="codeSeq"
										outlined
										@change="selectedTelecomList($event)"
										v-model.trim="searchForm.telecom"
									></v-select>
								</div>
								<div class="filterCont">
									<p>통신망</p>
									<v-select
										class="select_custom1"
										:items="codeList.network"
										item-text="codeNm"
										item-value="codeSeq"
										outlined
										@change="selectedNetworkList($event)"
										v-model.trim="searchForm.network"
									></v-select>
								</div>
							</div>
						</div>
						<div id="BtnCont">
							<v-btn @click="submitSearchForm">검색</v-btn>
							<v-btn @click="dataReset">초기화</v-btn>
						</div>

						<div class="btnCont">
							<v-btn color="primary" text outlined @click="applyMatchStatusFnc">
								매칭완료
							</v-btn>
							<v-btn
								color="primary"
								style="margin-left: 8px"
								text
								@click="dialog = !dialog"
								outlined
							>
								취소
							</v-btn>
						</div>
					</div>
					<table class="machingTable">
						<thead>
							<tr>
								<th>그룹</th>
								<th>선택</th>
								<th>상품명</th>
								<th>통신망</th>
								<th>통신사</th>
								<th>사용여부</th>
								<th>매칭 여부</th>
								<th>스마트초이스 여부</th>
								<th>등록일</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in getMatchListData" :key="item.index">
								<td>
									<input
										type="checkbox"
										:value="item.chargeId"
										v-model.trim="formData.checkValue"
									/>
								</td>
								<td>
									<input
										type="radio"
										name="usechargeId"
										:value="item.chargeId"
										v-model.trim="formData.radioValue"
									/>
								</td>
								<td>{{ item.chargeName }}</td>
								<td>{{ item.networkName }}</td>
								<td>{{ item.telecomName }}</td>
								<td>{{ item.useYn }}</td>
								<td>{{ item.matchingYn }}</td>
								<td v-if="item.originKey === 'S'">Y</td>
								<td v-else>N</td>
								<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
							</tr>
						</tbody>
					</table>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text outlined @click="applyMatchStatusFnc">
						매칭완료
					</v-btn>
					<v-btn color="primary" text @click="dialog = !dialog" outlined>
						취소
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {
	applyMatchStatus,
	getMatchList,
} from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtApi.js';
import { commonCodeListFnc } from '../../../../common/common.js';

export default {
	data: () => ({
		getMatchListData: [],
		searchForm: {
			telecom: '0',
			network: '0',
		},
		codeList: {
			telecom: [],
			network: [],
		},
		formData: {
			checkValue: [],
			radioValue: 0,
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.ChargeListModule.matchingDialog;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.matchingDialog = newValue;
			},
		},
		getListData: {
			get() {
				return this.$store.state.ChargeListModule.getListData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.getListData = newValue;
			},
		},
	},
	methods: {
		async getListFnc(data) {
			this.getListData = [];
			await this.$store.dispatch('ChargeListModule/getList', data);
		},
		async getMatchListFnc(data) {
			try {
				this.getMatchListData = [];
				const result = await getMatchList(data);
				if (result) {
					this.getMatchListData = result.data.data.resultList;
				}
			} catch (error) {
				console.log(error);
			}
		},
		async selectedTelecomList(val) {
			let data = {
				telecom: val,
				network: this.searchForm.network,
			};
			await this.getMatchListFnc(data);
		},
		async selectedNetworkList(val) {
			let data = {
				telecom: this.searchForm.telecom,
				network: val,
			};
			await this.getMatchListFnc(data);
		},
		async submitSearchForm() {
			await this.getMatchListFnc(this.searchForm);
		},
		dataReset() {
			this.searchForm.telecom = '0';
			this.searchForm.network = '0';
		},
		async applyMatchStatusFnc() {
			const data = {
				groupChargeId: this.formData.checkValue,
				useChargeId: this.formData.radioValue,
			};
			const result = await applyMatchStatus(data);
			if (result) {
				alert('매칭 완료되었습니다.');
				this.dialog = !this.dialog;
				this.getListFnc();
			}
		},
		originKeyText(key) {
			console.log(key);
		},
		async commonCodeListFnc() {
			let data = {
				code: ['TELECOM', 'NETWORK'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.codeList.network = commonCodeList.codeList.NETWORK;
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '0' });
			this.codeList.network.unshift({ codeNm: '전체', codeSeq: '0' });
		},
	},
	created() {
		this.getMatchListFnc();
		this.commonCodeListFnc();
	},
};
</script>
<style scoped>
.filterCont {
	margin-right: 80px;
}
.subTitle {
	color: #003a53;
	font-weight: bold;
	padding-bottom: 5px;
}
.btnCont {
	display: flex;
	justify-content: flex-end;
	padding-top: 10px;
}
</style>
