<template>
	<div class="mt20">
		<div class="disFx">
			<div class="pagingSelectCont">
				<select
					class="pagingSelect"
					@change="selectPerPageCnt($event.target.value)"
				>
					<option value="20">20개씩</option>
					<option value="50">50개씩</option>
					<option value="100">100개씩</option>
				</select>
			</div>
			<div class="disFx ml30 lh26 cur_p">
				<div class="fakeLine5" @click="listFilterFnc">
					<span>전체 : </span>
					<span class="boldWt txUnL">{{}}</span>
				</div>
				<div class="fakeLine5 ml30 cur_p" @click="listFilterFnc">
					<span>완료 : </span>
					<span class="mainBlue2 boldWt txUnL">{{}}</span>
				</div>
				<div class="fakeLine5 ml30 cur_p" @click="listFilterFnc">
					<span>요청 : </span>
					<span class="mainMint1 boldWt txUnL">{{}}</span>
				</div>
				<div class="ml30 cur_p" @click="listFilterFnc">
					<span>오류 : </span>
					<span class="mainRed boldWt txUnL">{{}}</span>
				</div>
			</div>
		</div>

		<div class="newTableStyle mt10">
			<table class="w100P">
				<tr style="cursor: default">
					<th class="w50">번호</th>
					<th>
						<div class="lh30">요청내용</div>
					</th>
					<th class="pad0 w80">
						<div class="lh30">통신사</div>
						<div class="tableFlagLine2"></div>
						<div class="lh30">가입유형</div>
					</th>
					<th class="w130">영업점/등록자<br />등록일시</th>
					<th class="w80">개통점</th>
					<th class="w680">결과내용</th>
					<th class="w140">담당자<br />수정일시</th>
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
					<td class="w220">
						<template v-if="item.creditProcStatusMsg === '요청'">
							<div>
								<span class="disIn w70 txAnL">이름</span>
								<input
									type="text"
									class="w120 backColorWhite lh30 borderRadi3Px borderContColor3 padW10"
									v-model.trim="item.cusName"
								/>
							</div>
							<div class="mt5">
								<span class="disIn w70 txAnL">주민등록번호</span>
								<input
									type="text"
									class="w120 backColorWhite lh30 borderRadi3Px borderContColor3 padW10"
									v-model.trim="item.cusRegiNum1"
								/>
							</div>
							<div class="mt5">
								<span class="disIn w70 txAnL">휴대폰번호</span>
								<input
									type="text"
									class="w120 backColorWhite lh30 borderRadi3Px borderContColor3 padW10"
									v-model.trim="item.cusPhone"
								/>
							</div>
							<button
								class="backColorBlue3 borderRadi3Px mainWhite lh26 w60 mt5"
								@click="cusInfoFnc"
							>
								수정
							</button>
						</template>
						<template v-else>
							<span class="disBl">{{ item.cusName }}</span>
							<span class="disBl"
								>{{ item.cusRegiNum1 }}-{{ item.cusRegiNum2 }}</span
							>
							<span class="disBl">{{ item.cusPhone }}</span>
						</template>
					</td>
					<td class="pad0">
						<div class="lh96">{{ item.telecomName }}</div>
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
						<div
							style="display: inline-block"
							v-for="(value, key) in item.creditInquireResult"
							:key="value.id"
						>
							<span class="disIn txAnL w120">{{ key }}</span>
							<input
								type="text"
								class="borderContColor2 borderRadi3Px backColorWhite lh30 w120 padW10 ml10"
								v-model.trim="item.creditInquireResult[key]"
							/>
						</div>
						<div v-if="JSON.stringify(item.creditInquireResult) !== '{}'">
							<button
								class="borderContColor2 borderRadi3Px backColorWhite lh26 w60"
								@click="copyResult(item.creditInquireResult)"
							>
								복사하기
							</button>
							<textarea
								style="position: absolute; left: -9999px"
								id="resultInput1"
							></textarea>
						</div>
					</td>
					<td class="posR">
						<div>
							<span>{{ item.담당자 }}</span>
							<br />
							<span class="font-gray">{{ item.수정일시 }}</span>
						</div>
						<button
							class="backColorBlue3 borderRadi3Px mainWhite lh26 w60 mt10"
							@click="infoFnc(item)"
						>
							이력보기
						</button>
						<div class="change_his_mark1"></div>
					</td>
					<td class="w120">
						<div>
							<select
								class="w100 borderRadi3Px borderContColor2 backColorWhite lh26"
								v-model.trim="item.creditProcStatus"
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
									class="subFontS11 padW5 borderContColor3 borderRadi3Px lh20 ml5"
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

export default {
	name: 'CreditCheckSaleList',
	components: { CreditCheckInfoPop, paging },
	computed: {
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
	},
	methods: {
		getList(data) {
			this.$store.dispatch('CreditCheckModule/getCreditInquireList', data);
		},
		async pagingAction(pagingData) {
			const data = this.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			await this.getList(data);
			await this.excelBtnResetFnc();
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.SellStatusModule.filterData;
			data.perPageCnt = val;
			data.pageNo = 1;
			await this.getList(data);
		},
		infoFnc(item) {
			// 이력보기 버튼 fnc
			this.infoPopData = item;
			this.infoDialog = true;
		},
		async crRestartFnc(item) {
			if (!confirm('수정하시겠습니까?')) return;
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
				/* 상단 카드리스트 */
        let cardData = {
          creditProcStatus : 'REQ'
        }
        await this.$store.dispatch('CreditCheckModule/getCreditInquireCardList',cardData)
			}
		},
		applRegiFnc(item) {
			// 신청서 작성 fnc
			console.log(item);
		},
		cancelCrFnc(item) {
			// 신용조회 취소버튼 fnc
			console.log(item);
		},
		cusInfoFnc() {
			// 고객정보 수정버튼 fnc
			console.log();
		},
		listFilterFnc() {
			// 전체,완료등 구분값에 따른 리스트 필터 fnc
			console.log();
		},
	},
	async created() {
		await this.getList();
	},
};
</script>

<style scoped></style>
