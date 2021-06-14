<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>보유처관리</router-link
			>
		</div>
		<div class="searchingCont">
			<div class="filterCont">
				<v-btn icon>
					<v-icon style="color: #7e7e7e">mdi-cached</v-icon>
					<span style="color: #7e7e7e; font-weight: bold" @click="filterInit"
						>필터 초기화</span
					>
				</v-btn>
			</div>
			<div class="boxRow">
				<div class="contRow">
					<div class="selectCustom">
						<v-select
							outlined
							:items="codeList.telecom"
							v-model.trim="filterData.telecom"
							@change="getStockListFnc"
							item-text="codeNm"
							item-value="codeSeq"
							label="통신사"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="제조사"
							outlined
							:items="codeList.maker"
							v-model.trim="filterData.maker"
							@change="getDeviceListFnc"
							item-text="codeNm"
							item-value="codeSeq"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="보유처"
							:items="codeList.stockNameList"
							outlined
							v-model.trim="filterData.stockId"
							item-text="stockName"
							item-value="stockId"
						></v-select>
					</div>
				</div>
				<div class="contRow">
					<div class="selectCustom">
						<v-select
							outlined
							:items="codeList.deviceList"
							v-model.trim="filterData.goodsId"
							item-text="modelName"
							item-value="goodsId"
							label="기기명"
							@change="getCapacityListFnc()"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="용량"
							:items="codeList.capacityList"
							v-model.trim="filterData.capacity"
							outlined
							@change="getDeviceColorList()"
							item-text="capacity"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="색상"
							:items="codeList.colorList"
							v-model.trim="filterData.colorName"
							outlined
							item-text="colorName"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-text-field
							label="일련번호 입력"
							v-model="filterData.barcode"
							outlined
						></v-text-field>
					</div>
				</div>
			</div>
			<div class="searchBoxCont">
				<div class="searchBox" @click="filterSubmit">검색</div>
			</div>
		</div>
		<div class="treeCont">
			<div class="treeMgmt">
				<div class="routerCont">
					<div class="routerStyle" style="color: #003a53">보유처관리</div>
				</div>
				<div class="treeMgmtBody">
					<div
						class="textRight"
						style="border-bottom: 1px solid #ddd; padding: 8px"
					>
						<v-btn color="teal" dark class="mr5" @click="regiDialogFnc"
							>등록</v-btn
						>
						<v-btn color="primary" class="mr5" @click="infoDialogFnc"
							>수정</v-btn
						>
						<v-btn color="pink" style="color: white" @click="deleteStockFnc"
							>삭제</v-btn
						>
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
				<div class="routerCont">
					<div class="routerStyle" style="color: #003a53" to="">보유처내역</div>
				</div>
				<div class="treeMgmtBody">
					<div>
						<span class="mr10" style="padding-top: 3px">
							Total : {{ stockDeviceTableList.length }}
							<span class="deepBlue font-weight-bold"></span>
						</span>
					</div>
					<div
						class="tableCont"
						style="min-height: 450px; max-height: 450px; overflow-y: scroll"
					>
						<table>
							<thead>
								<tr style="padding: 10px 0">
									<!--									<th>번호</th>-->
									<th>통신사</th>
									<th>제조사</th>
									<th>보유처</th>
									<th>기기명<br />(모델명)</th>
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
import filterCodeListMixin from '../../../common/filterCodeListMixin';

export default {
	components: {
		HoldStoreInfoPop,
		HoldStoreRegistPop,
	},
	mixins: [filterCodeListMixin],

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
		filterInit() {
			this.$store.commit('HoldStoreMgmtModule/filterInit');
			this.getCodeList();
			this.getStockListFnc();
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
			await this.getDeviceListFnc();
			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},
	async created() {
		await this.commonFilterInit();
		await this.filterInit();
		await this.getList();
		await this.getCodeList();
		this.stockDeviceTableList = this.stockDeviceList;

		this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
		this.codeList.colorList.unshift({ colorName: '전체', goodsOptionId: '' });
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
