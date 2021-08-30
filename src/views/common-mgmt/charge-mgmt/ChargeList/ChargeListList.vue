<template>
	<div>
		<div>
			<div
				class="disFx mt30 justify-lg-space-between"
				style="align-items: center"
			>
				<div class="pagingSelectCont mt10">
					<select
						class="pagingSelect"
						v-model.trim="pagingData.perPageCnt"
						@change="selectPerPageCnt($event.target.value)"
					>
						<option value="20">20개보기</option>
						<option value="50">50개보기</option>
						<option value="100">100개보기</option>
					</select>
					<span class="ml10 subBlue1"
						>Total
						{{
							totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
					>
				</div>
				<div class="h26 mt10">
					<v-btn
						class="backColorWhite mainBlack h26 mr10"
						@click="deleteDataFnc"
						v-if="roleVal"
						>삭제</v-btn
					>
					<v-btn
						v-if="roleVal"
						@click="matchingDialog = !matchingDialog"
						class="backColorWhite mainBlack h26 mr10"
						>매칭</v-btn
					>
					<v-btn
						v-if="roleVal"
						@click="registPop"
						class="backColorWhite mainBlack h26 mr10"
						>등록</v-btn
					>
					<v-btn
						v-if="!roleVal"
						@click="demendPop"
						class="backColorBlue3 mainWhite h26"
						>요청</v-btn
					>
				</div>
			</div>
			<div class="newTableStyle mt10">
				<table class="w100P">
					<thead>
						<tr>
							<th v-if="roleVal">선택</th>
							<th>번호</th>
							<th>통신사</th>
							<th>통신망</th>
							<th>요금제명</th>
							<th>카테고리</th>
							<th>요금</th>
							<th v-if="roleVal">사용여부</th>
							<th>등록일시</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="getListData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr
							v-else
							v-for="(item, index) in getListData"
							:key="item.index"
							@click="
								infoDialog = !infoDialog;
								infoDialogData = item;
							"
						>
							<td onclick="event.cancelBubble=true" v-if="roleVal">
								<input
									type="checkbox"
									:value="item.chargeId"
									v-model.trim="chargeId"
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
							<td>{{ item.networkName }}</td>
							<td>{{ item.chargeName }}</td>
							<td>{{ item.category }}</td>
							<td>
								<span v-if="item.chargeAmt">
									{{
										item.chargeAmt
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}}
								</span>
								원
							</td>
							<td onclick="event.cancelBubble=true" v-if="roleVal">
								<input
									type="radio"
									:id="`voteUseY${item.chargeId}`"
									:name="`voteUse${item.chargeId}`"
									value="Y"
									:checked="item.useYn === 'Y'"
									@click="updateStoreUseFnc($event, item.chargeId, 'Y')"
								/>
								<label :for="`voteUseY${item.chargeId}`">Y</label>
								<input
									type="radio"
									:id="`voteUseN${item.chargeId}`"
									:name="`voteUse${item.chargeId}`"
									value="N"
									:checked="item.useYn === 'N'"
									@click="updateStoreUseFnc($event, item.chargeId, 'N')"
								/>
								<label :for="`voteUseN${item.chargeId}`">N</label>
							</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
		<charge-regist-pop v-if="registDialog" :reqYn="reqYn" :codeData="codeList">
		</charge-regist-pop>

		<charge-info-pop v-if="infoDialog" :infoDialogData="infoDialogData">
		</charge-info-pop>

		<charge-matcning-mgmt-pop v-if="matchingDialog"> </charge-matcning-mgmt-pop>
	</div>
</template>

<script>
import ChargeRegistPop from '../popup/ChargeRegistPop.vue';
import ChargeInfoPop from '../popup/ChargeInfoPop.vue';
import ChargeMatcningMgmtPop from '../popup/ChargeMatcningMgmtPop.vue';
import paging from '../../../../components/paging.vue';
import {
	deleteData,
	updateStoreUse,
} from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtApi.js';

export default {
	components: {
		ChargeRegistPop,
		ChargeInfoPop,
		ChargeMatcningMgmtPop,
		paging,
	},
	data: () => ({
		reqYn: {},
		chargeId: [],
		infoDialogData: [],
	}),
	computed: {
		registDialog: {
			get() {
				return this.$store.state.ChargeListModule.registDialog;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.registDialog = newValue;
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.ChargeListModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.infoDialog = newValue;
			},
		},
		matchingDialog: {
			get() {
				return this.$store.state.ChargeListModule.matchingDialog;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.matchingDialog = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.ChargeListModule.filterData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.filterData = newValue;
			},
		},
		getListData: {
			get() {
				return this.$store.state.ChargeListModule.getListData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.getListData = newValue;
			},
		},
		pagingData: {
			get() {
				return this.$store.state.ChargeListModule.pagingData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.pagingData = newValue;
			},
		},
		codeList() {
			return this.$store.state.ChargeListModule.codeList;
		},
		totalCnt() {
			return this.$store.state.ChargeListModule.totalCnt;
		},
		roleVal() {
			return this.$store.state.role === 'A';
		},
	},
	methods: {
		registPop() {
			this.registDialog = !this.registDialog;
			this.reqYn = 'N';
		},
		demendPop() {
			this.registDialog = !this.registDialog;
			this.reqYn = 'Y';
		},
		selectPerPageCnt(val) {
			this.filterData.perPageCnt = Number(val);
			this.filterData.pageNo = 1;
			this.getList(this.filterData);
		},
		pagingAction(data) {
			this.filterData.pageNo = data.pageNo;
			this.filterData.perPageCnt = data.perPageCnt;
			this.getList(this.filterData);
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('ChargeListModule/getList', data);
		},
		async deleteDataFnc() {
			if (this.chargeId.length === 0) {
				alert('삭제 할 요금제를 선택해주십시오.');
				return;
			}
			const data = {
				chargeId: this.chargeId,
			};
			const conText = '삭제하시겠습니까?';
			if (confirm(conText) == true) {
				const result = await deleteData(data);
				if (result) {
					alert('삭제되었습니다.');
					await this.getList(this.filterData);
				}
			}
		},
		async updateStoreUseFnc(e, id, use) {
			try {
				let result;
				const useData = {
					chargeId: id,
					useYn: use,
				};
				const conText = '수정하시겠습니까?';
				if (confirm(conText) == true) {
					result = await updateStoreUse(useData);
				}
				if (!result) {
					e.preventDefault();
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
	async created() {},
};
</script>

<style></style>
