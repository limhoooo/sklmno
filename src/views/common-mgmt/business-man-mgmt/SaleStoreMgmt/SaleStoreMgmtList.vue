<template>
	<div>
		<div id="ListTableCont">
			<div class="menuBar">
				<div class="pageCont">
					<!--  -->
					<p>
						Total :
						<span class="deepBlue font-weight-bold">{{ totalCnt }}</span>
					</p>
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
				<div id="BtnCont">
					<v-btn
						v-clipboard:copy="regiUrl"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError"
						>영업점 초대 링크</v-btn
					>
					<v-btn @click="deleteStoreFnc">삭제</v-btn>
					<v-btn
						@click="regiDialog = !regiDialog"
						style="background-color: white"
						>등록</v-btn
					>
				</div>
			</div>
			<div class="ListTable">
				<table>
					<thead>
						<tr>
							<th>선택</th>
							<th>번호</th>
							<th>영업점명</th>
							<th>통신사</th>
							<th>사업자 번호</th>
							<th>담당자명</th>
							<th>담당자 연락처</th>
							<th>반품주소지</th>
							<th>사용여부</th>
							<th>등록일시</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="saleStoreData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr
							v-else
							v-for="(item, index) in saleStoreData"
							:key="item.index"
							@click="
								infoDialog = !infoDialog;
								infoDialogData = item;
							"
						>
							<td onclick="event.cancelBubble=true">
								<input
									type="checkbox"
									:value="item.storeId"
									v-model.trim="delStoreId"
								/>
							</td>
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>{{ item.saleStoreName }}</td>
							<td>{{ item.telecomName }}</td>
							<td>
								{{ item.bizNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') }}
							</td>
							<td>{{ item.chargerName }}</td>
							<td>
								{{ item.chargerPhone1 }}<span>-</span>{{ item.chargerPhone2
								}}<span>-</span>{{ item.chargerPhone2 }}
							</td>
							<td>
								{{ item.returnAddr }}
								{{ item.returnAddrDetail }}
								( {{ item.returnZipCode }} )
							</td>
							<td onclick="event.cancelBubble=true">
								<input
									type="radio"
									:id="`voteUseY${item.storeId}`"
									:name="`voteUse${item.storeId}`"
									value="Y"
									:checked="item.useYn == 'Y'"
									@click="updateStoreUseFnc($event, item.storeId, 'Y')"
								/>
								<label :for="`voteUseY${item.storeId}`">Y</label>
								<input
									type="radio"
									:id="`voteUseN${item.storeId}`"
									:name="`voteUse${item.storeId}`"
									value="N"
									:checked="item.useYn == 'N'"
									@click="updateStoreUseFnc($event, item.storeId, 'N')"
								/>
								<label :for="`voteUseN${item.storeId}`">N</label>
							</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
		<sale-store-regist-pop
			v-if="regiDialog"
			:dataListCall="getList"
			:parentStoreId="this.filterData.parentStoreId"
		>
		</sale-store-regist-pop>

		<sale-store-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
			:parentStoreId="this.filterData.parentStoreId"
			:dataListCall="getList"
		>
		</sale-store-info-pop>
	</div>
</template>

<script>
import {
	deleteStore,
	updateStoreUse,
} from '../../../../api/common-mgmt/businessman-mgmt/SaleStoreMgmtApi.js';
import SaleStoreRegistPop from '../popup/SaleStoreRegistPop.vue';
import SaleStoreInfoPop from '../popup/SaleStoreInfoPop.vue';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		SaleStoreRegistPop,
		SaleStoreInfoPop,
		paging,
	},
	data: () => ({
		infoDialogData: [],
		delStoreId: [], // 테이블 로우 체크
	}),
	computed: {
		filterData: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.filterData = newValue;
			},
		},
		regiDialog: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.regiDialog = newValue;
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.infoDialog = newValue;
			},
		},
		saleStoreData: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.saleStoreData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.saleStoreData = newValue;
			},
		},
		pagingData() {
			return this.$store.state.SaleStoreMgmtModule.pagingData;
		},
		regiUrl() {
			return this.$store.state.SaleStoreMgmtModule.regiUrl;
		},
		totalCnt() {
			return this.$store.state.SaleStoreMgmtModule.totalCnt;
		},
		roleVal() {
			return this.$store.state.role;
		},
	},

	methods: {
		async getList(data) {
			this.saleStoreData = [];
			await this.$store.dispatch('SaleStoreMgmtModule/getList', data);
		},
		async updateStoreUseFnc(e, id, use) {
			try {
				const useData = {
					parentStoreId: this.filterData.parentStoreId,
					storeId: id,
					useYn: use,
				};
				const conText = '수정하시겠습니까?';
				let result;
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
		async deleteStoreFnc() {
			if (this.delStoreId.length === 0) {
				alert('삭제 할 영업점을 선택해주십시오.');
				return;
			}
			//TODO parentStoreId 동적 바인딩 처리
			const data = {
				parentStoreId: this.filterData.parentStoreId,
				delStoreId: this.delStoreId,
			};
			const conText = '삭제하시겠습니까?';
			if (confirm(conText) == true) {
				const result = await deleteStore(data);
				if (result) {
					alert('삭제되었습니다.');
					this.delStoreId = [];
					await this.getList(this.filterData);
				}
			}
		},
		async pagingAction(data) {
			this.filterData.pageNo = data.pageNo;
			this.filterData.perPageCnt = data.perPageCnt;
			await this.getList(this.filterData);
		},
		selectPerPageCnt(val) {
			this.filterData.perPageCnt = Number(val);
			this.filterData.pageNo = 1;
			this.getList(this.filterData);
		},
		onCopy() {
			alert('초대 링크가 복사되었습니다.');
		},
		onError() {
			alert('오류');
		},
	},
};
</script>

<style></style>
