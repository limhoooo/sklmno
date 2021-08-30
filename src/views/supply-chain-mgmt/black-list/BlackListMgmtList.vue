<template>
	<div>
		<div class="tableTopOption">
			<div>
				<div class="mt10 disIN">
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
				<button
					class="ml10 radiusBtn bg_color_royalblue"
					:class="typeActive('')"
					@click="filterFnc('')"
				>
					전체 (
					{{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} )
				</button>
				<button
					class="ml10 radiusBtn bg_color_royalblue"
					:class="typeActive(item.blackType)"
					@click="filterFnc(item.blackType, item.blackTypeCount)"
					v-for="item in groupCountList"
					:key="item.id"
				>
					{{ item.blackTypeMsg }}
					(
					{{
						item.blackTypeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					}}
					)
				</button>
			</div>
			<div>
				<input
					type="button"
					@click="excelDownloadFnc()"
					class="new-excel-btn ml10 lh40"
					value="엑셀 다운로드"
				/>

				<button class="ml10 new-excel-btn lh40" @click="blackListPopFnc()">
					블랙리스트 등록
				</button>
				<button
					v-if="roleVal"
					class="ml10 lh26 backColorWhite padW10 borderRadi3Px borderContColor2"
					@click="deleteBlackList"
				>
					삭제
				</button>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th v-if="roleVal" class="w50">
							<div class="checkStyleCont1">
								<input
									id="checked1"
									type="checkbox"
									class="checkStyle"
									@click="checkAll($event.target.checked)"
								/>
								<label for="checked1"></label>
							</div>
						</th>
						<th>번호</th>
						<th>등록날짜</th>
						<th>등록점/등록자</th>
						<th>유형</th>
						<th>고객명</th>
						<th>생년월일</th>
						<th>전화번호</th>
						<th>주소</th>
						<th>사유</th>
						<th>차단등록건수</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="blackList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							@click="blackListPopFnc(item)"
							v-for="(item, index) in blackList"
							:key="item.id"
							style="cursor: pointer"
						>
							<td v-if="roleVal" onclick="event.cancelBubble=true">
								<div class="checkStyleCont1">
									<input
										:id="`checkStyleCont${index}`"
										class="checkStyle"
										type="checkbox"
										:value="{
											blackName: item.blackName,
											blackPhone: item.blackPhone,
										}"
										v-model="checkBlackList"
									/>
									<label :for="`checkStyleCont${index}`"></label>
								</div>
							</td>
							<td>
								{{
									blackTypeCount -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>
							<td>
								{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
							</td>
							<td>
								{{ item.storeName }}/
								{{ item.regiUserName }}
							</td>
							<td>
								{{ item.blackTypeMsg }}
							</td>
							<td>
								{{ item.blackName }}
							</td>
							<td>
								{{ item.blackDateBirth }}
							</td>
							<td>
								{{ item.blackPhone1 }} - {{ item.blackPhone2 }} -
								{{ item.blackPhone3 }}
							</td>
							<td class="w200">
								{{ item.blackAddr }}
								{{ item.blackAddrDetail }}
							</td>
							<td>
								{{ item.blackReason }}
							</td>
							<td>
								<span class="font-red"> {{ item.blackCount }} </span>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>
		<BlackListPop
			v-if="blackListPop"
			:blackListInfo="blackListInfo"
			@closeDialog="closeDialog"
		></BlackListPop>
	</div>
</template>

<script lang="ts">
import {
	filterData,
	listData,
	pagingData,
} from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import BlackListPop from './popup/BlackListPop.vue';
import paging from '../../../components/paging.vue';
import Vue from 'vue';

interface dataType {
	checkBlackList: Object[];
	blackListPop: boolean;
	blackListInfo: Object;
}
export default Vue.extend({
	name: 'BlackListMgmtList',
	components: {
		BlackListPop,
		paging,
	},
	data: (): dataType => ({
		checkBlackList: [],
		blackListPop: false,
		blackListInfo: {},
	}),
	computed: {
		blackList(): listData[] {
			return this.$store.state.BlackListModule.blackList;
		},
		totalCnt(): number {
			return this.$store.state.BlackListModule.totalCnt;
		},
		pagingData(): pagingData {
			return this.$store.state.BlackListModule.pagingData;
		},
		excelFormDownloadUrl(): string {
			return this.$store.state.commonModule.excelFormDownloadUrl;
		},
		groupCountList(): any {
			return this.$store.state.BlackListModule.groupCountList;
		},
		roleVal(): boolean {
			return this.$store.state.role === 'A';
		},
		filterData: {
			get(): filterData {
				return this.$store.state.BlackListModule.filterData;
			},
			set(newValue: any) {
				this.$store.state.BlackListModule.filterData = newValue;
			},
		},
		perPageCnt: {
			get(): pagingData {
				return this.$store.state.BlackListModule.filterData.perPageCnt;
			},
			set(newValue: any) {
				this.$store.state.BlackListModule.filterData.perPageCnt = newValue;
			},
		},
		blackTypeCount: {
			get(): number {
				return this.$store.state.BlackListModule.blackTypeCount;
			},
			set(newValue: any) {
				this.$store.state.BlackListModule.blackTypeCount = newValue;
			},
		},
	},
	methods: {
		checkAll(e: any) {
			let checkArr: Object[] = [];
			if (e) {
				this.checkBlackList = [];
				this.blackList.forEach(item => {
					let data = {
						blackName: item.blackName,
						blackPhone: item.blackPhone,
					};
					checkArr.push(data);
				});
				this.checkBlackList = checkArr || [];
			} else {
				this.checkBlackList = checkArr || [];
			}
		},
		typeActive(blackType: string) {
			if (blackType === this.filterData.blackType) {
				return 'bg_color_royalblueActive';
			}
		},
		async filterFnc(blackType: string, blackTypeCount: number) {
			this.filterData.blackType = blackType || '';
			let data = this.filterData;
			data.pageNo = 1;
			await this.getList(data);
			if (!blackTypeCount) {
				this.blackTypeCount = this.totalCnt;
			} else {
				this.blackTypeCount = blackTypeCount;
			}
		},
		async blackListPopFnc(item: any) {
			this.blackListInfo = item || {};
			this.blackListPop = !this.blackListPop;
		},
		closeDialog(data: boolean, dialogName: string) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		async deleteBlackList() {
			if (this.checkBlackList.length === 0) {
				alert('삭제할 리스트를 선택해주세요.');
				return;
			}
			if (confirm('삭제하시겠습니까?')) {
				const result = await this.$store.dispatch(
					'BlackListModule/deleteBlackListGroup',
					this.checkBlackList,
				);
				if (result) {
					alert('삭제되었습니다.');
					this.checkBlackList = [];
					await this.getList(this.filterData);
				}
			}
		},

		async excelDownloadFnc() {
			if (this.blackList.length <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			this.filterData.pageNo = this.pagingData.pageNo;
			this.filterData.perPageCnt =
				this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: this.filterData,
				apiName: 'getBlackPage',
				fileName: '블랙리스트 관리',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
		},
		async selectPerPageCnt(val: number) {
			const data: filterData = this.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData: { perPageCnt: number; pageNo: number }) {
			const data: filterData = this.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data?: filterData) {
			await this.$store.dispatch('BlackListModule/getList', data);
		},
	},
	async created() {
		await this.getList();
		this.blackTypeCount = this.totalCnt;
		//this.groupCountList.unshift({ blackTypeMsg: '전체', blackType: '' });
	},
});
</script>
