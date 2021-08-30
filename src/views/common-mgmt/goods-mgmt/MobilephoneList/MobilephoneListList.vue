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
							<th>상품명</th>
							<th>모델명</th>
							<th>제조사</th>
							<th>통신망</th>
							<th>통신사</th>
							<th v-if="roleVal">사용여부</th>
							<th>등록일시</th>
							<th>옵션관리</th>
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
								infoDialogCodeData = codeList;
							"
						>
							<td v-if="roleVal" onclick="event.cancelBubble=true">
								<input
									type="checkbox"
									v-model.trim="goodsId"
									:value="item.goodsId"
								/>
							</td>
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
							<td onclick="event.cancelBubble=true" v-if="roleVal">
								<input
									type="radio"
									:id="`voteUseY${item.goodsId}`"
									:name="`voteUse${item.goodsId}`"
									value="Y"
									:checked="item.useYn == 'Y'"
									@click="updateUseYnFnc($event, item.goodsId, 'Y')"
								/>
								<label :for="`voteUseY${item.goodsId}`">Y</label>
								<input
									type="radio"
									:id="`voteUseN${item.goodsId}`"
									:name="`voteUse${item.goodsId}`"
									value="N"
									:checked="item.useYn == 'N'"
									@click="updateUseYnFnc($event, item.goodsId, 'N')"
								/>
								<label :for="`voteUseN${item.goodsId}`">N</label>
							</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
							<td onclick="event.cancelBubble=true">
								<button
									class="btnDefault"
									@click="optionListDataFnc(item.optionList, item.goodsId)"
								>
									옵션관리({{ item.optionList.length }})
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<goods-regist-pop
			v-if="registDialog"
			:reqYn="reqYn"
			:infoDialogData="codeList"
		>
		</goods-regist-pop>

		<goods-option-pop v-if="optionDialog" :optionListData="optionListData">
		</goods-option-pop>

		<goods-matching-pop v-if="matchingDialog"> </goods-matching-pop>

		<goods-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
			:infoDialogCodeData="infoDialogCodeData"
		>
		</goods-info-pop>
	</div>
</template>

<script>
import paging from '../../../../components/paging.vue';
import GoodsRegistPop from '../popup/GoodsRegistPop.vue';
import GoodsOptionPop from '../popup/GoodsOptionPop.vue';
import GoodsMatchingPop from '../popup/GoodsMatchingPop.vue';
import GoodsInfoPop from '../popup/GoodsInfoPop.vue';
import {
	deleteData,
	updateUseYn,
} from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';

export default {
	components: {
		GoodsRegistPop,
		GoodsOptionPop,
		GoodsMatchingPop,
		GoodsInfoPop,
		paging,
	},

	data: () => ({
		infoDialogData: [],
		infoDialogCodeData: [],
		optionListData: [],
		goodsId: [],
		reqYn: '',
	}),
	computed: {
		infoDialog: {
			get() {
				return this.$store.state.MobilephoneListModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.infoDialog = newValue;
			},
		},
		registDialog: {
			get() {
				return this.$store.state.MobilephoneListModule.registDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.registDialog = newValue;
			},
		},
		optionDialog: {
			get() {
				return this.$store.state.MobilephoneListModule.optionDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.optionDialog = newValue;
			},
		},
		matchingDialog: {
			get() {
				return this.$store.state.MobilephoneListModule.matchingDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.matchingDialog = newValue;
			},
		},
		pagingData: {
			get() {
				return this.$store.state.MobilephoneListModule.pagingData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.pagingData = newValue;
			},
		},
		totalCnt() {
			return this.$store.state.MobilephoneListModule.totalCnt;
		},
		codeList() {
			return this.$store.state.MobilephoneListModule.codeList;
		},
		getListData: {
			get() {
				return this.$store.state.MobilephoneListModule.getListData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.getListData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.MobilephoneListModule.filterData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.filterData = newValue;
			},
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
			this.infoDialogData = this.codeList;
		},
		optionListDataFnc(optionList, goodsId) {
			this.optionListData = [];
			this.optionDialog = !this.optionDialog;
			this.optionListData.push(optionList, goodsId);
		},
		filterInit() {
			this.$store.commit('MobilephoneListModule/filterInit');
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async deleteDataFnc() {
			if (this.goodsId.length === 0) {
				alert('삭제 할 상품을 선택해주십시오.');
				return;
			}
			//TODO parentStoreId 동적 바인딩 처리
			const data = {
				goodsId: this.goodsId,
			};
			const conText = '삭제하시겠습니까?';
			if (confirm(conText) === true) {
				const result = await deleteData(data);
				if (result) {
					alert('삭제되었습니다.');
					await this.getList();
				}
			}
		},
		async updateUseYnFnc(e, id, use) {
			try {
				const useData = {
					goodsId: id,
					useYn: use,
				};
				const conText = '수정하시겠습니까?';
				let result;
				if (confirm(conText) === true) {
					result = await updateUseYn(useData);
				}
				if (!result) e.preventDefault();
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

	async created() {},
};
</script>

<style scoped></style>
