<template>
	<div>
		<div class="disFx justify-lg-space-between" style="align-items: center">
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
				<span class="ml10 subBlue1">
					Total {{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
				</span>
			</div>
			<div>
				<input
					v-if="getListData.length > 0"
					type="button"
					@click="excelDownloadBtn()"
					value="엑셀 다운로드"
					class="new-excel-btn"
				/>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th>번호</th>
						<th>통신사</th>
						<th>입고일 (+경과일)</th>
						<th>
							<span v-if="this.route === 1">이동일</span
							><span v-else>출고일</span> (+경과일)
						</th>
						<th>재고구분</th>
						<th class="w250">보유처</th>
						<th
							v-if="
								this.$route.path === '/stock-move-transfer/faulty-transfer' ||
								this.$route.path === '/stock-move-transfer/rtn-transfer'
							"
						>
							공급처
						</th>
						<th>제조사</th>
						<th>기기명 (모델명)</th>
						<th>일련번호</th>
						<th>용량</th>
						<th>색상</th>
						<th>입고상태</th>
						<th>제품상태</th>
						<th>외장상태</th>
						<th>입고단가</th>
					</tr>
				</thead>
				<tbody v-if="this.route === 1 || this.route === 2 || this.route === 4">
					<tr v-if="getListData.length === 0">
						<td colspan="20">데이터가 없습니다.</td>
					</tr>
					<tr v-else v-for="(item, index) in getListData" :key="item.index">
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
							{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}<br />( +
							{{ item.diffRegiDate }} 일 )
						</td>
						<td>
							<span if="item.moveStockTypeMsg">{{ item.moveStockTypeMsg }}</span
							><span else>{{ item.outStockTypeMsg }}</span>
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
								><span v-if="item.prevStockName">{{ item.prevStockName }}</span>
							</div>
							<div
								style="
									display: flex;
									justify-content: space-between;
									padding: 0 5px;
								"
							>
								<span class="skybluefont">after</span>
								<span>{{ item.nextStockName }}</span>
							</div>
						</td>
						<td>{{ item.makerName }}</td>
						<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
						<td>{{ item.rawBarcode }}</td>
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
						<td>{{ item.inStockStatusMsg }}</td>
						<td>
							<span v-if="item.productFaultyYn === 'N'">-</span>
							<span v-else>불량</span>
						</td>
						<td>{{ item.extrrStatusMsg }}</td>
						<td>
							{{
								item.inStockAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}}
							원
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-if="getListData.length === 0">
						<td colspan="20">데이터가 없습니다.</td>
					</tr>
					<tr v-else v-for="(item, index) in getListData" :key="item.index">
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
							{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}<br />( +
							{{ item.diffRegiDate }} 일 )
						</td>
						<td>{{ item.outStockTypeMsg }}</td>
						<td>{{ item.prevStockName }}</td>
						<td>{{ item.nextProvName }}</td>
						<td>{{ item.makerName }}</td>
						<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
						<td>{{ item.rawBarcode }}</td>
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
						<td>{{ item.inStockStatusMsg }}</td>
						<td>
							<span v-if="item.productFaultyYn === 'N'">-</span>
							<span v-else>불량</span>
						</td>
						<td>{{ item.extrrStatusMsg }}</td>
						<td>
							{{
								item.inStockAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}}
							원
						</td>
					</tr>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
	</div>
</template>

<script>
import paging from '../../../../../components/paging.vue';

export default {
	components: { paging },
	data: () => ({
		route: 0,
	}),
	computed: {
		checkListIdArray: {
			get() {
				return this.$store.state.StockMoveFilterCommonModules.checkListIdArray;
			},
			set(newValue) {
				return (this.$store.state.StockMoveFilterCommonModules.checkListIdArray = newValue);
			},
		},
		totalCnt() {
			return this.$store.state.StockMoveFilterCommonModules.totalCnt;
		},
		getListData() {
			return this.$store.state.StockMoveFilterCommonModules.getListData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.StockMoveFilterCommonModules.pagingData
					.perPageCnt;
			},
			set(newValue) {
				return (this.$store.state.StockMoveFilterCommonModules.pagingData.perPageCnt = newValue);
			},
		},
		pagingData() {
			return this.$store.state.StockMoveFilterCommonModules.pagingData;
		},
	},
	methods: {
		async excelDownloadBtn() {
			let data = {};
			data.pageNo = this.pagingData.pageNo;
			data.perPageCnt = this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: data,
				apiName: '',
				fileName: '',
			};
			if (this.route === 1) {
				param.apiName = 'STOCK_MOVE';
				param.fileName = '이동재고 리스트';
			}
			if (this.route === 2) {
				param.apiName = 'STOCK_TRNS';
				param.fileName = '재고이관 리스트';
			}
			if (this.route === 3) {
				param.apiName = 'FAULTY_TRNS';
				param.fileName = '불량이관 리스트';
			}
			if (this.route === 4) {
				param.apiName = 'SELL_TRNS';
				param.fileName = '판매이관 리스트';
			}
			if (this.route === 5) {
				param.apiName = 'RETURN_TRNS';
				param.fileName = '반품이관 리스트';
			}
			await this.$store.dispatch('commonModule/excelDownload', param);
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
			let page = { perPageCnt: Number(val), pageNo: 1 };
			let data = {
				title: '',
				pagingData: page,
			};
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				data.title = 'STOCK_MOVE';
			} else if (this.$route.path === '/stock-move-transfer/stock-transfer') {
				data.title = 'STOCK_TRNS';
			} else if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
				data.title = 'FAULTY_TRNS';
			} else if (this.$route.path === '/stock-move-transfer/sales-transfer') {
				data.title = 'SELL_TRNS';
			} else {
				data.title = 'RETURN_TRNS';
			}
			await this.$store.dispatch('StockMoveFilterCommonModules/getList', data);
		},
		async pagingAction(pagingData) {
			let page = {
				perPageCnt: pagingData.perPageCnt,
				pageNo: pagingData.pageNo,
			};
			let data = {
				title: '',
				pagingData: page,
			};
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				data.title = 'STOCK_MOVE';
			} else if (this.$route.path === '/stock-move-transfer/stock-transfer') {
				data.title = 'STOCK_TRNS';
			} else if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
				data.title = 'FAULTY_TRNS';
			} else if (this.$route.path === '/stock-move-transfer/sales-transfer') {
				data.title = 'SELL_TRNS';
			} else {
				data.title = 'RETURN_TRNS';
			}
			await this.$store.dispatch('StockMoveFilterCommonModules/getList', data);
		},
		async getList() {
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				let data = {
					title: 'STOCK_MOVE',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else if (this.$route.path === '/stock-move-transfer/stock-transfer') {
				let data = {
					title: 'STOCK_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
				let data = {
					title: 'FAULTY_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else if (this.$route.path === '/stock-move-transfer/sales-transfer') {
				let data = {
					title: 'SELL_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else {
				let data = {
					title: 'RETURN_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			}
		},
		routeFnc() {
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				return (this.route = 1);
			} else if (this.$route.path === '/stock-move-transfer/stock-transfer') {
				return (this.route = 2);
			} else if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
				return (this.route = 3);
			} else if (this.$route.path === '/stock-move-transfer/sales-transfer') {
				return (this.route = 4);
			} else {
				return (this.route = 5);
			}
		},
	},
	async created() {
		await this.getList();
		await this.routeFnc();
	},
};
</script>
