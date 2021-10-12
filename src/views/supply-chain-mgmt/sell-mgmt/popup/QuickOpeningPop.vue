<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				:persistent="modifyState"
				v-model.trim="dialog"
				width="1700"
				style="overflow-x: hidden; background: #f6f6f6"
			>
				<v-card class="borderRadiReset" style="box-shadow: none">
					<transition name="overlay">
						<div
							@click="hamburgerOpen = !hamburgerOpen"
							:class="{ shade: hamburgerOpen }"
						></div>
					</transition>

					<v-card-title
						style="position: sticky; width: 100%; z-index: 10; top: 0"
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">빠른개통</h2>
						<span class="closeBtn1 cur_p" @click="closeDialog"></span>
					</v-card-title>
					<v-card-text
						class="disFX"
						style="
							background: #f6f6f6;
							padding: 0 !important;
							position: relative;
						"
					>
						<div
							class="leftCont1 posRe"
							style="background: #fff; padding-top: 16px"
						>
							<div class="pdLR30">
								<!-- 업무진행상태 -->
								<work-status
									style="width: 650px; left: 30px; top: 14px"
									:optionList="optionList"
									:formData="formData"
									@changeWorkStatusFnc="changeWorkStatusFnc"
								></work-status>
								<quick-opening-form
									:quickOpeningApplId="quickOpeningApplId"
								></quick-opening-form>
							</div>
							<div class="infoDialogCont lowBtn" style="padding-top: 8px">
								<div v-if="!modifyState">
									<v-btn
										class="blueBtn"
										v-if="copyApplicationStore(formData.basic.openingStoreId)"
										@click="copyApplication(formData.basic.openingStoreId)"
										>개통요청 복사</v-btn
									>
									<!-- 복사용 textarea       -->
									<textarea
										style="position: absolute; left: -9999px"
										id="copyInput"
									></textarea>
									<v-btn class="blueBtn" @click="openBlackListPop()"
										>블랙리스트 등록</v-btn
									>
									<v-btn @click="changeModifyState">수정</v-btn>
									<v-btn class="grayBtn" @click="closeDialog">닫기</v-btn>
								</div>

								<div v-if="modifyState">
									<v-btn @click="updateFormDataFnc">저장</v-btn>
									<v-btn class="grayBtn" @click="returnData">취소</v-btn>
								</div>
							</div>
						</div>
						<memo-board
							class="hide"
							style="padding-top: 10px"
							:quickOpeningApplId="quickOpeningApplId"
							quickOpen
						></memo-board>
						<!-- 슬라이드 메뉴-->
						<i
							v-if="!hamburgerOpen"
							class="fa fa-chevron-left slide arrowBtn"
							aria-hidden="true"
							@click="toggleBtn"
						></i>
						<transition name="fade">
							<div
								class="slide"
								v-if="hamburgerOpen"
								style="
									position: fixed;
									right: 40px;
									width: 340px;
									padding-left: 10px;
									height: 85%;
									background: #fff;
									border-left: 1px solid #989898;
									z-index: 3;
									box-shadow: -12px 0px 16px 2px rgba(0, 0, 0, 0.2);
									-webkit-box-shadow: -12px 0px 16px 2px rgba(0, 0, 0, 0.2);
									-moz-box-shadow: -12px 0px 16px 2px rgba(0, 0, 0, 0.2);
								"
							>
								<memo-board
									class="slide"
									:class="{ toggleMemo: hamburgerOpen }"
									:quickOpeningApplId="quickOpeningApplId"
									quickOpen
								></memo-board></div
						></transition>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
		<black-list-pop
			v-if="blackListPop"
			@closeDialog="closeDialogFnc"
			:addBlackListInfo="addBlackListInfo"
		></black-list-pop>
	</div>
</template>

