<template>
	<div>
		<div class="tableTopOption">
			<div class="pagingSelectCont mt10">
				<select
					class="pagingSelect"
					v-model.trim="pagingData.perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개보기</option>
					<option value="50">50개보기</option>
					<option value="100">100개보기</option>
				</select>
				<span class="ml10 subBlue1"
					>Total
					{{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span
				>
			</div>
			<div>
				<input
					type="button"
					@click="excelDownLoadFnc()"
					class="new-excel-btn h40"
					value="엑셀 다운로드"
				/>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<!--						<th style="width: 30px">
							<input type="checkbox" />
						</th>-->
						<th>번호</th>
						<th>개통상태</th>
						<th>상담상태<br />접수일/상태변경일</th>
						<th>물류상태</th>
						<th>영업점</th>
						<th>관리점</th>
						<th>개통점</th>
						<th>기기명(용량)<br />(모델명)</th>
						<th>색상</th>
						<th>유심타입</th>
						<th>기기일련번호<br />유심일련번호</th>
						<th>고객명<br />전화번호</th>
						<th class="w100">주소</th>
						<th>배송방법<br />배송날짜</th>
						<th>택배사<br />송장번호</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="applMatchingList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in applMatchingList"
							:key="item.id"
							@click="deviceMatching(item.applId)"
						>
							<!--							<td>
								<input type="checkbox" />
							</td>-->
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>
								<span :class="statusColor(item.openingTaskStatus)">
									{{ item.openingTaskStatusMsg }}
								</span>
							</td>
							<td class="pd5TL">
								<span :class="statusColor(item.consultTaskStatus)">
									{{ item.consultTaskStatusMsg }}
								</span>
								<br />
								{{ item.consultRegiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />
								{{ item.consultUpdDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
							</td>
							<td>
								<span :class="statusColor(item.logisticsTaskStatus)">
									{{ item.logisticsTaskStatusMsg }}
								</span>
							</td>
							<td>
								{{ item.saleStoreName }}
							</td>
							<td>
								{{ item.storeName }}
							</td>
							<td>
								{{ item.openStoreName }}
							</td>
							<td>
								{{ item.goodsName }}
								<span v-if="findCapacity(item.goodsName)">
									({{ item.capacity }})
								</span>
								<br />
								{{ item.modelName }}
							</td>
							<td>
								{{ item.color }}
							</td>
							<td>
								{{ item.usimPaymentTypeMsg }}
							</td>
							<td>
								{{ item.deviceRawBarcode }}
								<br />
								{{ item.usimRawBarcode }}
							</td>
							<td>
								<span v-if="item.cusType === 'CORP'">
									{{ item.bizName }}
								</span>
								<span v-else>
									{{ item.cusName }}
								</span>
								<br />
								{{ item.cusPhone1 }}-{{ item.cusPhone2 }}-{{ item.cusPhone3 }}
							</td>
							<td>
								<p
									class="w200 pd10"
									style="word-break: break-all; font-size: 12px"
								>
									{{ item.cusAddr }}
									{{ item.cusAddrDetail }}
								</p>
							</td>
							<td>
								{{ item.deliveryTypeMsg }}
								<br />
								<span v-if="item.deliveryDateTime">
									{{ item.consultUpdDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								</span>
							</td>
							<td onclick="event.cancelBubble=true">
								{{ item.courierName }}
								<br />
								<span
									v-if="item.invoiceNum"
									class="font-blue cur_p"
									@click="postLookupFnc(item.invoiceNum, item.courierEtc)"
									>( {{ item.invoiceNum }} )</span
								>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
			<deviceMatchingPop
				v-if="deviceMatchingPop"
				:applId="deviceMatchingApplId"
				@closeDialog="closeDialogFnc"
			></deviceMatchingPop>
		</div>
	</div>
</template>

<script>
import paging from '../../../components/paging.vue';
import deviceMatchingPop from './popup/DeviceMatchingPop.vue';
import { getTrack } from '../../../common/postApi';
import { compareTime, findCapacity, statusColor } from '../../../common/common';

export default {
	name: 'ApplicationMatchingList',
	components: {
		paging,
		deviceMatchingPop,
	},
	data() {
		return {
			deviceMatchingPop: false,
			deviceMatchingApplId: 0,
		};
	},
	computed: {
		applMatchingList() {
			return this.$store.state.ApplicationMatchingModule.applMatchingList;
		},
		totalCnt() {
			return this.$store.state.ApplicationMatchingModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.ApplicationMatchingModule.pagingData;
		},
		filterData: {
			get() {
				return this.$store.state.ApplicationMatchingModule.filterData;
			},
			set(newValue) {
				this.$store.state.ApplicationMatchingModule.filterData = newValue;
			},
		},
		perPageCnt: {
			get() {
				return this.$store.state.ApplicationMatchingModule.filterData
					.perPageCnt;
			},
			set(newValue) {
				this.$store.state.ApplicationMatchingModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		statusColor(taskStatus) {
			return statusColor(taskStatus);
		},
		deviceMatching(id) {
			this.deviceMatchingPop = !this.deviceMatchingPop;
			this.deviceMatchingApplId = id;
		},
		closeDialogFnc(dialog) {
			this.deviceMatchingPop = dialog;
		},
		dateTime(Time) {
			return compareTime(Time);
		},
		async postStatusFnc(postNumber) {
			let text = await getTrack(postNumber);
			console.log(text.text);
		},
		postLookupFnc(invoiceNum, courierEtc) {
			let url = `${courierEtc}${invoiceNum}`;
			window.open(
				url,
				'none',
				'width=800, height=800,location=no,status=no,scrollbars=yes',
			);
		},
		closeDialog(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
			if (dialogName === 'blackListPop') {
				this.blackListinfo = {};
			}
		},
		async excelDownLoadFnc() {
			if (this.applMatchingList.length <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			if (this.filterData.goodsName === '전체') {
				this.filterData.goodsName = '';
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
				apiName: 'getApplicationMatchPage',
				fileName: '신청서매칭',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
			if (this.filterData.goodsName === '') {
				this.filterData.goodsName = '전체';
			}
			if (this.filterData.capacity === '') {
				this.filterData.capacity = '전체';
			}
			if (this.filterData.colorName === '') {
				this.filterData.colorName = '전체';
			}
		},
		findCapacity(text) {
			return findCapacity(text);
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.ApplicationMatchingModule.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.ApplicationMatchingModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data) {
			await this.$store.dispatch('ApplicationMatchingModule/getList', data);
		},
	},
	async created() {},
};
</script>
<style>
.tableCont table td {
	cursor: pointer;
}
.bg_color_hotpink td {
	background-color: #fed4d4 !important;
}
.bg_color_royalblue td {
	background-color: #ecedff !important;
}
</style>
