<template>
	<div class="wrapper">
		<book-mark path="/hold-store-mgmt"></book-mark>
		<div class="mb20">
			<router-link class="mainBlack boldWt titleFontS" to=""
				>보유처관리</router-link
			>
		</div>
		<div>
			<div class="new-mainCont posR disFx borderRadi3Px borderContColor1">
				<div class="new-filterCont posA">
					<button id="initBtn1" @click="filterInit" class="mainBlue1">
						필터 초기화
					</button>
					<label for="initBtn1"></label>
				</div>
				<div class="filterLeftCont" @keyup.enter="filterSubmit">
					<div class="inStockLeftRowCont disFx h40 mb10">
						<div class="w100P">
							<v-select
								attach
								outlined
								:items="codeList.telecom"
								v-model.trim="filterData.telecom"
								item-text="codeNm"
								item-value="codeSeq"
								label="통신사"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="제조사"
								outlined
								:items="codeList.maker"
								v-model.trim="filterData.maker"
								item-text="codeNm"
								item-value="codeSeq"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-autocomplete
								style="font-size: 12px"
								label="보유처"
								:items="codeList.stockNameList"
								outlined
								v-model.trim="filterData.stockId"
								item-text="stockName"
								item-value="stockId"
							></v-autocomplete>
						</div>
						<div class="w100P ml10"></div>
					</div>
					<div class="inStockLeftRowCont disFx h40">
						<div class="w100P">
							<v-autocomplete
								style="font-size: 12px"
								outlined
								:items="codeList.deviceList"
								v-model.trim="filterData.goodsName"
								item-text="goodsName"
								label="기기명"
							></v-autocomplete>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="용량"
								:items="codeList.capacityList"
								v-model.trim="filterData.capacity"
								outlined
								item-text="capacity"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="색상"
								:items="codeList.colorList"
								v-model.trim="filterData.colorName"
								outlined
								item-text="colorName"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-text-field
								label="일련번호 입력"
								v-model="filterData.barcode"
								outlined
								@keyup.enter="filterSubmit"
							></v-text-field>
						</div>
					</div>
				</div>

				<div class="inStockButtonCont ml40 disFx flexDColC">
					<button
						class="backColorMint1 mainWhite w100P disIn borderRadi3Px h90"
						@click="filterSubmit"
					>
						검색
					</button>
				</div>
			</div>
		</div>
		<div class="treeCont">
			<div class="treeMgmt">
				<h2 class="mainFontS mb10">보유처관리</h2>
				<div class="treeMgmtBody">
					<div
						class="textRight"
						style="border-bottom: 1px solid #ddd; padding: 8px"
					>
						<button
							class="newBtn1 mr5 lh26 backColorBlue2 mainWhite boldWt"
							style="padding: 2px 15px !important"
							@click="regiDialogFnc"
						>
							등록
						</button>
						<button
							class="newBtn1 mr5 lh26 backColorMint1 mainWhite boldWt"
							style="padding: 2px 15px !important"
							@click="infoDialogFnc"
						>
							수정
						</button>
						<button
							class="newBtn1 lh26 backColorBlue3 mainWhite boldWt"
							style="padding: 2px 15px !important"
							@click="deleteStockFnc"
						>
							삭제
						</button>
					</div>
					<div style="min-height: 450px; max-height: 450px; overflow-y: scroll">
						<v-treeview
							:active.sync="activeGroupData"
							:items="stockList"
							:selection-type="selectionType"
							item-text="stockName"
							item-key="stockId"
							return-object
							activatable
							transition
							class="mt10"
						>
						</v-treeview>
					</div>
				</div>
			</div>
			<div class="treeTable">
				<div class="disFx justify-lg-space-between mb10">
					<h2 class="mainFontS">보유내역</h2>
					<div>
						<span class="mr10" style="padding-top: 3px">
							Total
							<span class="font-red">{{
								stockDeviceTableList.length
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}}</span>
							<span class="deepBlue font-weight-bold"></span>
						</span>
					</div>
				</div>
				<div>
					<div
						class="newTableStyle w100P"
						style="min-height: 550px; max-height: 550px; overflow-y: scroll"
					>
						<table class="w100P">
							<thead>
								<tr style="padding: 10px 0">
									<!--									<th>번호</th>-->
									<th>통신사</th>
									<th>제조사</th>
									<th class="w150">보유처</th>
									<th>기기명 (모델명)</th>
									<th>용량</th>
									<th>색상</th>
									<th>일련번호</th>
									<th>단가</th>
								</tr>
							</thead>
							<tbody>
								<template v-if="stockDeviceTableList.length === 0">
									<tr>
										<td colspan="100">데이터가 없습니다.</td>
									</tr>
								</template>
								<template>
									<tr v-for="item in stockDeviceTableList" :key="item.id">
										<!--										<td>-->
										<!--                      {{}}-->
										<!--                    </td>-->
										<td>
											{{ item.telecom_name }}
										</td>
										<td>
											{{ item.maker_name }}
										</td>
										<td>
											{{ item.stock_name }}
										</td>
										<td>
											{{ item.goods_name }}
											<br />
											{{ item.model_name }}
										</td>
										<td>
											{{ item.capacity }}
										</td>
										<td>
											{{ item.color_name }}
										</td>
										<td>
											{{ item.raw_barcode }}
										</td>
										<td>
											{{
												item.in_stock_amt
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											}}
											원
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<hold-store-regist-pop v-if="regiDialog"></hold-store-regist-pop>
		<hold-store-info-pop v-if="infoDialog"></hold-store-info-pop>
	</div>
