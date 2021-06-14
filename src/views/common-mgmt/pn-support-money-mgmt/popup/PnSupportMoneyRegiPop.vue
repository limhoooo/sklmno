<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="880">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>공시지원금 등록</h2>
				</v-card-title>
				<v-card-text>
					<div>
						<p>통신사</p>
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
						<p>서비스</p>
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
					</div>
					<div>
						<p>휴대폰</p>
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
						<p>요금제</p>
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
					</div>
					<div>
						<v-row no-gutters>
							<v-col cols="12" sm="4">
								<p>출고가</p>
								<v-text-field
									class="input_custom1"
									v-model.trim="formData.releaseAmt"
									outlined
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="4">
								<p>공시지원금</p>
								<v-text-field
									class="input_custom1"
									v-model.trim="formData.supportAmt"
									outlined
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="4">
								<p>공시일자</p>
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
							</v-col>
						</v-row>
					</div>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="insertDataFnc">
						등록
					</v-btn>
					<v-btn outlined color="primary" text @click="dialog = !dialog">
						취소
					</v-btn>
				</v-card-actions>
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
