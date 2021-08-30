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
				<span
					v-if="moveStatusList.length !== 0"
					class="new-excel-btn"
					@click="excelDownLoad"
					>엑셀 다운로드</span
				>
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
						<th class="w80">재고구분</th>
						<th>제조사</th>
						<th>기기명 (모델명)</th>
						<th>용량</th>
						<th>색상</th>
						<th>일련번호</th>
						<th>입고단가</th>
						<th>입고상태</th>
						<th>제품상태</th>
						<th>외장상태</th>
						<th>배송방법</th>
						<th>배송상태</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="moveStatusList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in moveStatusList"
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
								{{ item.inStockRegiDateTime | moment('YYYY-MM-DD HH:mm:ss')
								}}<br />
								( +
								{{ item.diffInStockRegiDate }}
								일 )
							</td>
							<td>
								{{ item.moveRegiDateTime | moment('YYYY-MM-DD HH:mm:ss')
								}}<br />
								( +
								{{ item.diffMoveRegiDateTime }}
								일 )
							</td>
							<td>
								{{ item.inStockProvName }}
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
							<td>{{ item.openingHistoryStoreName }}</td>
							<td>{{ item.stockTypeMsg }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
							<td>
								<span
									v-if="item.goodsType === 'DVC' || item.goodsType === null"
									>{{ item.capacity }}</span
								><span v-else>-</span>
							</td>
							<td>
								<span v-if="item.colorName !== null">{{ item.colorName }}</span
								><span v-else>-</span>
							</td>
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
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<move-status-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		></move-status-info-pop>
	</div>
</template>

<script>
import {
	getExtrrStatusName,
	getInStockStatusName,
	getProductFaultyYnName,
} from '../../../../common/common';
import paging from '../../../../components/paging.vue';
import MoveStatusInfoPop from './popup/MoveStatusInfoPop.vue';

export default {
	components: {
		MoveStatusInfoPop,
		paging,
	},
	data: () => ({
		infoDialogData: [],
	}),
	computed: {
		moveStatusList() {
			return this.$store.state.MoveStatusModule.moveStatusList;
		},
		infoDialog() {
			return this.$store.state.MoveStatusModule.infoDialog;
		},
		totalCnt() {
			return this.$store.state.MoveStatusModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.MoveStatusModule.pagingData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.MoveStatusModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.MoveStatusModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
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
			this.$store.state.MoveStatusModule.infoDialog = !this.$store.state
				.MoveStatusModule.infoDialog;
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.MoveStatusModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.MoveStatusModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data) {
			await this.$store.dispatch('MoveStatusModule/getList', data);
		},
		async excelDownLoad() {
			if (this.moveStatusList.length <= 0) {
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
			data.pageNo = this.pagingData.pageNo;
			data.perPageCnt = this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: data,
				apiName: 'getMoveMgmtList',
				fileName: '이동/이관현황리스트',
			};

			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
	},

	async created() {
		await this.getList();
	},
};
</script>

<style></style>
