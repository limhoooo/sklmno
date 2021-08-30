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
						<h2 class="mainFontS boldWt mainBlack mb10">보유처 정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120 h40">공급처</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.inStockProvName"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w120">재고구분</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.statusStrMsg"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
								<tr>
									<td class="w120 h40">
										보유처 <span class="subOrange1">before</span>
									</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.prevStockName"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w120">
										보유처 <span class="subBlue2">after</span>
									</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.nextStockName"
											class="cursorDefault"
											readonly
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">기기정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr class="h40">
									<td class="w120">통신사</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.telecomName"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
									<td class="w120">제조사</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.makerName"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
								</tr>
								<tr class="h40">
									<td class="w120">기기명</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.goodsName"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
									<td class="w120">모델명</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.modelName"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
								</tr>
								<tr class="h40">
									<td class="w120">용량</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.capacity"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
									<td class="w120">색상</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.colorName"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
								</tr>
								<tr class="h40">
									<td class="w120">일련번호</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.rawBarcode"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
										<span
											v-if="'Y' === infoDialogData.unLockYn"
											style="font-size: 12px; color: #17a5ae"
										>
											(자급제)
										</span>
									</td>
									<td class="w120">입고단가</td>
									<td>
										<input
											type="text"
											:value="
												infoDialogData.inStockAmt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											"
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
											readonly
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">기기 상태정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr class="h40">
									<td class="w120">입고상태</td>
									<td>
										<div class="radioStylePop w30 ml20 floatL">
											<input
												type="radio"
												id="division01"
												value="NORMAL"
												v-model.trim="infoDialogData.inStockStatus"
												name="inStockStatus"
												disabled
											/>
											<label for="division01">정상</label>
										</div>
										<div class="radioStylePop w30 ml40 floatL">
											<input
												type="radio"
												id="division02"
												value="OPEN"
												v-model.trim="infoDialogData.inStockStatus"
												name="inStockStatus"
												disabled
											/>
											<label for="division02">개봉</label>
										</div>
									</td>
									<td class="w120">제품상태</td>
									<td>
										<div class="checkStyleCont4 floatL w50 ml20">
											<input
												type="checkbox"
												id="division03"
												class="checkStyle"
												:checked="infoDialogData.productFaultyYn === 'Y'"
												name="productFaultyYn"
												disabled
											/>
											<label for="division03">불량</label>
										</div>
									</td>
								</tr>
								<tr class="h40">
									<td>외장상태</td>
									<td colspan="3">
										<div class="radioStylePop w30 ml20 floatL">
											<input
												type="radio"
												id="division04"
												checked=""
												value="T"
												v-model.trim="infoDialogData.extrrStatus"
												name="extrrStatus"
												disabled
											/>
											<label for="division04">상</label>
										</div>
										<div class="radioStylePop w30 ml20 floatL">
											<input
												type="radio"
												id="division05"
												value="M"
												v-model.trim="infoDialogData.extrrStatus"
												name="extrrStatus"
												disabled
											/>
											<label for="division05">중</label>
										</div>
										<div class="radioStylePop w30 ml20 floatL">
											<input
												type="radio"
												id="division06"
												value="B"
												v-model.trim="infoDialogData.extrrStatus"
												name="extrrStatus"
												disabled
											/>
											<label for="division06">하</label>
										</div>
										<div class="radioStylePop w30 ml20 floatL">
											<input
												type="radio"
												id="division07"
												value="F"
												v-model.trim="infoDialogData.extrrStatus"
												name="extrrStatus"
												disabled
											/>
											<label for="division07">파손</label>
										</div>
										<div class="checkStyleCont4 floatL w80 ml40">
											<input
												id="구성품누락"
												class="ml10 checkStyle"
												type="checkbox"
												:checked="infoDialogData.productMissYn === 'Y'"
												name="productMissYn"
												disabled
											/>
											<label for="구성품누락">구성품누락</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>누락제품</td>
									<td>
										<input
											type="text"
											v-model.trim="infoDialogData.missProduct"
											disabled
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
										/>
									</td>
									<td>차감비</td>
									<td>
										<input
											type="text"
											v-model.trim="infoDialogData.ddctAmt"
											disabled
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
										/>
									</td>
								</tr>
								<tr>
									<td>반품비</td>
									<td>
										<input
											type="text"
											v-model.trim="infoDialogData.returnStockAmt"
											disabled
										/>
									</td>
									<td>추가차감금액</td>
									<td>
										<input
											type="text"
											style="width: 30%"
											v-model.trim="infoDialogData.addDdctAmt"
											disabled
											class="floatL lh30"
										/>
										<div class="checkStyleCont4 floatL w80 ml30">
											<input
												id="composiMissCk1"
												type="checkbox"
												class="checkStyle"
												:checked="infoDialogData.ddctReleaseAmtYn === 'Y'"
												disabled
											/>
											<label for="composiMissCk1">출고가 차감</label>
										</div>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">이력 상태 정보</h2>
						<div
							v-if="deviceOpenHistory.length === 0"
							class="rowCont"
							style="display: inline-block; padding: 4px 0"
						>
							이력 상태 정보가 없습니다
						</div>
						<div v-if="deviceOpenHistory.length !== 0" class="newTableStyle">
							<table class="w100P">
								<thead>
									<tr>
										<th>개통이력</th>
										<th>개통점</th>
										<th>재판매대상점</th>
										<th>개통일자</th>
										<th>철회일자</th>
									</tr>
								</thead>
								<tbody
									v-for="(history, index) in deviceOpenHistory"
									:key="index"
								>
									<tr>
										<td v-text="history.openingStatusName"></td>
										<td>
											{{ history.openingStoreName }} (
											<span v-text="history.parentStoreName"></span> )
										</td>
										<td v-text="history.saleStoreName"></td>
										<td v-text="history.openingDate"></td>
										<td v-text="history.cancelDate"></td>
									</tr>
								</tbody>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mt20 mb10">이력 조회</h2>
						<div class="newNotiTableStyle">
							<table class="w100P">
								<tr v-for="item in deviceHistory" :key="item.id">
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
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
		deviceOpenHistory: [],
	}),
	computed: {
		deviceHistory() {
			return this.$store.state.MoveStatusModule.deviceHistory;
		},
		dialog: {
			get() {
				return this.$store.state.MoveStatusModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.MoveStatusModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		async getDeviceHistory() {
			let data = {
				dvcId: this.infoDialogData.dvcId,
			};
			await this.$store.dispatch(
				'MoveStatusModule/getRetrieveDeviceHistory',
				data,
			);
			const result = await this.$store.dispatch(
				'commonModule/getRetrieveDeviceOpenHistory',
				data,
			);
			this.deviceOpenHistory = [];
			if (result) {
				this.deviceOpenHistory = result;
			}
		},
	},
	created() {
		this.getDeviceHistory();
	},
};
</script>

<style></style>
