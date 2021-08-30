<template>
	<div>
		<div
			class="disFx mt30 justify-lg-space-between"
			style="align-items: center"
		>
			<div class="pagingSelectCont">
				<select
					v-model.trim="perPageCnt"
					class="pagingSelect"
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

			<div class="disFx" style="align-items: center">
				<span class="new-excel-btn lh26" @click="excelUploadFnc()">
					엑셀 업로드
				</span>
				<form
					id="excelFormDownloadUrl"
					name="excelFormDownloadUrl"
					:action="`${excelFormDownloadUrl}returnStockExcelTemplate`"
					method="GET"
				>
					<input
						class="new-excel-btn lh26 ml10"
						type="submit"
						value="엑셀 양식 다운로드"
					/>
				</form>
				<input
					type="button"
					@click="excelDownloadBtn()"
					value="엑셀 다운로드"
					class="new-excel-btn lh26 ml10 h26"
				/>
				<button class="ml10 boldBtn boldWt" @click="regiDialogFnc">반품</button>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일 (+경과일)</th>
						<th>반품일 (+경과일)</th>
						<th>공급처</th>
						<th class="w250">보유처</th>
						<th>개통점</th>
						<th>재고구분</th>
						<th>제조사</th>
						<th>기기명 (모델명)</th>
						<th>용량</th>
						<th>색상</th>
						<th>일련번호</th>
						<th>반품비</th>
						<th>추가 차감비</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="moveStockList.length >= 1">
						<tr
							@click="infoDialogFnc(item)"
							v-for="(item, index) in moveStockList"
							:key="item.id"
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
								<br />
								( + {{ item.diffInStockRegiDate }} 일 )
							</td>
							<td>
								{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />
								( + {{ item.diffReturnStockRegiDate }} 일 )
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
							<td>{{ item.openingHistoryStoreName }}</td>
							<td>{{ item.statusStr }}</td>
							<td>{{ item.makerName }}</td>
							<td>
								{{ item.goodsName }} <br />
								( {{ item.modelName }} )
							</td>
							<td>
								<span v-if="item.goodsType === 'DVC'">{{ item.capacity }}</span
								><span v-else>-</span>
							</td>
							<td>
								<span v-if="item.colorName !== null">{{ item.colorName }}</span
								><span v-else>-</span>
							</td>
							<td onclick="event.cancelBubble=true">{{ item.rawBarcode }}</td>
							<td>
								{{
									item.returnStockAmt
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}}
								원
							</td>
							<td>
								{{
									item.addDdctAmt
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}}
								원
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
		<MoveStockRtngudInfoPop
			:infoDialogData="infoDialogData"
			v-if="infoDialog"
		></MoveStockRtngudInfoPop>
		<move-stock-rtngud-regist-pop
			v-if="regiDialog"
		></move-stock-rtngud-regist-pop>
		<move-stock-rtngud-excel-upload
			v-if="excelUploadDialog"
		></move-stock-rtngud-excel-upload>
	</div>
</template>

<script>
import MoveStockRtngudInfoPop from './popup/MoveStockRtngudInfoPop';
import MoveStockRtngudRegistPop from './popup/MoveStockRtngudRegistPop';
import MoveStockRtngudExcelUpload from './popup/MoveStockRtngudExcelUpload';
import { getTelecomName } from '../../../../common/common';
import paging from '../../../../components/paging';

export default {
	components: {
		MoveStockRtngudRegistPop,
		MoveStockRtngudInfoPop,
		MoveStockRtngudExcelUpload,
		paging,
	},
	data: () => ({
		menu1: false,
		menu2: false,
		infoDialogData: [],
		excelDownloadData: {},
	}),
	computed: {
		regiDialog() {
			return this.$store.state.MoveStockRtngudModule.regiDialog;
		},
		infoDialog() {
			return this.$store.state.MoveStockRtngudModule.infoDialog;
		},
		excelUploadDialog() {
			return this.$store.state.MoveStockRtngudModule.excelUploadDialog;
		},
		excelFormDownloadUrl() {
			return this.$store.state.commonModule.excelFormDownloadUrl;
		},
		excelDownloadUrl() {
			return this.$store.state.commonModule.excelDownloadUrl;
		},
		totalCnt() {
			return this.$store.state.MoveStockRtngudModule.totalCnt;
		},
		moveStockList() {
			return this.$store.state.MoveStockRtngudModule.moveStockList;
		},
		pagingData() {
			return this.$store.state.MoveStockRtngudModule.pagingData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.MoveStockRtngudModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		excelUploadFnc() {
			this.$store.state.MoveStockRtngudModule.excelUploadDialog = !this.$store
				.state.MoveStockRtngudModule.excelUploadDialog;
		},
		async excelFormDownloadBtn() {
			let data = 'returnStockExcelTemplate';
			const result = await this.$store.dispatch(
				'commonModule/excelFormDownload',
				data,
			);
		},
		async excelDownloadBtn() {
			if (this.moveStockList <= 0) {
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
				apiName: 'getReturnStockList',
				fileName: '반품현황리스트',
			};
			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
		regiDialogFnc() {
			this.$store.state.MoveStockRtngudModule.regiDialog = !this.$store.state
				.MoveStockRtngudModule.regiDialog;
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.MoveStockRtngudModule.infoDialog = !this.$store.state
				.MoveStockRtngudModule.infoDialog;
		},
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.MoveStockRtngudModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getReturnStockListFnc(data);
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.MoveStockRtngudModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.getReturnStockListFnc(data);
		},
		async getReturnStockListFnc(data) {
			await this.$store.dispatch(
				'MoveStockRtngudModule/getReturnStockList',
				data,
			);
		},
	},
	async created() {
		await this.getReturnStockListFnc();
	},
};
</script>

<style scoped>
.selectCustom {
	width: 15%;
	margin-left: 15px;
}
.datePickerCustom {
	margin-left: 15px;
}
</style>
