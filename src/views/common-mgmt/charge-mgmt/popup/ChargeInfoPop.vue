<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="550">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">
						요금 정보
						<span v-if="!roleVal">수정</span>
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
								<td>통신망<span class="redfont">*</span></td>
								<td>
									<v-select
										attach
										class="select_custom1"
										:items="networkData"
										item-text="name"
										item-value="value"
										outlined
										v-model.trim="formData.network"
										name="division"
										:disabled="roleVal"
									>
									</v-select>
								</td>
							</tr>
							<tr>
								<td>요금제명<span class="redfont">*</span></td>
								<td>
									<v-text-field
										class="input_custom1"
										outlined
										v-model.trim="formData.chargeName"
										:disabled="roleVal"
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>카테고리<span class="redfont">*</span></td>
								<td>
									<v-text-field
										class="input_custom1"
										outlined
										v-model.trim="formData.category"
										:disabled="roleVal"
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>요금<span class="redfont">*</span></td>
								<td>
									<v-text-field
										class="input_custom1"
										outlined
										v-model.trim="formData.chargeAmt"
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
								수정
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
</template>

<script>
import { updateData } from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtApi.js';
import { nullValidation } from '../../../../common/common.js';

export default {
	props: ['infoDialogData'],
	data: () => ({
		telecomData: [
			{ name: 'SKT', value: 5 },
			{ name: 'KT', value: 6 },
			{ name: 'LGU', value: 7 },
		],
		networkData: [
			{ name: 'PHONE_5G', value: 14 },
			{ name: 'PHONE_LTE', value: 15 },
			{ name: 'PHONE_3G', value: 16 },
			{ name: 'PHONE_feature', value: 17 },
			{ name: 'TABLET', value: 18 },
			{ name: 'ETC', value: 19 },
			{ name: 'TABLET_LTE', value: 20 },
			{ name: 'TABLET_3G', value: 21 },
			{ name: 'ETC_LTE_egg', value: 22 },
			{ name: 'TABLET_5G', value: 23 },
			{ name: 'ETC_5G_egg', value: 25 },
		],
		formData: {
			chargeId: '',
			telecom: '5',
			network: '14',
			chargeAmt: '',
			chargeName: '',
			regDate: '',
			category: '',
			chargeCode: '',
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.ChargeListModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.infoDialog = newValue;
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
		filterData: {
			get() {
				return this.$store.state.ChargeListModule.filterData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.filterData = newValue;
			},
		},
		roleVal() {
			return this.$store.state.role !== 'A';
		},
	},
	methods: {
		async getListFnc(data) {
			this.getListData = [];
			await this.$store.dispatch('ChargeListModule/getList', data);
		},
		async updateDataFnc() {
			try {
				const data = {
					chargeId: this.formData.chargeId,
					chargeName: this.formData.chargeName,
					chargeAmt: this.formData.chargeAmt,
					matchingYn: 'N',
					network: this.formData.network,
					telecom: this.formData.telecom,
					category: this.formData.category,
					chargeCode: this.formData.chargeCode,
				};

				if (!nullValidation(data, ['chargeCode'])) {
					return;
				}
				const result = await updateData(data);
				if (result.data.status === 200) {
					alert('수정되었습니다.');
					this.dialog = !this.dialog;
					await this.getListFnc(this.filterData);
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		this.formData.chargeId = this.infoDialogData.chargeId;
		this.formData.telecom = this.infoDialogData.telecom;
		this.formData.network = this.infoDialogData.network;
		this.formData.chargeName = this.infoDialogData.chargeName;
		this.formData.regDate = this.infoDialogData.regDate;
		this.formData.chargeAmt = this.infoDialogData.chargeAmt;
		this.formData.category = this.infoDialogData.category;
		this.formData.chargeCode = this.infoDialogData.chargeCode;
	},
};
</script>

<style></style>
