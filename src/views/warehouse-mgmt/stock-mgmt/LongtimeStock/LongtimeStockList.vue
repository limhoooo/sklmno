<template>
	<div>
		<div class="tableTopOption">
			<div class="normarlSelectCont">
				<select
					class="normalSelectCustom"
					v-model.trim="perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="totalCont"> Total {{ totalCnt }} </span>
			</div>
			<div class="titleBtnArea">
				<span class="excelBtn mr10" @click="excelDownloadBtn()">
					엑셀 다운로드
				</span>
				<v-btn @click="notiSetBtnFnc">알람설정</v-btn>
			</div>
		</div>
		<div class="tableCont">
			<table>
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일<br />(+경과일)</th>
						<th>이동일<br />(+경과일)</th>
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
		alarmData() {
			return this.$store.state.LongtimeStockModule.alarmData;
		},
	},
	methods: {
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
