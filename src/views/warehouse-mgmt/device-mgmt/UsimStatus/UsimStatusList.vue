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
				<span class="ml10 subBlue1"
					>Total
					{{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span
				>
			</div>
			<div>
				<span class="new-excel-btn" @click="excelDownLoad">엑셀 다운로드</span>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일 (+경과일)</th>
						<th>상태변경일 (+경과일)</th>
						<th>공급처</th>
						<th class="w250">보유처</th>
						<th>개통점</th>
						<th>재고구분</th>
						<th>제조사</th>
						<th>유심명 (모델명)</th>
						<th>일련번호</th>
						<th>입고단가</th>
						<th>입고상태</th>
						<th>제품상태</th>
						<th>외장상태</th>
						<th>배송방법</th>
						<th>배송상태</th>
						<th>개통상태</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="deviceStatusList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in deviceStatusList"
							:key="item.id"
							@click="infoDialogFnc(item)"
						>
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>{{ item.telecomName }}</td>
							<td>
								{{ item.inStockRegiDate | moment('YYYY-MM-DD HH:mm:ss') }}<br />
								( +
								{{ item.diffInStockRegiDate }}
								일 )
							</td>
							<td>
								<span v-if="item.moveRegiDate">
									{{ item.moveRegiDate | moment('YYYY-MM-DD HH:mm:ss') }}<br />
									( +
									{{ item.diffMoveRegiDate }}
									일 )
								</span>
								<span v-else> - </span>
							</td>
							<td>{{ item.provName }}</td>
							<td>
								<div class="td-stock">
									<span class="orangefont">before</span>
									<span>{{ item.prevStockName }}</span>
								</div>
								<div class="td-stock">
									<span class="skybluefont">after</span>
									<span>{{ item.nextStockName }}</span>
								</div>
							</td>
							<td>{{ item.openingHistoryStoreName }}</td>
							<td v-if="item.stockTypeMsg === '입고'">매장재고(입고)</td>
							<td v-else-if="item.stockTypeMsg === '반품'">매장재고(반품)</td>
							<td v-else>{{ item.stockTypeMsg }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
							<td>{{ item.rawBarcode }}</td>
							<td>
								{{
									item.inStockAmt
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}}
								원
							</td>
							<td v-text="getInStockStatusName(item.inStockStatus)"></td>
							<td v-text="getProductFaultyYnName(item.productFaultyYn)"></td>
							<td>
								<span v-if="item.productMissYn === 'Y'"
									>{{ item.extrrStatusMsg }}<br />구성품누락</span
								>
								<span v-else>{{ item.extrrStatusMsg }}<br />-</span>
							</td>
							<td>{{ item.deliveryTypeMsg }}</td>
							<td>{{ item.deliveryStatusMsg }}</td>
							<td onclick="event.cancelBubble=true">
								<span
									v-if="item.openingYn === 'Y'"
									class="repealBtn"
									@click="openDevicePop(item)"
									>{{ item.openingText }}</span
								>
								<span v-if="item.openingYn === 'N'" style="font-weight: 900"
									>{{ item.openingText }}
									<br />
									<span v-if="item.openingDate" style="font-weight: 500">
										( {{ item.openingDate }} )
									</span>
								</span>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<device-status-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		></device-status-info-pop>
		<device-status-open-device-pop
			v-if="openDeviceDialog"
			:openDeviceDialogData="openDeviceDialogData"
			:openDeviceDialog="openDeviceDialog"
			@resultOpenDeviceDialogFnc="resultOpenDeviceDialogFnc"
			@closeDialog="dialogClose"
		></device-status-open-device-pop>
	</div>
</template>

<script>
import DeviceStatusInfoPop from '../DeviceStatus/popup/DeviceStatusInfoPop.vue';
import DeviceStatusOpenDevicePop from '../DeviceStatus/popup/DeviceStatusOpenDevicePop.vue';
import {getExtrrStatusName, getInStockStatusName, getProductFaultyYnName,} from '../../../../common/common';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		paging,
		DeviceStatusOpenDevicePop,
		DeviceStatusInfoPop,
	},
	data: () => ({
		infoDialogData: [],
		openDeviceDialogData: {},
		openDeviceDialog: false,
	}),
	computed: {
		sct() {
			return this.$store.state.sct;
		},
		filterData: {
			get() {
				return this.$store.state.DeviceStatusModule.filterData;
			},
			set(newValue) {
				return (this.$store.state.DeviceStatusModule.filterData = newValue);
			},
		},
		deviceStatusList() {
			return this.$store.state.DeviceStatusModule.deviceStatusList;
		},
		infoDialog() {
			return this.$store.state.DeviceStatusModule.infoDialog;
		},
		totalCnt() {
			return this.$store.state.DeviceStatusModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.DeviceStatusModule.pagingData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.DeviceStatusModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.DeviceStatusModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		openDevicePop(item) {
			// 권한이 CW 일때만 팝업 OPEN
			/*this.sct === 'CW'*/
			/*대마 일경우 임시 해제*/
			if (this.$store.state.st === '3b14c9d61a1ce5782698616844edc9ee') {
				this.openDeviceDialogData = item;
				this.openDeviceDialog = !this.openDeviceDialog;
			}
		},
		dialogClose() {
			// 모달 닫기 emit
			this.openDeviceDialog = false;
		},
		resultOpenDeviceDialogFnc() {
			this.openDeviceDialog = false;
			const data = this.$store.state.DeviceStatusModule.filterData;
			this.getList(data);
		},
		getInStockStatusName(data) {
			return getInStockStatusName(data);
		},
		getProductFaultyYnName(data) {
			return getProductFaultyYnName(data);
		},
		getExtrrStatusName(data) {
			return getExtrrStatusName(data);
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.DeviceStatusModule.infoDialog = !this.$store.state
				.DeviceStatusModule.infoDialog;
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.DeviceStatusModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.DeviceStatusModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data) {
			this.filterData.goodsType = 'USIM';
			data = this.filterData;
			await this.$store.dispatch('DeviceStatusModule/getList', data);
		},
		async excelDownLoad() {
			if (this.deviceStatusList.length <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			const filterData = this.$store.state.MoveStockRtngudModule.filterData;
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
			data.goodsType = 'USIM';
			data.inStockRegiData = '';
			data.moveRegiDate = '';
			data.deliveryStartDate = '';
			data.openingStartDateTime = '';
			data.pageNo = this.pagingData.pageNo;
			data.perPageCnt = this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: data,
				apiName: 'getDeviceCurrentList',
				fileName: '유심현황리스트',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
		},
	},
	async created() {
    this.$store.commit('DeviceStatusModule/filterInit');
		await this.getList();
	},
};
</script>

<style scoped>
.repealBtn {
	font-weight: 900;
	color: #aaa;
}
.repealBtn:hover {
	color: red;
}
</style>
