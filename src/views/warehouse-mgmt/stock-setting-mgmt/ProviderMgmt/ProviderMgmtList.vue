<template>
	<div>
		<div
			class="disFx mt30 justify-lg-space-between"
			style="align-items: center"
		>
			<div class="pagingSelectCont">
				<select
					class="pagingSelect"
					v-model.trim="perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="ml10 subBlue1">
					Total {{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
				</span>
			</div>
			<div class="disFx">
				<button class="newBtn1" @click="deleteProviderFnc">삭제</button>
				<button class="newBtn1 ml10" @click="regiDialogFnc">등록</button>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th style="width: 50px">
							<div class="checkStyleCont1">
								<input
									id="checkId1"
									class="checkStyle"
									type="checkbox"
									value="all"
									v-model.trim="allCheckedBox"
									@click="allChecked($event.target.checked)"
								/>
								<label for="checkId1"></label>
							</div>
						</th>
						<th>번호</th>
						<th>공급처명</th>
						<th>담당자</th>
						<th>담당자 연락처</th>
						<th>담당자 E-mail</th>
						<th>반품 주소</th>
						<th class="w120">사용여부</th>
						<th>등록날짜</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="providerListData.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in providerListData"
							:key="item.id"
							@click="infoDialogFnc(item)"
						>
							<td onclick="event.cancelBubble=true">
								<template>
									<div class="checkStyleCont1">
										<input
											:id="`checkId1${item.provId}`"
											class="checkStyle"
											type="checkbox"
											:value="item.provId"
											v-model.trim="checkListIdArray"
										/>
										<label :for="`checkId1${item.provId}`"></label>
									</div>
								</template>
							</td>
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>
								{{ item.provName }}
							</td>
							<td>
								{{ item.chargerName }}
							</td>
							<td>
								<span v-if="item.chargerPhone">
									{{ item.chargerPhone1 }}
									<span>-</span>
									{{ item.chargerPhone2 }}
									<span>-</span>
									{{ item.chargerPhone3 }}
								</span>
							</td>
							<td>
								{{ item.chargerEmail }}
							</td>
							<td>
								{{ item.returnAddr }}
								{{ item.returnAddrDetail }}
								( {{ item.returnZipCode }} )
							</td>
							<td
								onclick="event.cancelBubble=true"
								class="disFx justify-center"
							>
								<div class="radioStyleTable w30 ml20">
									<input
										type="radio"
										:id="`voteUseY${item.provId}`"
										:name="`voteUse${item.provId}`"
										value="Y"
										:checked="item.useYn === 'Y'"
										@click="updateStoreUseFnc($event, item.provId, 'Y')"
									/>
									<label :for="`voteUseY${item.provId}`">Y</label>
								</div>
								<div class="radioStyleTable w30 ml20">
									<input
										type="radio"
										:id="`voteUseN${item.provId}`"
										:name="`voteUse${item.provId}`"
										value="N"
										:checked="item.useYn === 'N'"
										@click="updateStoreUseFnc($event, item.provId, 'N')"
									/>
									<label :for="`voteUseN${item.provId}`">N</label>
								</div>
							</td>
							<td>
								{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<provider-mgmt-info-pop
			v-if="infoDialog"
			:dialogData="infoDialogData"
		></provider-mgmt-info-pop>
		<provider-mgmt-regist-pop v-if="regiDialog"></provider-mgmt-regist-pop>
	</div>
</template>

<script>
import ProviderMgmtInfoPop from './popup/ProviderMgmtInfoPop.vue';
import ProviderMgmtRegistPop from './popup/ProviderMgmtRegistPop';
import paging from '../../../../components/paging.vue';

export default {
	components: {
		ProviderMgmtInfoPop,
		ProviderMgmtRegistPop,
		paging,
	},
	data() {
		return {
			infoDialogData: [],
		};
	},
	computed: {
		providerListData() {
			return this.$store.state.ProviderMgmtModule.providerListData;
		},
		totalCnt() {
			return this.$store.state.ProviderMgmtModule.totalCnt;
		},
		regiDialog() {
			return this.$store.state.ProviderMgmtModule.regiDialog;
		},
		infoDialog() {
			return this.$store.state.ProviderMgmtModule.infoDialog;
		},
		pagingData() {
			return this.$store.state.ProviderMgmtModule.pagingData;
		},
		checkListIdArray: {
			get() {
				return this.$store.state.ProviderMgmtModule.checkListIdArray;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.checkListIdArray = newValue;
			},
		},
		allCheckedBox: {
			get() {
				return this.$store.state.ProviderMgmtModule.allCheckedBox;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.allCheckedBox = newValue;
			},
		},
		perPageCnt: {
			get() {
				return this.$store.state.ProviderMgmtModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		regiDialogFnc() {
			this.$store.state.ProviderMgmtModule.regiDialog = !this.$store.state
				.ProviderMgmtModule.regiDialog;
		},
		infoDialogFnc(data) {
			this.infoDialogData = data;
			this.$store.state.ProviderMgmtModule.infoDialog = !this.$store.state
				.ProviderMgmtModule.infoDialog;
		},
		dialogClose(data, dialogName) {
			this.$set(this, dialogName, data);
		},
		async updateStoreUseFnc(e, provId, use) {
			let useData = {
				provId: provId,
				useYn: use,
			};
			const conText = '수정하시겠습니까?';
			if (confirm(conText) === true) {
				await this.$store.dispatch(
					'ProviderMgmtModule/updateStoreUse',
					useData,
					e,
				);
			} else {
				e.preventDefault();
			}
		},
		async deleteProviderFnc() {
			const result = await this.$store.dispatch(
				'ProviderMgmtModule/deleteProvider',
				this.checkListIdArray,
			);
			if (result) {
				// 리스트 재호출
				const data = this.$store.state.ProviderMgmtModule.filterData;
				await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
			}
		},
		allChecked(e) {
			let checkArr = [];
			if (e) {
				this.checkListIdArray = [];
				this.providerListData.forEach(item => {
					checkArr.push(item.provId);
				});
				this.checkListIdArray = checkArr;
			} else {
				this.checkListIdArray = checkArr;
			}
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.ProviderMgmtModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.ProviderMgmtModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
		},
		async getList(data) {
			await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
		},
	},

	async created() {
		await this.getList();
	},
};
</script>
