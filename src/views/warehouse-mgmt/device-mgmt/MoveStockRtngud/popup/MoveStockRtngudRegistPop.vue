<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="1700">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">반품조회</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div style="display: flex">
							<div style="width: 38%; margin-right: 2%">
								<div class="mb10 disFx justify-md-space-between resetBtnPos1">
									<h2 class="mainFontS mainBlack2 boldWt">
										기기 고유번호 입력
									</h2>
									<button id="resetBtn1" @click="initFilter" class="mainBlue1">
										초기화
									</button>
									<label for="resetBtn1"></label>
								</div>
								<div class="new_popTable1">
									<table class="w100P">
										<tr>
											<td class="w120">기기일련번호</td>
											<td>
												<input
													type="text"
													class="borderRadi3Px borderContColor2 w350 lh30"
													v-model.trim="rawBarcode"
													@keyup.enter="barcodeScanFnc"
												/>
												<button
													class="borderRadi3Px backColorBlue3 mainWhite w60 h30 ml10"
													@click="deviceOverlapCheck"
												>
													조회
												</button>
											</td>
										</tr>
									</table>
								</div>

								<h2 class="mainFontS mainBlack2 boldWt mt20 mb10">기기정보</h2>
								<div class="new_popTable1">
									<table class="w100P">
										<tr>
											<td class="w120">통신사</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="
														getTelecomName(deviceInfo.goodsMgmtDto.telecom)
													"
												>
												</span>
											</td>
											<td class="w120">제조사</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.goodsMgmtDto.makerName"
												>
												</span>
											</td>
										</tr>
										<tr>
											<td class="w120">기기명</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.goodsMgmtDto.goodsName"
												>
												</span>
											</td>
											<td class="w120">모델명</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.goodsMgmtDto.modelName"
												>
												</span>
											</td>
										</tr>
										<tr>
											<td class="w120">용량</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.deviceDto.goodsOptionDto.capacity"
												>
												</span>
											</td>
											<td class="w120">색상</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.deviceDto.goodsOptionDto.colorName"
												>
												</span>
											</td>
										</tr>
										<tr>
											<td class="w120">일련번호</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.deviceDto.rawBarcode"
												>
												</span>
											</td>
											<td class="w120">입고단가</td>
											<td>
												<span
													v-if="deviceInfoChk"
													v-text="deviceInfo.inStockMgmtDto.inStockAmt"
												>
												</span>
											</td>
										</tr>
									</table>
								</div>

								<h2 class="mainFontS mainBlack2 boldWt mt20 mb10">
									기기 상태입력
								</h2>
								<div class="new_popTable1">
									<table class="w100P">
										<tr>
											<td class="w120">입고상태</td>
											<td class="w180">
												<div class="radioStylePop w30 ml20 floatL">
													<input
														type="radio"
														checked
														id="division01"
														value="NORMAL"
														v-model="inStockStatus"
														:disabled="!deviceInfoChk"
														name="inStockState"
													/>
													<label for="division01">정상</label>
												</div>
												<div class="radioStylePop w30 ml20 floatL">
													<input
														type="radio"
														id="division02"
														value="OPEN"
														v-model="inStockStatus"
														:disabled="!deviceInfoChk"
														name="inStockState"
													/>
													<label for="division02">개봉</label>
												</div>
											</td>
											<td class="w120">제품상태</td>
											<td class="w180">
												<div class="checkStyleCont4 floatL w80 ml20">
													<input
														type="checkbox"
														id="division03"
														true-value="Y"
														false-value="N"
														v-model="productFaultyYn"
														:disabled="!deviceInfoChk"
														name="productState"
														class="checkStyle"
													/>
													<label for="division03">불량</label>
												</div>
											</td>
										</tr>
										<tr>
											<td>외장상태</td>
											<td colspan="3">
												<div class="radioStylePop w30 ml20 floatL">
													<input
														type="radio"
														id="division04"
														checked
														value="T"
														v-model="extrrStatus"
														:disabled="!deviceInfoChk"
														name="outStockState"
													/>
													<label for="division04">상</label>
												</div>
												<div class="radioStylePop w30 ml20 floatL">
													<input
														type="radio"
														id="division05"
														value="M"
														v-model="extrrStatus"
														:disabled="!deviceInfoChk"
														name="outStockState"
													/>
													<label for="division05">중</label>
												</div>
												<div class="radioStylePop w30 ml20 floatL">
													<input
														type="radio"
														id="division06"
														value="B"
														v-model="extrrStatus"
														:disabled="!deviceInfoChk"
														name="outStockState"
													/>
													<label for="division06">하</label>
												</div>
												<div class="checkStyleCont4 floatL w80 ml40">
													<input
														id="composiMissCk"
														type="checkbox"
														true-value="Y"
														false-value="N"
														v-model="productMissYn"
														:disabled="!deviceInfoChk"
														class="checkStyle"
													/>
													<label for="composiMissCk">구성품누락</label>
												</div>
											</td>
										</tr>
										<tr v-if="productMissYn === 'Y'">
											<td>누락제품</td>
											<td>
												<input
													v-model="deviceInfo.missProduct"
													:disabled="!deviceInfoChk"
													type="text"
													class="borderRadi3Px borderContColor2 lh30 padW10 w150"
												/>
											</td>
											<td>차감비</td>
											<td>
												<input
													type="text"
													v-model="deviceInfo.ddctAmt"
													:disabled="!deviceInfoChk"
													oninput="this.value = this.value.replace(/[^0-9]/g, '');"
													class="borderRadi3Px borderContColor2 lh30 padW10 w150"
												/>
											</td>
										</tr>
										<tr>
											<td>반품비</td>
											<td>
												<input
													type="text"
													v-model="deviceInfo.returnStockAmt"
													:disabled="!deviceInfoChk"
													oninput="this.value = this.value.replace(/[^0-9]/g, '');"
													class="lh30 padW10 w100P borderContColor1 borderRadi3Px"
												/>
											</td>
											<td>추가차감금액</td>
											<td>
												<input
													type="text"
													v-model="deviceInfo.addDdctAmt"
													:disabled="!deviceInfoChk"
													oninput="this.value = this.value.replace(/[^0-9]/g, '');"
													class="lh30 floatL w40"
												/>
												<div class="checkStyleCont4 floatR w80 ml30">
													<input
														id="composiMissCk1"
														type="checkbox"
														class="checkStyle floatL"
														:disabled="!deviceInfoChk"
														true-value="Y"
														false-value="N"
														v-model.trim="ddctReleaseAmtYn"
													/>
													<label for="composiMissCk1">출고가 차감</label>
												</div>
											</td>
										</tr>
										<tr>
											<td>수정메모</td>
											<td colspan="3">
												<input
													type="text"
													class="borderContColor1 borderRadi3Px lh30 w100P"
													v-model="deviceInfo.returnStockMemo"
													:disabled="!deviceInfoChk"
												/>
											</td>
										</tr>
									</table>
								</div>

								<div class="rowCont">
									<div class="rowItem w100P mt20">
										<v-btn
											class="w100P backColorBlue1 mainBlue2 borderSubColor1"
											@click="deviceInsertBtnFnc"
											>추가</v-btn
										>
									</div>
								</div>
							</div>
							<div style="width: 60%">
								<div>
									<h2 class="mainFontS mainBlack2 boldWt">
										기기별 입력정보 총 수량 :
										<span
											v-if="deviceInfoList"
											v-text="deviceInfoList.length"
										></span>
									</h2>
								</div>
								<div>
									<div
										class="newTableStyle mt10"
										style="max-height: 250px; overflow-y: scroll"
									>
										<table class="w100P">
											<thead>
												<tr style="cursor: context-menu">
													<th>통신사</th>
													<th>보유처</th>
													<th>재고구분</th>
													<th>제조사</th>
													<th>기기명<br />(모델명)</th>
													<th>용량</th>
													<th>색상</th>
													<th>일련번호</th>
													<th>입고단가</th>
													<th>입고상태</th>
													<th>제품상태</th>
													<th>외장상태</th>
												</tr>
											</thead>
											<tbody>
												<template v-if="deviceInfoList.length >= 1">
													<tr
														v-for="item in deviceInfoList"
														style="cursor: context-menu"
														:key="item.id"
													>
														<td v-text="getTelecomName(item.telecom)"></td>
														<td>{{ item.stockName }}</td>
														<td>
															<span v-if="item.stockType === 'I'"
																>매장재고</span
															>
															<span v-if="item.stockType === 'M'"
																>이동재고</span
															>
														</td>
														<td>{{ item.makerName }}</td>
														<td>
															{{ item.goodsName }}<br />( {{ item.modelName }} )
														</td>
														<td>{{ item.capacity }}</td>
														<td>{{ item.colorName }}</td>
														<td>{{ item.rawBarcode }}</td>
														<td>
															{{
																item.inStockAmt
																	.toString()
																	.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
															}}
															원
														</td>
														<td>
															<span v-if="item.inStockStatus === 'NORMAL'"
																>정상</span
															>
															<span v-if="item.inStockStatus === 'OPEN'"
																>개봉</span
															>
														</td>
														<td>
															<span v-if="item.productFaultyYn === 'N'"
																>정상</span
															>
															<span v-if="item.productFaultyYn === 'Y'"
																>불량</span
															>
														</td>
														<td>
															<span v-if="item.extrrStatus === 'T'">상</span>
															<span v-if="item.extrrStatus === 'M'">중</span>
															<span v-if="item.extrrStatus === 'B'">하</span>
															<span v-if="item.extrrStatus === 'F'">파손</span>
														</td>
													</tr>
												</template>
												<template v-else>
													<tr style="cursor: context-menu">
														<td colspan="100">데이터가 없습니다.</td>
													</tr>
												</template>
											</tbody>
										</table>
									</div>
								</div>
								<div class="rowHeader mt20">
									<h2 class="mainFontS mainBlack2 boldWt">
										모델별 입력정보 총 수량 :
										<span
											v-if="deviceInfoList"
											v-text="deviceInfoList.length"
										></span>
									</h2>
								</div>
								<div>
									<div
										class="newTableStyle mt10"
										style="max-height: 250px; overflow-y: scroll"
									>
										<table class="w100P">
											<thead>
												<tr>
													<th>통신사</th>
													<th>보유처</th>
													<th>제조사</th>
													<th>기기명<br />(모델명)</th>
													<th>용량</th>
													<th>색상</th>
													<th>수량</th>
												</tr>
											</thead>
											<tbody>
												<template v-if="deviceTotalList.length >= 1">
													<tr
														v-for="item in deviceTotalList"
														:key="item.id"
														style="cursor: context-menu"
													>
														<td v-text="getTelecomName(item.telecom)"></td>
														<td>
															{{ item.stockName }}
														</td>
														<td>
															{{ item.makerName }}
														</td>
														<td>
															{{ item.goodsName }} <br />
															( {{ item.modelName }} )
														</td>
														<td>
															{{ item.capacity }}
														</td>
														<td>
															{{ item.colorName }}
														</td>
														<td>
															{{ item.cnt }}
														</td>
													</tr>
												</template>
												<template v-else>
													<tr style="cursor: context-menu">
														<td colspan="100">데이터가 없습니다.</td>
													</tr>
												</template>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="disFx justify-md-space-between mt20">
							<span
								>*<span class="mainRed">'확인'</span>을 누르셔야 반품이
								완료되며, <span class="mainRed">'취소'</span>를 누르시면 기존
								작업이 사라집니다.</span
							>
							<div>
								<v-btn class="backColorMint1 mainWhite w100" @click="submit">
									확인
								</v-btn>
								<v-btn
									class="backColorGray1 mainWhite ml10 w100"
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
		<overlap-device-popup
			v-if="overlapDevicePop"
			:overlapDialog="overlapDevicePop"
			:overlapDeviceData="overlapDeviceData"
			@overlapSuccessFnc="overlapSuccessFnc"
			@closeDialog="dialogClose"
		></overlap-device-popup>
	</div>
