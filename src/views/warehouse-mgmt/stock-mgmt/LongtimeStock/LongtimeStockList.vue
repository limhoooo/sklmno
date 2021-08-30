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
				<span class="new-excel-btn" @click="excelDownloadBtn()">
					엑셀 다운로드
				</span>
				<div class="alarmBtnCont posR">
					<button id="alarm1" class="ml20 alarmBtn1" @click="notiSetBtnFnc">
						알람설정
					</button>
					<label for="alarm1"></label>
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
						<th>
							이동일 (+경과일)
							<button
								@click="orderByMoveDateBtn"
								class="orderByBtn"
								:class="orderMoveDate"
							>
								<i
									aria-hidden="true"
									class="v-icon notranslate mdi mdi-menu-down theme--light primary--text"
								></i>
							</button>
						</th>
						<th>공급처</th>
						<th class="w250">보유처</th>
						<th>재고구분</th>
						<th>제조사</th>
						<th>기기명 (모델명)</th>
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
					<template v-if="listData && listData.length >= 1">
						<tr
							@click="infoDialogFnc(item)"
							v-for="(item, index) in listData"
							:key="item.index"
						>
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td v-text="getTelecomName(item.telecom)"></td>
							<td>
								{{ item.inStockRegiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />( + {{ item.diffInStockRegiDate }}일 )
							</td>
							<td :class="alarmClassFnc(item.diffMoveDateTime)">
								{{ item.moveDateTime | moment('YYYY-MM-DD HH:mm:ss') }}

								<br />( + {{ item.diffMoveDateTime }}일 )
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
							<td>{{ item.capacity }}</td>
							<td>{{ item.colorName }}</td>
							<td onclick="event.cancelBubble=true">{{ item.rawBarcode }}</td>
							<td>
								<span v-if="item.inStockAmt">
									{{
										item.inStockAmt
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}}
									원
								</span>
							</td>
							<td>{{ item.deviceStatusListDto.inStockStatusMsg }}</td>
							<td>
								<span v-if="item.deviceStatusListDto.productFaultyYn === 'N'"
									>정상</span
								>
								<span v-if="item.deviceStatusListDto.productFaultyYn === 'Y'"
									>불량</span
								>
							</td>
							<td>
								<span v-if="item.deviceStatusListDto.productMissYn === 'Y'"
									>{{ item.deviceStatusListDto.extrrStatusMsg
									}}<br />구성품누락</span
								>
								<span v-else
									>{{ item.deviceStatusListDto.extrrStatusMsg }}<br />-</span
								>
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

		<longtime-stock-info-pop v-if="infoDialog" :infoDialogData="infoDialogData">
		</longtime-stock-info-pop>
		<longtime-stock-noti-pop v-if="notiDialog"></longtime-stock-noti-pop>
	</div>
</template>

<script>
import { getTelecomName } from '../../../../common/common';
import LongtimeStockInfoPop from './popup/LongtimeStockInfoPop';
import LongtimeStockNotiPop from './popup/LongtimeStockNotiPop';
import paging from '../../../../components/paging';

export default {
	components: {
		LongtimeStockInfoPop,
		LongtimeStockNotiPop,
		paging,
	},
	data: () => ({
		menu1: false,
		menu2: false,
		infoDialogData: [],
	}),
	computed: {
		listData() {
			return this.$store.state.LongtimeStockModule.listData;
		},
		infoDialog() {
			return this.$store.state.LongtimeStockModule.infoDialog;
		},
		notiDialog() {
			return this.$store.state.LongtimeStockModule.notiDialog;
		},
		totalCnt() {
			return this.$store.state.LongtimeStockModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.LongtimeStockModule.pagingData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.LongtimeStockModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.LongtimeStockModule.filterData.perPageCnt = newValue;
			},
		},
		orderMoveDate: {
			get() {
				return this.$store.state.LongtimeStockModule.filterData.orderMoveDate;
			},
			set(newValue) {
				this.$store.state.LongtimeStockModule.filterData.orderMoveDate = newValue;
			},
		},
		alarmData() {
			return this.$store.state.LongtimeStockModule.alarmData;
		},
	},
	methods: {
		async orderByMoveDateBtn() {
			this.orderMoveDate = this.orderMoveDate === 'DESC' ? 'ASC' : 'DESC';
			const filterData = this.$store.state.LongtimeStockModule.filterData;
			await this.$store.dispatch('LongtimeStockModule/getList', filterData);
		},
		async excelDownloadBtn() {
			if (this.listData <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			const filterData = this.$store.state.LongtimeStockModule.filterData;
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
				apiName: 'getLongTimeStoreStockList',
				fileName: '장기재고리스트',
			};

			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
		notiSetBtnFnc() {
			this.$store.state.LongtimeStockModule.notiDialog = !this.$store.state
				.LongtimeStockModule.notiDialog;
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.LongtimeStockModule.infoDialog = !this.$store.state
				.LongtimeStockModule.infoDialog;
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.LongtimeStockModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.LongtimeStockModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async getList(data) {
			await this.$store.dispatch('LongtimeStockModule/getList', data);
		},
		async getLongTimeStoreStockAlarm() {
			await this.$store.dispatch(
				'LongtimeStockModule/getLongTimeStoreStockAlarm',
			);
		},
		alarmClassFnc(item) {
			if (item >= this.alarmData.resellDay) {
				return 'font-red';
			}
		},
	},

	async created() {
		await this.getLongTimeStoreStockAlarm();
		await this.getList();
	},
};
</script>
<style scoped>
.orderByBtn {
	width: 15px;
	height: 15px;
	background-color: #ddd;
	vertical-align: text-bottom;
}
.orderByBtn i {
	width: 100%;
	height: 100%;
	vertical-align: top;
}
.ASC {
	transform: rotateX(180deg);
}
</style>
