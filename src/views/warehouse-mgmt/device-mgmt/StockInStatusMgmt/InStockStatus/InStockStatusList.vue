<template>
	<div>
		<div class="tableTopOption">
			<div class="normalSelectCont">
				<select
					class="normalSelectCustom"
					v-model.trim="filterData.perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="totalCont"> Total {{ totalCnt }} </span>
			</div>
			<form
				:action="`${excelDownloadUrl}getReturnStockListExcel`"
				method="POST"
				ref="excelDownload"
				id="download"
				name="download"
				style="display: inline-block"
			>
				<input
					v-if="getListData.length > 0"
					type="button"
					@click="excelDownloadBtn()"
					class="excelBtn ml10"
					value="엑셀 다운로드"
				/>
			</form>
		</div>
		<div class="tableCont tableBorderStyle">
			<table>
				<thead>
					<tr>
						<th>번호</th>
						<th>입고일<br />(경과일)</th>
						<th>공급처</th>
						<th>보유처</th>
						<th>재고구분</th>
						<th>통신사</th>
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
					<tr v-if="getListData.length === 0">
						<td colspan="20">데이터가 없습니다.</td>
					</tr>
					<tr
						v-else
						v-for="(item, index) in getListData"
						@click="infoDialogFnc(item)"
						:key="item.index"
					>
						<td>
							{{
								totalCnt -
								pagingData.perPageCnt * (pagingData.pageNo - 1) -
								index
							}}
						</td>
						<td>
							<span>
								{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}<br />
								( + <span>{{ item.diffRegiDate }} 일 </span> )
							</span>
						</td>
						<td>{{ item.provName }}</td>
						<td>{{ item.stockName }}</td>
						<td>{{ item.statusStrMsg }}</td>
						<td>{{ item.telecomName }}</td>
						<td>{{ item.makerName }}</td>
						<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
						<td>{{ item.capacity }}</td>
						<td>{{ item.colorName }}</td>
						<td>{{ item.rawBarcode }}</td>
						<td>
							{{ priceRegularFnc(item.inStockAmt) }}
							원
						</td>
						<td>{{ item.inStockStatusMsg }}</td>
						<td>
							<span v-if="item.productFaultyYn === 'N'">-</span>
							<span v-else>불량</span>
						</td>
						<td>
							<span v-if="item.productMissYn === 'Y'"
								>{{ item.extrrStatusMsg }}<br />구성품누락</span
							><span v-else>{{ item.extrrStatusMsg }}<br />-</span>
						</td>
					</tr>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<stock-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		></stock-info-pop>
	</div>
</template>

<script>
import StockInfoPop from './popup/InStockStatusInfoPop';
import paging from '../../../../../components/paging';

export default {
	components: { StockInfoPop, paging },
	data: () => ({
		infoDialogData: [],
	}),
	computed: {
		excelDownloadUrl() {
			return this.$store.state.commonModule.excelDownloadUrl;
		},
		totalCnt() {
			return this.$store.state.InStockMgmtModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.InStockMgmtModule.pagingData;
		},
		getListData() {
			return this.$store.state.InStockMgmtModule.getInStockListData;
		},
		infoDialog() {
			return this.$store.state.InStockMgmtModule.infoDialog;
		},
		filterData: {
			get() {
				return this.$store.state.InStockMgmtModule.filterData;
			},
			set(newValue) {
				return (this.$store.state.InStockMgmtModule.filterData = newValue);
			},
		},
	},
	methods: {
		priceRegularFnc(data) {
			return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.InStockMgmtModule.infoDialog = !this.$store.state
				.InStockMgmtModule.infoDialog;
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.InStockMgmtModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.$store.dispatch('InStockMgmtModule/getInStockList', data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.InStockMgmtModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.$store.dispatch('InStockMgmtModule/getInStockList', data);
		},
		async excelDownloadBtn() {
			const filterData = this.$store.state.InStockMgmtModule.filterData;
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
				apiName: 'getInStockList',
				fileName: '입고현황리스트',
			};

			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
	},
};
</script>
