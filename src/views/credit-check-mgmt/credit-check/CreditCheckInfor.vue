<template>
	<div class="disFx mb20 mt50 posR">
		<button class="templateUpBtn1" @click="templateFnc">템플릿편집</button>
		<div class="cr_input_zone1 posR" style="min-height: 620px">
			<button
				class="cr_btn_style1"
				style="
					position: absolute;
					top: -40px;
					background-color: #007ef2;
					border-radius: 3px;
					color: #fff;
					font-weight: bold;
					line-height: 30px;
					padding: 0 15px;
				"
				@click="openReqFnc"
			>
				신규요청폼생성
			</button>
			<CreditRequestCard
				v-if="selectedCard !== null"
				:formData="formData"
			></CreditRequestCard>
			<div class="h100P" v-else>
				<div class="h100P noneCard" v-if="!openingRequestDialog">
					<div>
						<div class="noneCardImg" style="margin: 0 auto"></div>
						<div class="mt20">선택된 카드가 없습니다.</div>
					</div>
				</div>
				<div class="noneCard" v-if="openingRequestDialog">
					<CreditOpenRequestCard
						v-if="openingRequestDialog"
					></CreditOpenRequestCard>
				</div>
			</div>
		</div>

		<div class="cr_guide_box1 w140 backColorBlue2 ml20 mainWhite boldWt">
			<ul class="subFontS11" style="margin-top: 93px">
				<CreditCardLeftHeader
					:selectedTelecom="selectedTelecom"
					:creditReqType="creditReqType"
					:selectedCusType="selectedCusType"
					:leftHeaderActive="leftHeaderActive"
					:cardListData="cardListData"
				></CreditCardLeftHeader>
			</ul>
		</div>
		<div
			id="scrollBox"
			class="disFx cr_card_cont1 ml5"
			style="
				overflow-x: scroll;
				width: 1020px;
				max-width: 1020px;
				position: relative;
			"
			@wheel="handleScroll"
		>
			<div
				class="cr_input_zone2 ml5 mb10 posR"
				v-for="(item, index) in cardListData"
				:key="index"
				:data-cusType="item.cusType"
				:data-creditReqType="item.creditReqType"
				:data-telecomName="item.telecomName"
				@click="
					clickCardFnc(
						index,
						item.cusType,
						item.creditReqType,
						item.telecomName,
					)
				"
				:class="{ activeCard: index === selectedCard }"
				style="padding-bottom: 69px"
			>
				<div
					class="disFx lh40 activeCardBox1 padW10 backColorBlue4 borderRadi5PxTop mainBlue2 justify-lg-space-between borderBottomColor2"
				>
					<div>
						<h2 class="font-size-12">
							({{ index + 1 }}/{{ cardPagingData.totalCnt }})
							{{ item.storeName }} / {{ item.regiUserName }}
						</h2>
					</div>
				</div>

				<div
					class="cr_top_select2 activeCardBox2 disFx justify-center"
					style="width: 289px"
				>
					<span class="font-size-12 fakeLine7">{{ item.openStoreName }}</span>
					<span class="font-size-12 ml20 fakeLine7">{{
						item.joinTypeMsg
					}}</span>
					<span class="font-size-12 ml20">{{ item.cusTypeMsg }}</span>
				</div>
				<div class="disFx">
					<ul class="cr_card_cont2 w100P">
						<!--		요청폼				-->
						<CreditCardList :item="item"></CreditCardList>
						<!--   응답폼       -->
						<li
							v-for="(value, key) in item.creditInquireResult"
							:key="value.id"
						>
							<input
								type="text"
								class="font-size-12"
								v-model.trim="item.creditInquireResult[key]"
							/>
						</li>
					</ul>
				</div>
				<textarea
					class="cr_memo2 outLineNone pad10 font-size-12"
					placeholder="메모를 입력해 주세요."
					v-model.trim="item.memoContents"
				></textarea>
				<div
					class="cr_bottom_cont1 disFx justify-lg-space-between font-size-12"
					style="
						position: absolute;
						bottom: 0;
						width: 100%;
						margin-top: 80px !important;
					"
				>
					<!-- 카드 요청시 상태값 변경 콜 확인버튼에서 실행  -->
					<!--					@change="
								creditProcStatusFnc(
									item,
									index,
									item.creditProcStatus,
									$event.target.value,
								)
							"-->
					<div class="disFx">
						<select
							:id="`creditProcStatus${index}`"
							class="w80 borderContColor3 borderRadi3Px"
							v-model.trim="item.creditProcStatus"
						>
							<option value="REQ">요청</option>
							<option value="PROC">진행중</option>
							<option value="COMPL">완료</option>
							<option value="ERR">오류</option>
							<option value="CANCEL">취소</option>
						</select>
					</div>
					<div class="cr_bottom_btn1">
						<button
							class="lh36 w60 borderRadi3Px borderContColor2 boldWt"
							@click="copyText(item)"
						>
							복사하기
						</button>
						<textarea
							style="position: absolute; left: -9999px"
							id="copyInput1"
						></textarea>
						<button
							@click="crUpdateFnc(item)"
							class="lh36 w60 backColorGray2 mainWhite borderRadi3Px boldWt ml5"
						>
							확인
						</button>
					</div>
				</div>
			</div>
			<!--      <CreditCardTemp></CreditCardTemp>-->
			<!--      <CreditCardTemp></CreditCardTemp>-->
			<template v-if="this.cardListData.length === 0">
				<div class="cr_input_zone1">
					<div class="h100P">
						<div class="h100P noneCard">
							<div>
								<div class="noneCardImg" style="margin: 0 auto"></div>
								<div class="mt20">요청 카드가 없습니다.</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<!--   뭔지 파악필요     -->
				<div style="margin-left: 728px"></div>
			</template>
		</div>

		<template-edit-pop v-if="templateDialog"></template-edit-pop>
	</div>
