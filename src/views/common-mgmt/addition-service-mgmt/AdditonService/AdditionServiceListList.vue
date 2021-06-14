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
				<div id="BtnCont">
					<v-btn v-if="!roleVal" @click="deleteDataFnc">삭제</v-btn>
					<v-btn
						v-if="!roleVal"
						@click="registPop"
						style="background-color: white"
					>
						등록
					</v-btn>
					<v-btn
						v-if="roleVal"
						@click="demendPop"
						style="background-color: white"
						>요청</v-btn
					>
				</div>
			</div>
			<div class="ListTable">
				<table>
					<thead>
						<tr>
							<th style="width: 83px" v-if="!roleVal">선택</th>
							<th style="width: 83px">번호</th>
							<th>통신사</th>
							<th>부가서비스명</th>
							<th>카테고리</th>
							<th>요금</th>
							<th v-if="!roleVal">사용여부</th>
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
							<td onclick="event.cancelBubble=true" v-if="!roleVal">
								<input
									type="checkbox"
									v-model.trim="addSvcId"
									:value="item.addSvcId"
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
							<td onclick="event.cancelBubble=true" v-if="!roleVal">
								<input
									type="radio"
									:id="`voteUseY${item.addSvcId}`"
									:name="`voteUse${item.addSvcId}`"
									:disabled="roleVal"
									value="Y"
									:checked="item.useYn == 'Y'"
									@click="updateUseYnFnc($event, item.addSvcId, 'Y')"
								/>
								<label :for="`voteUseY${item.addSvcId}`">Y</label>
								<input
									type="radio"
									:id="`voteUseN${item.addSvcId}`"
									:name="`voteUse${item.addSvcId}`"
									:disabled="roleVal"
									value="N"
									:checked="item.useYn == 'N'"
									@click="updateUseYnFnc($event, item.addSvcId, 'N')"
								/>
								<label :for="`voteUseN${item.addSvcId}`">N</label>
							</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>

		<addition-service-regist-pop
			v-if="registDialog"
			:reqYn="reqYn"
			:codeData="codeList"
		>
		</addition-service-regist-pop>

		<addition-service-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
		>
		</addition-service-info-pop>
	</div>
</template>

<script>
import {
	deleteData,
	updateUseYn,
} from '../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceMgmtApi.js';
import AdditionServiceRegistPop from './popup/AdditionServiceRegistPop.vue';
import AdditionServiceInfoPop from './popup/AdditionServiceInfoPop.vue';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		AdditionServiceRegistPop,
		AdditionServiceInfoPop,
		paging,
	},
	data: () => ({
		infoDialogData: [],
		addSvcId: [],
	}),
	computed: {
		getListData: {
			get() {
				return this.$store.state.AdditionServiceModule.getListData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.getListData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.filterData = newValue;
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.AdditionServiceModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.infoDialog = newValue;
			},
		},
		registDialog: {
			get() {
				return this.$store.state.AdditionServiceModule.registDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.registDialog = newValue;
			},
		},
		codeList() {
			return this.$store.state.AdditionServiceModule.codeList;
		},
		totalCnt() {
			return this.$store.state.AdditionServiceModule.totalCnt;
		},
		pagingData: {
			get() {
				return this.$store.state.AdditionServiceModule.pagingData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.pagingData = newValue;
			},
		},
		roleVal() {
			let result;
			if (!this.$store.state.role) {
				result = true;
			} else {
				result = false;
			}
			return result;
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
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('AdditionServiceModule/getList', data);
		},
		async deleteDataFnc() {
			if (this.addSvcId.length === 0) {
				alert('삭제 할 부가서비스를 선택해주십시오.');
				return;
			}
			//TODO parentStoreId 동적 바인딩 처리
			const data = {
				addSvcId: this.addSvcId,
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
				let result;
				const useData = {
					addSvcId: id,
					useYn: use,
				};
				const conText = '수정하시겠습니까?';
				if (confirm(conText) == true) {
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
};
</script>

<style></style>
