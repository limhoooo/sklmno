<template>
	<div>
		<div class="tableTopOption">
			<div class="normalSelectCont">
				<select class="normalSelectCustom">
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
				<span class="totalCont">Total {{}}</span>
			</div>
			<div>
				<form>
					<a class="excelBtn" @click="postStatusFnc()"> 우체국테스트 </a>
				</form>
				<span class="excelBtn" @click="excelUploadFnc()"> 엑셀 업로드 </span>
				<form
					id="excelFormDownloadUrl"
					name="excelFormDownloadUrl"
					style="display: inline-block"
					method="GET"
				>
					<input
						type="submit"
						class="excelBtn ml10"
						value="엑셀 양식 다운로드"
					/>
				</form>
				<input type="button" class="excelBtn ml10" value="엑셀 다운로드" />
			</div>
		</div>
		<div class="tableCont">
			<table>
				<thead>
					<tr>
						<th style="width: 40px"><input type="checkbox" /></th>
						<th>번호</th>
						<th>개통상태</th>
						<th>업무진행상태<br />접수일/상태변경일</th>
						<th>개통점<br />가입유형</th>
						<th>영업점<br />등록자</th>
						<th>고객명<br />연락처</th>
						<th>요금제</th>
						<th>신청모델<br />색상</th>
						<th>단말기 일련번호<br />유심번호</th>
						<th>최근 메모(3개)</th>
						<th>첨부파일</th>
						<th>배송정보</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="sellStatusList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td><input type="checkbox" /></td>
							<td>2458</td>
							<td
								class="bluefont"
								@click="quickOpeningDialog = !quickOpeningDialog"
							>
								미개통
							</td>
							<td class="pd5TL">
								<span class="redfont">접수</span><br />2021-01-31 14:32<br />2021-02-03
								14:52
							</td>
							<td>DM-B<br />번호이동</td>
							<td>블랙다이아몬드<br />김철수</td>
							<td>송대호<br />010-1234-5678</td>
							<td>슈퍼플랜 베이직 초이스</td>
							<td>아이폰 11 Pro (64G)<br />그린</td>
							<td>488777<br />1721727121211266F</td>
							<td class="tPL pl-5">
								<span class="orangefont mr10 w40 disIN">2분전</span>확인완 /
								개통요청<br /><span class="font-btn-color mr10 w40 disIN"
									>어제</span
								>개통보류사유 : 미디어팩해지
							</td>
							<td>
								<button class="btnStyle1">파일업로드</button><br /><button
									class="btnStyle1 mt-1"
								>
									파일확인
								</button>
							</td>
							<td>
								<span class="font-3D7B27">배송요청</span><br />18271621527
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<!--			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>-->
		</div>

		<quick-opening-pop v-if="quickOpeningDialog"></quick-opening-pop>
		<div></div>
	</div>
</template>

<script lang="ts">
import QuickOpeningPop from './popup/QuickOpeningPop.vue';
import {getTrack} from '../../../common/postApi';
import {
  filterData,
  listData,
  pagingData,
} from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import Vue from 'vue';

export default Vue.extend({
	name: 'SellStatusList',
	components: { QuickOpeningPop },
	computed: {
		sellStatusList(): listData[] {
			return this.$store.state.SellStatusModule.sellStatusList;
		},
		totalCnt(): number {
			return this.$store.state.SellStatusModule.totalCnt;
		},
		pagingData(): pagingData {
			return this.$store.state.SellStatusModule.pagingData;
		},
		quickOpeningDialog: {
			get(): boolean {
				return this.$store.state.SellStatusModule.quickOpeningDialog;
			},
			set(newValue: boolean) {
				this.$store.state.SellStatusModule.quickOpeningDialog = newValue;
			},
		},
	},
	methods: {
		async postStatusFnc() {
			await getTrack('6865109160124');
		},
		async selectPerPageCnt(val: number) {
			const data: filterData = this.$store.state.SellStatusModule.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			await this.getList(data);
		},
		async pagingAction(pagingData: { perPageCnt: number; pageNo: number }) {
			const data: filterData = this.$store.state.SellStatusModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async getList(data?: filterData) {
			await this.$store.dispatch('OpenStoreDeviceStatusModule/getList', data);
		},
	},
	async created() {
		//await this.getList();
	},
});
</script>
