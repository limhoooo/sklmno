<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="700">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">재고 확인 조회</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<h2 class="mainFontS boldWt mainBlack mb10">공급처 정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">공급처</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.provName"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w120">재고구분</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.statusStr"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mb10">기기 정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">통신사</td>
									<td>
										<input
											type="text"
											:value="getTelecomName(infoDialogData.telecom)"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w120">제조사</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.makerName"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
								<tr>
									<td>기기명</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.goodsName"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td>모델명</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.modelName"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
								<tr>
									<td>용량</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.capacity"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td>색상</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.colorName"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
								<tr>
									<td>일련번호</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.rawBarcode"
											readonly
										/>
										<span
											v-if="'Y' === infoDialogData.unLockYn"
											style="font-size: 12px; color: #17a5ae"
										>
											(자급제)
										</span>
									</td>
									<td>입고단가</td>
									<td>
										<input
											type="text"
											:value="
												infoDialogData.inStockAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
											"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mb10">기기 상태 정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">입고상태</td>
									<td style="width: 191px">
										<div class="disFx">
											<div class="radioStylePop ml20">
												<input
													type="radio"
													id="division01"
													value="NORMAL"
													name="inStockState"
													disabled
													:checked="
														infoDialogData.deviceStatusListDto.inStockStatus ===
														'NORMAL'
													"
												/>
												<label for="division01">정상</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division02"
													value="OPEN"
													name="inStockState"
													disabled
													:checked="
														infoDialogData.deviceStatusListDto.inStockStatus ===
														'OPEN'
													"
												/>
												<label for="division02">개봉</label>
											</div>
										</div>
									</td>
									<td class="w120">제품상태</td>
									<td>
										<div class="checkStyleCont4 floatL w50 ml20">
											<input
												type="checkbox"
												id="division03"
												class="checkStyle"
												:checked="
													infoDialogData.deviceStatusListDto.productFaultyYn ===
													'Y'
												"
												name="productFaultyYn"
												disabled
											/>
											<label for="division03">불량</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>외장상태</td>
									<td colspan="3">
										<div class="radioStylePop ml20 floatL">
											<input
												type="radio"
												id="division04"
												checked
												value="T"
												name="outStockState"
												disabled
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'T'
												"
											/>
											<label for="division04">상</label>
										</div>
										<div class="radioStylePop ml30 floatL">
											<input
												type="radio"
												id="division05"
												value="M"
												name="outStockState"
												disabled
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'M'
												"
											/>
											<label for="division05">중</label>
										</div>
										<div class="radioStylePop ml30 floatL">
											<input
												type="radio"
												id="division06"
												value="B"
												name="outStockState"
												disabled
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'B'
												"
											/>
											<label for="division06">하</label>
										</div>
										<div class="radioStylePop ml30 floatL">
											<input
												type="radio"
												id="division16"
												value="F"
												name="outStockState"
												disabled
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'F'
												"
											/>
											<label for="division16">파손</label>
										</div>
										<div class="checkStyleCont4 floatL w80 ml40">
											<input
												id="composiMissCk"
												type="checkbox"
												disabled
												class="checkStyle"
												:checked="
													infoDialogData.deviceStatusListDto.productMissYn ===
													'Y'
												"
											/>
											<label for="composiMissCk">구성품누락</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>누락제품</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.deviceStatusListDto.missProduct"
											disabled
										/>
									</td>
									<td>차감비</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.deviceStatusListDto.ddctAmt"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td>반품비</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.returnStockAmt"
											disabled
										/>
									</td>
									<td>추가차감금액</td>
									<td>
										<input
											type="text"
											style="width: 30%"
											:value="infoDialogData.deviceStatusListDto.addDdctAmt"
											disabled
											class="floatL lh30"
										/>
										<div class="checkStyleCont4 floatL w80 ml30">
											<input
												id="composiMissCk1"
												type="checkbox"
												:checked="
													infoDialogData.deviceStatusListDto
														.ddctReleaseAmtYn === 'Y'
												"
												class="checkStyle"
												disabled
											/>
											<label for="composiMissCk1">출고가 차감</label>
										</div>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">재고 확인 이력</h2>
						<div class="newNotiTableStyle">
							<table class="w100P">
								<tr v-for="(item, index) in deviceHistory" :key="item.id">
									<td class="padW10 lh40 borderBottomColor1">
										<span style="font-size: 15px" class="mr5 floatR">{{
											item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss')
										}}</span>
										<span class="floatL">
											<span>{{ item.orgName }}</span> |
											<span class="mr5">{{ item.name }}</span>
											<span
												class="mr5 backColorBlue1 mainBlue2"
												style="
													background-color: #ddd;
													padding: 1px 5px;
													border-radius: 15px;
												"
												>{{ Number(deviceHistory.length - index) }}차</span
											>
											<div class="disIn">
												<span>{{ item.stockCheckTypeMsg }}</span>
												<span class="mr5" v-if="item.stockManualCheckStatusMsg">
													{{ item.stockManualCheckStatusMsg }}</span
												>
												<span>{{ item.stockManualCheckMemo }} </span>
											</div>
										</span>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
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
import { getTelecomName } from '../../../../../common/common';

export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
	}),

	computed: {
		deviceHistory() {
			return this.$store.state.StockStatusModule.deviceHistory;
		},
		dialog: {
			get() {
				return this.$store.state.StockStatusModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async getStoreStockCheckHistory() {
			let data = {
				storeStockId: this.infoDialogData.storeStockId,
			};
			await this.$store.dispatch(
				'StockStatusModule/getStoreStockCheckHistory',
				data,
			);
		},
	},
	created() {
		this.getStoreStockCheckHistory();
	},
};
</script>

<style></style>
