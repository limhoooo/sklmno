<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="670">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">기기수정</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr class="w100P">
									<td>공급처</td>
									<td>
										<input
											disabled
											v-model.trim="formData.provName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
									<td>보유처</td>
									<td>
										<input
											disabled
											v-model.trim="formData.stockName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
								</tr>
								<tr class="w100P">
									<td>통신사</td>
									<td>
										<input
											disabled
											v-model.trim="formData.telecomName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
									<td>제조사</td>
									<td>
										<input
											disabled
											v-model.trim="formData.makerName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
								</tr>
								<tr class="w100P">
									<td>제품명</td>
									<td>
										<input
											disabled
											v-model.trim="formData.goodsName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
									<td>모델명</td>
									<td>
										<input
											disabled
											v-model.trim="formData.modelName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
								</tr>
								<tr class="w100P">
									<td>용량</td>
									<td>
										<input
											disabled
											v-model.trim="formData.capacity"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
									<td>색상</td>
									<td>
										<input
											disabled
											v-model.trim="formData.colorName"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
								</tr>
								<tr class="w100P">
									<td>일련번호</td>
									<td>
										<input
											disabled
											v-model.trim="formData.rawBarcode"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
									<td>입고단가</td>
									<td>
										<input
											disabled
											v-model.trim="formData.inStockAmt"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
								</tr>
								<tr class="w100P">
									<td>입고상태</td>
									<td>
										<div class="radioStylePop w50 ml20 floatL posHand3">
											<input
												type="radio"
												id="normal"
												value="NORMAL"
												name="vote"
												checked
												v-model.trim="formData.inStockStatus"
												:disabled="
													formData.stockType === false ||
													formData.goodsType === 'USIM'
												"
											/><label for="normal">정상</label>
										</div>
										<div class="radioStylePop w50 ml20 floatL">
											<input
												type="radio"
												value="OPEN"
												id="open"
												name="vote"
												v-model.trim="formData.inStockStatus"
												:disabled="
													formData.stockType === false ||
													formData.goodsType === 'USIM'
												"
											/><label for="open">개봉</label>
										</div>
									</td>
									<td>제품상태</td>
									<td>
										<div class="checkStyleCont4 floatL w30 ml20">
											<input
												type="checkbox"
												id="productStatus"
												value="0"
												class="checkStyle"
												true-value="Y"
												false-value="N"
												v-model.trim="formData.productFaultyYn"
												:disabled="
													formData.stockType === false ||
													formData.goodsType === 'USIM'
												"
											/><label for="productStatus">불량</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>외장상태</td>
									<td colspan="3">
										<div class="w100P">
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													id="upStatus"
													value="T"
													name="extrrStatus"
													v-model.trim="formData.extrrStatus"
													:disabled="
														formData.stockType === false ||
														formData.goodsType === 'USIM'
													"
													checked
												/><label for="upStatus">상</label>
											</div>
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													value="M"
													id="middleStatus"
													name="extrrStatus"
													v-model.trim="formData.extrrStatus"
													:disabled="
														formData.stockType === false ||
														formData.goodsType === 'USIM'
													"
												/><label for="middleStatus">중</label>
											</div>
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													value="B"
													id="lowStatus"
													name="extrrStatus"
													v-model.trim="formData.extrrStatus"
													:disabled="
														formData.stockType === false ||
														formData.goodsType === 'USIM'
													"
												/><label for="lowStatus">하</label>
											</div>
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													value="F"
													id="break"
													name="extrrStatus"
													v-model.trim="formData.extrrStatus"
													:disabled="
														formData.stockType === false ||
														formData.goodsType === 'USIM'
													"
												/><label for="break">파손</label>
											</div>
											<!--				간격조정					-->
											<div class="checkStyleCont4 floatL w80 ml40">
												<input
													class="checkStyle"
													type="checkbox"
													true-value="Y"
													false-value="N"
													id="productMissYn"
													v-model.trim="formData.productMissYn"
													:disabled="
														formData.stockType === false ||
														formData.goodsType === 'USIM'
													"
												/><label for="productMissYn">구성품 누락</label>
											</div>
										</div>
									</td>
								</tr>
								<tr class="w100P">
									<td>누락제품</td>
									<td>
										<input
											placeholder="누락된 제품을 입력하세요"
											disabled
											v-model.trim="formData.missProduct"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
									<td>차감비</td>
									<td>
										<input
											placeholder="차감비를 입력하세요"
											disabled
											v-model.trim="formData.inStockAmt"
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
										/>
									</td>
								</tr>
								<tr>
									<td>수정메모</td>
									<td colspan="3">
										<input
											type="text"
											class="borderRadi3Px borderContColor2 lh30 padW10 w100P"
											v-model.trim="formData.inStockMemo"
											:disabled="
												formData.stockType === false ||
												formData.goodsType === 'USIM'
											"
										/>
									</td>
								</tr>
							</table>

							<div class="disFx justify-end mt10">
								<v-btn
									v-if="formData.goodsType === 'DVC'"
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="updateList"
								>
									확인
								</v-btn>
								<v-btn
									text
									class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
									@click="dialog = false"
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
			this.formData.goodsType = this.infoDialogData.goodsType;
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
