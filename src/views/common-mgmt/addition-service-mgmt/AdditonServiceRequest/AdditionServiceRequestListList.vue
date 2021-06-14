<template>
	<div>
		<div id="ListTableCont">
			<div class="menuBar">
				<div class="pageCont">
					<span class="mr10" style="padding-top: 3px">
						Total :
						<span class="deepBlue font-weight-bold">{{ totalCnt }}</span>
					</span>
					<select
						class="selectDefault"
						v-model.trim="pagingData.perPageCnt"
						@change="selectPerPageCnt($event.target.value)"
					>
						<option value="20">20개보기</option>
						<option value="50">50개보기</option>
						<option value="100">100개보기</option>
					</select>
				</div>
			</div>
			<div class="ListTable">
				<table>
					<thead>
						<tr>
							<th style="width: 83px">번호</th>
							<th>통신사</th>
							<th>부가서비스명</th>
							<th>카테고리</th>
							<th>요금</th>
							<th>요청업체</th>
							<th>요청일시</th>
							<th>상태</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="getRegReqData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr v-else v-for="(item, index) in getRegReqData" :key="item.index">
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>{{ item.telecomName }}</td>
							<td>{{ item.addSvcName }}</td>
							<td>{{ item.addSvcTypeName }}</td>
							<td>
								{{
									item.addSvcCharge
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}}
								원
							</td>
							<td>{{ item.reqStoreName }}</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
							<td class="status_btn" onclick="event.cancelBubble=true">
								<div v-if="role === 'A'">
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
		</div>
		<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>

		<addition-service-rjct-pop v-if="rejectDialog" :reqData="reqData">
		</addition-service-rjct-pop>
	</div>
</template>

<script>
import { updateReqStatus } from '../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceRequestApi.js';
import AdditionServiceRjctPop from './popup/AdditionServiceRjctPop.vue';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		AdditionServiceRjctPop,
		paging,
	},
	data: () => ({
		reqData: [],
	}),
	computed: {
		getRegReqData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.getRegReqData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.getRegReqData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.filterData = newValue;
			},
		},
		rejectDialog: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.rejectDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.rejectDialog = newValue;
			},
		},
		totalCnt() {
			return this.$store.state.AdditionServiceRequestModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.AdditionServiceRequestModule.pagingData;
		},
		role() {
			return this.$store.state.role;
		},
	},
	methods: {
		async getList(data) {
			this.getRegReqData = [];
			await this.$store.dispatch('AdditionServiceRequestModule/getList', data);
		},
		async updateReqStatusFnc() {
			try {
				const reqStatusData = {
					addSvcCharge: this.reqData.charge,
					addSvcType: this.reqData.addSvcType,
					addSvcName: this.reqData.addSvcName,
					addSvcRegReqId: this.reqData.addSvcRegReqId,
					regReqrejectDto: {
						addSvcRegReqId: 0,
						rejectComment: null,
						rejectDateTime: null,
						rejectUserId: null,
					},
					reqStatus: 6,
					telecom: this.reqData.telecom,
					reqStoreId: this.reqData.reqStoreId,
				};
				await updateReqStatus(reqStatusData);
				await this.getList(this.filterData);
			} catch (error) {
				console.log(error);
			}
		},
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
	},
};
</script>

<style></style>
