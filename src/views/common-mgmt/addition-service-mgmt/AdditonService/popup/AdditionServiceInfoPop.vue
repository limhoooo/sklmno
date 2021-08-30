<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="500">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">
							부가서비스
							<span v-if="!roleVal"> 수정 </span>
						</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<p class="mainRed mj0">* 필수입력입니다</p>

						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>통신사<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
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
									</td>
								</tr>
								<tr>
									<td>카테고리<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
											class="select_custom1"
											:items="addsvcTypeData"
											item-text="name"
											item-value="value"
											outlined
											v-model.trim="formData.addSvcType"
											:disabled="roleVal"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>부가서비스명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											placeholder="부가서비스명을 입력해주세요."
											class="input_custom1"
											outlined
											v-model.trim="formData.addSvcName"
											:disabled="roleVal"
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>요금<span class="redfont">*</span></td>
									<td>
										<v-text-field
											placeholder="요금을 입력해주세요."
											class="input_custom1"
											outlined
											v-model.trim="formData.addSvcCharge"
											oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
											:disabled="roleVal"
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>메모</td>
									<td>
										<v-text-field
											placeholder="요금을 입력해주세요."
											class="input_custom1"
											outlined
											v-model.trim="formData.addSvcMemo"
											:disabled="roleVal"
										></v-text-field>
									</td>
								</tr>
							</table>
							<div class="disFx justify-end mt10">
								<v-btn
									class="backColorMint1 mainWhite borderReset w80"
									v-if="!roleVal"
									text
									@click="updateDataFnc"
									outlined
								>
									저장
								</v-btn>
								<v-btn
									class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
									text
									@click="dialog = !dialog"
									outlined
								>
									취소
								</v-btn>
							</div>
						</div>
					</v-card-text>
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
				{ name: 'KT', value: 6 },
				{ name: 'LGU', value: 7 },
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
			return this.$store.state.role !== 'A';
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
