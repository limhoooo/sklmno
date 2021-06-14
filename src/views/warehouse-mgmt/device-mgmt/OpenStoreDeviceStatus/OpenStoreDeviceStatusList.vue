<template>
	<div>
		<div class="tableTopOption">
			<div class="normalSelectCont">
				<select
					class="normalSelectCustom"
					v-model="perPageCnt"
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
						<th>개통일<br />(+경과일)</th>
						<th>보유처</th>
						<th>재고구분</th>
						<th>제조사</th>
						<th>기기명<br />(모델명)</th>
						<th>용량</th>
						<th>색상</th>
						<th>일련번호</th>
						<th>입고단가</th>
						<th>고객명<br />고객전화번호</th>
						<th>철회</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="openStoreDeviceList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in openStoreDeviceList"
							@click="infoDialogFnc(item)"
							:key="item.id"
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
								<span v-if="item.openingDate">
									{{ item.openingDate }}<br />
									(
									{{ item.diffOpeningDate }}
									일 )
								</span>
								<span v-else> - </span>
							</td>
							<td>
								<span>{{ item.nextStockName }}</span>
							</td>
							<td>
								{{ item.stockTypeMsg }}
							</td>
							<!--							<td v-if="item.stockTypeMsg === '입고'">매장재고(입고)</td>-->
							<!--							<td v-else-if="item.stockTypeMsg === '반품'">매장재고(반품)</td>-->
							<!--							<td v-else>{{ item.stockTypeMsg }}</td>-->
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
							<td>
								{{ item.cusName }} <br />
								{{ item.cusPhone1 }} - {{ item.cusPhone2 }} -
								{{ item.cusPhone3 }}
							</td>
							<td onclick="event.cancelBubble=true">
								<span
									v-if="item.cancelStatus === 'OPENING'"
									class="repealBtn"
									@click="repealPop(item)"
								>
									{{ item.cancelStatusMsg }}
								</span>
								<span v-if="item.cancelStatus === 'CANCEL'" style="color: red">
									<span style="font-weight: 900">
										{{ item.cancelStatusMsg }}
									</span>
									<br />
									( {{ item.cancelDate }} )
								</span>
								<span
									v-if="item.cancelStatus === 'COMPL'"
									style="font-weight: 900"
								>
									{{ item.cancelStatusMsg }}
								</span>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
		<open-store-device-repeal-pop
			v-if="repealDialog"
			:infoDialogData="infoData"
		></open-store-device-repeal-pop>
		<open-store-device-info-pop v-if="infoDialog" :infoDialogData="infoData">
		</open-store-device-info-pop>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
	filterData,
	openStoreDeviceList,
	pagingData,
} from '../../../../store/interface/warehouse-mgmt/interface';
import paging from '../../../../components/paging.vue';
import OpenStoreDeviceRepealPop from '../OpenStoreDeviceStatus/popup/OpenStoreDeviceRepealPop.vue';
import OpenStoreDeviceInfoPop from '../OpenStoreDeviceStatus/popup/OpenStoreDeviceInfoPop.vue';

let infoData: openStoreDeviceList = {};
export default Vue.extend({
	name: 'OpenStoreDeviceStatusList',
	data: () => ({
		infoData: infoData,
	}),
	components: {
		paging,
		OpenStoreDeviceRepealPop,
		OpenStoreDeviceInfoPop,
	},
	computed: {
		openStoreDeviceList(): openStoreDeviceList[] {
			return this.$store.state.OpenStoreDeviceStatusModule.openStoreDeviceList;
		},
		totalCnt(): number {
			return this.$store.state.OpenStoreDeviceStatusModule.totalCnt;
		},
		pagingData(): pagingData {
			return this.$store.state.OpenStoreDeviceStatusModule.pagingData;
		},
		repealDialog: {
			get(): boolean {
				return this.$store.state.OpenStoreDeviceStatusModule.repealDialog;
			},
			set(newValue: boolean) {
				this.$store.state.OpenStoreDeviceStatusModule.repealDialog = newValue;
			},
		},
		infoDialog: {
			get(): boolean {
				return this.$store.state.OpenStoreDeviceStatusModule.infoDialog;
			},
			set(newValue: boolean) {
				this.$store.state.OpenStoreDeviceStatusModule.infoDialog = newValue;
			},
		},
		filterData: {
			get(): filterData {
				return this.$store.state.OpenStoreDeviceStatusModule.filterData;
			},
			set(newValue: any) {
				this.$store.state.OpenStoreDeviceStatusModule.filterData = newValue;
			},
		},
		perPageCnt: {
			get(): pagingData {
				return this.$store.state.OpenStoreDeviceStatusModule.filterData
					.perPageCnt;
			},
			set(newValue: any) {
				this.$store.state.OpenStoreDeviceStatusModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		infoDialogFnc(item: openStoreDeviceList) {
			this.infoData = item;
			this.infoDialog = !this.infoDialog;
		},
		repealPop(item: openStoreDeviceList) {
			if (item.diffOpeningDate !== undefined)
				if (item.diffOpeningDate >= 14) {
					return;
				}
			this.infoData = item;
			this.repealDialog = !this.repealDialog;
		},
		async excelDownLoad() {
			if (this.openStoreDeviceList.length <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}

			if (this.filterData.capacity === '전체') {
				this.filterData.capacity = '';
			}
			if (this.filterData.colorName === '전체') {
				this.filterData.colorName = '';
			}
			this.filterData.pageNo = this.pagingData.pageNo;
			this.filterData.perPageCnt =
				this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: this.filterData,
				apiName: 'getOpeningCurrentList',
				fileName: '개통이력기기현황',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
			if (this.filterData.capacity === '') {
				this.filterData.capacity = '전체';
			}
			if (this.filterData.colorName === '') {
				this.filterData.colorName = '전체';
			}
		},
		async selectPerPageCnt(val: number) {
			const data = this.$store.state.OpenStoreDeviceStatusModule.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData: { perPageCnt: number; pageNo: number }) {
			const data = this.$store.state.OpenStoreDeviceStatusModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data?: filterData) {
			await this.$store.dispatch('OpenStoreDeviceStatusModule/getList', data);
		},
	},
	async created() {
		await this.getList();
	},
});
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
