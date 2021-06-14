<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="500">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>
							부가서비스
							<span v-if="!roleVal"> 수정 </span>
						</h2>
					</v-card-title>

					<v-card-text class="textFieldCustomCont">
						<p><span class="redfont">*</span>필수입력정보</p>
						<div>
							<p>통신사<span class="redfont">*</span></p>
							<v-select
								class="select_custom1"
								:items="telecomData"
								item-text="name"
								item-value="value"
								outlined
								v-model.trim="formData.telecom"
								name="division"
								:disabled="roleVal"
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
								:disabled="roleVal"
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
								:disabled="roleVal"
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
								:disabled="roleVal"
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
								:disabled="roleVal"
							></v-textarea>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							v-if="!roleVal"
							text
							@click="updateDataFnc"
							outlined
						>
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
import { updateData } from '../../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceMgmtApi.js';

export default {
	props: ['infoDialogData'],
	data() {
		return {
			formData: {
				telecom: 0,
				addSvcType: '',
				addSvcName: '',
				addSvcCharge: '',
				addSvcMemo: '',
			},
			telecomData: [
				{ name: 'SKT', value: 5 },
				{ name: 'KT', value: 7 },
				{ name: 'LGU', value: 6 },
			],
			addsvcTypeData: [
				{ name: '일반', value: 'NORMAL' },
				{ name: '보험', value: 'INSURANCE' },
			],
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
		roleVal() {
			let result;
			if (!this.$store.state.role) {
				result = true;
			} else {
				result = false;
			}
			return result;
		},
		dialog: {
			get() {
				return this.$store.state.AdditionServiceModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('AdditionServiceModule/getList', data);
		},
		async updateDataFnc() {
			const data = {
				telecom: this.formData.telecom,
				addSvcType: this.formData.addSvcType,
				addSvcCharge: this.formData.addSvcCharge,
				addSvcId: this.infoDialogData.addSvcId,
				addSvcName: this.formData.addSvcName,
				addSvcMemo: this.formData.addSvcMemo,
			};
			await updateData(data);
			this.dialog = !this.dialog;
			alert('수정되었습니다.');
			await this.getList(this.filterData);
		},
	},
	created() {
		this.formData.telecom = this.infoDialogData.telecom;
		this.formData.addSvcType = this.infoDialogData.addSvcType;
		this.formData.addSvcName = this.infoDialogData.addSvcName;
		this.formData.addSvcCharge = this.infoDialogData.addSvcCharge;
		this.formData.addSvcMemo = this.infoDialogData.addSvcMemo;
	},
};
</script>
