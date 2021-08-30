<template>
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
					<option value="1000">1000개보기</option>
				</select>
				<span class="ml10 subBlue1"
					>Total
					{{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span
				>
			</div>
			<div>
				<!--				<span class="excelBtn" @click="excelUploadFnc()"> 엑셀 업로드 </span>-->
				<!--				<form-->
				<!--					id="excelFormDownloadUrl"-->
				<!--					name="excelFormDownloadUrl"-->
				<!--					style="display: inline-block"-->
				<!--					:action="`${excelFormDownloadUrl}returnStockExcelTemplate`"-->
				<!--					method="GET"-->
				<!--				>-->
				<!--					<input-->
				<!--						type="submit"-->
				<!--						class="excelBtn ml10"-->
				<!--						value="엑셀 양식 다운로드"-->
				<!--					/>-->
				<!--				</form>-->
				<input
					type="button"
					@click="excelDownLoadFnc()"
					class="new-excel-btn lh40 ml10"
					value="엑셀 다운로드"
				/>
				<button
					class="btnStyle1 ml10"
					style="padding: 5px 10px; width: 100px"
					@click="moveAppl()"
				>
					신청서작성
				</button>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P">
				<thead>
					<tr>
						<th style="width: 49px">
							<div class="checkStyleCont1">
								<input
									:id="`checkBoxAllSelect1`"
									class="checkStyle"
									type="checkbox"
									value="all"
									v-model.trim="allCheckedBox"
									@click="allChecked($event.target.checked)"
								/>
								<label :for="`checkBoxAllSelect1`"></label>
							</div>
						</th>
						<th>번호</th>
						<th>개통상태</th>
						<th>상담상태<br />접수일/상태변경일</th>
						<th>개통점<br />가입유형</th>
						<th>영업점<br />등록자</th>
						<th>고객유형</th>
						<th>고객명<br />연락처<br />주민등록번호</th>
						<th>요금제</th>
						<th>기기명(용량)<br />색상</th>
						<th>기기일련번호<br />유심일련번호</th>
						<th>물류상태<br />택배사/송장번호</th>
						<th>첨부파일</th>
						<th>최근 메모(3개)</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="sellCurrentPageList.length === 0">
						<tr>
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
					</template>
					<template v-else>
						<tr
							v-for="(item, index) in sellCurrentPageList"
							:key="item.id"
							@click="moveApplication(item.applId)"
							:class="
								TrColor(item.openingPriorityTargetYn, item.priorityTargetYn)
							"
						>
							<td onclick="event.cancelBubble=true">
								<div class="checkStyleCont1">
									<input
										:id="`checkBox${item.applId}`"
										class="checkStyle"
										type="checkbox"
										:value="item.applId"
										v-model.trim="checkListIdArray"
									/>
									<label :for="`checkBox${item.applId}`"></label>
								</div>
							</td>
							<td>
								{{
									totalCnt -
									pagingData.perPageCnt * (pagingData.pageNo - 1) -
									index
								}}
							</td>

							<td
								@click="quickOpeningDialogFnc(item.applId)"
								onclick="event.cancelBubble=true"
								style="position: relative; width: 120px"
							>
								<div
									class="positionAbox"
									style="
										display: flex;
										justify-content: center;
										align-items: center;
									"
									:class="statusColorBg(item.openingTaskStatus)"
								>
									<span>
										{{ item.openingTaskStatusMsg }} <br />
										<span v-if="item.openingTaskStatus === 'OPENING_COMPL'">
											{{ item.openingDate }}
										</span>
										<span v-if="item.openingTaskStatus === 'RETRACT_COMPL'">
											{{ item.cancelDate }}
										</span>
									</span>
								</div>
							</td>

							<td class="pd5TL">
								<span :class="statusColor(item.consultTaskStatus)">
									{{ item.consultTaskStatusMsg }}
								</span>
								<br />
								{{ item.consultRegiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />
								{{ item.consultUpdDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
							</td>

							<td>
								{{ item.openStoreName }}
								<br />
								{{ item.joinTypeMsg }}
							</td>

							<td>
								{{ item.saleStoreName }}
								<br />
								{{ item.applRegiUserName }}
							</td>
							<td>
								{{ item.cusTypeMsg }}
							</td>
							<td>
								<span v-if="item.cusType === 'CORP'">
									<!--									법인명-->
									{{ item.bizName }}
								</span>
								<span v-else>
									<!--									고객명-->
									{{ item.cusName }}
								</span>
								<br />
								{{ item.cusPhone1 }}-{{ item.cusPhone2 }}-{{ item.cusPhone3 }}
								<br />
								<span v-if="item.cusType !== 'CORP'">
									{{ item.cusRegiNum1 }}-{{ item.cusRegiNum2 }}
								</span>
								<span v-else-if="item.cusType === 'CORP'">
									<!--									법인번호-->
									{{ item.bizNum }}
								</span>
								<span v-else-if="item.cusType === 'FOREIGN'">
									<!--                  외국인-->
									{{ item.licenseNum1 }}-
									{{ item.licenseNum2 }}
								</span>
							</td>
							<td>{{ item.chargeName }}</td>
							<td>
								{{ item.goodsName }}
								<span v-if="findCapacity(item.goodsName)">
									({{ item.capacity }})
								</span>
								<br />
								{{ item.color }}
							</td>
							<td onclick="event.cancelBubble=true">
								{{ item.deviceRawBarcode }}
								<br />
								{{ item.usimRawBarcode }}
							</td>
							<td onclick="event.cancelBubble=true" style="cursor: unset">
								<p
									v-if="item.logisticsTaskStatusMsg"
									:class="statusColor(item.logisticsTaskStatus)"
									style="font-size: 12px; line-height: 20px; margin: 0"
								>
									{{ item.logisticsTaskStatusMsg }}
								</p>
								<p
									style="font-size: 12px; line-height: 20px; margin: 0"
									v-if="item.courierName"
								>
									{{ item.courierName }}
								</p>
								<p
									style="font-size: 12px; line-height: 20px; margin: 0"
									v-if="item.invoiceNum"
									class="font-blue cur_p"
									@click="postLookupFnc(item.invoiceNum, item.courierEtc)"
								>
									( {{ item.invoiceNum }} )
								</p>
							</td>

							<td onclick="event.cancelBubble=true" style="cursor: unset">
								<button
									v-if="item.docTargetYn === 'N'"
									class="btnStyle1"
									@click="fileUploadFnc(item.applId, item.docTargetYn)"
								>
									파일확인
								</button>
								<button
									v-else
									class="backColorRed btnStyle1"
									@click="fileUploadFnc(item.applId, item.docTargetYn)"
								>
									심사대상
								</button>
								<br />
							</td>
							<td
								class="tPL pl-5"
								onclick="event.cancelBubble=true"
								@click="memoDialogFnc(item.applId)"
							>
								<div v-for="memo in item.memoList">
									<span
										class="orangefont mr10 w60 disIN displayIn alignMid"
										v-text="dateTime(memo.regiDateTime)"
									>
									</span>
									<span class="ellipsisH w100 displayIn alignMid">{{
										memo.memoContents
									}}</span>
								</div>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
			<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
		</div>

		<quick-opening-pop
			v-if="quickOpeningDialog"
			:quickOpeningApplId="quickOpeningApplId"
			@getList="getList"
			@openBlackListPop="openBlackListPop"
		></quick-opening-pop>

		<!--QuickOpeningPop에서 블랙리스트 등록 click시, emit받아서 BlacklistPop을 띄운다.-->
		<black-list-pop
			v-if="blacklistDialog"
			:blackListInfo="blackListinfo"
			@closeDialog="closeDialog"
		></black-list-pop>
		<!--    파일업로드 팝업-->
		<file-upload-pop
			:applId="applIdProds"
			:docTargetYn="docTargetYn"
			v-if="fileUploadDialog"
			@closeDialog="closeDialog"
		></file-upload-pop>
		<!--    파일확인 팝업-->
		<!--		<file-check-pop v-if="fileCheckDialog" @closeDialog="closeDialog">-->
		<!--		</file-check-pop>-->
		<!--    엑셀업로드 팝업-->
		<ExcelUploadPop v-if="excelUploadDialog" @closeDialog="closeDialog">
		</ExcelUploadPop>
		<MemoPop
			v-if="memoDialog"
			:applId="memoApplId"
			@closeDialog="closeDialog"
		></MemoPop>
		<div></div>
	</div>
</template>

<script lang="ts">
import QuickOpeningPop from './popup/QuickOpeningPop.vue';
import FileUploadPop from './popup/FileUploadPop.vue';
import ExcelUploadPop from './popup/ExcelUploadPop.vue';
import MemoPop from './popup/MemoPop.vue';
import paging from '../../../components/paging.vue';
import { getTrack } from '../../../common/postApi';
import {
	filterData,
	listData,
	pagingData,
} from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import Vue from 'vue';
import BlackListPop from '../black-list/popup/BlackListPop.vue';
import { blackList } from '../../../store/interface/warehouse-mgmt/interface';
import { compareTime, findCapacity, statusColor } from '../../../common/common';

export default Vue.extend({
	name: 'SellStatusList',
	components: {
		BlackListPop,
		FileUploadPop,
		// FileCheckPop,
		ExcelUploadPop,
		QuickOpeningPop,
		paging,
		MemoPop,
	},
	data() {
		return {
			// fileCheckDialog: false,
			fileUploadDialog: false,
			excelUploadDialog: false,
			blacklistDialog: false,
			blackListinfo: {},
			quickOpeningApplId: 0,
			memoApplId: 0,
			quickOpeningChangedYn: false,
			applIdProds: 0,
			docTargetYn: '',
		};
	},
	computed: {
		checkListIdArray: {
			get(): any {
				return this.$store.state.SellStatusModule.checkListIdArray;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.checkListIdArray = newValue;
			},
		},
		allCheckedBox: {
			get(): any {
				return this.$store.state.SellStatusModule.allCheckedBox;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.allCheckedBox = newValue;
			},
		},
		sellCurrentPageList(): listData[] {
			return this.$store.state.SellStatusModule.sellCurrentPageList;
		},
		totalCnt(): number {
			return this.$store.state.SellStatusModule.totalCnt;
		},
		pagingData(): pagingData {
			return this.$store.state.SellStatusModule.pagingData;
		},
		excelFormDownloadUrl(): string {
			return this.$store.state.commonModule.excelFormDownloadUrl;
		},
		filterData: {
			get(): filterData {
				return this.$store.state.SellStatusModule.filterData;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.filterData = newValue;
			},
		},
		perPageCnt: {
			get(): pagingData {
				return this.$store.state.SellStatusModule.filterData.perPageCnt;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.filterData.perPageCnt = newValue;
			},
		},
		quickOpeningDialog: {
			get(): boolean {
				return this.$store.state.SellStatusModule.quickOpeningDialog;
			},
			set(newValue: boolean) {
				this.$store.state.SellStatusModule.quickOpeningDialog = newValue;
			},
		},
		memoDialog: {
			get(): boolean {
				return this.$store.state.SellStatusModule.memoDialog;
			},
			set(newValue: boolean) {
				this.$store.state.SellStatusModule.memoDialog = newValue;
			},
		},
	},
	methods: {
		// 엑셀 초기화 펑션
		excelBtnResetFnc() {
			this.allCheckedBox = false;
			this.checkListIdArray = [];
		},
		allChecked(e: any) {
			let checkArr: any = [];
			if (e) {
				this.checkListIdArray = [];
				this.sellCurrentPageList.forEach((item: any) => {
					checkArr.push(item.applId);
				});
				this.checkListIdArray = checkArr;
			} else {
				this.checkListIdArray = checkArr;
			}
		},
		moveAppl() {
			this.$router.push('/application-form-creation');
		},
		statusColorBg(taskStatus: string) {
			if (statusColor(taskStatus) === 'font-hotpink') {
				return 'font-hotpink border_color_hotpink';
			} else if (statusColor(taskStatus) === 'font-royalblue') {
				return 'font-royalblue border_color_royalblue';
			} else if (statusColor(taskStatus) === 'font-green') {
				return 'font-green border_color_green';
			}
		},
		statusColor(taskStatus: string) {
			return statusColor(taskStatus);
		},
		dateTime(Time: string) {
			return compareTime(Time);
		},
		async postStatusFnc(postNumber: string) {
			let text = await getTrack(postNumber);
		},
		postLookupFnc(invoiceNum: string, courierEtc: string) {
			let url = `${courierEtc}${invoiceNum}`;
			window.open(
				url,
				'none',
				'width=800, height=800,location=no,status=no,scrollbars=yes',
			);
		},
		// excelUploadFnc() {
		// 	this.excelUploadDialog = !this.excelUploadDialog;
		// },
		fileUploadFnc(id: number, docTargetYn: string) {
			this.applIdProds = id;
			this.docTargetYn = docTargetYn;
			this.fileUploadDialog = !this.fileUploadDialog;
		},
		// fileCheckFnc() {
		// 	this.fileCheckDialog = !this.fileCheckDialog;
		// },
		quickOpeningDialogFnc(id: number) {
			if (this.$store.state.sg !== 'StoreGrade_S') {
				this.quickOpeningApplId = id;
				this.quickOpeningDialog = !this.quickOpeningDialog;
			}
		},
		memoDialogFnc(id: number) {
			this.memoApplId = id;
			this.memoDialog = !this.memoDialog;
		},
		closeDialog(data: boolean, dialogName: string) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
			if (dialogName === 'blackListPop') {
				this.blackListinfo = {};
			}
		},
		moveApplication(id: number) {
			this.$router.push(`application-form-creation?applId=${id}&`);
		},
		openBlackListPop(data: blackList) {
			this.blackListinfo = data;
			this.blacklistDialog = !this.blacklistDialog;
		},
		TrColor(openingPriorityTargetYn: string, priorityTargetYn: string) {
			if (openingPriorityTargetYn === 'Y') {
				return 'bg_color_hotpink';
			}
			if (priorityTargetYn === 'Y') {
				return 'bg_color_royalblue';
			}
		},
		async excelDownLoadFnc() {
			if (this.sellCurrentPageList.length <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			let checkArr: any = [];
			if (this.checkListIdArray.length === 0) {
				this.sellCurrentPageList.forEach((item: any) => {
					checkArr.push(item.applId);
				});
				this.allCheckedBox = true;
				this.checkListIdArray = checkArr;
			}
			if (this.filterData.goodsName === '전체') {
				this.filterData.goodsName = '';
			}
			if (this.filterData.capacity === '전체') {
				this.filterData.capacity = '';
			}
			if (this.filterData.colorName === '전체') {
				this.filterData.colorName = '';
			}
			this.filterData.pageNo = this.pagingData.pageNo;
			this.filterData.perPageCnt =
				this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			this.filterData.applIds = this.checkListIdArray;
			let param = {
				data: this.filterData,
				apiName: 'getSellCurrentPage',
				fileName: '판매현황리스트',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
			if (this.filterData.goodsName === '') {
				this.filterData.goodsName = '전체';
			}
			if (this.filterData.capacity === '') {
				this.filterData.capacity = '전체';
			}
			if (this.filterData.colorName === '') {
				this.filterData.colorName = '전체';
			}
		},
		findCapacity(text: string) {
			return findCapacity(text);
		},
		async selectPerPageCnt(val: number) {
			const data: filterData = this.$store.state.SellStatusModule.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			this.excelBtnResetFnc();
			await this.getList(data);
		},
		async pagingAction(pagingData: { perPageCnt: number; pageNo: number }) {
			const data: filterData = this.$store.state.SellStatusModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
			await this.excelBtnResetFnc();
		},
		async getList(data?: filterData) {
			await this.$store.dispatch('SellStatusModule/getSellCurrentPage', data);
		},
	},
	async created() {
		// 엑셀 초기화로직
		await this.excelBtnResetFnc();
		if (this.quickOpeningDialog) this.quickOpeningDialog = false;
		if (this.$route.query.prevPage) {
			const data: filterData = this.$store.state.SellStatusModule.filterData;
			await this.getList(data);
		}
	},
});
</script>
<style>
.tableCont table td {
	cursor: pointer;
}
.bg_color_hotpink td {
	background-color: #fed4d4 !important;
}
.bg_color_royalblue td {
	background-color: #ecedff !important;
}
.positionAbox {
	position: absolute;
	width: 100%;
	height: 100%;
	display: block;
	top: 0;
	border: 1px solid #666;
}
</style>
