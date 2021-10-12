<template>
	<div>
		<div class="disFx mt20">
			<div class="pagingSelectCont">
				<select
					class="pagingSelect"
					v-model.trim="pagingData.perPageCnt"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
			</div>
			<div class="disFx ml30 lh26 cur_p">
				<div class="fakeLine5" @click="statusCountFnc('')">
					<span>전체 : </span>
					<span class="boldWt txUnL">{{ totalStatusCount }}</span>
				</div>
				<div class="fakeLine5 ml30 cur_p" @click="statusCountFnc('REQ')">
					<span>요청 : </span>
					<span
						v-if="creditInquireStatusCountData[0]"
						v-cloak
						class="mainMint1 boldWt txUnL"
						>{{ creditInquireStatusCountData[0].creditProcStatusCnt }}</span
					>
				</div>
				<div class="fakeLine5 ml30 cur_p" @click="statusCountFnc('PROC')">
					<span>진행중 : </span>
					<span
						v-cloak
						class="boldWt txUnL"
						style="color: #00b55e"
						v-if="creditInquireStatusCountData[2]"
						>{{ creditInquireStatusCountData[2].creditProcStatusCnt }}</span
					>
				</div>
				<div class="fakeLine5 ml30 cur_p" @click="statusCountFnc('COMPL')">
					<span>완료 : </span>
					<span
						v-cloak
						class="mainBlue2 boldWt txUnL"
						v-if="creditInquireStatusCountData[3]"
						>{{ creditInquireStatusCountData[3].creditProcStatusCnt }}</span
					>
				</div>
				<div class="fakeLine5 ml30 cur_p" @click="statusCountFnc('ERR')">
					<span>오류 : </span>
					<span
						v-cloak
						class="mainRed boldWt txUnL"
						v-if="creditInquireStatusCountData[1]"
						>{{ creditInquireStatusCountData[1].creditProcStatusCnt }}</span
					>
				</div>
				<div class="ml30 cur_p" @click="statusCountFnc('CANCEL')">
					<span>취소 : </span>
					<span
						v-if="creditInquireStatusCountData[1]"
						v-cloak
						class="boldWt txUnL"
						>{{ creditInquireStatusCountData[4].creditProcStatusCnt }}</span
					>
				</div>
			</div>
		</div>
		<div class="newTableStyle mt10">
			<table class="w100P cr_disabled1">
				<tr style="cursor: default">
					<th class="w60">번호</th>
					<th class="w220">요청내용</th>
					<th class="w70 pad0">
						<div class="lh30">통신사</div>
						<div class="tableFlagLine2"></div>
						<div class="lh30">가입유형</div>
					</th>
					<th class="w140">영업점/등록자<br />등록일시</th>
					<th class="w80">개통점</th>
					<th class="w50P">결과내용</th>
					<th class="w100">담당자<br />수정일시</th>
					<th>진행사항</th>
				</tr>
				<tr></tr>
				<tr
					v-for="(item, index) in getListData"
					:key="index"
					style="cursor: default"
				>
					<td>
						{{
							pagingData.totalCnt -
							pagingData.perPageCnt * (pagingData.pageNo - 1) -
							index
						}}
					</td>
					<td class="pad0">
						<!--<template></template>요청상태일때만 인풋창으로-->
						<div class="disFx">
							<template v-if="item.creditReqType === 'ITEMS'">
								<CreditCardRequestList
									:item="item"
									:index="index"
								></CreditCardRequestList>
								<div
									class="mt10 mb10 posR"
									style="
										display: flex;
										flex-direction: column;
										justify-content: center;
									"
								>
									<template v-if="storeVal === 'StoreGrade_M'">
										<button
											class="backColorBlue3 borderRadi3Px mainWhite lh26 w60"
											@click="crUpdateFnc(item)"
										>
											수정
										</button>
									</template>
									<template
										v-if="
											storeVal === 'StoreGrade_S' &&
											item.creditProcStatus === 'REQ'
										"
									>
										<button
											class="backColorBlue3 borderRadi3Px mainWhite lh26 w60"
											@click="crUpdateFnc(item)"
										>
											수정
										</button>
									</template>
								</div>
							</template>
							<template v-if="item.creditReqType === 'SENTENCE'">
								<textarea
									:id="`sentence${index}`"
									class="sentenceArea"
									v-html="item.sentenceReq"
									v-model.trim="item.sentenceReq"
								></textarea>
								<div
									class="mt10 mb10 posR"
									style="
										display: flex;
										flex-direction: column;
										justify-content: center;
									"
								>
									<template v-if="storeVal === 'StoreGrade_M'">
										<button
											class="backColorBlue3 borderRadi3Px mainWhite lh26 w60"
											@click="crUpdateFnc(item, index, 'SENTENCE')"
										>
											수정
										</button>
									</template>
									<template
										v-if="
											storeVal === 'StoreGrade_S' &&
											item.creditProcStatus === 'REQ'
										"
									>
										<button
											class="backColorBlue3 borderRadi3Px mainWhite lh26 w60"
											@click="crUpdateFnc(item, index, 'SENTENCE')"
										>
											수정
										</button>
									</template>
								</div>
							</template>
						</div>
					</td>
					<td class="pad0">
						<div class="lh96">
							{{ item.telecomName }}
						</div>
						<div class="tableFlagLine1"></div>
						<div class="lh96">{{ item.joinTypeMsg }}</div>
					</td>
					<td>
						{{ item.storeName }}/{{ item.regiUserName }}<br />
						<span class="font-gray">
							{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
						</span>
					</td>
					<td>{{ item.openStoreName }}</td>
					<td onclick="event.cancelBubble=true">
						<template v-if="!item.sentenceRes">
							<div
								class="flexParentCont1"
								style="display: flex; flex-wrap: wrap; justify-content: center"
							>
								<div
									class="mb5"
									style="display: inline-block"
									v-for="(value, key) in item.creditInquireResult"
									:key="value.id"
								>
									<span class="disIn txAnL w120">{{ key }}</span>
									<input
										type="text"
										:class="{ backColorGray4: storeVal === 'StoreGrade_S' }"
										class="borderContColor2 backColorWhite1 borderRadi3Px lh30 w110 padW10 ml10"
										v-model.trim="item.creditInquireResult[key]"
										:disabled="storeVal === 'StoreGrade_S'"
									/>
								</div>
								<div class="mb5 w100P" style="display: inline-block">
									<textarea
										placeholder="메모를 입력해 주세요."
										:class="{ backColorGray4: storeVal === 'StoreGrade_S' }"
										class="borderContColor2 backColorWhite1 borderRadi3Px lh30 padW10 cr_memo4"
										:disabled="storeVal === 'StoreGrade_S'"
										v-model.trim="item.memoContents"
										style="width: 99%"
									/>
								</div>
								<div>
									<textarea
										style="position: absolute; left: -9999px"
										id="copyInput3"
									></textarea>
									<button
										class="borderContColor2 borderRadi3Px backColorWhite lh26 w60 mt5"
										@click="copyText(item.creditInquireResult)"
									>
										복사하기
									</button>
									<button
										class="backColorBlue3 borderRadi3Px mainWhite lh26 w60 ml5 mt5"
										@click="crUpdateFnc(item)"
										v-if="storeVal === 'StoreGrade_M'"
									>
										수정
									</button>
								</div>
							</div>
						</template>
						<template v-if="item.sentenceRes">
							<div class="w100P">
								<textarea
									class="borderContColor2 backColorWhite1 borderRadi3Px lh30 padW10 cr_memo4"
									v-model.trim="item.sentenceRes"
									style="width: 99%; height: 150px"
									:disabled="storeVal === 'StoreGrade_S'"
								></textarea>
								<div>
									<button
										class="borderContColor2 borderRadi3Px backColorWhite lh26 w60 mt5"
										@click="copyText(item.creditInquireResult)"
									>
										복사하기
									</button>
									<button
										class="backColorBlue3 borderRadi3Px mainWhite lh26 w60 ml5 mt5"
										@click="crUpdateFnc(item)"
										v-if="storeVal === 'StoreGrade_M'"
									>
										수정
									</button>
								</div>
							</div>
						</template>
					</td>
					<td class="posR">
						<!-- 요청상태값에서만 보인다. && 등록자와 담당자가 같지 않을때만 보여준다. -->
						<div
							v-if="
								item.creditProcStatus !== 'REQ' &&
								item.resUserName !== item.regiUserName
							"
						>
							<span>{{ item.resUserName }}</span>
							<br />
							<span class="font-gray"
								>{{ item.resUpdDateTime | moment('YYYY-MM-DD') }}<br />
								{{ item.resUpdDateTime | moment('HH:mm:ss') }}</span
							>
						</div>
						<button
							class="backColorBlue3 borderRadi3Px mainWhite lh26 w60 mt10"
							@click="infoFnc(item)"
						>
							이력보기
						</button>
						<div class="change_his_mark1" v-if="item.diffUpdDate <= 1"></div>
					</td>
					<td class="w120">
						<div>
							<select
								:id="`creditProcStatus${index}`"
								class="w100 borderRadi3Px borderContColor2 backColorWhite lh26"
								:value="item.creditProcStatus"
								:disabled="storeVal === 'StoreGrade_S'"
								:checked="item.value"
								@change="
									updateStatus(
										index,
										item.creditProcStatus,
										$event.target.value,
									)
								"
							>
								<option value="REQ">요청</option>
								<option value="PROC">진행중</option>
								<option value="COMPL">완료</option>
								<option value="ERR">오류</option>
								<option value="CANCEL">취소</option>
							</select>
							<button
								v-if="item.creditProcStatus === 'COMPL'"
								class="w100 borderRadi3Px borderSubColor2 backColorBlue1 mainBlue2 lh26 mt5"
								@click="applRegiFnc(item)"
							>
								신청서작성
							</button>
							<button
								v-if="item.creditProcStatus === 'COMPL'"
								class="w100 borderRadi3Px borderContColor2 backColorWhite lh26 mt5"
								@click="crRestartFnc(item)"
							>
								신용조회 재진행
							</button>
							<button
								v-if="item.creditProcStatus === 'REQ'"
								class="w100 borderRadi3Px borderContColor2 backColorWhite lh26 mt5"
								@click="cancelCrFnc(item)"
							>
								신용조회 취소
							</button>
						</div>
					</td>
					<!--					<td class="w200">
						<template>
							<span class="boldWt mainBlue2">{{ item.진행상황 }}</span>
							<div class="mt5">
								<button
									class="subFontS11 padW5 borderSubColor2 borderRadi3Px mainBlue2 backColorBlue1 lh20"
								>
									신청서작성
								</button>
								<button
									class="subFontS11 padW5  borderRadi3Px lh20 ml5"
								>
									신용조회 재진행
								</button>
							</div>
						</template>
					</td>-->
				</tr>
			</table>
		</div>

		<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>

		<credit-check-info-pop v-if="infoDialog"></credit-check-info-pop>
	</div>
</template>

<script>
import CreditCheckInfoPop from '../../../views/credit-check-mgmt/credit-check/popup/CreditCheckInfoPop.vue';
import paging from '../../../components/paging.vue';
import { copyCreditResult } from '../../../common/copyApplication';
import numberSplit from '../../../common/numberSplit.js';
import CreditCardRequestList from '../credit-check/credit-card/CreditCardRequestList.vue';
import { nullValidation2 } from '@/common/common';

export default {
	name: 'CreditCheckList',
	mixins: [numberSplit],
	components: {
		CreditCheckInfoPop,
		CreditCardRequestList,
		paging,
	},
	data: () => ({
		cusRegiNum: '',
		bizRegiNum: '',
		licenseNum: '',
		menu1: {},
		menu2: {},
	}),
	computed: {
		totalStatusCount() {
			let total = this.creditInquireStatusCountData.reduce((acc, curr) => {
				return acc + curr.creditProcStatusCnt;
			}, 0);
			return total;
		},
		storeVal() {
			return this.$store.state.sg;
		},
		filterData: {
			get() {
				return this.$store.state.CreditCheckModule.filterData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.filterData = newValue;
			},
		},
		selectedData: {
			get() {
				return this.$store.state.CreditCheckModule.selectedData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.selectedData = newValue;
			},
		},
		infoDialog: {
			get() {
				return this.$store.state.CreditCheckModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.infoDialog = newValue;
			},
		},
		getListData() {
			return this.$store.state.CreditCheckModule.getListData;
		},
		creditInquireStatusCountData() {
			return this.$store.state.CreditCheckModule.creditInquireStatusCountData;
		},
		codeList: {
			get() {
				return this.$store.state.CreditCheckModule.codeList;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.codeList = newValue;
			},
		},
		infoPopData: {
			get() {
				return this.$store.state.CreditCheckModule.infoPopData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.infoPopData = newValue;
			},
		},
		pagingData: {
			get() {
				return this.$store.state.CreditCheckModule.pagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.pagingData = newValue;
			},
		},
		crData: {
			get() {
				return this.$store.state.ApplicationFormCreationModule.crData;
			},
			set(newValue) {
				this.$store.state.ApplicationFormCreationModule.crData = newValue;
			},
		},
		cardPagingData: {
			get() {
				return this.$store.state.CreditCheckModule.cardPagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.cardPagingData = newValue;
			},
		},
	},
	methods: {
		statusCountFnc(status) {
			if (status === 'REQ') {
				this.selectedData.creditProcStatus = [{ name: '요청', value: status }];
			} else if (status === 'ERR') {
				this.selectedData.creditProcStatus = [{ name: '오류', value: status }];
			} else if (status === 'PROC') {
				this.selectedData.creditProcStatus = [
					{ name: '진행중', value: status },
				];
			} else if (status === 'COMPL') {
				this.selectedData.creditProcStatus = [{ name: '완료', value: status }];
			} else if (status === 'CANCEL') {
				this.selectedData.creditProcStatus = [{ name: '취소', value: status }];
			} else {
				this.selectedData.creditProcStatus = [];
			}

			setTimeout(this.setListData, 200);
			setTimeout(this.getList, 200);
		},
		async setListData() {
			let data = this.filterData;
			data.pageNo = 1;
			data.perPageCnt = this.pagingData.perPageCnt;
			if (this.filterData.telecom.indexOf('') >= 0) {
				this.filterData.telecom = [5, 6, 7];
			}
			await this.getCreditInquireStatusCount(data);
			await this.getList(data);
		},
		reformToBrTag(data) {
			return data.split('\n').join('<br />');
		},
		initCodeMsg(data, item) {
			if (data === 'ntnlCode') {
				item.ntnlCodeMsg = '';
			}
			if (data === 'stayCode') {
				item.stayCodeMsg = '';
			}
		},
		infoFnc(item) {
			this.infoPopData = item;
			this.infoDialog = true;
			let data = {
				creditInquireId: item.creditInquireId,
			};
			this.getCreditInquireHistoryList(data);
		},
		getList(data) {
			this.$store.dispatch('CreditCheckModule/getCreditInquireList', data);
			this.dynamicallyCreateMenuData();
		},
		async pagingAction(pagingData) {
			const data = this.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.SellStatusModule.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			await this.getList(data);
		},
		async crUpdateFnc(item, index, type) {
			if (!confirm('수정하시겠습니까?')) {
				return;
			}
			// obj -> json
			const json = JSON.stringify(item.creditInquireResult);
			// 확인버튼 fnc
			let data = {
				inquireBasicDto: {
					creditInquireId: item.creditInquireId,
					memoContents: item.memoContents,
					cusType: item.cusType,
					creditProcStatus: item.creditProcStatus,
					joinType: item.joinType,
					ctId: item.ctId,
					openingStoreId: item.openStoreId,
				},
				inquireRequestDto: {
					bizName: item.bizName,
					bizNum: item.bizNum,
					bizPhone: item.bizPhone,
					bizPhone1: item.bizPhone1,
					bizPhone2: item.bizPhone2,
					bizPhone3: item.bizPhone3,
					bizRegiNum1: item.bizRegiNum1,
					bizRegiNum2: item.bizRegiNum2,
					bizRegiNumConcat: item.bizRegiNumConcat,
					courtProctorName: item.courtProctorName,
					courtProctorPhone: item.courtProctorPhone,
					courtProctorPhone1: item.courtProctorPhone1,
					courtProctorPhone2: item.courtProctorPhone2,
					courtProctorPhone3: item.courtProctorPhone3,
					courtProctorRegiNum1: item.courtProctorRegiNum1,
					courtProctorRegiNum2: item.courtProctorRegiNum2,
					courtProctorRegiNumConcat: item.courtProctorRegiNumConcat,
					creditInquireId: item.creditInquireId,
					cusName: item.cusName,
					cusPhone: item.cusPhone,
					cusPhone1: item.cusPhone1,
					cusPhone2: item.cusPhone2,
					cusPhone3: item.cusPhone3,
					cusRegiNum1: item.cusRegiNum1,
					cusRegiNum2: item.cusRegiNum2,
					cusRegiNumConcat: item.cusRegiNumConcat,
					licenseAuthType: item.licenseAuthType,
					licenseExpiredDate: item.licenseExpiredDate,
					licenseIssueArea: item.licenseIssueArea,
					licenseIssueDate: item.licenseIssueDate,
					licenseNum1: item.licenseNum1,
					licenseNum2: item.licenseNum2,
					licenseNum3: item.licenseNum3,
					licenseNumConcat: item.licenseNumConcat,
					ntnlCode: item.ntnlCode,
					stayCode: item.stayCode,
					sentenceReq: item.sentenceReq,
				},
				inquireResponseDto: {
					creditInquireId: item.creditInquireId,
					sentenceRes: item.sentenceRes,
					creditInquireResult: json,
				},
			};
			let sentenceRequest = document.getElementById(`sentence${index}`);
			if (type === 'SENTENCE') {
				data.inquireRequestDto.sentenceReq = sentenceRequest.value;
			}
			if (item.creditReqType === 'ITEMS') {
				if (this.validationRuleFnc(item)) return;
			}
			const filter = this.filterData;
			filter.perPageCnt = this.pagingData.perPageCnt;
			filter.pageNo = this.pagingData.pageNo;
			await this.$store.dispatch('CreditCheckModule/updateCreditInquire', data);
			// 관리점 카드 list 조회
			if (this.storeVal === 'StoreGrade_M') {
				let cardData = {
					creditProcStatus: 'REQ',
					perPageCnt:
						this.cardPagingData.perPageCnt * this.cardPagingData.pageNo,
				};
				await this.$store.dispatch(
					'CreditCheckModule/getCreditInquireCardList',
					cardData,
				);
			}
			await this.setListData();
		},
		async updateStatus(index, prev, next) {
			console.log(index);
			console.log(prev);
			if (!confirm('수정하시겠습니까?')) {
				document.getElementById(`creditProcStatus${index}`).value = prev;
				return;
			}
			document.getElementById(`creditProcStatus${index}`).value = next;
			let item = this.getListData[index];
			item.creditProcStatus = next;
			let data = {
				inquireBasicDto: {
					creditInquireId: item.creditInquireId,
					creditProcStatus: item.creditProcStatus,
				},
			};
			const result = await this.$store.dispatch(
				'CreditCheckModule/updateCreditInquireStatus',
				data,
			);
			if (result) {
				//TODO filter 넣어서 get
				let data = this.filterData;
				console.log(this.filterData);
				data.pageNo = 1;
				data.perPageCnt = this.pagingData.perPageCnt;
				data.cusType = data.customerType;
				await this.getList(data);
				await this.getCreditInquireStatusCount(data);
				/* 상단 카드리스트 */
				if (
					this.storeVal === 'StoreGrade_M' &&
					(prev === 'REQ' || next === 'REQ')
				) {
					let cardData = {
						creditProcStatus: 'REQ',
						perPageCnt:
							this.cardPagingData.perPageCnt * this.cardPagingData.pageNo,
					};
					// 카드리스트 왼쪽으로 초기화
					await this.$store.dispatch(
						'CreditCheckModule/getCreditInquireCardList',
						cardData,
					);
					document.getElementById('scrollBox').scrollLeft = 0;
				}
			}
		},
		applRegiFnc(item) {
			item.creditInquireYn = 'Y';
			this.crData = item;
			this.$router.replace('/application-form-creation');
		},
		async crRestartFnc(item) {
			if (confirm('재진행하시겠습니까?')) {
				let data = {
					creditInquireId: item.creditInquireId,
				};
				await this.$store.dispatch(
					'CreditCheckModule/reRequestCreditInquire',
					data,
				);
				if (this.storeVal === 'StoreGrade_M') {
					await this.$store.dispatch(
						'CreditCheckModule/getCreditInquireCardList',
					);
					// 카드리스트 왼쪽으로 초기화
					document.getElementById('scrollBox').scrollLeft = 0;
				}
				await this.getList();
				/*if (!confirm('수정하시겠습니까?')) return;
				let data = {
					inquireBasicDto: {
						creditInquireId: item.creditInquireId,
						creditProcStatus: 'REQ',
					},
				};
				const result = await this.$store.dispatch(
					'CreditCheckModule/updateCreditInquireStatus',
					data,
				);
				console.log(result);
				if (result) {
					//TODO filter 넣어서 get
					await this.getList();
					/!* 상단 카드리스트 *!/
					await this.$store.dispatch(
						'CreditCheckModule/getCreditInquireCardList',
					);
				}*/
			}
		},
		async cancelCrFnc(item) {
			if (!confirm('취소하시겠습니까?')) return;
			let data = {
				inquireBasicDto: {
					creditInquireId: item.creditInquireId,
					creditProcStatus: 'CANCEL',
				},
			};
			await this.$store.dispatch(
				'CreditCheckModule/updateCreditInquireStatus',
				data,
			);
			this.filterData.pageNo = this.pagingData.pageNo;
			this.filterData.perPageCnt = this.pagingData.perPageCnt;
			await this.getList(this.filterData);
			await this.getCreditInquireStatusCount(this.filterData);
		},
		copyText(creditInquiries) {
			let copyText = document.getElementById(`copyInput3`);
			copyText.value = '';
			copyCreditResult(copyText, creditInquiries);
			copyText.select();
			document.execCommand('Copy');
			alert('복사하였습니다.');
		},
		getCreditInquireStatusCount(data) {
			this.$store.dispatch(
				'CreditCheckModule/getCreditInquireStatusCount',
				data,
			);
		},
		getCreditInquireHistoryList(data) {
			this.$store.dispatch(
				'CreditCheckModule/getCreditInquireHistoryList',
				data,
			);
		},
		dynamicallyCreateMenuData() {
			let count = this.pagingData.perPageCnt;
			let i = 0;
			while (i < count) {
				this.$set(this.menu1, i, false);
				this.$set(this.menu2, i, false);
				i++;
			}
		},

		validationRuleFnc(item) {
			if (this.crValidationFnc(item)) return true;
		},
		crValidationFnc(item) {
			console.log(item);
			const NEW = item.joinType === 'NEW'; // 신규가입
			const DVC_CHANGE = item.joinType === 'DVC_CHANGE'; // 기기변경
			const NUM_CHANGE = item.joinType === 'NUM_CHANGE'; // 번호이동
			const SKT = item.telecomName === 'SKT';
			const KT = item.telecomName === 'KT';
			const LG = item.telecomName === 'LG';
			const INDV = item.cusType === 'INDV';
			const MINORS = item.cusType === 'MINORS';
			const INDV_BSNM = item.cusType === 'INDV_BSNM';
			const CORP = item.cusType === 'CORP';
			const FOREIGN = item.cusType === 'FOREIGN';
			if (INDV) {
				if (
					!nullValidation2(item, [
						'cusName', // 고객명
						'cusRegiNum1', // 고객주민번호
						'cusRegiNum2', // 고객주민번호
					])
				) {
					return true;
				}
			}
			if (MINORS) {
				if (
					!nullValidation2(item, [
						'cusName', // 고객명
						'cusRegiNum1', // 고객주민번호
						'cusRegiNum2', // 고객주민번호
						'courtProctorName', // 법대이름
						'courtProctorPhone1', // 법대전화번호
						'courtProctorPhone2', // 법대전화번호
						'courtProctorPhone3', // 법대전화번호
						'courtProctorRegiNum1', // 법대주민번호
						'courtProctorRegiNum2', // 법대주민번호
					])
				) {
					return true;
				}
			}
			if (INDV_BSNM) {
				if (
					!nullValidation2(item, [
						'bizName', // 사업자명
						'bizNum', // 사업자번호
					])
				) {
					return true;
				}
			}
			if (CORP) {
				if (DVC_CHANGE) {
					if (
						!nullValidation2(item, [
							'bizName', // 사업자명
							'bizNum', // 사업자번호
						])
					) {
						return true;
					}
				}
				if (NEW || NUM_CHANGE) {
					if (
						!nullValidation2(item, [
							'bizName', // 사업자명
							'bizRegiNum1', // 법인번호
							'bizRegiNum2', // 법인번호
							'bizNum', // 사업자번호
						])
					) {
						return true;
					}
				}
			}
			if (FOREIGN) {
				if (DVC_CHANGE && SKT) {
					if (
						!nullValidation2(item, [
							'cusName', // 고객명
							'licenseNum1', // 외국인등록번호
							'licenseNum2', // 외국인등록번호
							'stayCode', // 체류코드
							'licenseExpiredDate', // 만료일자
						])
					) {
						return true;
					}
				}
				if ((DVC_CHANGE && KT) || (DVC_CHANGE && LG)) {
					if (
						!nullValidation2(item, [
							'cusName', // 고객명
							'licenseNum1', // 외국인등록번호
							'licenseNum2', // 외국인등록번호
							'licenseIssueDate', // 발급일자
							'ntnlCode', // 국적
						])
					) {
						return true;
					}
				}
				if (NEW || NUM_CHANGE) {
					if (
						!nullValidation2(item, [
							'cusName', // 고객명
							'licenseNum1', // 외국인등록번호
							'licenseNum2', // 외국인등록번호
							'licenseIssueDate', // 발급일자
							'ntnlCode', // 국적
						])
					) {
						return true;
					}
					if (SKT) {
						if (
							!nullValidation2(item, [
								'cusName', // 고객명
								'licenseNum1', // 외국인등록번호
								'licenseNum2', // 외국인등록번호
								'licenseIssueDate', // 발급일자
								'ntnlCode', // 국적
								'licenseExpiredDate', // 만료일자
								'stayCode', // 체류코드
							])
						) {
							return true;
						}
					}
				}
			}
		},
	},
	async created() {
		await this.getCreditInquireStatusCount();
		await this.getList();
		this.crData = [];
	},
};
</script>

<style scoped>
.itemRequestUl {
	font-size: 12px !important;
}
.itemRequestUl .dash {
	width: 6px;
	margin: 0;
	padding: 0;
	line-height: 32px;
}
.itemRequestLi {
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin: 2px 0;
}
.itemRequestLi span {
	display: flex;
	width: 38%;
	line-height: 32px;
	margin-left: 6px;
}
.itemRequestLi select {
	padding: 0 0 0 6px;
}
.itemRequestLi input {
	outline: none;
}
.itemRequestLi .itemRequestInput {
	padding: 0 0 0 6px;
	display: flex;
	overflow: hidden;
	background: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 3px;
	margin: 0 4px;
	width: 61%;
}

.itemRequestLi .regiNumInput {
	height: 32px;
	padding: 0 2px;
	display: inline;
}
.itemRequestLi .phoneNumInput {
	width: 44% !important;
	height: 32px;
	padding: 0 10px;
	display: inline;
}
.sentenceArea {
	outline: none;
	width: 95%;
	min-height: 190px;
	border: 1px solid #e0e0e0;
	margin: 2px 6px;
	text-align: center;
	overflow-y: auto;
	resize: none;
}
::-webkit-scrollbar {
	width: 8px;
	background: #e8e8e8;
}

::-webkit-scrollbar-thumb {
	width: 8px;
	background: #d2d2d2;
}
.flexParentCont1 > div {
	margin-left: 10px;
}
.flexParentCont1 > div:nth-child(3n + 1) {
	margin-left: 0;
}
.cr_memo4 {
	resize: none;
}
</style>
