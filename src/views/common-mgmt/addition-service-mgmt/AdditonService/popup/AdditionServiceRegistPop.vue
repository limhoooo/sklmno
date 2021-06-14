<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="500">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2 v-if="this.reqYn === 'N'">부가서비스 등록</h2>
						<h2 v-else>부가서비스 요청</h2>
					</v-card-title>

					<v-card-text class="textFieldCustomCont">
						<p><span class="redfont">*</span>필수입력정보</p>
						<div>
							<p>통신사<span class="redfont">*</span></p>
							<v-select
								class="select_custom1"
								:items="codeData.telecom"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								v-model.trim="formData.telecom"
								name="division"
							>
							</v-select>
						</div>
						<div>
							<p>카테고리<span class="redfont">*</span></p>
							<v-select
								class="select_custom1"
								:items="addsvcTypeData"
								item-text="name"
								item-value="value"
								outlined
								v-model.trim="formData.addSvcType"
								name="division1"
							>
							</v-select>
						</div>
						<div>
							<p>부가서비스명<span class="redfont">*</span></p>
							<v-text-field
								placeholder="부가서비스명을 입력해주세요."
								class="input_custom1"
								outlined
								v-model.trim="formData.addSvcName"
							>
							</v-text-field>
						</div>
						<div>
							<p>요금<span class="redfont">*</span></p>
							<v-text-field
								placeholder="요금을 입력해주세요."
								class="input_custom1"
								outlined
								v-model.trim="formData.addSvcCharge"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							>
							</v-text-field>
						</div>
						<div style="padding-right: 10px">
							<v-textarea
								label="메모"
								outlined
								auto-grow
								v-model.trim="formData.addSvcMemo"
								value=""
							></v-textarea>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="insertDataFnc" outlined>
							저장
						</v-btn>
						<v-btn color="primary" text @click="dialog = !dialog" outlined>
							취소
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { insertData } from '../../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceMgmtApi.js';
import {
	commonCodeListFnc,
	nullValidation,
} from '../../../../../common/common.js';

export default {
	props: ['reqYn', 'codeData'],
	data() {
		return {
			codeList: {
				telecom: [],
			},
			addsvcTypeData: [
				{ name: '일반', value: 'NORMAL' },
				{ name: '보험', value: 'INSURANCE' },
			],
			formData: {
				addSvcName: '',
				telecom: 5,
				addSvcType: '',
				addSvcCharge: '',
				addSvcMemo: '',
				delYn: 'N',
				useYn: 'N',
				reqYn: this.reqYn,
			},
		};
	},
	computed: {
		getListData: {
			get() {
				return this.$store.state.AdditionServiceModule.getListData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.getListData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.filterData = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.AdditionServiceModule.registDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.registDialog = newValue;
			},
		},
	},
	methods: {
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('AdditionServiceModule/getList', data);
			console.log('성공');
		},
		async insertDataFnc() {
			try {
				if (!nullValidation(this.formData, ['addSvcMemo'])) {
					return;
				}
				const result = await insertData(this.formData);
				if (result) {
					alert('등록되었습니다.');
					this.dialog = !this.dialog;
					await this.getList(this.filterData);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async commonCodeListFnc() {
			let data = {
				code: ['TELECOM'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.formData.addSvcType = this.addsvcTypeData[0].value;
		},
	},
	created() {
		this.commonCodeListFnc();
	},
};
</script>
