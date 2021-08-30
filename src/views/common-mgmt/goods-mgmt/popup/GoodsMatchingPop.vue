<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="1100">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">매칭 관리</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>

				<v-card-text>
					<div class="titleCont" style="display: block !important">
						<p class="subTitle">매칭 대기 및 중복 목록</p>
						<div class="new-mainCont posR disFx borderContColor1">
							<div class="new-filterCont posA borderRadi3Px">
								<button id="initBtn1" @click="dataReset" class="mainBlue1">
									필터 초기화
								</button>
								<label for="initBtn1"></label>
							</div>
							<div class="filterLeftCont" @keyup.enter='submitSearchForm'>
								<div class="inStockLeftRowCont disFx h40">
									<div class="w100P">
										<v-select
											attach
											:items="codeList.maker"
											item-text="codeNm"
											item-value="codeSeq"
											label="제조사"
											outlined
											@change="selectedMakerList($event)"
											v-model.trim="searchForm.maker"
										></v-select>
									</div>
									<div class="w100P ml10">
										<v-select
											attach
											label="통신사"
											:items="codeList.telecom"
											item-text="codeNm"
											item-value="codeSeq"
											outlined
											@change="selectedTelecomList($event)"
											v-model.trim="searchForm.telecom"
										></v-select>
									</div>
									<div class="w100P ml10">
										<v-select
											attach
											label="통신망"
											:items="codeList.network"
											item-text="codeNm"
											item-value="codeSeq"
											outlined
											@change="selectedNetworkList($event)"
											v-model.trim="searchForm.network"
										></v-select>
									</div>
								</div>
							</div>
							<div class="inStockButtonCont ml40 disFx flexDColC h40">
								<button
									class="backColorMint1 mainWhite w100P disIn borderRadi3Px h40"
									@click="submitSearchForm"
								>
									검색
								</button>
							</div>
						</div>

						<div class="disFx justify-end mt10 mb10">
							<v-btn
								class="backColorMint1 mainWhite borderReset w80"
								text
								outlined
								@click="applyMatchStatusFnc"
							>
								매칭완료
							</v-btn>
							<v-btn
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								text
								@click="dialog = !dialog"
								outlined
							>
								취소
							</v-btn>
						</div>
					</div>
					<div class="newTableStyle mt10">
						<table class="w100P">
							<thead>
								<tr>
									<th class="w50">그룹</th>
									<th class="w50">선택</th>
									<th>상품명</th>
									<th>모델명</th>
									<th>제조사</th>
									<th>통신망</th>
									<th>통신사</th>
									<th>사용여부</th>
									<th>매칭여부</th>
									<th>스마트초이스여부</th>
									<th>등록일</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in getMatchListData" :key="item.index">
									<td>
										<div class="checkStyleCont1">
											<input
												:id="`checkId1${item.goodsId}`"
												class="checkStyle"
												type="checkbox"
												:value="item.goodsId"
												v-model.trim="formData.checkValue"
											/>
											<label :for="`checkId1${item.goodsId}`"></label>
										</div>
									</td>
									<td>
										<div class="radioStyleTable w20 ml20 posHand2">
											<input
												type="radio"
												:id="`radio1Btn${item.goodsId}`"
												name="useGoodsId"
												:value="item.goodsId"
												v-model.trim="formData.radioValue"
											/>
											<label :for="`radio1Btn${item.goodsId}`"></label>
										</div>
									</td>
									<td>{{ item.goodsName }}</td>
									<td>{{ item.modelName }}</td>
									<td>{{ item.makerName }}</td>
									<td>{{ item.networkName }}</td>
									<td>{{ item.telecomName }}</td>
									<td>{{ item.useYn }}</td>
									<td>{{ item.matchingYn }}</td>
									<td v-text="originKeyText(item.originKey)">Y</td>
									<td>
										{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="disFx justify-end mt10">
						<v-btn
							class="backColorMint1 mainWhite borderReset w80"
							text
							outlined
							@click="applyMatchStatusFnc"
						>
							매칭완료
						</v-btn>
						<v-btn
							class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							text
							@click="dialog = !dialog"
							outlined
						>
							취소
						</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {
	applyMatchStatus,
	getMatchList,
} from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';
import { commonCodeListFnc } from '../../../../common/common.js';

export default {
	data() {
		return {
			getMatchListData: [],
			searchForm: {
				maker: '0',
				telecom: '0',
				network: '0',
			},
			codeList: {
				network: [],
				telecom: [],
				maker: [],
			},
			formData: {
				checkValue: [],
				radioValue: 0,
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.MobilephoneListModule.matchingDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.matchingDialog = newValue;
			},
		},
	},
	methods: {
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async getMatchListFnc(data) {
			try {
				this.getMatchListData = [];
				const result = await getMatchList(data);
				if (result) {
					this.getMatchListData = result.data.data.resultList;
				}
			} catch (error) {
				console.log(error);
			}
		},
		async selectedMakerList(val) {
			let data = {
				maker: val,
				telecom: this.searchForm.telecom,
				network: this.searchForm.network,
			};
			await this.getMatchListFnc(data);
		},
		async selectedTelecomList(val) {
			let data = {
				maker: this.searchForm.maker,
				telecom: val,
				network: this.searchForm.network,
			};
			await this.getMatchListFnc(data);
		},
		async selectedNetworkList(val) {
			let data = {
				maker: this.searchForm.maker,
				telecom: this.searchForm.telecom,
				network: val,
			};
			await this.getMatchListFnc(data);
		},
		async submitSearchForm() {
			await this.getMatchListFnc(this.searchForm);
		},
		dataReset() {
			this.searchForm.maker = '0';
			this.searchForm.telecom = '0';
			this.searchForm.network = '0';
		},
		async applyMatchStatusFnc() {
			const data = {
				groupGoodsId: this.formData.checkValue,
				useGoodsId: this.formData.radioValue,
			};
			const result = await applyMatchStatus(data);
			if (result) {
				alert('매칭 완료되었습니다.');
				this.dialog = !this.dialog;
				this.getList();
			}
		},
		originKeyText(key) {
			if (key == null) return 'N';
			if (key.indexOf('S') !== -1) {
				return 'Y';
			} else {
				return 'N';
			}
		},
		async commonCodeListFnc() {
			let data = {
				code: ['TELECOM', 'MAKER', 'NETWORK'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.codeList.maker = commonCodeList.codeList.MAKER;
			this.codeList.network = commonCodeList.codeList.NETWORK;

			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '0' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '0' });
			this.codeList.network.unshift({ codeNm: '전체', codeSeq: '0' });
		},
	},
	created() {
		this.getMatchListFnc();
		this.commonCodeListFnc();
		//	this.fetchFormData();
	},
};
</script>
<style scoped>
.filterCont {
	margin-right: 80px;
}
.subTitle {
	color: #003a53;
	font-weight: bold;
	padding-bottom: 5px;
}
.btnCont {
	display: flex;
	justify-content: flex-end;
	padding-top: 10px;
}
</style>
