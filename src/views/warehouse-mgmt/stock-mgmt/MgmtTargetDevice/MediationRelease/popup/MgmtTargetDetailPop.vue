<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="700">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">기기이력 상세조회</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<h2 class="mb10 mainBlack mainFontS mainBlack1">보유처 정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">공급처</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.provName"
											disabled
										/>
									</td>
									<td class="w120">재고구분</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.stockTypeMsg"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td class="w120">보유처 <b class="orangefont">Before</b></td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.prevStockName"
											disabled
										/>
									</td>
									<td class="w120">보유처 <b class="skybluefont">After</b></td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.nextStockName"
											disabled
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mb10 mainBlack mainFontS mainBlack1 mt20">기기 정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">통신사</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.telecomName"
											disabled
										/>
									</td>
									<td class="w120">제조사</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.makerName"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td>기기명</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.goodsName"
											disabled
										/>
									</td>
									<td>모델명</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.modelName"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td>용량</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.capacity"
											disabled
										/>
									</td>
									<td>색상</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.colorName"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td>일련번호</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											v-model.trim="detailData.rawBarcode"
											disabled
										/>
									</td>
									<td>입고단가</td>
									<td>
										<input
											type="text"
											class="cursorDefault"
											:value="
												detailData.inStockAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
											"
											disabled
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mb10 mainBlack mainFontS mainBlack1 mt20">
							기기 상태 정보
						</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">입고상태</td>
									<td class="w180">
										<div class="disFx">
											<div class="radioStylePop ml20">
												<input
													type="radio"
													checked
													id="division01"
													value="NORMAL"
													name="inStockState"
													v-model.trim="detailData.inStockStatus"
													disabled
												/>
												<label for="division01">정상</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division02"
													value="OPEN"
													name="inStockState"
													v-model.trim="detailData.inStockStatus"
													disabled
												/>
												<label for="division02">개봉</label>
											</div>
										</div>
									</td>
									<td class="w120">제품상태</td>
									<td class="w180">
										<div class="checkStyleCont4 floatL w50 ml20">
											<input
												type="checkbox"
												id="division03"
												class="checkStyle"
												name="productState"
												:checked="detailData.productFaultyYn === 'Y'"
												disabled
											/>
											<label for="division03">불량</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>외장상태</td>
									<td colspan="3">
										<div class="disFx">
											<div class="radioStylePop ml20">
												<input
													type="radio"
													id="division04"
													checked
													value="T"
													name="outStockState"
													v-model.trim="detailData.extrrStatus"
													disabled
												/>
												<label for="division04">상</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division05"
													value="M"
													name="outStockState"
													v-model.trim="detailData.extrrStatus"
													disabled
												/>
												<label for="division05">중</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division06"
													value="B"
													name="outStockState"
													v-model.trim="detailData.extrrStatus"
													disabled
												/>
												<label for="division06">하</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division16"
													value="F"
													name="outStockState"
													v-model.trim="detailData.extrrStatus"
													disabled
												/>
												<label for="division16">파손</label>
											</div>
											<div class="checkStyleCont4 floatL ml40">
												<input
													id="composiMissCk"
													type="checkbox"
													:checked="detailData.productMissYn === 'Y'"
													disabled
													class="checkStyle"
												/>
												<label for="composiMissCk">구성품누락</label>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>누락제품</td>
									<td>
										<input
											type="text"
											v-model.trim="detailData.missProduct"
											disabled
										/>
									</td>
									<td>차감비</td>
									<td>
										<input
											type="text"
											:value="
												detailData.ddctAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
											"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td>반품비</td>
									<td>
										<input
											type="text"
											:value="
												detailData.returnStockAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
											"
											disabled
										/>
									</td>
									<td>추가차감금액</td>
									<td>
										<input
											type="text"
											style="width: 30%"
											:value="
												detailData.addDdctAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
											"
											disabled
										/>
										<input
											id="composiMissCk1"
											type="checkbox"
											:checked="detailData.ddctReleaseAmtYn === 'Y'"
											disabled
										/>
										<label for="composiMissCk1">출고가 차감</label>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mb10 mainBlack mainFontS mainBlack1 mt20">
							이력 상태 정보
						</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">개통점</td>
									<td>
										<input
											type="text"
											v-model.trim="detailData.openingHistoryStoreName"
											disabled
										/>
									</td>
									<td class="w120">재판매대상점</td>
									<td>
										<input
											type="text"
											v-model.trim="detailData.reSellTargetStoreName"
											disabled
										/>
									</td>
								</tr>
								<tr>
									<td>개통일자</td>
									<td>
										<input
											type="text"
											v-model.trim="detailData.openingDate"
											disabled
										/>
									</td>
									<td>개통이력</td>
									<td>
										<input
											type="text"
											v-model.trim="detailData.openingHistYnMsg"
											disabled
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">이력 조회</h2>
						<div class="newNotiTableStyle">
							<table class="w100P">
								<tr v-for="item in detailHistory" :key="item.id">
									<td class="padW10 lh40 borderBottomColor1">
										<span style="font-size: 14px" class="mr5 floatL">{{
											item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss')
										}}</span>
										<span style="color: #333" class="countingCutsom">
											{{ item.memo }}
										</span>
										<span class="floatR">
											<span class="subFontS12">{{ item.storeName }}</span> |
											<span class="mr5 subFontS12">{{
												item.regiUserName
											}}</span>
											<span class="historyNoti backColorBlue1 mainBlue2">
												{{ item.stockTypeMsg }}
											</span>
										</span>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								text
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								@click="dialog = false"
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
	name: 'MgmtTargetDetailPop',
	computed: {
		detailData() {
			return this.$store.state.MediationReleaseModule.detailData;
		},
		detailHistory() {
			return this.$store.state.MediationReleaseModule.detailHistory;
		},
		dialog: {
			get() {
				return this.$store.state.MediationReleaseModule.detailDialog;
			},
			set(newValue) {
				this.$store.state.MediationReleaseModule.detailDialog = newValue;
			},
		},
	},
};
</script>

<style scoped></style>
