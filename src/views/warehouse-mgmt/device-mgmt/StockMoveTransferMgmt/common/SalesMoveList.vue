<template>
	<div>
		<div class="tableTopOption">
			<div class="normalSelectCont">
				<select
					class="normalSelectCustom"
					v-model.trim="formData.perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="totalCont"> Total {{ totalCnt }} </span>
			</div>
			<div class="titleBtnArea">
				<input
					v-if="getListData.length > 0"
					type="button"
					@click="excelDownloadBtn()"
					class="excelBtn ml10"
					value="엑셀 다운로드"
					style="margin-right: 10px"
				/>
				<v-btn class="delBtnCustom" @click="deleteFnc">삭제</v-btn>
			</div>
		</div>
		<div class="tableCont">
			<table>
				<thead>
					<tr>
						<th style="width: 50px">
							<input
								type="checkbox"
								value="all"
								v-model.trim="allCheckedBox"
								@click="allChecked($event.target.checked)"
							/>
						</th>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일<br />(+경과일)</th>
						<th>이동일<br />(+경과일)</th>
						<th>재고구분</th>
						<th>기기명<br />(모델명)</th>
						<th>용량</th>
						<th>색상</th>
						<th>일련번호</th>
						<th>입고단가</th>
						<th>입고상태</th>
						<th>제품상태</th>
						<th>외장상태</th>
						<th>고객명<br />고객전화번호</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="getListData.length === 0">
						<td colspan="20">데이터가 없습니다.</td>
					</tr>
					<tr
						@click="
							infoDialog = !infoDialog;
							infoDialogData = item;
						"
						v-else
						v-for="(item, index) in getListData"
						:key="item.index"
					>
						<td onclick="event.cancelBubble=true">
							<input
								type="checkbox"
								:value="item.moveStockId"
								v-model.trim="checkListIdArray"
							/>
						</td>
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
							}}<br />( + {{ item.diffInStockRegiDate }} 일 )
						</td>
						<td>
							{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }} <br />( +
							{{ item.diffRegiDate }} 일 )
						</td>
						<td>{{ item.moveStockTypeMsg }}</td>
						<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
						<td>{{ item.capacity }}</td>
						<td>{{ item.colorName }}</td>
						<td>{{ item.rawBarcode }}</td>
						<td>
							{{
								item.inStockAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}}
							원
						</td>
						<td>{{ item.inStockStatusMsg }}</td>
						<td>
							<span v-if="item.productFaultyYn === 'N'">-</span>
							<span v-else>불량</span>
						</td>
						<td>{{ item.extrrStatusMsg }}</td>
						<td>
							{{ item.cusName }}<br />{{ item.cusPhone1 }}<span>-</span
							>{{ item.cusPhone2 }}<span>-</span>{{ item.cusPhone3 }}
						</td>
					</tr>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<sales-move-info-pop
			:infoDialogData="infoDialogData"
			v-if="infoDialog"
		></sales-move-info-pop>
	</div>
</template>

<script>
import SalesMoveInfoPop from './popup/SalesMoveInfoPop.vue';
import paging from '../../../../../components/paging.vue';

export default {
	components: { SalesMoveInfoPop, paging },
	data: () => ({
		postDialog: false,
		infoDialogData: [],
	}),
	computed: {
		formData: {
			get() {
				return this.$store.state.SalesMoveModule.formData;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.formData = newValue);
			},
		},
		getListData() {
			return this.$store.state.SalesMoveModule.getListData;
		},
		pagingData() {
			return this.$store.state.SalesMoveModule.pagingData;
		},
		allCheckedBox: {
			get() {
				return this.$store.state.SalesMoveModule.allCheckedBox;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.allCheckedBox = newValue);
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.SalesMoveModule.infoDialog;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.infoDialog = newValue);
			},
		},
		checkListIdArray: {
			get() {
				return this.$store.state.SalesMoveModule.checkListIdArray;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.checkListIdArray = newValue);
			},
		},
		totalCnt: {
			get() {
				return this.$store.state.SalesMoveModule.totalCnt;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.totalCnt = newValue);
			},
		},
	},
	methods: {
		async excelDownloadBtn() {
			let data = {};
			data.pageNo = this.pagingData.pageNo;
			data.perPageCnt = this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: data,
				apiName: 'SELL_MOVE',
				fileName: '판매이동 리스트',
			};
			const result = await this.$store.dispatch(
				'commonModule/excelDownload',
				param,
			);
		},
		async deleteFnc() {
			await this.$store.dispatch(
				'SalesMoveModule/deleteList',
				this.checkListIdArray,
			);
			await this.getList();
		},
		allChecked(e) {
			let checkArr = [];
			if (e) {
				this.checkListIdArray = [];
				this.getListData.forEach(item => {
					checkArr.push(item.moveStockId);
				});
				this.checkListIdArray = checkArr;
			} else {
				this.checkListIdArray = checkArr;
			}
		},
		async selectPerPageCnt(val) {
			const data = { perPageCnt: Number(val), pageNo: 1 };
			await this.$store.dispatch('SalesMoveModule/getList', data);
		},
		async pagingAction(pagingData) {
			const data = {
				perPageCnt: pagingData.perPageCnt,
				pageNo: pagingData.pageNo,
			};
			await this.$store.dispatch('SalesMoveModule/getList', data);
		},
		filterInit() {
			return this.$store.commit('SalesMoveModule/fiterInit');
		},
		async insertList(data) {
			await this.$store.dispatch('SalesMoveModule/insertList', data);
		},
		async getList() {
			await this.$store.dispatch('SalesMoveModule/getList');
		},
	},
	async created() {
		await this.filterInit();
		await this.getList();
	},
};
</script>