</template>

<script>
import HoldStoreRegistPop from './HoldStoreMgmt/HoldStoreRegistPop';
import HoldStoreInfoPop from './HoldStoreMgmt/HoldStoreInfoPop';
import { getTelecomName } from '../../../common/common';
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		HoldStoreInfoPop,
		HoldStoreRegistPop,
	},
	data() {
		return {
			getStockList: [],
			selectionType: 'leaf',
			menu1: false,
			menu2: false,
		};
	},
	computed: {
		stockList() {
			return this.$store.state.HoldStoreMgmtModule.stockList;
		},
		regiDialog() {
			return this.$store.state.HoldStoreMgmtModule.regiDialog;
		},
		infoDialog() {
			return this.$store.state.HoldStoreMgmtModule.infoDialog;
		},
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		stockDeviceList() {
			return this.$store.state.HoldStoreMgmtModule.stockDeviceList;
		},
		stockDeviceTableList: {
			get() {
				return this.$store.state.HoldStoreMgmtModule.stockDeviceTableList;
			},
			set(newValue) {
				this.$store.state.HoldStoreMgmtModule.stockDeviceTableList = newValue;
			},
		},
		activeGroupData: {
			get() {
				return this.$store.state.HoldStoreMgmtModule.activeGroupData;
			},
			set(newValue) {
				this.$store.state.HoldStoreMgmtModule.activeGroupData = newValue;
				this.$store.commit('HoldStoreMgmtModule/setDeviceList', newValue);
			},
		},
		filterData: {
			get() {
				return this.$store.state.HoldStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.HoldStoreMgmtModule.filterData = newValue;
			},
		},
	},
	methods: {
		stockItemsList() {
			this.$store.dispatch('CodeModule/getStockListFnc', 0);
		},
		regiDialogFnc() {
			if (this.activeGroupData[0] && this.activeGroupData[0].depth >= 3) {
				alert('창고 등록은 3단계까지만 가능합니다.');
				return;
			}
			this.$store.state.HoldStoreMgmtModule.regiDialog = !this.$store.state
				.HoldStoreMgmtModule.regiDialog;
		},
		infoDialogFnc() {
			if (this.activeGroupData.length === 0) {
				alert(`수정할 창고를 선택해주세요.`);
				return;
			}
			this.$store.state.HoldStoreMgmtModule.infoDialog = !this.$store.state
				.HoldStoreMgmtModule.infoDialog;
		},
		async deleteStockFnc() {
			if (this.activeGroupData.length === 0) {
				alert(`삭제할 창고를 선택해주세요.`);
				return;
			}
			if (this.activeGroupData[0].children.length !== 0) {
				alert(`하위 보유처가 있을시 삭제할 수 없습니다.`);
				return;
			}
			if (this.stockDeviceTableList.length > 0) {
				alert('기기를 소유하고있는 보유처는 삭제할 수 없습니다.');
				return;
			}
			let confirmText = '삭제 하시겠습니까?';
			if (confirm(confirmText)) {
				let data = {
					stockId: this.activeGroupData[0].stockId,
				};
				const result = await this.$store.dispatch(
					'HoldStoreMgmtModule/deleteStock',
					data,
				);
				if (result) {
					this.activeGroupData = [];
					await this.filterSubmit();
				}
			}
		},
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async filterSubmit() {
			const data = this.$store.state.HoldStoreMgmtModule.filterData;
			await this.getList(data);
			this.stockDeviceTableList = this.stockDeviceList;
		},
		async createFilterInit() {
			await this.$store.commit('HoldStoreMgmtModule/filterInit');
			this.stockItemsList();
		},
		filterInit() {
			this.createFilterInit();
			this.getCodeList();
		},
		async getList(data) {
			await this.$store.dispatch('HoldStoreMgmtModule/getStockList', data);
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
		},
		async getCodeList() {
			await this.getCommonCodeList();
		},
		async deviceCodeData() {
			await this.$store.dispatch('CodeModule/getGoodsNameList');
			await this.$store.dispatch('CodeModule/getCapacityList', '0');
			await this.$store.dispatch('CodeModule/getDeviceColorList');
			this.codeList.deviceList.unshift({ goodsName: '전체' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},
	async created() {
		await this.commonFilterInit();
		await this.createFilterInit();
		await this.getList();
		await this.getCodeList();
		await this.deviceCodeData();

		this.stockDeviceTableList = this.stockDeviceList;

		this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
	},
};
</script>

<style scoped>
.treeCont {
	margin-top: 15px;
	width: 100%;
	display: flex;
}
.treeCont .treeMgmt {
	width: 35%;
	padding-right: 20px;
}
.treeCont .treeTable {
	width: 65%;
}
.treeMgmtBody {
	padding: 20px;
	background-color: #fff;
}
.tableCont table th {
	padding: 0;
}
</style>
