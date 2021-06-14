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
							class="infoCont"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>기기상태수정</p>
							</div>
							<div class="rowCont">
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="공급처"
										v-model.trim="formData.provName"
										disabled
									></v-text-field>
								</div>
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="보유처"
										v-model.trim="formData.stockName"
										disabled
									></v-text-field>
								</div>
							</div>
							<div class="rowCont">
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="통신사"
										v-model.trim="formData.telecomName"
										disabled
									></v-text-field>
								</div>
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="제조사"
										v-model.trim="formData.makerName"
										disabled
									></v-text-field>
								</div>
							</div>
							<div class="rowCont">
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="제품명"
										v-model.trim="formData.goodsName"
										disabled
									></v-text-field>
								</div>
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="모델명"
										v-model.trim="formData.modelName"
										disabled
									></v-text-field>
								</div>
							</div>
							<div class="rowCont">
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="색상"
										v-model.trim="formData.colorName"
										disabled
									></v-text-field>
								</div>
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="용량"
										v-model.trim="formData.capacity"
										disabled
									></v-text-field>
								</div>
							</div>
							<div class="rowCont">
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="일련번호"
										v-model.trim="formData.rawBarcode"
										disabled
									></v-text-field>
								</div>
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="입고단가"
										v-model.trim="formData.inStockAmt"
										disabled
									></v-text-field>
								</div>
							</div>
							<div class="rowCont">
								<div class="radioCont">
									<p
										style="
											display: inline-block;
											color: #7397a4;
											display: inline;
										"
									>
										입고상태
									</p>
									<input
										type="radio"
										id="normal"
										value="NORMAL"
										name="vote"
										checked
										v-model.trim="formData.inStockStatus"
										:disabled="formData.stockType === false"
									/><label for="normal">정상</label>
									<input
										type="radio"
										value="OPEN"
										id="open"
										name="vote"
										v-model.trim="formData.inStockStatus"
										:disabled="formData.stockType === false"
									/><label for="open">개봉</label>
								</div>
								<div class="checkCont" style="margin-top: 10px">
									<p
										style="display: inline-block; width: 100px; color: #7397a4"
									>
										제품상태
									</p>
									<input
										type="checkbox"
										id="productStatus"
										value="0"
										true-value="Y"
										false-value="N"
										v-model.trim="formData.productFaultyYn"
										:disabled="formData.stockType === false"
									/><label for="productStatus">불량</label>
								</div>
							</div>
							<div class="rowCont" style="width: 530px; margin-left: 65px">
								<div class="radioCont" style="width: 100%">
									<p style="display: inline-block; color: #7397a4; width: 59px">
										외장상태
									</p>
									<input
										type="radio"
										id="upStatus"
										value="T"
										name="extrrStatus"
										v-model.trim="formData.extrrStatus"
										:disabled="formData.stockType === false"
										checked
									/><label for="upStatus">상</label>
									<input
										type="radio"
										value="M"
										id="middleStatus"
										name="extrrStatus"
										v-model.trim="formData.extrrStatus"
										:disabled="formData.stockType === false"
									/><label for="middleStatus">중</label>
									<input
										type="radio"
										value="B"
										id="lowStatus"
										name="extrrStatus"
										v-model.trim="formData.extrrStatus"
										:disabled="formData.stockType === false"
									/><label for="lowStatus">하</label>
									<input
										type="radio"
										value="F"
										id="break"
										name="extrrStatus"
										v-model.trim="formData.extrrStatus"
										:disabled="formData.stockType === false"
									/><label for="break">파손</label>
									<!--				간격조정					-->
									<div class="checkBoxCont ml10">
										<input
											type="checkbox"
											true-value="Y"
											false-value="N"
											id="productMissYn"
											v-model.trim="formData.productMissYn"
											:disabled="formData.stockType === false"
										/><label for="productMissYn">구성품 누락</label>
									</div>
								</div>
							</div>
							<div class="rowCont" style="margin-bottom: 3px">
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="누락제품"
										v-model.trim="formData.missProduct"
										:disabled="
											formData.productMissYn === 'N' ||
											formData.stockType === false
										"
									></v-text-field>
								</div>
								<div class="input_custom1">
									<v-text-field
										style="font-size: 12px"
										label="차감비"
										v-model.trim="formData.ddctAmt"
										:disabled="
											formData.productMissYn === 'N' ||
											formData.stockType === false
										"
									></v-text-field>
								</div>
							</div>
							<div class="rowCont">
								<div class="textAreaCustom">
									<v-textarea
										style="font-size: 12px"
										name="input-7-1"
										filled
										label="수정메모"
										auto-grow
										full-width
										rows="2"
										row-height="40"
										v-model.trim="formData.inStockMemo"
										:disabled="formData.stockType === false"
									></v-textarea>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn text @click="updateList" style="background-color: #17a5ae">
								확인
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
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
import { nullValidation } from '../../../../../../common/common';

