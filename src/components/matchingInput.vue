<template>
	<div class="matchingInputVue">
		<div class="disFX" v-if="propsDeviceType === 'DVC'">
			<!--			<span
				style="padding-top: 5px; font-size: 13px; color: #6a909e; width: 120px"
				>기기 일련번호</span
			>-->
			<div class="btnPlus2">
				<!--송장매칭이 되어있거나-->
				<!--개통종류가 유심이거나-->
				<!--기기매칭이 재고매칭이거나-->
				<input
					:disabled="
						disableYN ||
						formData.delivery.couriorMatchingYn === 'Y' ||
						formData.basic.applType === 'USIM' ||
						formData.join.deviceMatchingType === 'MATCHING_TYPE_STOCK' ||
						formData.join.deviceMatchingType === 'MATCHING_TYPE_NOT_STOCK' ||
						!macthingStatus
					"
					type="text"
					v-model.trim="formData.join.deviceRawBarcode"
					class="disGray borderRadi3Px borderContColor1 lh36 padW10"
					style="border: 1px solid #989898; border-radius: 3px"
					@input="deviceChangeChkFnc()"
				/>
				<!--송장매칭이 안되어있을시-->
				<!--개통종류가 유심이 아닐시-->
				<!--수정페이지 일시-->
				<!--재고매칭이 안되어있을시-->
				<button
					:disabled="disableYN"
					class="matchingBtn"
					v-if="
						deviceChangeChk &&
						formData.delivery.couriorMatchingYn !== 'Y' &&
						AppFormCreFlag &&
						formData.join.deviceMatchingType !== 'MATCHING_TYPE_STOCK' &&
						macthingStatus
					"
					style="right: -48px; font-size: 14px; padding: 10px"
					@click="deviceCheck('DVC')"
				>
					저장
				</button>
				<button
					:disabled="disableYN"
					class="matchingBtn"
					v-if="
						formData.delivery.couriorMatchingYn !== 'Y' &&
						AppFormCreFlag &&
						macthingStatus &&
						(formData.join.deviceMatchingType === 'MATCHING_TYPE_STOCK' ||
							formData.join.deviceMatchingType === 'MATCHING_TYPE_NOT_STOCK')
					"
					@click="deviceMatchingCancle('DVC')"
					style="
						right: -76px;
						font-size: 14px;
						padding: 10px;
						width: 76px !important;
					"
				>
					매칭취소
				</button>
				<div style="text-align: center">
					<span
						v-if="formData.join.deviceMatchingType === 'MATCHING_TYPE_STOCK'"
						>재고매칭</span
					>
					<span
						v-if="
							formData.join.deviceMatchingType !== 'MATCHING_TYPE_STOCK' &&
							formData.join.deviceRawBarcode
						"
						>비재고매칭</span
					>
				</div>
			</div>
		</div>
		<div class="disFX" v-if="propsDeviceType === 'USIM'">
			<!--			<span
				style="padding-top: 5px; font-size: 13px; color: #6a909e; width: 120px"
				>유심 일련번호</span
			>-->
			<div class="btnPlus2">
				<!--     타사유심 후남,선납 일때 추가  -->
				<!--        OTHER_PRE_PAY 타사유심선납-->
				<!--        OTHER_POST_PAY  타사유심후납-->
				<input
					:disabled="
						formData.join.usimPaymentType !== 'OTHER_PRE_PAY' &&
						formData.join.usimPaymentType !== 'OTHER_POST_PAY' &&
						(disableYN ||
							formData.delivery.couriorMatchingYn === 'Y' ||
							formData.basic.applType === 'DVC' ||
							formData.join.usimMatchingType === 'MATCHING_TYPE_STOCK' ||
							formData.join.usimMatchingType === 'MATCHING_TYPE_NOT_STOCK' ||
							!macthingStatus)
					"
					style="border: 1px solid #989898; border-radius: 3px"
					type="text"
					class="disGray borderRadi3Px borderContColor1 lh36 padW10"
					v-model.trim="formData.join.usimRawBarcode"
					@input="usimChangeChkFnc()"
				/>
				<!--     타사유심 후남,선납 일때 추가  -->
				<!--        OTHER_PRE_PAY 타사유심선납-->
				<!--        OTHER_POST_PAY  타사유심후납-->
				<button
					class="matchingBtn"
					:disabled="disableYN"
					v-if="
						(usimChangeChk &&
							AppFormCreFlag &&
							(formData.join.usimPaymentType === 'OTHER_PRE_PAY' ||
								formData.join.usimPaymentType === 'OTHER_POST_PAY')) ||
						(usimChangeChk &&
							formData.delivery.couriorMatchingYn !== 'Y' &&
							AppFormCreFlag &&
							formData.join.usimMatchingType !== 'MATCHING_TYPE_STOCK' &&
							macthingStatus)
					"
					style="right: -48px; font-size: 14px; padding: 10px"
					@click="deviceCheck('USIM')"
				>
					저장
				</button>
				<button
					class="matchingBtn"
					:disabled="disableYN"
					v-if="
						formData.delivery.couriorMatchingYn !== 'Y' &&
						AppFormCreFlag &&
						macthingStatus &&
						(formData.join.usimMatchingType === 'MATCHING_TYPE_STOCK' ||
							formData.join.usimMatchingType === 'MATCHING_TYPE_NOT_STOCK')
					"
					@click="deviceMatchingCancle('USIM')"
					style="
						right: -76px;
						font-size: 14px;
						padding: 10px;
						width: 76px !important;
					"
				>
					매칭취소
				</button>
				<div style="text-align: center">
					<span v-if="formData.join.usimMatchingType === 'MATCHING_TYPE_STOCK'"
						>재고매칭</span
					>
					<span
						v-if="
							formData.join.usimMatchingType !== 'MATCHING_TYPE_STOCK' &&
							formData.join.usimRawBarcode
						"
						>비재고매칭</span
					>
				</div>
			</div>
		</div>
		<overlapDevicePopup
			v-if="overlapDevicePop"
			:overlapDialog="overlapDevicePop"
			:overlapDeviceData="overlapDeviceData"
			@overlapSuccessFnc="overlapSuccessFnc"
			@closeDialog="dialogClose"
		></overlapDevicePopup>
	</div>