</template>

<script>
import { getTelecomName, productCountTo } from '../../../../../common/common';
import overlapDevicePopup from '../../../../../components/device/overlapDevicePopup';

export default {
	components: {
		overlapDevicePopup,
	},
	data: () => ({
		rawBarcode: '',
		scannerType: 'K',
		deviceData: {},
		deviceInfoList: [],
		deviceTotalList: [],
		inStockStatus: 'NORMAL',
		extrrStatus: 'T',
		productMissYn: 'N',
		ddctReleaseAmtYn: 'N',
		productFaultyYn: 'N',
		overlapDevicePop: false,
		overlapDeviceData: [],
		overlapDvcId: '',
	}),
	computed: {
		deviceInfoChk: {
			get() {
				return this.$store.state.MoveStockRtngudModule.deviceInfoChk;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.deviceInfoChk = newValue;
			},
		},
		deviceInfo: {
			get() {
				return this.$store.state.MoveStockRtngudModule.deviceInfo;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.deviceInfo = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.MoveStockRtngudModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.regiDialog = newValue;
			},
		},
	},
	methods: {
		overlapSuccessFnc(dvcId) {
			this.overlapDvcId = dvcId;
			this.barcodeScanFnc();
		},
		overlapDevicePopFnc(data) {
			this.overlapDevicePop = !this.overlapDevicePop;
			this.overlapDeviceData = data || [];
		},
		dialogClose(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		async deviceOverlapCheck() {
			if (!this.rawBarcode) {
				alert('제품일련번호를 입력해주세요.');
				return;
			}
			let data = {
				barcode: this.rawBarcode,
				goodsType: '',
			};
			const result = await this.$store.dispatch(
				'commonModule/deviceOverlapCheck',
				data,
			);
			if (result.totalCnt === 1) {
				this.overlapDvcId = result.resultList[0].dvcId;
				await this.barcodeScanFnc();
			} else if (result.totalCnt > 1) {
				this.overlapDevicePopFnc(result.resultList);
			} else {
				alert('조회된 결과가 없습니다.');
			}
		},
		initFilter() {
			this.rawBarcode = '';
			this.deviceInfo = {};
			this.deviceData = {};
			this.deviceInfoChk = false;
			this.inStockStatus = 'NORMAL';
			this.extrrStatus = 'T';
			this.productMissYn = 'N';
			this.ddctReleaseAmtYn = 'N';
			this.productFaultyYn = 'N';
			this.overlapDvcId = '';
		},
		async barcodeScanFnc() {
			let data = {
				barcode: this.rawBarcode,
				selDvcId: this.overlapDvcId,
			};
			const result = await this.$store.dispatch(
				'MoveStockRtngudModule/getDeviceInfo',
				data,
				this.deviceInfoList,
			);
			if (result) {
				this.deviceInsertCheck();
			}
		},
		deviceInsertCheck() {
			this.deviceInfoList.forEach(item => {
				if (this.deviceInfo.deviceDto.dvcId === item.dvcId) {
					alert('이미 등록중인 기기 입니다.');
					this.initFilter();
					return;
				}
			});
		},
		deviceInsertBtnFnc() {
			if (!this.deviceInfoChk) {
				alert('제품일련번호를 입력해주세요.');
				return;
			}

			this.deviceData.inStockStatus = this.inStockStatus; // 입고상태
			this.deviceData.extrrStatus = this.extrrStatus; // 외장상태
			this.deviceData.productMissYn = this.productMissYn; // 구성품누락
			this.deviceData.missProduct = this.deviceInfo.missProduct; // 누락제품
			this.deviceData.ddctAmt = this.deviceInfo.ddctAmt; // 누락제품
			this.deviceData.ddctReleaseAmtYn = this.ddctReleaseAmtYn; // 출고가 차감
			this.deviceData.productFaultyYn = this.productFaultyYn; // 제품상태
			this.deviceData.returnStockAmt = this.deviceInfo.returnStockAmt; // 반품비
			this.deviceData.returnStockMemo = this.deviceInfo.returnStockMemo; // 수정메모
			this.deviceData.addDdctAmt = this.deviceInfo.addDdctAmt; // 추가차감금액

			this.deviceData.dvcId = this.deviceInfo.deviceDto.dvcId;
			this.deviceData.telecom = this.deviceInfo.goodsMgmtDto.telecom;
			this.deviceData.stockName = this.deviceInfo.stockMgmtDto.stockName;
			this.deviceData.makerName = this.deviceInfo.goodsMgmtDto.makerName;
			this.deviceData.goodsName = this.deviceInfo.goodsMgmtDto.goodsName;
			this.deviceData.modelName = this.deviceInfo.goodsMgmtDto.modelName;
			this.deviceData.capacity = this.deviceInfo.deviceDto.goodsOptionDto.capacity;
			this.deviceData.colorName = this.deviceInfo.deviceDto.goodsOptionDto.colorName;
			this.deviceData.rawBarcode = this.deviceInfo.deviceDto.rawBarcode;
			this.deviceData.inStockAmt = this.deviceInfo.inStockMgmtDto.inStockAmt;
			this.deviceData.stockType = this.deviceInfo.stockMgmtDto.stockType;
			this.deviceData.stockId = this.deviceInfo.stockMgmtDto.stockId;
			this.deviceData.prevStockId = this.deviceInfo.stockMgmtDto.stockId;

			this.deviceInfoList.push(this.deviceData);
			//this.deviceTotalList = productCount(this.deviceInfoList);
			this.deviceTotalList = productCountTo(this.deviceInfoList);
			this.initFilter();
		},
		scannerChkFnc() {
			// 바코드 스캐너일시 요 펑션 탐
			this.scannerType = 'S';
		},
		async submit() {
			if (this.deviceInfoList.length <= 0) {
				alert('반품할 기기를 등록해주세요.');
				return;
			}
			const dataList = [];
			for (let i = 0; i < this.deviceInfoList.length; i++) {
				let data = {
					dvcId: this.deviceInfoList[i].dvcId,
					returnStockAmt: this.deviceInfoList[i].returnStockAmt,
					returnStockMemo: this.deviceInfoList[i].returnStockMemo,
					returnDeviceStatus: {
						addDdctAmt: this.deviceInfoList[i].addDdctAmt,
						ddctAmt: this.deviceInfoList[i].ddctAmt,
						ddctReleaseAmtYn: this.deviceInfoList[i].ddctReleaseAmtYn,
						extrrStatus: this.deviceInfoList[i].extrrStatus,
						missProduct: this.deviceInfoList[i].missProduct,
						productFaultyYn: this.deviceInfoList[i].productFaultyYn,
						productMissYn: this.deviceInfoList[i].productMissYn,
						inStockStatus: this.deviceInfoList[i].inStockStatus,
					},
					prevStockId: this.deviceInfoList[i].stockId,
					rawBarcode: this.deviceInfoList[i].rawBarcode,
				};
				dataList.push(data);
			}
			const result = await this.$store.dispatch(
				'MoveStockRtngudModule/insertReturnStock',
				dataList,
			);
			if (result.length > 0) {
				// TODO 테스트 필요
				// 반품 실패시 리스트
				let failList = [];
				for (let i = 0; i < this.deviceInfoList.length; i++) {
					for (let j = 0; j < result.length; j++) {
						if (this.deviceInfoList[i].rawBarcode === result[j]) {
							failList.push(this.deviceInfoList[i]);
						}
					}
				}
				this.deviceInfoList = failList;
				this.deviceTotalList = productCountTo(failList);
			} else {
				const data = this.$store.state.MoveStockRtngudModule.filterData;
				await this.$store.dispatch(
					'MoveStockRtngudModule/getReturnStockList',
					data,
				);
			}
		},
		getTelecomName(data) {
			return getTelecomName(data);
		},
	},
	created() {
		this.initFilter();
		this.$barcodeScanner.init(this.scannerChkFnc);
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
