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
								<p>기기상태입력</p>
							</div>
							<div
								class="contentsCont"
								style="margin-top: 15px; padding: 0 20px"
							>
								<div class="itemContents">
									<div class="subtitle">
										<p>제품상태</p>
									</div>
									<div class="itemCont">
										<input
											type="checkbox"
											id="FaultCheck"
											style="margin-right: 5px"
											true-value="Y"
											false-value="N"
											v-model.trim="productFaultyYn"
										/><label for="FaultCheck">불량</label>
									</div>
								</div>
								<div class="itemContents" style="margin-top: 20px">
									<div class="subtitle">
										<p>외장상태</p>
									</div>
									<div
										class="radioCont"
										style="
											display: inline-block;
											width: 100%;
											padding: 7px 0;
											border-top: 1px solid #c8c8c8;
											margin-left: 0;
											margin-top: 5px;
										"
									>
										<input
											type="radio"
											id="upStatus"
											value="T"
											name="extrrStatus"
											checked
											v-model.trim="extrrStatus"
										/><label for="upStatus">상</label>
										<input
											type="radio"
											value="M"
											id="middleStatus"
											name="extrrStatus"
											v-model.trim="extrrStatus"
										/><label for="middleStatus">중</label>
										<input
											type="radio"
											value="B"
											id="lowStatus"
											name="extrrStatus"
											v-model.trim="extrrStatus"
										/><label for="lowStatus">하</label>
										<input
											type="radio"
											value="F"
											id="break"
											name="extrrStatus"
											v-model.trim="extrrStatus"
										/><label for="break">파손</label>
										<div class="checkBoxCont">
											<input
												type="checkbox"
												id="productMissYn"
												value="Y"
												true-value="Y"
												false-value="N"
												v-model.trim="productMissYn"
											/><label for="productMissYn">구성품 누락</label>
										</div>
									</div>
									<div
										class="rowCont openStockField"
										style="margin-bottom: 3px"
									>
										<v-text-field
											style="font-size: 12px; width: 49%"
											label="누락제품"
											v-model.trim="missProduct"
											:disabled="productMissYn === 'N'"
										></v-text-field>
										<v-text-field
											style="font-size: 12px; width: 49%; margin-left: 2%"
											label="차감비"
											v-model.trim="ddctAmt"
											:disabled="productMissYn === 'N'"
										></v-text-field>
									</div>
									<div class="rowCont openStockField">
										<v-text-field
											label="추가차감비"
											v-model.trim="addDdctAmt"
										></v-text-field>
										<div class="bonusCheck">
											<input
												type="checkbox"
												id="addDdctAmt"
												v-model.trim="ddctReleaseAmtYn"
												true-value="Y"
												false-value="N"
											/>
											<label for="addDdctAmt">출고가차감</label>
										</div>
									</div>
									<div class="rowCont openStockField">
										<v-text-field
											label="입고메모"
											v-model.trim="inStockMemo"
										></v-text-field>
									</div>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="display: flex; justify-content: center">
						<div class="infoDialogCont">
							<v-btn text @click="registFnc" style="background-color: #17a5ae">
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
	computed: {
		formData: {
			get() {
				return this.$store.state.OpenInStockModule.formData;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData = newValue);
			},
		},
		formGoodsId: {
			get() {
				return this.$store.state.OpenInStockModule.formData.goodsId;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.goodsId = newValue);
			},
		},
		productFaultyYn: {
			get() {
				return this.$store.state.OpenInStockModule.formData.productFaultyYn;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.productFaultyYn = newValue);
			},
		},
		ddctReleaseAmtYn: {
			get() {
				return this.$store.state.OpenInStockModule.formData.ddctReleaseAmtYn;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.ddctReleaseAmtYn = newValue);
			},
		},
		inStockStatus: {
			get() {
				return this.$store.state.OpenInStockModule.formData.inStockStatus;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.inStockStatus = newValue);
			},
		},
		dialog: {
			get() {
				return this.$store.state.OpenInStockModule.registDialog;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.registDialog = newValue);
			},
		},
		extrrStatus: {
			get() {
				return this.$store.state.OpenInStockModule.formData.extrrStatus;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.extrrStatus = newValue);
			},
		},
		ddctAmt: {
			get() {
				return this.$store.state.OpenInStockModule.formData.ddctAmt;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.ddctAmt = newValue);
			},
		},
		addDdctAmt: {
			get() {
				return this.$store.state.OpenInStockModule.formData.addDdctAmt;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.addDdctAmt = newValue);
			},
		},
		productMissYn: {
			get() {
				return this.$store.state.OpenInStockModule.formData.productMissYn;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.productMissYn = newValue);
			},
		},
		missProduct: {
			get() {
				return this.$store.state.OpenInStockModule.formData.missProduct;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.missProduct = newValue);
			},
		},
		inStockMemo: {
			get() {
				return this.$store.state.OpenInStockModule.formData.inStockMemo;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData.inStockMemo = newValue);
			},
		},
		MissDialog: {
			get() {
				return this.$store.state.OpenInStockModule.MissDialog;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.MissDialog = newValue);
			},
		},
	},
	methods: {
		async registFnc() {
			this.dialog = false;
			await this.insertWaitList();
		},
		async getList() {
			let data = this.inStockStatus;
			await this.$store.dispatch('OpenInStockModule/getList', data);
		},
		async insertWaitList() {
			if (
				!nullValidation(this.$store.state.OpenInStockModule.formData, [
					'inStockMemo',
					'ddctAmt',
					'missProduct',
					'productFaultyYn',
					'productMissYn',
					'addDdctAmt',
					'inStockStatus',
					'ownStoreId',
					'colorName',
					'goodsId',
					'capacity',
					'unLockYn',
					'inStockType',
				])
			) {
				return;
			} else if (this.formGoodsId !== '') {
				if (
					!nullValidation(this.$store.state.OpenInStockModule.formData, [
						'inStockMemo',
						'ddctAmt',
						'missProduct',
						'productFaultyYn',
						'productMissYn',
						'addDdctAmt',
						'inStockAmt',
						'ownStoreId',
						'inStockType',
					])
				) {
					return;
				}
			}
			Object.assign(this.formData, { goodsType: 'DVC' });
			await this.$store.dispatch(
				'OpenInStockModule/insertWaitList',
				this.$store.state.OpenInStockModule.formData,
			);
			this.formData.barcode = '';
			await this.getList();
		},
		filterInit() {
			this.productMissYn = 'N';
			this.productFaultyYn = 'N';
			this.extrrStatus = 'T';
			this.missProduct = '';
			this.ddctAmt = '';
			this.addDdctAmt = '';
			this.ddctReleaseAmtYn = 'N';
			this.inStockMemo = '';
		},
	},
	created() {
		if (
			this.formData.provId &&
			this.formData.stockId &&
			this.formData.telecom &&
			this.formData.barcode === ''
		) {
			this.filterInit();
		}
		this.productMissYn = 'N';
	},
};
</script>

<style>
.openStockField {
	height: 50px;
	position: relative;
}
.openStockField .bonusCheck {
	position: absolute;
	top: 20px;
	right: 0;
}
.openStockField label {
	color: #17a5ae !important;
}
.openStockField .v-input__slot:before {
	border-color: #c8c8c8 !important;
}
</style>
