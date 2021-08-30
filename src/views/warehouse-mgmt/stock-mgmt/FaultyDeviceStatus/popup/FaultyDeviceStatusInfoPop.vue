<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="750">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">기기이력 상세조회</h2>
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
								<tr>
									<td class="w120">
										보유처 <span class="orangefont">Before</span>
									</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.stockName"
											class="cursorDefault"
											disabled
											readonly
										/>
									</td>
									<td class="w120">
										보유처 <span class="mainMint1">After</span>
									</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.provName"
											class="cursorDefault"
											disabled
											readonly
										/>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mb10">기기정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">통신사</td>
									<td>
										<input
											type="text"
											:value="getTelecomName(infoDialogData.telecom)"
											class="cursorDefault"
											disabled
											readonly
										/>
									</td>
									<td class="w120">제조사</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.makerName"
											class="cursorDefault"
											disabled
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
												name="inStockStatus"
												disabled
												:checked="
													infoDialogData.deviceStatusListDto.inStockStatus ===
													'NORMAL'
												"
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
												:checked="
													infoDialogData.deviceStatusListDto.inStockStatus ===
													'OPEN'
												"
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
								<tr class="h40">
									<td>외장상태</td>
									<td colspan="3">
										<div class="radioStylePop w30 ml20 floatL">
											<input
												type="radio"
												id="division04"
												checked=""
												value="T"
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'T'
												"
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
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'M'
												"
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
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'B'
												"
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
												:checked="
													infoDialogData.deviceStatusListDto.extrrStatus === 'F'
												"
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
											:value="infoDialogData.deviceStatusListDto.missProduct"
											disabled
											class="cursorDefault borderRadi3Px borderContColor1 padW10"
										/>
									</td>
									<td>차감비</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.deviceStatusListDto.ddctAmt"
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
											:value="infoDialogData.deviceStatusListDto.addDdctAmt"
											disabled
											class="floatL lh30"
										/>
										<div class="checkStyleCont4 floatL w80 ml30">
											<input
												id="composiMissCk1"
												type="checkbox"
												class="checkStyle"
												:checked="
													infoDialogData.deviceStatusListDto
														.ddctReleaseAmtYn === 'Y'
												"
												disabled
											/>
											<label for="composiMissCk1">출고가 차감</label>
										</div>
									</td>
								</tr>
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
import { getTelecomName } from '../../../../../common/common';

export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
	}),
	computed: {
		deviceHistory() {
			return this.$store.state.FaultyDeviceStatusModule.deviceHistory;
		},
		dialog: {
			get() {
				return this.$store.state.FaultyDeviceStatusModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.FaultyDeviceStatusModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async getRetrieveDeviceHistory() {
			let data = {
				dvcId: this.infoDialogData.dvcId,
			};
			await this.$store.dispatch(
				'FaultyDeviceStatusModule/getRetrieveDeviceHistory',
				data,
			);
		},
	},
	created() {
		this.getRetrieveDeviceHistory();
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
</style>
