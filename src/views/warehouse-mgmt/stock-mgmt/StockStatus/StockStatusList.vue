<template>
	<div>
		<div
			class="disFx mt30 justify-lg-space-between"
			style="align-items: center"
		>
			<div class="pagingSelectCont">
				<select
					class="pagingSelect"
					v-model.trim="perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="ml10 subBlue1">
					Total {{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
				</span>
			</div>
			<div class="disFx">
				<span class="new-excel-btn lh30" @click="excelDownloadBtn()">
					엑셀 다운로드
				</span>
				<div class="lh30 h30 disFx posR">
					<span class="fakeLine1 ml40 mr5 boldWt w100 disIn">재고조회</span>
					<input
						type="text"
						class="newInput1"
						v-model.trim="chkFullBarcode"
						@keyup.enter="deviceOverlapCheck"
						placeholder="일련번호 입력"
					/>
					<button
						@click="deviceOverlapCheck"
						class="ml5 w30 posA searchBtn1"
						style="background-color: #00293b; color: white"
					>
						조회
					</button>
				</div>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일 (+경과일)</th>
						<th>재고확인일 (+경과일)</th>
						<th>공급처</th>
						<th class="w250">보유처</th>
						<th>재고구분</th>
						<th>제조사</th>
						<th>기기명 (모델명)</th>
						<th>용량</th>
						<th>색상</th>
						<th>일련번호</th>
						<!--						<th>입고단가</th>-->
						<!--						<th>입고상태</th>-->
						<!--						<th>제품상태</th>-->
						<!--						<th>외장상태</th>-->
						<th>수동검수유형</th>
						<th>사유</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="listData.length >= 1">
						<tr
							@click="infoDialogFnc(item)"
							v-for="(item, index) in listData"
							:key="item.index"
							:class="checkStoreStockClickFnc(item, index)"
						>
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>
								{{ item.telecomName }}
							</td>
							<td>
								{{ item.inStockRegiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />( + {{ item.diffInStockRegiDate }}일 )
							</td>
							<td>
								<span v-if="item.stockCheckDateTime1">
									{{ item.stockCheckDateTime1 | moment('YYYY-MM-DD HH:mm:ss') }}
									<br />
									( + {{ item.diffStockCheckDateTime1 }}일 )
									<br />
									<span v-if="item.stockCheckDateTime2">
										{{
											item.stockCheckDateTime2 | moment('YYYY-MM-DD HH:mm:ss')
										}}
										<br />
										( + {{ item.diffStockCheckDateTime2 }}일 )
									</span>
								</span>
								<span v-else> ( - ) </span>
							</td>
							<td>{{ item.provName }}</td>
							<td>
								<div
									style="
										display: flex;
										justify-content: space-between;
										padding: 0 5px;
									"
								>
									<span class="orangefont">before</span
									><span>{{ item.prevStockName }}</span>
								</div>
								<div
									style="
										display: flex;
										justify-content: space-between;
										padding: 0 5px;
									"
								>
									<span class="skybluefont">after</span
									><span>{{ item.nextStockName }}</span>
								</div>
							</td>
							<td>{{ item.statusStr }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
							<td>
								<span v-if="item.goodsType === 'DVC'">{{ item.capacity }}</span
								><span v-else>-</span>
							</td>
							<td>
								<span v-if="item.colorName !== null">{{ item.colorName }}</span
								><span v-else>-</span>
							</td>
							<td onclick="event.cancelBubble=true">{{ item.rawBarcode }}</td>
							<!--							<td>-->
							<!--								{{-->
							<!--									item.inStockAmt-->
							<!--										.toString()-->
							<!--										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')-->
							<!--								}}-->
							<!--								원-->
							<!--							</td>-->
							<!--							<td>{{ item.deviceStatusListDto.inStockStatusMsg }}</td>-->
							<!--							<td>-->
							<!--								<span v-if="item.deviceStatusListDto.productFaultyYn === 'N'"-->
							<!--									>정상</span-->
							<!--								>-->
							<!--								<span v-if="item.deviceStatusListDto.productFaultyYn === 'Y'"-->
							<!--									>불량</span-->
							<!--								>-->
							<!--							</td>-->
							<!--							<td>-->
							<!--								<span v-if="item.deviceStatusListDto.productMissYn === 'Y'"-->
							<!--									>{{ item.deviceStatusListDto.extrrStatusMsg-->
							<!--									}}<br />구성품누락</span-->
							<!--								>-->
							<!--								<span v-else-->
							<!--									>{{ item.deviceStatusListDto.extrrStatusMsg }}<br />-</span-->
							<!--								>-->
							<!--							</td>-->
							<td>
								{{ item.stockManualCheckStatusMsg }}
							</td>
							<td>
								{{ item.stockManualCheckMemo }}
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td colspan="100">데이터가 없습니다.</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
		<StockCheckPop
			@resultCheckPop="resultCheckPop"
			:overlapDvcId="overlapDvcId"
			v-if="stockCheckPop"
		>
		</StockCheckPop>
		<stock-status-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		></stock-status-info-pop>
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
import StockStatusInfoPop from './popup/StockStatusInfoPop';
import StockCheckPop from './popup/StockCheckPop';
import paging from '../../../../components/paging';
import overlapDevicePopup from '../../../../components/device/overlapDevicePopup';

export default {
	components: {
		StockStatusInfoPop,
		paging,
		overlapDevicePopup,
		StockCheckPop,
	},
	data: () => ({
		chkClass: 'stockChkBg',
		infoDialogData: [],
		overlapDevicePop: false,
		overlapDeviceData: [],
		overlapDvcId: '',
		scannerCheck: false,
		time1: '',
		time2: '',
	}),
	computed: {
		listData() {
			return this.$store.state.StockStatusModule.listData;
		},
		infoDialog() {
			return this.$store.state.StockStatusModule.infoDialog;
		},
		totalCnt() {
			return this.$store.state.StockStatusModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.StockStatusModule.pagingData;
		},
		filterData: {
			get() {
				return this.$store.state.StockStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.filterData = newValue;
			},
		},
		stockCheckPop: {
			get() {
				return this.$store.state.StockStatusModule.stockCheckPop;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.stockCheckPop = newValue;
			},
		},
		checkStoreStockChk: {
			get() {
				return this.$store.state.StockStatusModule.checkStoreStockChk;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.checkStoreStockChk = newValue;
			},
		},
		chkFullBarcode: {
			get() {
				return this.$store.state.StockStatusModule.chkFullBarcode;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.chkFullBarcode = newValue;
			},
		},
		perPageCnt: {
			get() {
				return this.$store.state.StockStatusModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.filterData.perPageCnt = newValue;
			},
		},
	},

	methods: {
		overlapSuccessFnc(dvcId) {
			this.overlapDvcId = dvcId;
			this.checkStoreStockFnc();
		},
		overlapDevicePopFnc(data) {
			this.overlapDevicePop = !this.overlapDevicePop;
			this.overlapDeviceData = data || [];
		},
		dialogClose(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
			this.resetBarcodeChkCnt();
		},
		async excelDownloadBtn() {
			if (this.listData <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			const filterData = this.filterData;
			let data = {};
			for (let item in filterData) {
				data[item] = filterData[item];
			}
			if (data.goodsName === '전체') {
				data.goodsName = '';
			}
			if (data.capacity === '전체') {
				data.capacity = '';
			}
			if (data.colorName === '전체') {
				data.colorName = '';
			}
			data.pageNo = this.pagingData.pageNo;
			data.perPageCnt = this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: data,
				apiName: 'getStoreStockList',
				fileName: '재고현황리스트',
			};
			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
		checkStoreStockClickFnc(item, index) {
			if (index === 0 && item.checkStoreStockChk && this.checkStoreStockChk) {
				return this.chkClass;
			}
		},
		async deviceOverlapCheck() {
			if (!this.chkFullBarcode) {
				alert('제품일련번호를 입력해주세요.');
				return;
			}
			let data = {
				barcode: this.chkFullBarcode,
				goodsType: 'DVC',
			};
			const result = await this.$store.dispatch(
				'commonModule/deviceOverlapCheck',
				data,
			);
			if (result.totalCnt === 1) {
				this.overlapDvcId = result.resultList[0].dvcId;
				await this.checkStoreStockFnc();
			} else if (result.totalCnt > 1) {
				this.overlapDevicePopFnc(result.resultList);
			} else {
				alert('조회된 결과가 없습니다.');
				this.resetBarcodeChkCnt();
			}
		},
		async checkStoreStockFnc() {
			if (this.scannerCheck) {
				// 스캐너 일시
				let data = {
					selDvcId: this.overlapDvcId,
					stockCheckType: 'AUTO',
				};
				const result = await this.$store.dispatch(
					'StockStatusModule/checkStoreStockDto',
					data,
				);
				if (result) {
					if (
						'AUTO' === this.filterData.stockTab ||
						!this.filterData.stockTab
					) {
						this.checkStoreStockChk = true;
						this.chkClass = 'stockChkBg';
					} else {
						this.chkClass = '';
					}
					this.resetBarcodeChkCnt();
					alert('조회완료 됐습니다.');
					const data = this.filterData;
					data.pageNo = 1;
					await this.getList(data);
				}
			} else {
				this.stockCheckPopFnc();
			}
		},
		stockCheckPopFnc() {
			this.stockCheckPop = !this.stockCheckPop;
		},
		async resultCheckPop(data) {
			// 수동 팝업 완료시
			if (data) {
				if (
					'MANUAL' === this.filterData.stockTab ||
					!this.filterData.stockTab
				) {
					this.checkStoreStockChk = true;
					this.chkClass = 'stockChkBg';
				} else {
					this.chkClass = '';
				}
				this.resetBarcodeChkCnt();
				const data = this.filterData;
				data.pageNo = 1;
				await this.getList(data);
			}
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.StockStatusModule.infoDialog = !this.$store.state
				.StockStatusModule.infoDialog;
		},
		async selectPerPageCnt(val) {
			this.chkClass = '';
			const data = this.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			this.chkClass = '';
			const data = this.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},

		async getList(data) {
			let dataObj = {
				data: data,
				checkStoreStockChk: this.checkStoreStockChk,
			};
			await this.$store.dispatch('StockStatusModule/getList', dataObj);
		},
		resetBarcodeChkCnt() {
			this.chkFullBarcode = '';
			this.overlapDvcId = '';
			this.scannerCheck = false;
			this.$barcodeScanner.resetBarcodeChkCnt();
		},
		onBarcodeScanned(barcode) {
			let count = this.$barcodeScanner.getBarcodeChkCnt();
			if (count > 4) {
				this.scannerCheck = true;
			}
		},
	},
	async created() {
		this.chkFullBarcode = '';
		this.scannerCheck = false;
		this.chkClass = '';
		await this.getList();
		this.$barcodeScanner.init(this.onBarcodeScanned);
	},
};
</script>
<style scoped>
.stockSelectBox {
	background-color: #fff;
	padding: 5px 15px;
	border: 1px solid #ddd;
	border-radius: 5px;
	text-align: center;
}
.stockSelectBox input {
	border: 1px solid #ddd;
}
.stockChkBg td {
	background-color: #e8f6f7;
	transition: 0.5s;
}
</style>
