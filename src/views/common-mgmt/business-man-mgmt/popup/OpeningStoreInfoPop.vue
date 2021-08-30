<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="620">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">
						개통점 정보
						<span v-if="roleVal || storeId === formData.storeId">수정</span>
					</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text class="pad30">
					<p class="mainRed mj0"><span>*</span>필수입력정보</p>
					<div class="new_popTable1">
						<table class="w100P">
							<tbody>
								<tr>
									<td>개통점명</td>
									<td>
										<v-text-field
											class="input_custom1"
											v-model.trim="formData.openStoreName"
											outlined
											placeholder="개통점명을 입력해주세요."
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>통신사<span class="mainRed">*</span></td>
									<td class="disFx">
										<span
											v-for="item in infoDialogTelecomData.telecom"
											:key="item.id"
										>
											<div class="radioStylePop w30 ml20">
												<input
													:id="`popup${item.codeNm}`"
													type="radio"
													:value="item.codeSeq"
													v-model.trim="formData.telecom"
													name="popTelecom"
												/>
												<label :for="`popup${item.codeNm}`">{{
													item.codeNm
												}}</label>
											</div>
										</span>
									</td>
								</tr>
								<tr>
									<td>사업자 번호<span class="redfont">*</span></td>
									<td>
										<div class="disFx w250">
											<v-text-field
												class="input_custom1 w50"
												outlined
												maxlength="3"
												placeholder="앞자리"
												v-model.trim="formData.bizNoFront"
												oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
											></v-text-field>
											<v-text-field
												class="input_custom1 w20"
												outlined
												maxlength="2"
												placeholder="둘째"
												v-model.trim="formData.bizNoMiddle"
												oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
											></v-text-field>
											<v-text-field
												class="input_custom1 w80"
												outlined
												maxlength="5"
												placeholder="셋째자리"
												v-model.trim="formData.bizNoBack"
												oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
											></v-text-field>
										</div>
									</td>
								</tr>
								<tr>
									<td>담당자명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											v-model.trim="formData.chargerName"
											outlined
											placeholder="담당자명을 입력해주세요."
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>담당자 연락처<span class="redfont">*</span></td>
									<td>
										<div class="disFx w250">
											<v-text-field
												class="input_custom1 w50"
												v-model.trim="formData.chargerPhone1"
												maxlength="3"
												outlined
												placeholder="앞자리"
											></v-text-field>
											<v-text-field
												class="input_custom1 w80"
												v-model.trim="formData.chargerPhone2"
												maxlength="4"
												outlined
												placeholder="중간자리"
											></v-text-field>
											<v-text-field
												class="input_custom1 w80"
												v-model.trim="formData.chargerPhone3"
												maxlength="4"
												outlined
												placeholder="끝자리"
											></v-text-field>
										</div>
									</td>
								</tr>
								<tr>
									<td>반품주소</td>
									<td class="h75">
										<div class="addressTd1">
											<input
												type="text"
												placeholder="우편번호"
												@click="postDialog = !postDialog"
												v-model.trim="formData.returnZipCode"
												readonly
												:disabled="storeId !== formData.storeId"
												:postDialog="postDialog"
												class="cur_p h30 floatL w80"
												id="postcode"
											/>
											<input
												type="text"
												placeholder="기본주소"
												@click="postDialog = !postDialog"
												v-model.trim="formData.returnAddr"
												readonly
												:postDialog="postDialog"
												class="cur_p h30 floatL w50P"
												id="roadAddress"
												:disabled="storeId !== formData.storeId"
											/>
											<post-api
												@postapi="addressData"
												:postDialog="postDialog"
												:if="storeId === formData.storeId"
											></post-api>
											<input
												type="text"
												class="h30 w100P"
												placeholder="상세주소 입력"
												v-model.trim="formData.returnAddrDetail"
												id="detailAddress"
												:disabled="storeId !== formData.storeId"
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="disFx justify-end mt10">
							<v-btn
								class="backColorMint1 mainWhite borderReset w80"
								outlined
								text
								@click="updateStoreFnc"
							>
								수정
							</v-btn>
							<v-btn
								outlined
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								text
								@click="dialog = !dialog"
							>
								취소
							</v-btn>
						</div>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';
import {nullValidation} from '../../../../common/common';
import {updateStore} from '../../../../api/common-mgmt/businessman-mgmt/OpeningStoreMgmtApi.js';

export default {
	props: ['infoDialogData', 'infoDialogTelecomData'],
	// 상위 컴포넌트에서 props로 data를 받는다.
	data() {
		return {
			postDialog: false,
			storeId: this.infoDialogData.storeId,
			formData: {
				storeId: 1,
				openStoreName: '',
				telecom: '1',
				bizNoFront: '',
				bizNoMiddle: '',
				bizNoBack: '',
				bizNo: '',
				chargerName: '',
				chargerPhone1: '',
				chargerPhone2: '',
				chargerPhone3: '',
				returnZipCode: '',
				returnAddr: '',
				returnAddrDetail: '',
				openStoreId: '',
				useYn: '',
				delYn: '',
			},
		};
	},
	components: {
		PostApi,
	},
	computed: {
		roleVal() {
      return this.$store.state.role === 'A';
    },
		filterData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.filterData = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		addressData(data) {
			this.formData.returnAddr = data.address;
			this.formData.returnZipCode = data.zonecode;
		},
		async updateStoreFnc() {
			try {
				this.formData.bizNo =
					this.formData.bizNoFront +
					this.formData.bizNoMiddle +
					this.formData.bizNoBack;
				// null check
				if (!nullValidation(this.formData)) {
					return;
				}
				const result = await updateStore(this.formData);
				if (result) {
					alert('수정되었습니다.');
					this.dialog = !this.dialog;
					this.filterData.pageNo = 1;
					this.$store.dispatch(
						'OpeningStoreMgmtModule/getList',
						this.filterData,
					);
				}
			} catch (e) {
				console.log(e);
			}
		},
		initFormData() {
			this.formData.openStoreId = this.infoDialogData.openStoreId;
			this.formData.storeId = this.infoDialogData.storeId;
			this.formData.openStoreName = this.infoDialogData.openStoreName;
			this.formData.telecom = this.infoDialogData.telecom;
			this.formData.bizNoFront = this.infoDialogData.bizNo.substring(0, 3);
			this.formData.bizNoMiddle = this.infoDialogData.bizNo.substring(3, 5);
			this.formData.bizNoBack = this.infoDialogData.bizNo.substring(
				5,
				this.infoDialogData.bizNo.length,
			);
			this.formData.bizNo = this.infoDialogData.bizNo;
			this.formData.chargerName = this.infoDialogData.chargerName;
			this.formData.chargerPhone1 = this.infoDialogData.chargerPhone1;
			this.formData.chargerPhone2 = this.infoDialogData.chargerPhone2;
			this.formData.chargerPhone3 = this.infoDialogData.chargerPhone3;
			this.formData.returnZipCode = this.infoDialogData.returnZipCode;
			this.formData.returnAddr = this.infoDialogData.returnAddr;
			this.formData.returnAddrDetail = this.infoDialogData.returnAddrDetail;
			this.formData.useYn = this.infoDialogData.useYn;
			this.formData.delYn = this.infoDialogData.delYn;
		},
	},
	created() {
		this.initFormData();
	},
};
</script>

<style></style>