</template>
<script>
import overlapDevicePopup from '../components/device/overlapDevicePopup.vue';

export default {
	props: {
		formData: {
			type: Object,
		},
		propsDeviceType: {
			type: String,
		},
		AppFormCreFlag: {
			type: Boolean,
		},
		componentType: {
			type: String,
		},
		disableYN: { type: Boolean },
		newApply: { type: Boolean },
	},
	components: { overlapDevicePopup },
	data: () => ({
		overlapDevicePop: false,
		overlapDeviceData: [],
		deviceMatchingBtn: false,
		deviceMatchingCancelBtn: false,
		deviceChangeChk: false,
		usimMatchingBtn: false,
		usimMatchingCancelBtn: false,
		usimChangeChk: false,
		deviceBarcode: '',
		usimBarcode: '',
		deviceType: false,
	}),
	computed: {
		macthingStatus() {
			// 신규신청서일시 return
			if (!this.AppFormCreFlag) {
				return true;
			}
			// 매칭 가능 상태값
			// 배송요청 DLVR_DMND
			// 배송준비 DLVR_READY
			// 집하전(송장등록완료) DLVR_PREV_PROG
			// 배정요청 DLVR_ASSIGNMENT_REQUEST
			// 택배(영업점발송) PS_SALES
			const status = this.formData.basic.logisticsTaskStatus;

			if (
				status === 'DLVR_DMND' ||
				status === 'DLVR_READY' ||
				status === 'DLVR_PREV_PROG' ||
				status === 'DLVR_ASSIGNMENT_REQUEST' ||
				this.formData.delivery.deliveryType === 'PS_SALES'
			) {
				return true;
			}
			return false;
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
		// 기기 매칭타입 체크(기기타입)
		// DVC : 기기
		// USIM : 유심
		// 재고매칭 : MATCHING_TYPE_STOCK
		// 비재고매칭 : MATCHING_TYPE_NOT_STOCK
		async deviceCheck(type) {
			this.deviceType = type;
			let data;
			if ('DVC' === type) {
				// 기기
				if (!this.formData.join.deviceRawBarcode) {
					alert('기기일련번호를 입력해주세요.');
					return;
				}
				if (!this.formData.join.goodsId) {
					alert('기기를 선택해주세요.');
					return;
				}
				if (!this.formData.join.color) {
					alert('색상을 선택해주세요.');
					return;
				}
				data = {
					barcode: this.formData.join.deviceRawBarcode,
					goodsId: this.formData.join.goodsId,
					color: this.formData.join.color,
					goodsType: 'DVC',
				};
			} else {
				// 유심
				if (!this.formData.join.usimRawBarcode) {
					alert('유심일련번호를 입력해주세요.');
					return;
				}
				if (!this.formData.join.usimType) {
					alert('유심종류를 입력해주세요.');
					return;
				}
				data = {
					barcode: this.formData.join.usimRawBarcode,
					telecomId: this.formData.join.openingTelecomCodeId,
					capacity: this.formData.join.usimType,
					goodsType: 'USIM',
				};
			}
			await this.deviceOverlapCheck(data, type);
		},
		// 중복기기체크
		async deviceOverlapCheck(data, type) {
			let result;
			if (type === 'DVC') {
				result = await this.$store.dispatch(
					'commonModule/cwsDeviceListFromBarcode',
					data,
				);
			} else {
				result = await this.$store.dispatch(
					'commonModule/cwsUsimListFromBarcode',
					data,
				);
			}

			if (0 === result.resultList.length) {
				alert('조회된 기기가 없습니다. \n비재고매칭으로 진행됩니다.');
				await this.noneStockMatching(data.goodsType, data.barcode);
			} else if (1 === result.resultList.length) {
				// 한대일시
				await this.overlapSuccessFnc(
					result.resultList[0].dvcId,
					result.resultList[0].rawBarcode,
					data.goodsType,
				);
			} else {
				// 기기 여러대 일때 선택 팝업 open
				this.overlapDevicePop = !this.overlapDevicePop;
				this.overlapDeviceData = result.resultList;
			}
			// 팝업 완료시 overlapSuccessFnc 호출
		},
		// 비재고매칭(기기타입)
		// DVC : 기기
		// USIM : 유심
		async noneStockMatching(type, barcode) {
			// 비재고 매칭
			let noneDvcIdData = {
				applId: this.formData.basic.applId,
				deviceType: type,
        applType: this.formData.basic.applType,
				matchingType: 'MATCHING_TYPE_NOT_STOCK',
				barcode: barcode,
			};
			if ('USIM' === type) {
				if (!this.formData.join.usimType) {
					alert('유심종류를 입력해주세요');
					return;
				}
				// 유심종류
				noneDvcIdData['usimType'] = this.formData.join.usimType;
			}
			await this.deviceMatching(noneDvcIdData);
		},

		// 중복기기성공팝업(기기 ID, 기기 BARCODE)
		async overlapSuccessFnc(dvcId, rawBarcode) {
			let data = {
				applId: this.formData.basic.applId,
				barcode: rawBarcode,
				dvcId: dvcId,
        applType: this.formData.basic.applType,
				deviceType: this.deviceType,
				matchingType: 'MATCHING_TYPE_STOCK',
			};

			if ('DVC' === this.deviceType) {
				// 기기
				this.barcode = rawBarcode;
			} else {
				// 유심
				this.usimBarcode = rawBarcode;
				data['usimType'] = null;
			}

			await this.deviceMatching(data);
		},
		// 기기매칭(기기타입)
		// DVC : 기기
		// USIM : 유심
		async deviceMatching(data) {
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/deviceMatching',
				data,
			);
			if (result) {
				alert('매칭되었습니다.');
				if (this.componentType === 'SELL') {
					// 신청서 디테일
					await this.getApplicationDetail();
				} else {
					// 빠른개통 디테일
					await this.getFormData();
				}
				if (this.deviceType === 'DVC') {
					this.deviceChangeChk = false;
					this.deviceBarcode = this.formData.join.deviceRawBarcode || '';
				} else if (this.deviceType === 'USIM') {
					this.usimChangeChk = false;
					this.usimBarcode = this.formData.join.usimRawBarcode || '';
				}
				await this.getHistoryListFnc();
			} else {
				if (this.deviceType === 'DVC') {
					this.deviceChangeChk = false;
					this.formData.join.deviceRawBarcode = null;
				} else if (this.deviceType === 'USIM') {
					this.usimChangeChk = false;
					this.formData.join.usimRawBarcode = null;
				}
			}
		},
		// 기기매칭취소(기기타입)
		// DVC : 기기
		// USIM : 유심
		async deviceMatchingCancle(type) {
			if (
				'DVC' === type &&
				this.formData.join.deviceMatchingCancelAuthYn === 'N'
			) {
				return alert(
					'자신의 영업점에서 매칭한 기기가 아닐시\n매칭취소 할 수 없습니다.',
				);
			} else if (
				'USIM' === type &&
				this.formData.join.usimMatchingCancelAuthYn === 'N'
			) {
				return alert(
					'자신의 영업점에서 매칭한 유심이 아닐시\n매칭취소 할 수 없습니다.',
				);
			}
			if (!confirm('매칭취소하시겠습니까?')) {
				return;
			}
			let data = {
				applId: this.formData.basic.applId,
				deviceType: type,
			};
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/cancelDeviceTypeMatching',
				data,
			);
			if (result) {
				alert('매칭취소되었습니다.');

				if ('DVC' === type) {
					this.deviceChangeChk = false;
					this.deviceBarcode = '';
				} else {
					this.usimChangeChk = false;
					this.usimBarcode = '';
				}

				if (this.componentType === 'SELL') {
					// 신청서 디테일
					await this.getApplicationDetail();
				} else {
					// 빠른개통 디테일
					await this.getFormData();
				}
				await this.getHistoryListFnc();
			}
		},
		// 기기일련번호 변동있는지 체크
		deviceChangeChkFnc() {
			if (this.AppFormCreFlag) {
				return (this.deviceChangeChk =
					this.deviceBarcode !== this.formData.join.deviceRawBarcode);
			}
		},
		// 유심일련번호 변동있는지 체크
		usimChangeChkFnc() {
			if (this.AppFormCreFlag) {
				return (this.usimChangeChk =
					this.usimBarcode !== this.formData.join.usimRawBarcode);
			}
		},
		dialogClose(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		async getApplicationDetail() {
			if (this.AppFormCreFlag !== undefined) {
				let data = { applId: this.formData.basic.applId };
				await this.$store.dispatch(
					'ApplicationFormCreationModule/getApplicationDetail',
					data,
				);
				await this.setOpeningStoreFnc();
			}
		},
		setOpeningStoreFnc() {
			this.formData.basic.openingStoreId = {
				openStoreCode: this.formData.basic.openingStoreId,
				openStoreTelecom: this.formData.join.openingTelecomName,
				openStoreTelecomId: this.formData.join.openingTelecomCodeId,
				parentHierarchy: this.formData.basic.parentHierarchy,
				parentSaleStoreId: this.formData.basic.parentSaleStoreId,
			};
		},
		async getFormData() {
			let data = { applId: this.formData.basic.applId };
			await this.$store.dispatch('QuickOpeningPopModule/getFormData', data);
			//this.copiedAddService = [...this.formData.join.addServiceList];
		},
		async getHistoryListFnc() {
			let data = {
				applId: this.formData.basic.applId,
			};
			await this.$store.dispatch('TaskHistoryModule/getHistoryList', data);
		},
	},
	watch: {
		deviceChangeChk: {
			deep: true,
			handler: function (newVal) {
				this.$emit('deviceChange', newVal);
			},
		},
		usimChangeChk: {
			deep: true,
			handler: function (newVal) {
				this.$emit('usimChange', newVal);
			},
		},
		cancelQuick: {
			deep: true,
			handler: function (newVal) {
				if (newVal) {
					this.deviceChangeChk = false;
					this.usimChangeChk = false;
				}
			},
		},
	},
	async created() {
		this.deviceBarcode = '';
		this.usimBarcode = '';
		setTimeout(() => {
			this.deviceChangeChk = false;
			this.usimChangeChk = false;
			this.deviceBarcode = this.formData.join.deviceRawBarcode || '';
			this.usimBarcode = this.formData.join.usimRawBarcode || '';
		}, 500);
	},
};
</script>
<style scoped>
.matchingBtn:disabled {
	background: #c8c8c8;
	cursor: default;
}
</style>
