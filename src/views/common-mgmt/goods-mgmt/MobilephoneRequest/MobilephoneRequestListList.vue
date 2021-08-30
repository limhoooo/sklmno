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
							<th>상품명</th>
							<th>모델명</th>
							<th>제조사</th>
							<th>개통망</th>
							<th>개통사</th>
							<th>요청업체</th>
							<th>요청일시</th>
							<th style="width: 300px">상태</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="getRegReqList.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr v-for="(item, index) in getRegReqList" :key="item.index">
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>{{ item.goodsName }}</td>
							<td>{{ item.modelName }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.networkName }}</td>
							<td>{{ item.telecomName }}</td>
							<td>{{ item.reqStoreName }}</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
							<td class="status_btn" onclick="event.cancelBubble=true">
								<div v-if="role === 'A'">
									<span v-if="item.reqStatus === '1'">
										<div>
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
										</div>
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

		<goods-request-rjct-pop v-if="rejectDialog" :reqData="reqData">
		</goods-request-rjct-pop>
	</div>
</template>

<script>
import GoodsRequestRjctPop from '../popup/GoodsRequestRjctPop.vue';
import { updateReqStatus } from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneRequestListApi';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		GoodsRequestRjctPop,
		paging,
	},
	data: () => ({
		reqData: [],
	}),
	computed: {
		role() {
			return this.$store.state.role;
		},
		rejectDialog: {
			get() {
				return this.$store.state.MobilephoneRequestModule.rejectDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneRequestModule.rejectDialog = newValue;
			},
		},
		getRegReqList: {
			get() {
				return this.$store.state.MobilephoneRequestModule.getRegReqList;
			},
			set(newValue) {
				this.$store.state.MobilephoneRequestModule.getRegReqList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.MobilephoneRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.MobilephoneRequestModule.filterData = newValue;
			},
		},
		totalCnt() {
			return this.$store.state.MobilephoneRequestModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.MobilephoneRequestModule.pagingData;
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
			await this.$store.dispatch('MobilephoneRequestModule/getList', data);
		},
		async updateReqStatusFnc() {
			try {
				const reqStatusData = {
					capacity: this.reqData.capacity,
					goodsName: this.reqData.goodsName,
					goodsRegReqId: this.reqData.goodsRegReqId,
					maker: this.reqData.maker,
					modelName: this.reqData.modelName,
					network: this.reqData.network,
					regReqrejectDto: {
						goodsRegReqRejectId: 0,
						rejectComment: null,
						rejectDateTime: null,
						rejectUserId: null,
					},
					regiDateTime: this.reqData.regiDateTime,
					reqStatus: 6,
				};
				await updateReqStatus(reqStatusData);
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
