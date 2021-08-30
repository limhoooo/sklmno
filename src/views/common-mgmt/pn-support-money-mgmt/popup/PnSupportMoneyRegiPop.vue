<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="550">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">공시지원금 등록</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text>
					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td class="w140">통신사</td>
								<td>
									<v-select
										class="select_custom1"
										:items="codeList.telecom"
										item-text="codeNm"
										item-value="codeSeq"
										outlined
										name="division"
										v-model.trim="telecomData"
									>
									</v-select>
								</td>
							</tr>
							<tr>
								<td>서비스</td>
								<td>
									<v-select
										class="select_custom1"
										:items="codeList.network"
										item-text="codeNm"
										item-value="codeSeq"
										outlined
										name="division"
										v-model.trim="serviceData"
									>
									</v-select>
								</td>
							</tr>
							<tr>
								<td>휴대폰</td>
								<td>
									<v-select
										class="select_custom1"
										:items="goodsList"
										v-model.trim="formData.goodsId"
										item-text="goodsName"
										item-value="goodsId"
										outlined
										name="division"
									>
									</v-select>
								</td>
							</tr>
							<tr>
								<td>요금제</td>
								<td>
									<v-select
										class="select_custom1"
										:items="chargeList"
										v-model.trim="formData.chargeId"
										item-text="chargeName"
										item-value="chargeId"
										outlined
										name="division"
									>
									</v-select>
								</td>
							</tr>
							<tr>
								<td>출고가</td>
								<td>
									<v-text-field
										class="input_custom1"
										v-model.trim="formData.releaseAmt"
										outlined
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>공시지원금</td>
								<td>
									<v-text-field
										class="input_custom1"
										v-model.trim="formData.supportAmt"
										outlined
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>공시일자</td>
								<td>
									<v-menu
										v-model.trim="menu1"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model.trim="formData.releaseDate"
												append-icon="mdi-calendar"
												outlined
												readonly
												v-bind="attrs"
												v-on="on"
												class="datePickerInput input_custom1"
											></v-text-field>
										</template>
										<v-date-picker
											v-model.trim="formData.releaseDate"
											@input="menu1 = false"
											locale="ko-KR"
										></v-date-picker>
									</v-menu>
								</td>
							</tr>
						</table>

						<div class="disFx justify-end mt10">
							<v-btn
								outlined
								class="backColorMint1 mainWhite borderReset w80"
								@click="insertDataFnc"
							>
								등록
							</v-btn>
							<v-btn
								outlined
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								@click="dialog = !dialog"
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
import { nullValidation } from '../../../../common/common';

export default {
	data() {
		return {
			menu1: false,
			formData: {
				goodsId: '',
				chargeId: '',
				releaseAmt: '',
				supportAmt: '',
				releaseDate: '',
			},
		};
	},
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		chargeList() {
			return this.$store.state.PnSupportMoneyMgmtModule.chargeList;
		},
		goodsList() {
			return this.$store.state.PnSupportMoneyMgmtModule.goodsList;
		},
		telecomData: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.telecomData;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.telecomData = newValue;
			},
		},
		serviceData: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.serviceData;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.serviceData = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.regiDialog = newValue;
			},
		},
	},
	methods: {
		async insertDataFnc() {
			let data = {
				goodsId: this.formData.goodsId,
				chargeId: this.formData.chargeId,
				releaseAmt: parseInt(this.formData.releaseAmt),
				supportAmt: parseInt(this.formData.supportAmt),
				releaseDate: this.formData.releaseDate,
			};
			if (!nullValidation(data)) {
				return;
			}
			const result = await this.$store.dispatch(
				'PnSupportMoneyMgmtModule/insertData',
				data,
			);
			if (result) {
				let data = {
					telecom: this.$store.state.PnSupportMoneyMgmtModule.telecomData,
					network: this.$store.state.PnSupportMoneyMgmtModule.serviceData,
				};
				await this.$store.dispatch('PnSupportMoneyMgmtModule/getList', data);
				this.dialog = !this.dialog;
			}
		},
		async selectTelecomFnc(telecom, network) {
			let data = {
				telecom: telecom,
				network: network,
				useYn: 'Y',
				matchingYn: 'Y',
				perPageCnt: 1000,
			};
			await this.$store.dispatch(
				'PnSupportMoneyMgmtModule/chargeGetList',
				data,
			);
		},
		async selectServiceFnc(telecom, network) {
			let data = {
				telecom: telecom,
				network: network,
				useYn: 'Y',
				matchingYn: 'Y',
				perPageCnt: 1000,
			};
			await this.$store.dispatch('PnSupportMoneyMgmtModule/goodsGetList', data);
		},
	},
	watch: {
		telecomData: {
			deep: true,
			handler: function (newVal) {
				this.selectTelecomFnc(newVal, this.serviceData);
				this.selectServiceFnc(newVal, this.serviceData);
			},
		},
		serviceData: {
			deep: true,
			handler: function (newVal) {
				this.selectTelecomFnc(this.telecomData, newVal);
				this.selectServiceFnc(this.telecomData, newVal);
			},
		},
	},
	created() {
		this.selectTelecomFnc(this.telecomData, this.serviceData);
		this.selectServiceFnc(this.telecomData, this.serviceData);
	},
};
</script>

<style scoped>
.v-card__text p {
	width: 80px;
}
.datePickerInput {
	margin: 0;
	padding: 0;
}
</style>
