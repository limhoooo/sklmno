<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="700"
				style="border-radius: 0 !important"
			>
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">고객정보 수정</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<div class="new_popTable1">
							<h2 class="mb10 mainBlack mainFontS mainBlack1">고객정보</h2>
							<table class="w100P">
								<tr>
									<td class="w120">고객명</td>
									<td>
										<input
											type="text"
											class="cursorDefault borderContColor1 borderRadi3Px"
											v-model.trim="formData.cusName"
										/>
									</td>
									<td>전화번호</td>
									<td>
										<input
											type="text"
											class="cursorDefault borderContColor1 borderRadi3Px"
											v-model.trim="formData.cusPhone1"
											style="
												display: inline-block;
												width: 40px;
												text-align: center;
											"
											maxlength="3"
										/>
										<span>-</span>
										<input
											type="text"
											class="cursorDefault borderContColor1 borderRadi3Px"
											v-model.trim="formData.cusPhone2"
											style="
												display: inline-block;
												width: 40px;
												text-align: center;
											"
											maxlength="4"
										/>
										<span>-</span>
										<input
											type="text"
											class="cursorDefault borderContColor1 borderRadi3Px"
											v-model.trim="formData.cusPhone3"
											style="
												display: inline-block;
												width: 40px;
												text-align: center;
											"
											maxlength="4"
										/>
									</td>
								</tr>
								<tr>
									<td>주소</td>
									<td colspan="3">
										<div class="addressStyle4">
											<input
												type="text"
												placeholder="우편번호"
												class="cursorDefault borderRadi3Px borderContColor1 lh30 padW10 floatL"
												v-model.trim="formData.zipCode"
												:disabled="formData.deliveryType !== 'PS'"
												readonly
												@click="postDialog = !postDialog"
											/>
											<input
												type="text"
												placeholder="상세주소"
												class="cursorDefault borderRadi3Px borderContColor1 lh30 padW10 w220 ml10 mr10 floatL"
												v-model.trim="formData.addr1"
												:disabled="formData.deliveryType !== 'PS'"
												readonly
												@click="postDialog = !postDialog"
											/>
											<post-api
												@postapi="addressData"
												:postDialog="postDialog"
												@closeDialog="dialogClose"
												v-if="formData.deliveryType === 'PS'"
											></post-api>
											<input
												type="text"
												placeholder="상세주소2"
												class="cursorDefault borderRadi3Px borderContColor1 lh30 padW10 w100P mt5 floatL"
												v-model.trim="formData.addr2"
												:disabled="formData.deliveryType !== 'PS'"
											/>
										</div>
									</td>
								</tr>
							</table>

							<div class="new_popTable1 mt20">
								<h2 class="mb10 mainBlack mainFontS mainBlack1">기기정보</h2>
								<table class="w100P">
									<tr>
										<td>통신사</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.telecomName"
												readonly
											/>
										</td>
										<td>제조사</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.makerName"
												readonly
											/>
										</td>
									</tr>
									<tr>
										<td>기기명</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.goodsName"
												readonly
											/>
										</td>
										<td>모델명</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.modelName"
												readonly
											/>
										</td>
									</tr>
									<tr>
										<td>용량</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.capacity"
												readonly
											/>
										</td>
										<td>색상</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.colorName"
												readonly
											/>
										</td>
									</tr>
									<tr>
										<td>일련번호</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.rawBarcode"
												readonly
											/>
										</td>
										<td>입고단가</td>
										<td>
											<input
												type="text"
												class="cursorDefault"
												v-model.trim="formData.inStockAmt"
												readonly
											/>
										</td>
									</tr>
								</table>

								<div class="rowCont mt20 labelCustom1">
									<v-textarea
										label="수정메모"
										v-model.trim="formData.deliveryMemo"
										outlined
										auto-grow
									></v-textarea>
								</div>

								<div class="disFx justify-end mt10">
									<v-btn
										class="borderRadi3Px backColorMint1 mr10 mainWhite"
										@click="updateInfoList"
										text
									>
										수정
									</v-btn>
									<v-btn
										class="borderRadi3Px backColorGray1 mainWhite"
										@click="closeFnc"
										text
									>
										취소
									</v-btn>
								</div>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import postApi from '../../../../../../components/PostApi';
import { nullValidation } from '@/common/common';

export default {
	components: { postApi },
	props: ['infoDialogData'],
	data: () => ({
		postDialog: false,
		formData: {
			cusName: '',
			zipCode: '',
			addr1: '',
			addr2: '',
			telecomName: '',
			makerName: '',
			goodsName: '',
			modelName: '',
			capacity: '',
			colorName: '',
			inStockAmt: '',
			deliveryMemo: '',
			deliveryType: '',
			updateYn: '',
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.SalesMoveModule.infoDialog;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.infoDialog = newValue);
			},
		},
	},
	methods: {
		dialogClose(data) {
			this.postDialog = data;
		},
		addressData(data) {
			this.formData.addr1 = data.address;
			this.formData.zipCode = data.zonecode;
		},
		formDataInit() {
			this.formData.addr1 = this.infoDialogData.addr1;
			this.formData.addr2 = this.infoDialogData.addr2;
			this.formData.cusName = this.infoDialogData.cusName;
			this.formData.cusPhone1 = this.infoDialogData.cusPhone1;
			this.formData.cusPhone2 = this.infoDialogData.cusPhone2;
			this.formData.cusPhone3 = this.infoDialogData.cusPhone3;
			this.formData.moveStockId = this.infoDialogData.moveStockId;
			this.formData.telecomName = this.infoDialogData.telecomName;
			this.formData.makerName = this.infoDialogData.makerName;
			this.formData.modelName = this.infoDialogData.modelName;
			this.formData.moveStockId = this.infoDialogData.moveStockId;
			this.formData.goodsName = this.infoDialogData.goodsName;
			this.formData.capacity = this.infoDialogData.capacity;
			this.formData.colorName = this.infoDialogData.colorName;
			this.formData.rawBarcode = this.infoDialogData.rawBarcode;
			this.formData.inStockAmt = this.infoDialogData.inStockAmt;
			this.formData.deliveryMemo = this.infoDialogData.deliveryMemo;
			this.formData.deliveryType = this.infoDialogData.deliveryType;
			this.formData.updateYn = this.infoDialogData.updateYn;
			this.formData.zipCode = this.infoDialogData.zipCode;
		},
		async getList() {
			await this.$store.dispatch('SalesMoveModule/getList');
		},
		async updateInfoList() {
			if (this.formData.updateYn === 'N') {
				alert('수정 불가 상태입니다.');
				return;
			}
			let data = this.formData;
			await this.$store.dispatch('SalesMoveModule/updateInfoList', data);
			await this.getList();
			this.dialog = !this.dialog;
		},
		closeFnc() {
			this.dialog = !this.dialog;
			this.getList();
		},
	},
	async created() {
		await this.formDataInit();
	},
};
</script>

<style></style>
