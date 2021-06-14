<template>
	<div>
		<div class="tableTopOption">
			<div class="normalSelectCont">
				<select
					class="normalSelectCustom"
					v-model.trim="perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="totalCont">Total {{ totalCnt }}</span>
			</div>
			<div>
				<span class="excelBtn" @click="excelDownLoad">엑셀 다운로드</span>
			</div>
		</div>
		<div class="tableCont">
			<table>
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일<br />(+경과일)</th>
						<th>상태변경일<br />(+경과일)</th>
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
							<td v-if="item.stockTypeMsg === '입고'">매장재고(입고)</td>
							<td v-else-if="item.stockTypeMsg === '반품'">매장재고(반품)</td>
							<td v-else>{{ item.stockTypeMsg }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
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
									v-if="item.openingText === '미개통'"
									class="repealBtn"
									@click="openDevicePop(item)"
									>미개통</span
								>
								<span
									v-if="item.openingText === '개통'"
									style="font-weight: 900"
									>개통</span
								>
								<span v-if="item.openingText === '-'" style="font-weight: 900">
									-
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
		></device-status-open-device-pop>
	</div>
</template>

<script>
import {
	getExtrrStatusName,
	getInStockStatusName,
	getProductFaultyYnName,
} from '../../../../common/common';
import paging from '../../../../components/paging.vue';
import DeviceStatusInfoPop from './popup/DeviceStatusInfoPop.vue';
import DeviceStatusOpenDevicePop from './popup/DeviceStatusOpenDevicePop.vue';

export default {
	components: {
		DeviceStatusInfoPop,
		DeviceStatusOpenDevicePop,
		paging,
	},
	data: () => ({
		infoDialogData: [],
		openDeviceDialogData: {},
	}),
	computed: {
		filterData: {
			get() {
				return this.$store.state.DeviceStatusModule.filterData;
			},
			set(newValue) {
				return (this.$store.state.DeviceStatusModule.filterData = newValue);
			},
		},
		openDeviceDialog: {
			get() {
				return this.$store.state.DeviceStatusModule.openDeviceDialog;
			},
			set(newValue) {
				return (this.$store.state.DeviceStatusModule.openDeviceDialog = newValue);
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
			this.openDeviceDialogData = item;
			this.openDeviceDialog = !this.openDeviceDialog;
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
				apiName: 'getDeviceCurrentList',
				fileName: '기기현황리스트',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
		},
	},
	async created() {
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
