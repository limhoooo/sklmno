<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="700"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1 popUpCustomSt2 detailText1"
							style="background-color: #fff; padding-top: 20px"
						>
							<p class="detailText font-red">
								*기기정보는 수정불가 하며, 고객정보만 수정가능합니다.
							</p>
							<div class="titleCont">
								<p>고객정보 수정</p>
							</div>
							<div class="rowHeader mt20">
								<p>고객정보</p>
							</div>
							<div class="rowItem">
								<p>고객명</p>
								<input
									type="text"
									class="cursorDefault"
									v-model.trim="formData.cusName"
								/>
							</div>
							<div class="rowItem ml10P">
								<p>전화번호</p>
								<input
									type="text"
									class="cursorDefault"
									v-model.trim="formData.cusPhone1"
									style="display: inline-block; width: 40px; text-align: center"
									maxlength="3"
								/>
								<span>-</span>
								<input
									type="text"
									class="cursorDefault"
									v-model.trim="formData.cusPhone2"
									style="display: inline-block; width: 40px; text-align: center"
									maxlength="4"
								/>
								<span>-</span>
								<input
									type="text"
									class="cursorDefault"
									v-model.trim="formData.cusPhone3"
									style="display: inline-block; width: 40px; text-align: center"
									maxlength="4"
								/>
							</div>
							<div class="rowCont mt10 postCont2">
								<input
									type="text"
									placeholder="우편번호"
									class="cursorDefault addressStyle1"
									v-model.trim="formData.zipCode"
									:disabled="formData.deliveryType !== 'PS'"
									readonly
									@click="postDialog = !postDialog"
								/>
								<input
									type="text"
									placeholder="상세주소"
									class="cursorDefault addressStyle2"
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
							</div>
							<div class="rowCont mt10 postCont2">
								<input
									type="text"
									placeholder="상세주소2"
									class="cursorDefault addressStyle3"
									v-model.trim="formData.addr2"
									:disabled="formData.deliveryType !== 'PS'"
								/>
							</div>
							<div class="rowHeader mt20">
								<p>기기정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>통신사</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.telecomName"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>제조사</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.makerName"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>기기명</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.goodsName"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>모델명</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.modelName"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>용량</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.capacity"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>색상</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.colorName"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>일련번호</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.rawBarcode"
										readonly
									/>
								</div>
								<div class="rowItem labelCustom1 ml10P">
									<p>입고단가</p>
									<input
										type="text"
										class="cursorDefault"
										v-model.trim="formData.inStockAmt"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont mt20 labelCustom1">
								<v-textarea
									label="수정메모"
									v-model.trim="formData.deliveryMemo"
									outlined
									auto-grow
								></v-textarea>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="infoDialogCont infoDialogCont2">
							<v-btn
								v-if="formData.updateYn === 'Y'"
								class="btnBlue1"
								@click="updateInfoList"
								text
								style="background-color: #bdbdbd"
							>
								수정
							</v-btn>
							<v-btn
								class="btnBorderNone1"
								@click="closeFnc"
								text
								style="background-color: #bdbdbd"
							>
								취소
							</v-btn>
						</div>
					</v-card-actions>
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
		},
		async getList() {
			await this.$store.dispatch('SalesMoveModule/getList');
		},
		async updateInfoList() {
			let data = this.formData;
			if (
				!nullValidation(this.formData, [
					'inStockAmt',
					'inStockStatus',
					'inStockStatusMsg',
					'cusPhone',
					'zipCode',
					'addr1',
					'addr2',
					'updDateTime',
					'deliveryMemo',
					'updateYn',
				])
			) {
				return;
			}
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
