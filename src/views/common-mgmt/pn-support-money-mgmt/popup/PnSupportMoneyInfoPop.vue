<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="980">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>공시지원금 정보</h2>
				</v-card-title>
				<v-card-text>
					<div>
						<p>통신사</p>
						<v-select
							class="select_custom1"
							disabled
							:items="codeList.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							v-model.trim="telecomSelectData"
							outlined
							name="division"
						>
						</v-select>
						<p>서비스</p>
						<v-select
							class="select_custom1"
							:items="codeList.network"
							item-text="codeNm"
							item-value="codeSeq"
							v-model.trim="serviceSelectData"
							disabled
							outlined
							name="division"
						>
						</v-select>
					</div>
					<div>
						<p>휴대폰</p>
						<v-select
							class="select_custom1"
							:items="goodsSelectList"
							v-model.trim="goodsSelectData"
							item-text="name"
							item-value="value"
							outlined
							disabled
							name="division"
						>
						</v-select>
						<p>요금제</p>
						<v-select
							class="select_custom1"
							:items="chargeSelectList"
							v-model.trim="chargeSelectData"
							item-text="name"
							item-value="value"
							outlined
							name="division"
							disabled
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
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="4">
								<p>공시지원금</p>
								<v-text-field
									class="input_custom1"
									v-model.trim="formData.supportAmt"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
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
					<div>
						<v-btn
							outlined
							color="primary"
							style="position: absolute; right: 25px"
							@click="insertDataFnc()"
						>
							등록
						</v-btn>
					</div>
					<div>
						<div id="ListTableCont">
							<p>지원금 이력</p>
							<table class="tableStyle01">
								<thead>
									<tr>
										<th>출고가</th>
										<th>공시지원금</th>
										<th>공시일자</th>
										<th>등록일시</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="historyList.length === 0">
										<td colspan="9">데이터가없습니다.</td>
									</tr>
									<tr
										v-else
										v-for="data in historyList"
										v-bind:key="data.index"
									>
										<td>
											{{
												data.releaseAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											}}
											원
										</td>
										<td>
											{{
												data.supportAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											}}
											원
										</td>
										<td>
											{{ data.releaseDate }}
										</td>
										<td>
											{{ data.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
										</td>
										<td>
											<v-btn
												outlined
												color="primary"
												text
												@click="deleteDataFnc(data.pubNotiId)"
											>
												삭제
											</v-btn>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="dialog = !dialog">
						취소
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {
	getHistoryList,
	insertData,
	deleteData,
} from '../../../../api/common-mgmt/pn-support-money-mgmt/PnSupportMoneyMgmtApi';
export default {
	components: {},
	props: ['infoDialogData'],
	data() {
		return {
			menu1: false,
			goodsSelectData: '',
			goodsSelectList: [],
			chargeSelectData: '',
			chargeSelectList: [],
			telecomSelectData: this.infoDialogData.telecomData,
			telecomSelectList: [],
			serviceSelectData: this.infoDialogData.serviceData,
			serviceSelectList: [],
			formData: {
				goodsId: this.infoDialogData.goodsData.goodsId,
				chargeId: this.infoDialogData.chargeData.chargeId,
				releaseAmt: '',
				supportAmt: '',
				releaseDate: '',
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.infoDialog = newValue;
			},
		},
		historyList: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.historyList;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.historyList = newValue;
			},
		},

		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
	},
	methods: {
		async getHistoryListFnc() {
			let data = {
				chargeId: this.infoDialogData.chargeData.chargeId,
				goodsId: this.infoDialogData.goodsData.goodsId,
			};
			await this.$store.dispatch(
				'PnSupportMoneyMgmtModule/getHistoryList',
				data,
			);
		},
		formDataInit() {
			this.formData.releaseAmt = '';
			this.formData.supportAmt = '';
			this.formData.releaseDate = '';
		},
		async insertDataFnc() {
			let data = {
				chargeId: parseInt(this.formData.chargeId),
				goodsId: parseInt(this.formData.goodsId),
				releaseAmt: parseInt(this.formData.releaseAmt),
				releaseDate: this.formData.releaseDate,
				supportAmt: parseInt(this.formData.supportAmt),
			};
			const result = await this.$store.dispatch(
				'PnSupportMoneyMgmtModule/insertData',
				data,
			);
			if (result) {
				this.historyList = [];
				await this.getHistoryListFnc();
				this.formDataInit();
				await this.getList();
			}
		},
		async deleteDataFnc(pubNotiId) {
			try {
				let data = {
					pubNotiId: pubNotiId,
				};
				const conText = '삭제하시겠습니까?';
				if (confirm(conText) === true) {
					await this.$store.dispatch(
						'PnSupportMoneyMgmtModule/deleteData',
						data,
					);
					await this.getHistoryListFnc();
					await this.getList();
				}
			} catch (e) {
				console.log(e);
			}
		},
		getCreatedData() {
			let goodsSelectData = {
				name: this.infoDialogData.goodsData.goodsName,
				value: this.infoDialogData.goodsData.goodsId,
			};
			let chargeSelectData = {
				name: this.infoDialogData.chargeData.chargeName,
				value: this.infoDialogData.chargeData.chargeId,
			};
			let telecomSelectData = {
				name: this.infoDialogData.telecomData,
				value: '',
			};
			let serviceSelectData = {
				name: this.infoDialogData.serviceData,
				value: '',
			};
			this.goodsSelectList.push(goodsSelectData);
			this.goodsSelectData = goodsSelectData.value;
			this.chargeSelectList.push(chargeSelectData);
			this.chargeSelectData = chargeSelectData.value;
			this.telecomSelectList.push(telecomSelectData);
			this.serviceSelectList.push(serviceSelectData);
		},
		async getList() {
			let data = {
				telecom: this.$store.state.PnSupportMoneyMgmtModule.telecomData,
				network: this.$store.state.PnSupportMoneyMgmtModule.serviceData,
			};
			await this.$store.dispatch('PnSupportMoneyMgmtModule/getList', data);
		},
	},
	created() {
		this.getHistoryListFnc();
		this.getCreatedData();
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
