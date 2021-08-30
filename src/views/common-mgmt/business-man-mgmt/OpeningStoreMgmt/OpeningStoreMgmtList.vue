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
				<div>
					<button class="newBtn1 padBtn1" @click="deleteStoreFnc">삭제</button>
					<!-- v-on:click을 통해 deleteStoreFnc 함수 실행 -->
					<!-- 별도의 api.js에서 import한 deleteStore함수를 품고있다. -->
					<button
						v-if="storeVal === 'StoreGrade_M'"
						class="newBtn1 padBtn1 ml10 backColorBlue3 mainWhite"
						@click="regiDialogFnc(codeList)"
					>
						<!-- regiDialog 일종의 스위치, 버튼을 클릭하면 팝업이 동작되게 구현 -->
						등록
					</button>
				</div>
			</div>
			<div class="newTableStyle mt10">
				<table class="w100P">
					<thead>
						<tr>
							<th class="w50">선택</th>
							<th>번호</th>
							<th>개통점</th>
							<th>통신사</th>
							<th>사업자 번호</th>
							<th>담당자명</th>
							<th>담당자 연락처</th>
							<th>반품주소지</th>
							<th class="w120">사용여부</th>
							<th>등록일시</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="openingStoreData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr
							v-else
							v-for="(item, index) in openingStoreData"
							v-bind:key="item.index"
							@click="infoDialogFnc(item, codeList)"
						>
							<td onclick="event.cancelBubble=true">
								<template v-if="roleVal">
									<div class="checkStyleCont1">
										<input
											:id="`checkId1${item.openStoreId}`"
											type="checkbox"
											class="checkStyle"
											:value="item.openStoreId"
											v-model.trim="checkListIdArray"
										/>
										<label :for="`checkId1${item.openStoreId}`"></label>
									</div>
								</template>
								<template v-else>
									<div class="checkStyleCont1">
										<input
											:id="`checkId1${item.openStoreId}`"
											type="checkbox"
											class="checkStyle"
											:value="item.openStoreId"
											:disabled="item.storeId !== item.reqStoreId"
											v-model.trim="checkListIdArray"
										/>
										<label :for="`checkId1${item.openStoreId}`"></label>
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
								{{ item.openStoreName }}
								<span v-if="item.parentSaleStoreName">
									( {{ item.parentSaleStoreName }} )
								</span>
							</td>
							<td>
								{{ item.telecomName }}
							</td>
							<td>
								{{ item.bizNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') }}
							</td>
							<td>{{ item.chargerName }}</td>
							<td>
								{{ item.chargerPhone1 }}
								<span>-</span>
								{{ item.chargerPhone2 }}
								<span>-</span>
								{{ item.chargerPhone3 }}
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
								<div class="radioStyleTable w20 ml20">
									<input
										type="radio"
										:id="`voteUseY${item.openStoreId}`"
										:name="`voteUse${item.openStoreId}`"
										value="Y"
										:checked="item.useYn === 'Y'"
										@click="
											updateStoreUseFnc(
												$event,
												item.openStoreId,
												item.storeId,
												item.parentSaleStoreId,
												'Y',
											)
										"
									/>
									<label :for="`voteUseY${item.openStoreId}`">Y</label>
								</div>
								<div class="radioStyleTable w20 ml20">
									<input
										type="radio"
										:id="`voteUseN${item.openStoreId}`"
										:name="`voteUse${item.openStoreId}`"
										value="N"
										:checked="item.useYn === 'N'"
										@click="
											updateStoreUseFnc(
												$event,
												item.openStoreId,
												item.storeId,
												item.parentSaleStoreId,
												'N',
											)
										"
									/>
									<label :for="`voteUseN${item.openStoreId}`">N</label>
								</div>
							</td>
							<td>{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
		<!-- 등록팝업 -->
		<opening-store-regist-pop
			v-if="regiDialog"
			:infoDialogData="infoDialogData"
			:storeIdData="filterData.parentStoreId"
		>
		</opening-store-regist-pop>
		<!-- 정보팝업 -->
		<opening-store-info-pop
			v-if="infoDialog"
			:infoDialogData="infoDialogData"
			:infoDialogTelecomData="infoDialogTelecomData"
			:storeIdData="filterData.parentStoreId"
		>
		</opening-store-info-pop>
	</div>
</template>

<script>
import OpeningStoreRegistPop from '../popup/OpeningStoreRegistPop.vue';
import OpeningStoreInfoPop from '../popup/OpeningStoreInfoPop.vue';
import paging from '../../../../components/paging.vue';
import {
	deleteStore,
	updateStoreUse,
} from '../../../../api/common-mgmt/businessman-mgmt/OpeningStoreMgmtApi.js';

export default {
	components: {
		paging,
		OpeningStoreRegistPop,
		OpeningStoreInfoPop,
	},
	data: () => ({
		infoDialogData: [], // 개통점팝업에 내려줄 데이터
		infoDialogTelecomData: [], // 개통점팝업에 내려줄 데이터
		checkListIdArray: [],
		authStoreId: 0,
	}),
	computed: {
		roleVal() {
			return this.$store.state.role === 'A';
		},
		storeVal() {
			return this.$store.state.sg;
		},
		storeId() {
			return this.$store.state.OpeningStoreMgmtModule.storeId;
		},
		filterData() {
			return this.$store.state.OpeningStoreMgmtModule.filterData;
		},
		storeSelectList() {
			return this.$store.state.OpeningStoreMgmtModule.storeSelectList;
		},
		regiDialog: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.regiDialog = newValue;
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.infoDialog = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.codeList;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.codeList = newValue;
			},
		},
		totalCnt: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.totalCnt;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.totalCnt = newValue;
			},
		},
		openingStoreData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.openingStoreData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.openingStoreData = newValue;
			},
		},
		pagingData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.pagingData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.pagingData = newValue;
			},
		},
	},
	methods: {
		// 개통점 사용여부 수정
		async updateStoreUseFnc(e, id, storeId, updateStoreUseFnc, use) {
			try {
				let useData;
				if (this.roleVal) {
					useData = {
						openStoreId: id,
						storeId: this.filterData.parentStoreId,
						parentSaleStoreId: updateStoreUseFnc,
						useYn: use,
						authStoreId: storeId,
					};
				} else {
					useData = {
						openStoreId: id,
						storeId: this.storeId,
						parentSaleStoreId: this.storeId,
						useYn: use,
						authStoreId: storeId,
					};
				}

				// confirm함수를 통해 context 유무 판별후 data를 api컴포넌트로 송신
				const conText = '수정하시겠습니까?';
				let result;
				if (confirm(conText) === true) {
					result = await updateStoreUse(useData);
				}
				if (!result) e.preventDefault();
			} catch (error) {
				console.log(error);
			}
		},
		// 개통점 삭제
		async deleteStoreFnc() {
			try {
				if (this.checkListIdArray.length === 0)
					return alert('삭제 할 개통점을 선택해주십시오.');
				const checklist = {
					delOpenStoreId: this.checkListIdArray,
					storeId: this.storeId, // 관리점
				};

				const conText = '삭제하시겠습니까?';
				if (confirm(conText) === true) {
					const result = await deleteStore(checklist);
					if (result) {
						alert('삭제되었습니다.');
						this.openingStoreData = [];
						this.filterData.pageNo = 1;
						await this.$store.dispatch(
							'OpeningStoreMgmtModule/getList',
							this.filterData,
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		pagingAction(data) {
			this.filterData.pageNo = data.pageNo;
			this.filterData.perPageCnt = data.perPageCnt;
			this.$store.dispatch('OpeningStoreMgmtModule/getList', this.filterData);
		},
		selectPerPageCnt(val) {
			this.filterData.perPageCnt = Number(val);
			this.filterData.pageNo = 1;
			this.$store.dispatch('OpeningStoreMgmtModule/getList', this.filterData);
		},
		regiDialogFnc(data) {
			this.regiDialog = !this.regiDialog;
			this.infoDialogData = data;
		},
		infoDialogFnc(item, codeList) {
			this.infoDialog = !this.infoDialog;
			this.infoDialogData = item;
			this.infoDialogTelecomData = codeList;
		},
	},
};
</script>

<style></style>
