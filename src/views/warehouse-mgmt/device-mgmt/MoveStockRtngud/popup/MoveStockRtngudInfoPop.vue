<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="750">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">반품조회</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<h2 class="mainFontS mainBlack2 boldWt mb10">기기정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w100">통신사</td>
									<td>
										<input
											type="text"
											:value="getTelecomName(infoDialogData.telecom)"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w100">제조사</td>
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
									<td class="w100">기기명</td>
									<td>
										<input
											<input
											type="text"
											:value="infoDialogData.goodsName"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w100">모델명</td>
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
									<td class="w100">용량</td>
									<td>
										<input
											type="text"
											:value="infoDialogData.capacity"
											class="cursorDefault"
											readonly
										/>
									</td>
									<td class="w100">색상</td>
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
									<td class="w100">일련번호</td>
									<td>
										<input
											style="width: 55%"
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
									<td class="w100">재고구분</td>
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
						<h2 class="mainFontS mainBlack2 boldWt mt20 mb10">기기 상태정보</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w100">입고상태</td>
									<td class="w180">
										<div class="radioStylePop w50 ml20 floatL">
											<input
												type="radio"
												:checked="deviceStatusDetail.inStockStatus === 'NORMAL'"
												disabled
											/>
											<label>정상</label>
										</div>
										<div class="radioStylePop w50 ml20 floatL">
											<input
												type="radio"
												disabled
												:checked="deviceStatusDetail.inStockStatus === 'OPEN'"
											/>
											<label>개봉</label>
										</div>
									</td>
									<td class="w100">제품상태</td>
									<td class="w180">
										<div class="checkStyleCont4 ml20">
											<input
												id="check100"
												class="checkStyle"
												type="checkbox"
												disabled
												:checked="deviceStatusDetail.productFaultyYn === 'Y'"
											/>
											<label for="check100">불량</label>
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
													disabled
													:checked="deviceStatusDetail.extrrStatus === 'T'"
												/><label>상</label>
											</div>
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													disabled
													class="ml10"
													:checked="deviceStatusDetail.extrrStatus === 'M'"
												/><label>중</label>
											</div>
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													disabled
													class="ml10"
													:checked="deviceStatusDetail.extrrStatus === 'B'"
												/><label>하</label>
											</div>
											<div class="radioStylePop w30 ml20 floatL">
												<input
													type="radio"
													disabled
													class="ml10"
													:checked="deviceStatusDetail.extrrStatus === 'F'"
												/><label>파손</label>
											</div>
											<div class="checkStyleCont4 floatL ml40">
												<input
													id="check101"
													type="checkbox"
													disabled
													class="ml10 checkStyle"
													:checked="deviceStatusDetail.productMissYn === 'Y'"
												/><label for="check101">구성품누락</label>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>반품비</td>
									<td>
										<input
											type="text"
											disabled
											v-model.trim="deviceStatusDetail.returnStockAmt"
										/>
									</td>
									<td>추가차감금액</td>
									<td>
										<input
											type="text"
											disabled
											v-model.trim="deviceStatusDetail.addDdctAmt"
										/>
									</td>
								</tr>
							</table>

							<div
								v-if="deviceOpenHistory.length !== 0"
								class="newTableStyle mt10"
							>
								<h2 class="mainFontS mainBlack2 boldWt mt20 mb10">
									개통 기기이력
								</h2>
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

							<h2 class="mainFontS mainBlack2 boldWt mt20 mb10">이력조회</h2>
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
									class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
									@click="dialog = false"
									style="background-color: #bdbdbd"
								>
									닫기
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
import {getTelecomName} from '../../../../../common/common';

export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
		deviceOpenHistory: [],
	}),
	computed: {
		deviceStatusDetail() {
			return this.$store.state.MoveStockRtngudModule.deviceStatusDetail;
		},
		deviceHistory() {
			return this.$store.state.MoveStockRtngudModule.deviceHistory;
		},
		dialog: {
			get() {
				return this.$store.state.MoveStockRtngudModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async getDeviceHistory() {
			let data = {
				dvcId: this.infoDialogData.dvcId,
			};
			await this.$store.dispatch(
				'MoveStockRtngudModule/getRetrieveDeviceHistory',
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
			this.getRetrieveDeviceStatusInfo(data);
		},
		getRetrieveDeviceStatusInfo(data) {
			this.$store.dispatch(
				'MoveStockRtngudModule/getRetrieveDeviceStatusInfo',
				data,
			);
		},
	},
	created() {
		this.getDeviceHistory();
	},
};
</script>

<style scoped>
.bonusCheck {
	position: relative;
}
.bonusCheckCont {
	position: absolute;
	right: 0;
	top: 0;
}
</style>
