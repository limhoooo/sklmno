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
				<span class="excelBtn ml10" @click="excelDownloadBtn()">
					엑셀 다운로드
				</span>
			</div>
		</div>
		<div class="tableCont">
			<table>
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일<br />(+경과일)</th>
						<th>출고일<br />(+경과일)</th>
						<th>보유처</th>
						<th>공급처</th>
						<th>재고구분</th>
						<th>제조사</th>
						<th>기기명<br />(모델명)</th>
						<th>용량</th>
						<th>색상</th>
						<th>일련번호</th>
						<th>배송방법</th>
						<th>배송상태</th>
						<th>판정상태</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="listData.length >= 1">
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
							<td>
								{{ item.moveDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />( + {{ item.diffMoveDateTime }}일 )
							</td>
							<td>{{ item.stockName }}</td>
							<td>{{ item.provName }}</td>
							<td>착하</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
							<td>{{ item.capacity }}</td>
							<td>{{ item.colorName }}</td>
							<td onclick="event.cancelBubble=true">{{ item.rawBarcode }}</td>
							<td>{{ item.deliveryTypeMsg }}</td>
							<td>{{ item.deliveryStatusMsg }}</td>
							<td onclick="event.cancelBubble=true">
								<!--               배송중일때만 판정상태 안뜸 -->
								<template v-if="item.deliveryStatus === 'PROGRESS'">
									-
								</template>
								<template v-else>
									<p @click="modifyDialogFnc(item)">
										<span
											v-if="item.judgeStatus === 'WAIT'"
											class="skybluefont"
											>{{ item.judgeStatusMsg }}</span
										>
										<span
											v-if="item.judgeStatus === 'REJECT'"
											class="font-red"
											>{{ item.judgeStatusMsg }}</span
										>
										<span
											v-if="item.judgeStatus === 'PROGRESS'"
											class="orangefont"
											>{{ item.judgeStatusMsg }}</span
										>
										<span v-if="item.judgeStatus === 'COMPL'">{{
											item.judgeStatusMsg
										}}</span>
										<span v-if="item.judgeStatus === 'NONE'">{{
											item.judgeStatusMsg
										}}</span>
									</p>
								</template>
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

		<faulty-device-status-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		></faulty-device-status-info-pop>
		<faulty-device-status-modify-pop
			v-if="modifyDialog"
			:infoDialogData="infoDialogData"
		></faulty-device-status-modify-pop>
	</div>
</template>

<script>
import { getTelecomName } from '../../../../common/common';
import FaultyDeviceStatusInfoPop from './popup/FaultyDeviceStatusInfoPop';
import FaultyDeviceStatusModifyPop from './popup/FaultyDeviceStatusModifyPop';
import paging from '../../../../components/paging';

export default {
	components: {
		FaultyDeviceStatusInfoPop,
		FaultyDeviceStatusModifyPop,
		paging,
	},
	data: () => ({
		infoDialogData: [],
	}),
	computed: {
		listData() {
			return this.$store.state.FaultyDeviceStatusModule.listData;
		},
		infoDialog() {
			return this.$store.state.FaultyDeviceStatusModule.infoDialog;
		},
		modifyDialog() {
			return this.$store.state.FaultyDeviceStatusModule.modifyDialog;
		},
		totalCnt() {
			return this.$store.state.FaultyDeviceStatusModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.FaultyDeviceStatusModule.pagingData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.FaultyDeviceStatusModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.FaultyDeviceStatusModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		async excelDownloadBtn() {
			if (this.listData <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			const filterData = this.$store.state.FaultyDeviceStatusModule.filterData;
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
				apiName: 'getFaultyStoreStockList',
				fileName: '불량기기현황',
			};

			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
		modifyDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.FaultyDeviceStatusModule.modifyDialog = !this.$store
				.state.FaultyDeviceStatusModule.modifyDialog;
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.FaultyDeviceStatusModule.infoDialog = !this.$store.state
				.FaultyDeviceStatusModule.infoDialog;
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.FaultyDeviceStatusModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.FaultyDeviceStatusModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data) {
			await this.$store.dispatch('FaultyDeviceStatusModule/getList', data);
		},
		getTelecomName(data) {
			return getTelecomName(data);
		},
	},
	async created() {
		await this.getList();
	},
};
</script>
<style scoped>
.selectCustom {
	width: 15%;
}
.datePickerCustom .v-input {
	width: 200px;
}
</style>