<script>
import QuickOpeningForm from './QuickOpeningPop/QuickOpeningForm';
import memoBoard from '../../../../components/memoBoard.vue';
import {
  alertFor,
  confirmFor,
  copyObj,
  getTime,
  getToday,
  htmlParse,
  nullValidation2,
  setNewDataFnc,
} from '../../../../common/common';
import BlackListPop from '../../black-list/popup/BlackListPop';
import WorkStatus from '@/views/supply-chain-mgmt/sell-mgmt/popup/QuickOpeningPop/WorkStatus';
import {KTCB, KTJS, KTMN} from '../../../../common/copyApplication';

export default {
	props: {
		quickOpeningApplId: {
			type: Number,
		},
	},
	name: 'QuickOpeningPop',
	components: {
		WorkStatus,
		QuickOpeningForm,
		memoBoard,
		BlackListPop,
	},
	data: () => ({
		hamburgerOpen: false,
		copiedFormData: {},
		blackListPop: false,
		addBlackListInfo: {},
		validCustomer1: [],
		validCustomer2: [],
		validJoin: [],
		validJoin1: [],
		modifiedYn: false,
		fromQuickOpening: false,
		copiedAddService: [],
	}),
	watch: {
		blackListPop: {
			deep: true,
			handler: function () {
				this.getBlackDetailListFnc();
			},
		},
	},
	computed: {
		beforeAdmin() {
			return this.quickOpeningApplId <= 28177;
		},
		addServiceFormData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.addServiceFormData;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.addServiceFormData = newValue;
			},
		},
		formData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.formData;
			},
			set(newValue) {
				return (this.$store.state.QuickOpeningPopModule.formData = newValue);
			},
		},
		fileData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.fileData;
			},
			set(newValue) {
				return (this.$store.state.QuickOpeningPopModule.fileData = newValue);
			},
		},
		openStoreObject: {
			get() {
				return this.$store.state.QuickOpeningPopModule.openStoreObject;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.openStoreObject = newValue;
			},
		},
		propsFileList: {
			get() {
				return this.$store.state.QuickOpeningPopModule.propsFileList;
			},
			set(newValue) {
				return (this.$store.state.QuickOpeningPopModule.propsFileList = newValue);
			},
		},
		optionList: {
			get() {
				return this.$store.state.QuickOpeningPopModule.optionList;
			},
			set(newValue) {
				return (this.$store.state.QuickOpeningPopModule.optionList = newValue);
			},
		},
		modifyState: {
			get() {
				return this.$store.state.QuickOpeningPopModule.modifyState;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.modifyState = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.SellStatusModule.quickOpeningDialog;
			},
			set(newValue) {
				return (this.$store.state.SellStatusModule.quickOpeningDialog = newValue);
			},
		},
    blackList: {
      get() {
        return this.$store.state.QuickOpeningPopModule.blackList;
      },
      set(newValue) {
        this.$store.state.QuickOpeningPopModule.blackList = newValue;
      },
    },
		cancelQuick: {
			get() {
				return this.$store.state.SellStatusModule.cancelQuick;
			},
			set(newValue) {
				return (this.$store.state.SellStatusModule.cancelQuick = newValue);
			},
		},
	},
	methods: {
		toggleBtn() {
			this.hamburgerOpen = !this.hamburgerOpen;
		},
		setNewData(key, value) {
			this.formData = setNewDataFnc(this.formData, key, value);
		},
		setOpenStoreObject() {
			this.openStoreObject.openingStoreId = this.formData.basic.openingStoreId;
			this.openStoreObject.openingTelecomCodeId = this.formData.join.openingTelecomCodeId;
		},
		closeDialog() {
			if (this.modifyState) {
				if (confirmFor('return')) {
					this.fileData = [];
					this.copiedFormData = {};
					this.tglModifyState();
				} else {
					return;
				}
			}
			if (this.modifiedYn) {
				this.$emit('getList');
			}
			this.dialog = !this.dialog;
		},
		tglModifyState() {
			this.modifyState = !this.modifyState;
		},
		initCheckbox() {
			if (this.formData.basic.openingPriorityTargetYn == null) {
				this.formData.basic.openingPriorityTargetYn = 'N';
			}
		},
		changeModifyState() {
			this.initCheckbox();
			this.copyFormData();
			this.tglModifyState();
			this.cancelQuick = false;
		},
		async getCodeList() {
			let data = {
				code: ['existelecom', 'COURIER'],
			};
			await this.$store.dispatch(
				'QuickOpeningPopModule/getCommonCodeList',
				data,
			);
			const newEnum = {
				initEnumData: [
					'CustomerType',
					'JoinType',
					'ChargeReductType',
					'BillType',
					'UsimPaymentType',
					'AgreementPeriodType',
					'InstallmentsPeriodType',
					'ConsultTaskStatus',
					'OpeningTaskStatus',
					'LogisticsTaskStatus',
					//todo : 기존통신사 어떤 api로 불러올건지 확인해보기
					'AgreementType',
					'DeliveryType',
					'NumChangeAuthType',
				],
			};
			await this.$store.dispatch(
				'QuickOpeningPopModule/getNewEnumList',
				newEnum,
			);
		},
		async getFormData() {
			let data = { applId: this.quickOpeningApplId };
			await this.$store.dispatch('QuickOpeningPopModule/getFormData', data);
			this.copiedAddService = [...this.formData.join.addServiceList];
		},
		async getHistoryListFnc() {
			let data = {
				applId: this.quickOpeningApplId,
			};
			await this.$store.dispatch('TaskHistoryModule/getHistoryList', data);
		},
		async getSelectList(noAlert) {
			await this.$store.dispatch(
				'QuickOpeningPopModule/getSelectList',
				noAlert,
			);
		},
		// 취소 눌렀을 경우
		async returnData() {
			if (confirmFor('return')) {
				this.fileData = [];
				await this.getFormData();
				await this.getSelectList('noAlert');
				this.tglModifyState();
				this.copiedFormData = {};
				this.cancelQuick = true;
			}
		},
		// validation
		validateFormData() {
			if (this.formData.basic.beforeReserveYn === 'Y') {
				if (
					!nullValidation2(this.formData.basic, [
						'reserveNum', //사전예약번호
					])
				) {
					return;
				}
			}
			if (
				!nullValidation2(this.formData.basic, [
					'openingStoreId', //영업점
					'saleStoreId', //개통점
				])
			) {
				return;
			}
			if (this.formData.customer.cusType === 'MINORS') {
				this.validCustomer1 = [
					'courtProctorName', //법정대리인 성명
					'courtProctorRegiNum1', //법정대리인 주민등록번호1
					// 'courtProctorRegiNum2', //법정대리인 주민등록번호2
					'courtProctorPhone1', //법정대리인 연락처1
					'courtProctorPhone2', //법정대리인 연락처2
					'courtProctorPhone3', //법정대리인 연락처4
					'courtProctorRelation', //관계
					'cusName', //고객명
					'cusRegiNum1', //주민등록번호1
					'cusRegiNum2', //주민등록번호2
				];
			} else if (this.formData.customer.cusType === 'CORP') {
				this.validCustomer1 = [
					'bizName', //법인
					'bizNum1', //사업자번호1
					'bizNum2', //사업자번호1
					'bizNum3', //사업자번호1
					'bizRegiNum1', //법인등록번호
					'bizRegiNum2', //법인등록번호
					'cusName', //고객명
					'cusRegiNum1', //주민등록번호1
				];
			} else if (this.formData.customer.cusType === 'FOREIGN') {
				this.validCustomer1 = [
					'cusName', //고객명
					'licenseNum1', //주민등록번호1
					// 'licenseNum2', //주민등록번호2
				];
			} else {
				this.validCustomer1 = [
					'cusName', //고객명
					'cusRegiNum1', //주민등록번호1
					// 'cusRegiNum2', //주민등록번호2
				];
				// if (
				// 	!regiNumCheck(
				// 		this.formData.customer.cusRegiNum1,
				// 		this.formData.customer.cusRegiNum2,
				// 	)
				// ) {
				// 	alert('주민등록번호를 확인해주세요.');
				// 	return;
				// }
			}
			this.validCustomer2 = [
				'cusPhone1', //휴대폰번호1
				'cusPhone2', //휴대폰번호2
				'cusPhone3', //휴대폰번호3
				'cusType', //고객유형
				'chargeReductType', //요금감면
			];
			let cusJoinData = {
				...this.formData.customer,
				...this.formData.join,
			};
			if (!nullValidation2(cusJoinData, this.validCustomer1)) {
				return;
			}
			if (!nullValidation2(cusJoinData, this.validCustomer2)) {
				return;
			}
			if (this.beforeAdmin) {
				this.validJoin = [
					// 'joinType', //가입유형
					// 'existTelecomCodeId', //기존통신사
					'goodsId', //기기
					// 'capacity', //용량
					// 'color', //색상
				];
			}
			if (!this.beforeAdmin) {
				this.validJoin = [
					// 'joinType', //가입유형
					// 'existTelecomCodeId', //기존통신사
					'goodsId', //기기
					'capacity', //용량
					'color', //색상
				];
			}
			if (this.formData.join.joinType !== 'NEW') {
				this.validJoin.splice(
					0,
					0,
					'openingPhone1',
					'openingPhone2',
					'openingPhone3',
				);

				if (this.formData.join.joinType === 'NUM_CHANGE') {
					if (this.formData.join.numChangeAuthType === 'GIRO') {
						this.validJoin.splice(3, 0, 'numChangeAuthType');
					} else {
						this.validJoin.splice(
							3,
							0,
							'numChangeAuthType',
							'numChangeAuthTypeNum',
						);
					}
				}
			} else {
				this.validJoin.splice(0, 0, 'openingHopeNum');
			}
			this.validJoin1 = [
				'agreementType', //약정유형
				'agreementPeriodType', //약정기간
				'instlPeriodType', //할부기간
				'chargeId', //요금제
			];
			if (!nullValidation2(this.formData.join, this.validJoin)) {
				return;
			}
			if (this.formData.basic.beforeOpeningType === 'BEFORE_OPENING') {
				if (!nullValidation2(this.formData.join, this.validJoin1)) {
					return;
				}
			}

			if (!this.beforeAdmin) {
				if (!nullValidation2(this.formData.join, ['releaseAmt'])) {
					return;
				}
			}
			if (this.formData.join.deliveryType === 'PS') {
				!nullValidation2(this.formData.delivery, [
					'courierCodeId',
					'invoiceNum',
				]);
			}
			if (this.$store.state.QuickOpeningPopModule.deviceChange) {
				alert('변경된 기기일련번호 저장을 해주세요.');
				return;
			}
			if (this.$store.state.QuickOpeningPopModule.usimChange) {
				alert('변경된 유심일련번호 저장을 해주세요.');
				return;
			}

			if (
				(this.formData.delivery.deliveryType === 'PS' ||
					this.formData.delivery.deliveryType === 'PS_SALES') &&
				this.formData.delivery.invoiceNum &&
				!this.formData.delivery.courierCodeId
			) {
				alert('택배사를 선택해주세요.');
				return;
			}
			return true;
		},
		// 저장 btn fnc
		async updateFormDataFnc() {
			if (this.addServiceFormData.length > 0) {
				for (let i = 0; i < this.addServiceFormData.length; i++) {
					this.addServiceFormData[i][0].addSvcId = null;
					this.formData.join.addServiceList.push(this.addServiceFormData[i][0]);
				}
			}
			if (this.validateFormData()) {
				if (confirmFor('save')) {
					// 신청서 수정 일련번호 없을시 매칭타입 null 추가
					if (!this.formData.join.deviceRawBarcode) {
						this.formData.join.deviceMatchingType = null;
					}
					if (!this.formData.join.usimRawBarcode) {
						this.formData.join.usimMatchingType = null;
					}
					// 상태값 개통완료 철회완료시 날짜 삽입
					await this.openingTaskDateFnc(this.formData.basic.openingTaskStatus);
					// update api 날리기
					const result = await this.$store.dispatch(
						'QuickOpeningPopModule/updateFormData',
						this.formData,
					);
					if (this.fileData.length !== 0) {
						try {
							await this.fileUploadFnc(
								this.quickOpeningApplId,
								result.data.data,
							);
						} catch (e) {
							console.log(e);
						}
					}
					if (result) {
						alertFor('successToSave');
						this.tglModifyState();
						this.modifiedYn = true;
						this.copiedFormData = {};
						await this.getFormData();
						await this.getHistoryListFnc();
					}
				} else {
					return true;
				}
			}
		},
		copyFormData() {
			this.copiedFormData = copyObj(this.formData);
		},
		openBlackListPop() {
			// const birthDate = this.getBirthData(
			// 	this.formData.customer.cusRegiNum1,
			// 	this.formData.customer.cusRegiNum2,
			// );
			const formData = {
				blackName: this.formData.customer.cusName,
				blackDateBirth: '',
				blackZipCode: this.formData.customer.cusZipCode,
				blackAddr: this.formData.customer.cusAddr,
				blackAddrDetail: this.formData.customer.cusAddrDetail,
				blackPhone1: this.formData.customer.cusPhone1,
				blackPhone2: this.formData.customer.cusPhone2,
				blackPhone3: this.formData.customer.cusPhone3,
			};
			this.fromQuickOpening = true;
			this.addBlackListInfo = formData;
			this.blackListPop = !this.blackListPop;
		},
		// 블랙리스트등록시 넘겨줄 데이터 생년월일
		getBirthData(cusRegiNum1, cusRegiNum2) {
			let n1 = Number(cusRegiNum1.substring(0, 2));
			let n2 = Number(cusRegiNum2.substring(0, 1));
			let year;
			if (n2 === 1 || n2 === 2 || n2 === 5 || n2 === 6) {
				//뒤 첫째값이 1, 2, 5, 6일 경우(1900년대에 출생한 남녀)
				year = 1900 + n1;
			}
			if (n2 === 3 || n2 === 4 || n2 === 7 || n2 === 8) {
				//뒤 첫째값이 3, 4, 7, 8일 경우(2000년대에 출생한 남녀)
				year = 2000 + n1;
			}
			let month = cusRegiNum1.substring(2, 4);
			let day = cusRegiNum1.substring(4);
			return `${String(year)}-${month}-${day}`;
		},
		closeDialogFnc(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		async fileUploadFnc(applId, taskMemoId) {
			let fileHtml = []; // 파일 이력
			let formData = new FormData();
			formData.append('applId', applId);
			for (let i = 0; i < this.fileData.length; i++) {
				let fileObj = {
					title: '첨부파일',
					// @ts-ignore
					data: this.fileData[i].name,
					changeData: '추가',
				};
				formData.append('attachFile', this.fileData[i]);
				fileHtml.push(fileObj);
			}
			// 파일 이력
			let fileHtmlString = htmlParse(fileHtml);
			formData.append('memoContents', fileHtmlString);
			if (taskMemoId !== null) {
				formData.append('taskMemoId', taskMemoId);
			} else {
				formData.append('taskMemoId', null);
			}
			await this.$store.dispatch('QuickOpeningPopModule/fileUpload', formData);
		},
		copyApplicationStore(storeId) {
			// 대마 인 경우에만
			if (this.$store.state.st !== '3b14c9d61a1ce5782698616844edc9ee') {
				return false;
			}
			if (storeId === 15 || storeId === 20 || storeId === 21) {
				// KT-MN
				return true;
			}
			return false;
		},
		copyApplication(storeId) {
			var copyText = document.getElementById('copyInput');
			copyText.value = '';
			if (storeId === 20) {
				copyText.value = KTJS(this.formData);
			} else if (storeId === 15) {
				copyText.value = KTMN(this.formData);
			} else if (storeId === 21) {
				copyText.value = KTCB(this.formData);
			}
			copyText.select();
			document.execCommand('Copy');
			alert('복사하였습니다.');

			// let aux = document.createElement('textarea');

			// document.body.appendChild(aux);
			// aux.select();
			// document.execCommand('copy');
			// document.body.removeChild(aux);
		},
		async getBlackDetailListFnc() {
			this.blackList = [];
			await this.$store.dispatch('QuickOpeningPopModule/getBlackDetailList');
		},
		async changeWorkStatusFnc(data) {
			// 상태 변경 불가시 fasle
			const check = await this.statusFalseFnc(data);
			if (!check) {
				return;
			}
			if (data.value === 'OPENING_COMPL') {
				// 개통완료일시 우선순위대상 N 처리
				this.formData.basic.priorityTargetYn = 'N';
			}
			// 신청서 업데이트
			await this.updateFalseFnc(data);
		},
		async statusFalseFnc(data) {
			let formData;

			if (data.name === 'openingTaskStatus') {
				// 개통
				// 영업점일시 validation
				if (this.storeVal === 'StoreGrade_S') {
					alert('영업점일시 개통상태를 변경할 수 없습니다.');
					// @ts-ignore
					this.formData.basic[data.name] = data.beforeValue;
					return false;
				}

				formData = {
					applId: this.formData.basic.applId,
					consultTaskStatus: this.formData.basic.consultTaskStatus,
					reqConsultTaskStatus: this.formData.basic.consultTaskStatus,
					openingTaskStatus: data.beforeValue,
					reqOpeningTaskStatus: data.value,
					logisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
					reqLogisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
					invoiceNum: this.formData.delivery.invoiceNum,
					task: 'opening',
				};
			} else if (data.name === 'logisticsTaskStatus') {
				// 물류

				// 영업점일시 validation
				if (this.storeVal === 'StoreGrade_S' && data.value !== 'DLVR_DMND') {
					alert(
						'영업점일시 배송상태를 배송요청 이외의 상태로 변경할 수 없습니다.',
					);
					// @ts-ignore
					this.formData.basic[data.name] = data.beforeValue;
					return false;
				}

				formData = {
					applId: this.formData.basic.applId,
					consultTaskStatus: this.formData.basic.consultTaskStatus,
					reqConsultTaskStatus: this.formData.basic.consultTaskStatus,
					openingTaskStatus: this.formData.basic.openingTaskStatus,
					reqOpeningTaskStatus: this.formData.basic.openingTaskStatus,
					logisticsTaskStatus: data.beforeValue,
					reqLogisticsTaskStatus: data.value,
					invoiceNum: this.formData.delivery.invoiceNum,
					task: 'logistics',
				};
      } else if (data.name === 'consultTaskStatus') {
        // 상담
        if (this.storeVal === 'StoreGrade_S' && data.value === 'RCPT_CANCEL') {
          alert(
              '영업점일시 상담상태를 접수취소 상태로 변경할 수 없습니다.',
          );
          // @ts-ignore
          this.formData.basic[data.name] = data.beforeValue;
          return false;
        }
        if (data.value === 'RCPT_CANCEL') {
          if (this.formData.delivery.couriorMatchingYn === 'Y') {
            alert('송장매칭취소 후 접수취소 상태로 변경 가능합니다.');
            // @ts-ignore
            this.formData.basic[data.name] = data.beforeValue;
            return false;
          }
          if (this.formData.join.deviceRawBarcode) {
            alert('기기매칭취소 후 접수취소 상태로 변경 가능합니다.');
            // @ts-ignore
            this.formData.basic[data.name] = data.beforeValue;
            return false;
          }
          if (this.formData.join.usimRawBarcode) {
            alert('유심매칭취소 후 접수취소 상태로 변경 가능합니다.');
            // @ts-ignore
            this.formData.basic[data.name] = data.beforeValue;
            return false;
          }
        }
        return true;
      }
			// api 날리고
			const result = await this.$store.dispatch(
				'checkApplicationStatusUpdateFlag',
				formData,
			);
			if (result === false || result === undefined) {
				// @ts-ignore
				this.formData.basic[data.name] = data.beforeValue;
				return false;
			}
			return true;
		},
		async updateFalseFnc(data) {
			if (await this.updateFormDataFnc()) {
				// 저장 취소시 예전값으로 변경
				this.formData.basic[data.name] = data.beforeValue;
			} else {
				this.modifyState = false;
			}
		},
		openingTaskDateFnc(data) {
			if (data === 'OPENING_COMPL' && !this.formData.basic.openingDate) {
				//개통완료 && 개통일자가 없을시
				this.formData.basic.openingDate = getToday();
				this.formData.basic.openingTime = getTime();
			} else if (data === 'RETRACT_COMPL' && !this.formData.basic.cancelDate) {
				//철회완료 && 철회일자가 없을시
				this.formData.basic.cancelDate = getToday();
				this.formData.basic.cancelTime = getTime();
			} else if (
				this.formData.basic.openingDate &&
				data !== 'OPENING_COMPL' &&
				data !== 'RETRACT_DMND' &&
				data !== 'RETRACT_COMPL'
			) {
				// 개통일자 값이 있는데
				// 개통상태가 개통완료, 철회요청, 철회완료가 아닐시
				// 개통일자 초기화
				this.formData.basic.openingDate = null;
				this.formData.basic.openingTime = null;
			}
			if (this.formData.basic.cancelDate && data !== 'RETRACT_COMPL') {
				// 철회일자 값이 있는데
				// 개통상태가 철회완료가 아닐시
				// 철회일자 초기화
				this.formData.basic.cancelDate = null;
				this.formData.basic.cancelTime = null;
			}
		},
		escClose() {
			if (!this.modifyState) {
				this.dialog = !this.dialog;
				console.log('닫기 성공');
			}
			console.log('닫기실패');
		},
	},
	async created() {
		this.modifyState = false;
		await this.getCodeList();
		await this.getFormData();
		await this.setOpenStoreObject();
		await this.getSelectList('noAlert');
		await this.getBlackDetailListFnc();
	},
};
</script>
<style scoped>
.lowBtn > div {
	padding: 8px 30px 24px 0;
	position: relative;
	display: block;
	text-align: right;
	background-color: #fff;
}
.lowBtn button {
	background-color: #17a5ae !important;
}
.lowBtn .grayBtn {
	background-color: #bdbdbd !important;
}
.lowBtn .blueBtn {
	background-color: #2f80ed !important;
}
.toggleBtn {
	z-index: 100;
	position: absolute;
}
.toggleMemo {
	position: absolute;
	visibility: hidden;
}
.shade {
	position: absolute;
	width: 95%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 2;
}
.overlay-enter-active,
.overlay-leave-active {
	transition: all 0.3s ease-out;
}
.overlay-enter,
.overlay-leave-to {
	background-color: rgba(0, 0, 0, 0.1);
}
.fade-enter-active {
	transition: all 0.1s ease-out;
}
.fade-leave-active {
	transition: all 0s;
}
.fade-enter,
.fade-leave-to {
	transform: translateX(10%);
}
.arrowBtn {
	background: #2f80ed;
	color: #fff;
	margin-top: 12px;
	z-index: 100;
	text-align: center;
	line-height: 48px;
	position: fixed;
	right: 40px;
	width: 48px;
	height: 48px;
	font-size: 18px;
	border-radius: 48px 0 0 48px;
	cursor: pointer;
	transition: all 0.2s;
}
.arrowBtn:hover {
	width: 62px;
	border-radius: 62px 0 0 62px;
}
@media (max-width: 1760px) {
	.leftCont1 {
		width: auto;
		margin: 16px auto !important;
	}
	.hide {
		display: none;
	}
	.toggleBtn {
		z-index: 100;
		visibility: visible;
	}
	.fade {
		display: flex;
	}
	.toggleMemo {
		visibility: visible;
	}
}
@media (min-width: 1761px) {
	.leftCont1 {
		width: 80%;
	}
	.slide {
		display: none;
	}
	.shade {
		display: none;
	}
	.toggleBtn {
		visibility: hidden;
	}
	.toggleMemo {
		visibility: hidden;
	}
}
</style>