export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {
			provName: '',
			stockName: '',
			telecomName: '',
			makerName: '',
			goodsName: '',
			modelName: '',
			colorName: '',
			capacity: '',
			rawBarcode: '',
			inStockAmt: '',
			extrrStatus: '',
			productFaultyYn: '',
			missProduct: '',
			ddctAmt: '',
			inStockMemo: '',
			productMissYn: 'N',
			inStockId: '',
			stockType: false,
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.InStockMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.InStockMgmtModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		async updateList() {
			/* inStockAmt추가 */
			if (
				!nullValidation(this.formData, [
					'missProduct',
					'ddctAmt',
					'inStockMemo',
					'productFaultyYn',
					'inStockAmt',
					'stockType',
					'rawBarcode',
				])
			) {
				return;
			}
			if (this.formData.productMissYn === 'N') {
				this.formData.missProduct = '';
				this.formData.ddctAmt = '';
			}
			await this.$store.dispatch(
				'InStockMgmtModule/updateInStock',
				this.formData,
			);
			// 리스트 재호출
			const data = this.$store.state.InStockMgmtModule.filterData;
			await this.$store.dispatch('InStockMgmtModule/getInStockList', data);
			this.dialog = false;
		},
		formDataSet() {
			this.formData.provName = this.infoDialogData.provName;
			this.formData.stockName = this.infoDialogData.stockName;
			this.formData.telecomName = this.infoDialogData.telecomName;
			this.formData.makerName = this.infoDialogData.makerName;
			this.formData.goodsName = this.infoDialogData.goodsName;
			this.formData.modelName = this.infoDialogData.modelName;
			this.formData.colorName = this.infoDialogData.colorName;
			this.formData.capacity = this.infoDialogData.capacity;
			this.formData.rawBarcode = this.infoDialogData.rawBarcode;
			this.formData.inStockAmt = this.infoDialogData.inStockAmt;
			this.formData.inStockStatus = this.infoDialogData.inStockStatus;
			this.formData.extrrStatus = this.infoDialogData.extrrStatus;
			this.formData.inStockMemo = this.infoDialogData.inStockMemo;
			this.formData.productMissYn = this.infoDialogData.productMissYn;
			this.formData.missProduct = this.infoDialogData.missProduct;
			this.formData.ddctAmt = this.infoDialogData.ddctAmt;
			this.formData.productFaultyYn = this.infoDialogData.productFaultyYn;
			this.formData.inStockId = this.infoDialogData.inStockId;
		},
		stockTypeFnc() {
			if (
				this.infoDialogData.stockType === 'IN_STOCK' ||
				this.infoDialogData.stockType === 'STOCK_MOVE' ||
				this.infoDialogData.stockType === 'RETURN_STOCK'
			) {
				return (this.formData.stockType = true);
			}
		},
	},
	async created() {
		await this.formDataSet();
		await this.stockTypeFnc();
	},
};
</script>

<style></style>
