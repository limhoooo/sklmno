<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="1600"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>반품조회</p>
							</div>
							<div style="display: flex">
								<div style="width: 38%; margin-right: 2%">
									<div class="rowHeader mt20">
										<p style="display: inline-block; width: 160px">
											기기고유번호입력
										</p>
										<v-btn @click="initFilter" class="ml10" icon>
											<v-icon style="color: #7e7e7e">mdi-cached</v-icon>
											<span
												style="
													color: #7e7e7e;
													font-weight: bold;
													font-size: 12px;
												"
												>초기화</span
											>
										</v-btn>
									</div>
									<div class="rowCont">
										<div class="rowItem w100P">
											<p>일련번호</p>
											<input
												type="text"
												style="width: 53%"
												v-model.trim="rawBarcode"
												@keyup.enter="barcodeScanFnc"
											/>
											<button @click="deviceOverlapCheck">조회</button>
										</div>
									</div>
									<div class="rowHeader mt20">
										<p>기기정보</p>
									</div>
									<div class="rowCont">
										<div class="rowItem">
											<p>통신사</p>
											<span
												v-if="deviceInfoChk"
												v-text="getTelecomName(deviceInfo.goodsMgmtDto.telecom)"
											>
											</span>
										</div>
										<div class="rowItem ml10P">
											<p>제조사</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.goodsMgmtDto.makerName"
											>
											</span>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem">
											<p>기기명</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.goodsMgmtDto.goodsName"
											>
											</span>
										</div>
										<div class="rowItem ml10P">
											<p>모델명</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.goodsMgmtDto.modelName"
											>
											</span>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem">
											<p>용량</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.deviceDto.goodsOptionDto.capacity"
											>
											</span>
										</div>
										<div class="rowItem ml10P">
											<p>색상</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.deviceDto.goodsOptionDto.colorName"
											>
											</span>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem">
											<p>일련번호</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.deviceDto.rawBarcode"
											>
											</span>
										</div>
										<div class="rowItem ml10P">
											<p>입고단가</p>
											<span
												v-if="deviceInfoChk"
												v-text="deviceInfo.inStockMgmtDto.inStockAmt"
											>
											</span>
										</div>
									</div>
									<div class="rowHeader mt20">
										<p>기기상태입력</p>
									</div>
									<div class="rowCont">
										<div class="rowItem rowItemText">
											<span>입고상태</span>
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
										<div class="rowItem rowItemText ml10P">
											<span>제품상태</span>
											<input
												type="checkbox"
												id="division03"
												true-value="Y"
												false-value="N"
												v-model="productFaultyYn"
												:disabled="!deviceInfoChk"
												name="productState"
											/>
											<label for="division03">불량</label>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem w100P rowItemText">
											<span>외장상태</span>
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
											<input
												type="radio"
												id="division05"
												value="M"
												v-model="extrrStatus"
												:disabled="!deviceInfoChk"
												name="outStockState"
											/>
											<label for="division05">중</label>
											<input
												type="radio"
												id="division06"
												value="B"
												v-model="extrrStatus"
												:disabled="!deviceInfoChk"
												name="outStockState"
											/>
											<label for="division06">하</label>
											<input
												id="composiMissCk"
												type="checkbox"
												true-value="Y"
												false-value="N"
												v-model="productMissYn"
												:disabled="!deviceInfoChk"
											/>
											<label for="composiMissCk">구성품누락</label>
										</div>
									</div>
									<div class="rowCont" v-if="productMissYn === 'Y'">
										<div class="rowItem">
											<p>누락제품</p>
											<input
												type="text"
												v-model="deviceInfo.missProduct"
												:disabled="!deviceInfoChk"
											/>
										</div>
										<div class="rowItem ml10P">
											<p>차감비</p>
											<input
												type="text"
												v-model="deviceInfo.ddctAmt"
												:disabled="!deviceInfoChk"
												oninput="this.value = this.value.replace(/[^0-9]/g, '');"
											/>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem">
											<p>반품비</p>
											<input
												type="text"
												v-model="deviceInfo.returnStockAmt"
												:disabled="!deviceInfoChk"
												oninput="this.value = this.value.replace(/[^0-9]/g, '');"
											/>
										</div>
										<div class="rowItem ml10P rowItemText">
											<p>추가차감금액</p>
											<input
												type="text"
												style="width: 30%"
												v-model="deviceInfo.addDdctAmt"
												:disabled="!deviceInfoChk"
												oninput="this.value = this.value.replace(/[^0-9]/g, '');"
											/>
											<input
												id="composiMissCk1"
												type="checkbox"
												:disabled="!deviceInfoChk"
												true-value="Y"
												false-value="N"
												v-model.trim="ddctReleaseAmtYn"
											/>
											<label for="composiMissCk1">출고가 차감</label>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem w100P">
											<p style="width: 60px">수정메모</p>
											<input
												type="text"
												v-model="deviceInfo.returnStockMemo"
												:disabled="!deviceInfoChk"
											/>
										</div>
									</div>
									<div class="rowCont">
										<div class="rowItem w100P">
											<v-btn
												style="
													width: 100%;
													margin: 10px 0;
													background-color: #17a5ae;
												"
												@click="deviceInsertBtnFnc"
												>추가</v-btn
											>
										</div>
									</div>
								</div>
								<div style="width: 60%">
									<div class="rowHeader mt20">
										<p style="width: 240px">
											기기별 입력정보 총 수량 :
											<span
												v-if="deviceInfoList"
												v-text="deviceInfoList.length"
											></span>
										</p>
									</div>
									<div>
										<div
											class="tableCont"
											style="max-height: 250px; overflow-y: scroll"
										>
											<table>
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
																{{ item.goodsName }}<br />(
																{{ item.modelName }} )
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
																<span v-if="item.extrrStatus === 'F'"
																	>파손</span
																>
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
										<p style="width: 240px">
											모델별 입력정보 총 수량 :
											<span
												v-if="deviceInfoList"
												v-text="deviceInfoList.length"
											></span>
										</p>
									</div>
									<div>
										<div
											class="tableCont"
											style="max-height: 250px; overflow-y: scroll"
										>
											<table>
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
														<!--														<tr-->
														<!--															v-for="item in deviceTotalList"-->
														<!--															:key="item.id"-->
														<!--															style="cursor: context-menu"-->
														<!--														>-->
														<!--															<td-->
														<!--																v-if="item.telcomCount >= 1 || item.telcomRow"-->
														<!--																:rowspan="item.telcomCount"-->
														<!--																v-text="getTelecomName(item.telecom)"-->
														<!--															></td>-->
														<!--															<td-->
														<!--																v-if="-->
														<!--																	item.holdStoreCount >= 1 || item.holdStoreRow-->
														<!--																"-->
														<!--																:rowspan="item.holdStoreCount"-->
														<!--															>-->
														<!--																{{ item.stockName }}-->
														<!--															</td>-->
														<!--															<td-->
														<!--																v-if="-->
														<!--																	item.manufacturerCount >= 1 ||-->
														<!--																	item.manufacturerRow-->
														<!--																"-->
														<!--																:rowspan="item.manufacturerCount"-->
														<!--															>-->
														<!--																{{ item.makerName }}-->
														<!--															</td>-->
														<!--															<td-->
														<!--																v-if="item.deviceCount >= 1 || item.deviceRow"-->
														<!--																:rowspan="item.deviceCount"-->
														<!--															>-->
														<!--																{{ item.goodsName }} <br />-->
														<!--																( {{ item.modelName }} )-->
														<!--															</td>-->
														<!--															<td-->
														<!--																v-if="item.volumeCount >= 1 || item.volumeRow"-->
														<!--																:rowspan="item.volumeCount"-->
														<!--															>-->
														<!--																{{ item.capacity }}-->
														<!--															</td>-->
														<!--															<td-->
														<!--																v-if="item.colorCount >= 1 || item.colorRow"-->
														<!--																:rowspan="item.colorCount"-->
														<!--															>-->
														<!--																{{ item.colorName }}-->
														<!--															</td>-->
														<!--															<td-->
														<!--																v-if="item.cnt && !item.cntCheck"-->
														<!--																:rowspan="item.cnt"-->
														<!--															>-->
														<!--																{{ item.cnt }}-->
														<!--															</td>-->
														<!--														</tr>-->
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
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<!--						<div class="memberCont">-->
						<!--							<p>물류팀</p>-->
						<!--							<p style="color: #003a53">-->
						<!--								담당자<span style="font-weight: bold; margin-left: 3px"-->
						<!--									>송대호</span-->
						<!--								>-->
						<!--							</p>-->
						<!--							<p class="font-red">마지막저장일 2021-02-20 13:14:00</p>-->
						<!--						</div>-->
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn text @click="submit" style="background-color: #17a5ae">
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
import {getTelecomName, productCountTo} from '../../../../../common/common';
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
