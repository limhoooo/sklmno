<template>
	<div>
		<div>
			<div class="disFx mt30 justify-lg-space-between mb10">
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
			</div>
			<div class="newTableStyle mt10">
				<table class="w100P">
					<thead>
						<tr>
							<th>번호</th>
							<th>통신사</th>
							<th>통신망</th>
							<th>요금제명</th>
							<th>카테고리</th>
							<th>요금</th>
							<th>요청업체</th>
							<th>요청일시</th>
							<th>상태</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="getRegReqListData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr
							v-else
							v-for="(item, index) in getRegReqListData"
							:key="item.index"
						>
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
								{{
									item.chargeAmt
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}}
								원
							</td>
							<td>{{ item.reqStoreName }}</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
							<td class="status_btn" onclick="event.cancelBubble=true">
								<div v-if="roleVal">
									<span v-if="item.reqStatus === '1'">
										<v-btn
											@click="
												reqData = item;
												updateReqStatusFnc();
											"
											>승인</v-btn
										>
										<v-btn
											@click="
												reqData = item;
												rejectDialog = !rejectDialog;
											"
											>반려</v-btn
										>
									</span>
									<span v-if="item.reqStatus === '6'">승인</span>
									<span v-if="item.reqStatus === '9'">
										<v-btn
											@click="
												rejectDialog = !rejectDialog;
												reqData = item;
											"
											>반려</v-btn
										>
									</span>
								</div>
								<div v-else>
									<span v-if="item.reqStatus === '1'">
										<p>요청대기</p>
									</span>
									<span v-if="item.reqStatus === '6'">승인</span>
									<span v-if="item.reqStatus === '9'">
										<v-btn
											@click="
												rejectDialog = !rejectDialog;
												reqData = item;
											"
											>반려</v-btn
										>
									</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<charge-request-rjct-pop v-if="rejectDialog" :reqData="reqData">
		</charge-request-rjct-pop>
	</div>
</template>

<script>
import ChargeRequestRjctPop from '../popup/ChargeRequestRjctPop.vue';
import { updateReqStatus } from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtRequestApi.js';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		paging,
		ChargeRequestRjctPop,
	},
	data: () => ({
		reqData: [],
	}),
	computed: {
		pagingData: {
			get() {
				return this.$store.state.ChargeRequestModule.pagingData;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.pagingData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.ChargeRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.filterData = newValue;
			},
		},
		rejectDialog: {
			get() {
				return this.$store.state.ChargeRequestModule.rejectDialog;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.rejectDialog = newValue;
			},
		},
		getRegReqListData() {
			return this.$store.state.ChargeRequestModule.getRegReqListData;
		},
		totalCnt() {
			return this.$store.state.ChargeRequestModule.totalCnt;
		},
		roleVal() {
			return this.$store.state.role === 'A';
		},
	},
	methods: {
		pagingAction(data) {
			this.filterData.pageNo = data.pageNo;
			this.filterData.perPageCnt = data.perPageCnt;
			this.getList(this.filterData);
		},
		selectPerPageCnt(val) {
			this.filterData.perPageCnt = Number(val);
			this.filterData.pageNo = 1;
			this.getList(this.filterData);
		},
		async getList(data) {
			this.getRegReqList = [];
			await this.$store.dispatch('ChargeRequestModule/getList', data);
		},
		async updateReqStatusFnc() {
			try {
				const chargeRegReqDto = {
					category: this.reqData.category,
					chargeName: this.reqData.chargeName,
					chargeRegReqId: this.reqData.chargeRegReqId,
					network: this.reqData.network,
					regReqRejectDto: {
						chargeRegReqRejectId: this.reqData.regReqRejectDto
							.chargeRegReqRejectId,
						rejectComment: null,
						rejectDateTime: null,
						rejectUserId: null,
					},
					reqStatus: 6,
					reqStoreId: this.reqData.reqStoreId,
					telecom: this.reqData.telecom,
				};
				await updateReqStatus(chargeRegReqDto);
				this.getList();
			} catch (error) {
				console.log(error);
			}
		},
	},
	async created() {},
};
</script>

<style></style>