</template>

<script>
import TemplateEditPop from '../../credit-check-mgmt/credit-check/popup/TemplateEditPop.vue';
import CreditCardLeftHeader from './credit-card/CreditCardLeftHeader';
import CreditCardList from './credit-card/CreditCardList';
import CreditRequestCard from './credit-card/CreditRequestCard';
import CreditCardTemp from './credit-card/CreditCardTemp';
import CreditOpenRequestCard from './credit-card/CreditOpenRequestCard.vue';
import {
	copyCreditResult,
	copyInfoByCusType,
} from '../../../common/copyApplication';

let timeout;
export default {
	name: 'CreditCheckInfor',
	components: {
		CreditCardTemp,
		CreditRequestCard,
		CreditCardList,
		CreditCardLeftHeader,
		TemplateEditPop,
		CreditOpenRequestCard,
	},
	data() {
		return {
			leftHeaderActive: 0,
			selectedCusType: '',
			creditReqType: '',
			selectedTelecom: '',
		};
	},
	computed: {
		openingRequestDialog: {
			get() {
				return this.$store.state.CreditCheckModule.openingRequestDialog;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.openingRequestDialog = newValue;
			},
		},
		templateDialog: {
			get() {
				return this.$store.state.CreditCheckModule.templateDialog;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.templateDialog = newValue;
			},
		},
		formData: {
			get() {
				return this.$store.state.CreditCheckModule.formData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.formData = newValue;
			},
		},
		cardListData: {
			get() {
				return this.$store.state.CreditCheckModule.cardListData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.cardListData = newValue;
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
		cardPagingData: {
			get() {
				return this.$store.state.CreditCheckModule.cardPagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.cardPagingData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.CreditCheckModule.codeList;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.codeList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.CreditCheckModule.filterData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.filterData = newValue;
			},
		},
		selectedCard: {
			get() {
				return this.$store.state.CreditCheckModule.selectedCard;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.selectedCard = newValue;
			},
		},
	},
	methods: {
		openReqFnc() {
			this.selectedCard = null;
			this.openingRequestDialog = true;
		},
		getList(data) {
			this.$store.dispatch('CreditCheckModule/getCreditInquireList', data);
		},
		async creditProcStatusFnc(item, index, prev, next) {
			if (!confirm('수정하시겠습니까?')) {
				document.getElementById(`creditProcStatus${index}`).value = prev;
				return;
			}
			document.getElementById(`creditProcStatus${index}`).value = next;
			let data = {
				inquireBasicDto: {
					creditInquireId: item.creditInquireId,
					creditProcStatus: item.creditProcStatus,
				},
			};
			await this.$store.dispatch(
				'CreditCheckModule/updateCreditInquireStatus',
				data,
			);

			let filter = this.filterData;
			filter.pageNo = 1;
			filter.perPageCnt = this.pagingData.perPageCnt;
			filter.cusType = filter.customerType;
			await this.getList(filter);
			/* 상단 카드리스트 */
			let cardData = {
				creditProcStatus: 'REQ',
				perPageCnt: this.cardPagingData.perPageCnt * this.cardPagingData.pageNo,
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				cardData,
			);
			this.selectedCard = null;
		},
		getCreditTemplateList() {
			// 템플릿 리스트 조회
			let data = {
				storeId: this.formData.storeId,
				joinType: this.formData.joinType,
			};
			this.$store.dispatch('CreditCheckModule/getCreditTemplateList', data);
		},
		templateFnc() {
			// 템플릿편집버튼 fnc
			this.templateDialog = true;
		},
		async crUpdateFnc(item) {
			if (!confirm('수정하시겠습니까?')) return;
			// obj -> json
			const json = JSON.stringify(item.creditInquireResult);
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
					bizRegiNumConcat: item.joinType,
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
					sentenceReq: item.sentenceReq,
					stayCode: item.stayCode,
				},
				inquireResponseDto: {
					creditInquireId: item.creditInquireId,
					sentenceRes: item.sentenceRes,
					creditInquireResult: json,
				},
			};
			let filter = this.filterData;
			filter.pageNo = 1;
			filter.perPageCnt = this.pagingData.perPageCnt;
			filter.cusType = filter.customerType;
			await this.$store.dispatch('CreditCheckModule/updateCreditInquire', data);
			let cardData = {
				creditProcStatus: 'REQ',
				perPageCnt: this.cardPagingData.perPageCnt * this.cardPagingData.pageNo,
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				cardData,
			);
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireList',
				filter,
			);
		},
		removeFnc(item) {
			// 삭제버튼 fnc
		},
		resetFormData() {
			for (let data in this.formData) {
				this.formData[data] = '';
			}
		},
		clickCardFnc(index, cusType, creditReqType, telecomName) {
			// 엘리먼트 width 값
			let eleWidth = 298;
			// 카드 클릭시 active
			document
				.getElementById('scrollBox')
				.scrollTo({ left: eleWidth * index, behavior: 'smooth' });
			this.selectedTelecom = telecomName;
			this.creditReqType = creditReqType;
			this.selectedCard = index;
			this.leftHeaderActive = index;
			this.selectedCusType = cusType;
			this.formData = this.cardListData[index];
		},
		handleScroll(e) {
			// 리스트데이터가 있을시에만
			if (this.cardListData.length < 1) return;
			// 스크롤 영역 외 의 이벤트 방지
			e.preventDefault();
			// 스크롤 동작중 중복 이벤트 방지
			clearTimeout(timeout);
			let vm = this;
			timeout = setTimeout(function () {
				// 엘리먼트 width 값
				let eleWidth = 298;
				// scrollLeft 값
				let scrollLeftNumber;
				// e.deltaY === 100 : up
				// e.deltaY === -100 : down
				if (e.deltaY > 0) {
					scrollLeftNumber =
						document.getElementById('scrollBox').scrollLeft + eleWidth;
				} else {
					scrollLeftNumber =
						document.getElementById('scrollBox').scrollLeft - eleWidth;
				}
				// 스크롤 영역의 스크롤 left 의 수치를 갖고옴
				// (엘리먼트 상위에 부모(relative)가 있어야 정확한 값을 가져올수있음)
				// 인덱스 추출
				let stNumber =
					Math.floor(scrollLeftNumber / eleWidth) === -1
						? 0
						: Math.floor(scrollLeftNumber / eleWidth);
				let cusTypeValue = document
					.getElementById('scrollBox')
					.childNodes[stNumber].getAttribute('data-cusType');
				let creditReqTypeValue = document
					.getElementById('scrollBox')
					.childNodes[stNumber].getAttribute('data-creditReqType');
				let creditReqTelecomValue = document
					.getElementById('scrollBox')
					.childNodes[stNumber].getAttribute('data-telecomName');
				// selected index
				vm.leftHeaderActive = stNumber;
				// selected cusType
				vm.selectedCusType = cusTypeValue;
				vm.creditReqType = creditReqTypeValue;
				vm.selectedTelecom = creditReqTelecomValue;
				// 스크롤 페이징
				let pagingCheck = true;
				// cusTypeValue 가 없을시
				if (!cusTypeValue) {
					pagingCheck = false;
					vm.getAddCardList();
					// 이전 카드 인덱스 넣기
					vm.selectedCusType = document
						.getElementById('scrollBox')
						.childNodes[stNumber - 1].getAttribute('data-cusType');
					vm.creditReqType = document
						.getElementById('scrollBox')
						.childNodes[stNumber - 1].getAttribute('data-creditReqType');
					vm.leftHeaderActive = stNumber - 1;
					vm.selectedTelecom = document
						.getElementById('scrollBox')
						.childNodes[stNumber - 1].getAttribute('data-telecomName');
					vm.leftHeaderActive = stNumber - 1;
				}
				// behavior: 'smooth' : 에니메이션 추가
				// 계산된 scrollLeftNumber 만큼 스크롤이동
				if (pagingCheck) {
					document
						.getElementById('scrollBox')
						.scrollTo({ left: scrollLeftNumber, behavior: 'smooth' });
				}
			}, 50);
		},
		insertList() {},
		async getCardList() {
			// 요청 상태인 카드데이터만 select
			let cardData = {
				creditProcStatus: 'REQ',
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				cardData,
			);
		},
		async getAddCardList() {
			if (
				parseInt(
					this.cardPagingData.totalCnt -
						this.cardPagingData.perPageCnt * this.cardPagingData.pageNo,
				) < 1
			)
				return;
			// 요청 상태인 카드데이터만 select
			const reqData = {
				creditProcStatus: 'REQ',
				pageNo: this.cardPagingData.pageNo + 1,
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireAddCardList',
				reqData,
			);
		},
		copyText(item) {
			let copyText = document.getElementById('copyInput1');
			copyText.value = '';
			copyInfoByCusType(copyText, item);
			copyCreditResult(copyText, item.creditInquireResult);
			copyText.value =
				copyText.value +
				`메모: ${item.memoContents !== null ? item.memoContents : ''}`;
			copyText.select();
			document.execCommand('Copy');
			alert('복사하였습니다.');
		},
	},
	async created() {
		await this.resetFormData();
		/*await this.getOpeningStoreList();
		await this.commonCodeEnumList();*/
		/*await this.getCreditTemplateList();*/
		await this.getCardList();
		if (this.cardListData.length === 0) {
			this.selectedCusType = 'NULL';
		} else {
			this.selectedCusType = this.cardListData[0].cusType;
			this.creditReqType = this.cardListData[0].creditReqType;
			this.selectedTelecom = this.cardListData[0].telecomName;
		}
	},
};
</script>
<style scoped>
.activeCard {
	border: 2px solid #00964e;
}
.activeCard .activeCardBox1 {
	color: #008243 !important;
	background-color: #e7f6ec !important;
	border-bottom: 1px solid #00964e;
}
.activeCard .closeBtn2 {
}
.activeCard .activeCardBox2 {
	border-bottom: 2px solid #00964e;
}
.noneCard {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #007ef2;
	font-weight: bold;
}
.noneCard .noneCardImg {
	background-image: url('../../../assets/img/warn_icon01.png');
	display: block;
	width: 40px;
	height: 40px;
}
.cr_btn_style1 {
	position: absolute;
	top: -36px;
}
</style>
