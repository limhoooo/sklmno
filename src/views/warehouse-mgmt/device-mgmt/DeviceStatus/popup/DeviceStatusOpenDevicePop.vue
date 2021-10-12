<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="550">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">개통정보</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<p class="detailText font-red w100P">
							* 개통 날짜 오입력 시 수정 할 수 없습니다.
						</p>
						<h2 class="mainFontS boldWt mainBlack mt20 mb10">개통정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>개통일자</td>
									<td>
										<div>
											<div style="display: inline-block">
												<v-menu
													v-model.trim="menu1"
													:close-on-content-click="false"
													:nudge-right="40"
													transition="scale-transition"
													offset-y
												>
													<template v-slot:activator="{ on, attrs }">
														<v-text-field
															outlined
															readonly
															v-model.trim="formData.openingDate"
															v-bind="attrs"
															v-on="on"
															class="input_custom1"
														></v-text-field>
													</template>
													<v-date-picker
														v-model.trim="formData.openingDate"
														@input="menu1 = false"
														locale="ko-KR"
													></v-date-picker>
												</v-menu>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>영업점</td>
									<td>
										<v-select
											attach
											@input="getOpeningStoreSelectListFnc"
											v-model.trim="formData.saleStoreId"
											outlined
											:items="saleStoreList"
											item-text="storeName"
											item-value="storeId"
											class="select_custom1"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>개통점</td>
									<td>
										<v-select
											attach
											@click="alertFnc"
											@change="setOpeningData"
											v-model="selected"
											return-object
											outlined
											:items="openingStoreList"
											item-text="openStoreName"
											item-value="openStoreId"
											class="select_custom1"
										>
										</v-select>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">고객정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w100">고객명</td>
									<td>
										<span>
											{{ openDeviceDialogData.cusName }}
										</span>
									</td>
									<td class="w100">전화번호</td>
									<td>
										<span v-if="openDeviceDialogData.cusPhone1">
											{{ openDeviceDialogData.cusPhone1 }} -
											{{ openDeviceDialogData.cusPhone2 }} -
											{{ openDeviceDialogData.cusPhone3 }}
										</span>
									</td>
								</tr>
								<tr>
									<td>주소</td>
									<td colspan="3">
										<span v-if="openDeviceDialogData.addr1">
											{{ openDeviceDialogData.addr1 }}
											{{ openDeviceDialogData.addr2 }}
											{{ openDeviceDialogData.zipCode }}
										</span>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">개통메모</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>개통메모</td>
									<td>
										<textarea
											cols="40"
											style="
												border: 1px solid #aaa;
												padding: 10px;
												resize: none;
											"
											placeholder="개통메모를 적어주세요."
											v-model.trim="formData.openingMemo"
										></textarea>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								text
								@click="submit"
								class="backColorMint1 mainWhite borderReset w80"
							>
								저장
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							>
								닫기
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		openDeviceDialogData: {
			type: Object,
			required: true,
		},
		openDeviceDialog: {
			type: Boolean,
		},
	},
	data: () => ({
		selected: {},
		menu1: false,
		dialog: '',
		formData: {
			dvcId: '',
			openingDate: '',
			openingMemo: '',
			saleStoreId: 0,
			openingStoreId: 0,
			parentHierarchy: '',
			parentSaleStoreId: 0,
			deliveryId: 0,
		},
		saleStoreList: [],
		openingStoreList: [],
	}),

	methods: {
		alertFnc() {
			if (this.formData.saleStoreId === 0) {
				alert('먼저 영업점을 선택해 주세요.');
			}
		},
		async submit() {
			if (!this.formData.openingDate) {
				alert('개통일자를 입력해주세요.');
				return;
			}
			if (!this.formData.saleStoreId) {
				alert('영업점을 선택해 주세요.');
				return;
			}
			if (!this.formData.openingStoreId) {
				alert('개통점을 선택해 주세요.');
				return;
			}
			if (
				confirm(
					'개통 날짜 입력 시 수정 할 수 없습니다. \n개통기기와 개통날짜를 다시 한번 확인 부탁드립니다.',
				) === true
			) {
				const result = await this.$store.dispatch(
					'DeviceStatusModule/insertOpening',
					this.formData,
				);
				if (result) {
					this.$emit('resultOpenDeviceDialogFnc');
				}
			}
		},
		setOpeningData() {
			this.formData.openingStoreId = this.selected.openStoreId;
			this.formData.parentHierarchy = this.selected.parentHierarchy;
			this.formData.parentSaleStoreId = this.selected.parentSaleStoreId;
		},
		async getSaleStoreListFnc() {
			const result = await this.$store.dispatch(
				'commonModule/getSaleStoreList',
			);
			this.saleStoreList = result;
		},
		async getOpeningStoreSelectListFnc() {
			this.openingStoreList = [];
			this.formData.openingStoreId = 0;
			this.formData.parentHierarchy = 0;
			this.formData.parentSaleStoreId = 0;
			let data = {
				storeId: this.formData.saleStoreId,
			};
			const result = await this.$store.dispatch(
				'commonModule/getOpeningStoreSelectList',
				data,
			);
			this.openingStoreList = result;
		},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog');
				}
			},
		},
	},
	async created() {
		await this.getSaleStoreListFnc();
		this.formData.dvcId = this.openDeviceDialogData.dvcId;
		this.formData.deliveryId = this.openDeviceDialogData.deliveryId;
		this.dialog = this.openDeviceDialog;
	},
};
</script>

<style scoped>
.rowItemText span {
	font-size: 12px;
	color: #7397a4;
	margin-right: 10px;
}
.rowItemText label {
	font-size: 12px;
	color: #7397a4;
	margin-left: 3px;
	margin-right: 5px;
}
.font-7397A4 {
	color: #7397a4;
}

.inputRowCustom {
	display: inline-flex;
}
.wCustom .v-input {
	width: 180px !important;
}
.inputRowCustom {
	border: 0;
}
</style>
