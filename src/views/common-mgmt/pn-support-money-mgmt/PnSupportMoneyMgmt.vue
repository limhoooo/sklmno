<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>공시지원금관리</h2></div>
			<div class="new-mainCont posR disFx borderContColor1 borderRadi3Px">
				<div class="filterLeftCont" @keyup.up='pnSubmit'>
					<div class="inStockLeftRowCont disFx h40">
						<div class="w220">
							<v-select
								label="통신사"
								:items="codeList.telecom"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								name="division"
								v-model.trim="telecomData"
							>
							</v-select>
						</div>
						<div class="w220 ml10">
							<v-select
								label="서비스"
								:items="codeList.network"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								name="division"
								v-model.trim="serviceData"
							>
							</v-select>
						</div>
					</div>
				</div>
				<div class="inStockButtonCont ml40 disFx flexDColC">
					<button
						class="backColorMint1 mainWhite w100P disIn borderRadi3Px h40"
						@click="pnSubmit"
					>
						검색
					</button>
				</div>
			</div>

			<!--			<div id="SearchBoxCont">
				<div>
					<div class="devideCont" style="width: 46%">
						<p>통신사</p>
						<v-select
							class="select_custom1"
							:items="codeList.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							outlined
							name="division"
							v-model.trim="telecomData"
						>
						</v-select>
					</div>
					<div class="devideCont">
						<p>서비스</p>
						<v-select
							class="select_custom1"
							:items="codeList.network"
							item-text="codeNm"
							item-value="codeSeq"
							outlined
							name="division"
							v-model.trim="serviceData"
						>
						</v-select>
					</div>
					<div>
						<v-btn @click="pnSubmit">검색</v-btn>
					</div>
				</div>
			</div>-->
			<div id="ListTableCont">
				<div class="menuBar">
					<div class="pageCont"></div>
					<div id="BtnCont">
						<button
							class="backColorWhite padW20 lh36 borderRadi3Px borderContColor2"
							@click="pnSupportMoneyRegiBtn"
							v-if="this.$store.state.role"
						>
							등록
						</button>
					</div>
				</div>
				<div class="ListTable">
					<div class="pnSupportMoneyBox" style="">
						<table
							v-if="
								pnSupportMoneyData.goodsList &&
								pnSupportMoneyData.goodsList.length <= 0
							"
						>
							<thead>
								<tr>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>데이터가없습니다.</td>
								</tr>
							</tbody>
						</table>
						<table v-else class="pnSupportMoneyTable" style="font-size: 11px">
							<thead>
								<tr class="tableStyle01">
									<th style="width: 100px"></th>
									<th
                      style="padding: 10px"
										v-for="goodsListData in pnSupportMoneyData.goodsList"
										v-bind:key="goodsListData.index"
									>
										{{ goodsListData.goodsName }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="chargeListData in pnSupportMoneyData.chargeList"
									v-bind:key="chargeListData.index"
								>
									<td>
										{{ chargeListData.chargeName }}
									</td>
									<td
										v-for="goodsListData in pnSupportMoneyData.goodsList"
										v-bind:key="goodsListData.index"
										@click="
											pnSupportMoneyInfoPopTd(
												{
													chargeId: chargeListData.chargeId,
													chargeName: chargeListData.chargeName,
												},
												{
													goodsId: goodsListData.goodsId,
													goodsName: goodsListData.goodsName,
												},
												chargeListData.chargeId,
												goodsListData.goodsId,
											)
										"
									>
										<div
                        style="width: 80px"
											v-html="
												mappingListFnc(
													chargeListData.chargeId,
													goodsListData.goodsId,
												)
											"
										></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<pn-support-money-regi-pop v-if="regiDialog"></pn-support-money-regi-pop>
		<pn-support-money-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		></pn-support-money-info-pop>
	</div>
</template>
<script>
import pnSupportMoneyRegiPop from './popup/PnSupportMoneyRegiPop';
import PnSupportMoneyInfoPop from './popup/PnSupportMoneyInfoPop';

export default {
	components: {
		pnSupportMoneyRegiPop,
		PnSupportMoneyInfoPop,
	},
	data: () => ({
		infoDialogData: {},
	}),
	computed: {
		regiDialog: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.regiDialog = newValue;
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.infoDialog = newValue;
			},
		},
		pnSupportMoneyData() {
			return this.$store.state.PnSupportMoneyMgmtModule.pnSupportMoneyData;
		},
		telecomData: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.telecomData;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.telecomData = newValue;
			},
		},
		serviceData: {
			get() {
				return this.$store.state.PnSupportMoneyMgmtModule.serviceData;
			},
			set(newValue) {
				this.$store.state.PnSupportMoneyMgmtModule.serviceData = newValue;
			},
		},
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
	},
	methods: {
		pnSupportMoneyInfoPopTd(chargeData, goodsData) {
			let data = {
				chargeData: chargeData,
				goodsData: goodsData,
				telecomData: this.telecomData,
				serviceData: this.serviceData,
			};
			this.infoDialogData = data;
			this.infoDialog = !this.infoDialog;
		},
		pnSubmit() {
			if (!this.telecomData) {
				alert('통신사를 선택해주세요.');
				return;
			}
			if (!this.serviceData) {
				alert('구분을 선택해주세요.');
				return;
			}
			let data = {
				telecom: this.telecomData,
				network: this.serviceData,
			};
			this.getListFnc(data);
		},
		pnSupportMoneyRegiBtn() {
			this.regiDialog = !this.regiDialog;
		},
		async getListFnc(data) {
			await this.$store.dispatch('PnSupportMoneyMgmtModule/getList', data);
		},
		mappingListFnc(chargeId, goodsId) {
			const mappingList = this.pnSupportMoneyData.mappingData;
			let keyName = `${chargeId}_${goodsId}`;
			// key 있는지 확인 없을시 return
			// eslint-disable-next-line no-prototype-builtins
			if (!mappingList.hasOwnProperty(keyName)) return;
			let releaseAmt = mappingList[keyName].releaseAmt
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			let supportAmt = mappingList[keyName].supportAmt
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

			let cmp = `<p class='fs11'>출고가 : ${releaseAmt} 원</p>
				  <p class='fs11'>공시지원금 : ${supportAmt} 원</p>
				  <p class='fs11'>공시일자 : ${mappingList[keyName].releaseDate}</p>
				 `;
			return cmp;
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'NETWORK'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.telecom.splice(0, 1);
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
	},
	async created() {
		await this.commonFilterInit();
		await this.getCommonCodeList();

		this.telecomData = this.codeList.telecom[0].codeSeq;
		this.serviceData = this.codeList.network[0].codeSeq;
		let data = {
			telecom: this.codeList.telecom[0].codeSeq,
			network: this.codeList.network[0].codeSeq,
		};
		await this.getListFnc(data);
	},
};
</script>

<style>
.pnSupportMoneyBox {
	overflow: scroll;
	max-height: 570px;
	max-width: 1550px;
}
.pnSupportMoneyTable {
	max-width: 3500px !important;
	/*height: 800px;*/
}
.pnSupportMoneyTable td:hover {
	background-color: #003a53;
}
.fixedHeader1 {
	position: sticky;
	top: 0;
	z-index: 1;
	padding: 10px 0;
	width: 150px;
}
.fixedHeader {
	position: sticky;
	left: 0;
	width: 160px;
	padding: 0 !important;
}
.fixedHeader .Tdtitle {
	width: 100%;
	height: 100%;
	border-right: 1px solid #aeaeae;
	box-sizing: border-box;
	padding: 10px 0;
	/*padding-top: 60px;*/
}

.ListTable {
	position: relative;
}
</style>
