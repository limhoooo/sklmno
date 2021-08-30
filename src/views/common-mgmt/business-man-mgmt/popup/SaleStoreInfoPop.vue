<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="620">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">
							영업점 정보
							<span v-if="roleVal"> 수정 </span>
						</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<p class="mainRed"><span>*</span>필수입력입니다.</p>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>영업점<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											placeholder="영업점명을 입력해주세요."
											v-model.trim="formData.saleStore.saleStoreName"
											:disabled="!roleVal"
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>통신사<span class="redfont">*</span></td>
									<td>
										<div class="radioStylePop w30 ml20 disIn">
											<input
												type="radio"
												id="ModalSKTTel"
												name="telecom"
												value="5"
												v-model.trim="formData.saleStore.telecom"
												:disabled="!roleVal"


											/><label for="ModalSKTTel">SKT</label>
										</div>
										<div class="radioStylePop w30 ml20 disIn">
											<input
												type="radio"
												id="ModalKTTel"
												name="telecom"
												value="6"
												v-model.trim="formData.saleStore.telecom"
												:disabled="!roleVal"
											/><label for="ModalKTTel">KT</label>
										</div>
										<div class="radioStylePop w30 ml20 disIn">
											<input
												type="radio"
												id="ModalLGUTel"
												name="telecom"
												value="7"
												v-model.trim="formData.saleStore.telecom"
												:disabled="!roleVal"
											/><label for="ModalLGUTel">LGU</label>
										</div>
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
                        :disabled="!roleVal"
                        v-model.trim="formData.saleStore.bizNoFront"
												oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
											></v-text-field>
											<v-text-field
												class="input_custom1 w20"
												outlined
												maxlength="2"
												placeholder="둘째"
                        :disabled="!roleVal"
                        v-model.trim="formData.saleStore.bizNoMiddle"
												oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
											></v-text-field>
											<v-text-field
												class="input_custom1 w80"
												outlined
												maxlength="5"
												placeholder="셋째자리"
                        :disabled="!roleVal"
                        v-model.trim="formData.saleStore.bizNoBack"
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
											outlined
											placeholder="담당자명을 입력해주세요."
                      v-model.trim="formData.saleStore.chargerName"
											:disabled="!roleVal"
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>담당자 연락처<span class="redfont">*</span></td>
									<td>
										<div class="disFx w250">
											<v-text-field
												class="input_custom1 w50"
												v-model.trim="formData.saleStore.chargerPhone1"
												maxlength="3"
												outlined
                        :disabled="!roleVal"
                        placeholder="앞자리"
											></v-text-field>
											<v-text-field
												class="input_custom1 w80"
												v-model.trim="formData.saleStore.chargerPhone2"
												maxlength="4"
												outlined
                        :disabled="!roleVal"
                        placeholder="중간자리"
											></v-text-field>
											<v-text-field
												class="input_custom1 w80"
												v-model.trim="formData.saleStore.chargerPhone3"
												maxlength="4"
												outlined
                        :disabled="!roleVal"
                        placeholder="끝자리"
											></v-text-field>
										</div>
									</td>
								</tr>
								<tr>
									<td>반품 주소<span class="redfont">*</span></td>
									<td class="h75">
										<div class="addressTd1">
											<input
												type="text"
												placeholder="우편번호"
												@click="postDialog = !postDialog"
												v-model.trim="formData.saleStore.returnZipCode"
												readonly
												:postDialog="postDialog"
												class="cur_p h30 floatL w120"
												id="postcode"
												:disabled="!roleVal"
											/>
											<input
												type="text"
												placeholder="기본주소"
												@click="postDialog = !postDialog"
												v-model.trim="formData.saleStore.returnAddr"
												readonly
												:postDialog="postDialog"
												class="cur_p h30 floatL w50P"
												id="roadAddress"
												:disabled="!roleVal"
											/>
											<post-api
												@postapi="addressData"
												:postDialog="postDialog"
												v-if="roleVal"
											></post-api>
											<input
												type="text"
												class="h30 w100P"
												placeholder="상세주소 입력"
												v-model.trim="formData.saleStore.returnAddrDetail"
												id="detailAddress"
												:disabled="!roleVal"
											/>
										</div>
									</td>
								</tr>
							</table>

							<div class="disFx justify-end mt10">
								<v-btn
									class="backColorMint1 mainWhite borderReset w80"
									outlined
									text
									@click="updateStoreFnc"
									v-if="roleVal"
								>
									저장
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
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';
import {updateStore} from '../../../../api/common-mgmt/businessman-mgmt/SaleStoreMgmtApi.js';
import {nullValidation} from '../../../../common/common.js';

export default {
	components: {
		PostApi,
	},
	props: ['infoDialogData', 'dataListCall', 'parentStoreId'],
	data() {
		return {
			postDialog: false,
			formData: {
				parentStoreId: this.parentStoreId,
				saleStore: {
					storeId: 0,
					bizNoFront: '',
					bizNoMiddle: '',
					bizNoBack: '',
					bizNo: '',
					chargerName: '',
					chargerPhone1: '',
					chargerPhone2: '',
					chargerPhone3: '',
					returnAddr: 'string',
					returnAddrDetail: 'string',
					returnZipCode: 'string',
					saleStoreName: 'string',
					telecom: '1',
					useYn: 'Y',
				},
				user: {
					email: 'string',
					userName: 'userName',
					userPhone: '010010',
					userPw: '1234',
					userStatus: '1',
				},
			},
		};
	},
	computed: {
		roleVal() {
      return this.$store.state.role === 'A';
		},
		dialog: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.infoDialog = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.filterData = newValue;
			},
		},
	},
	methods: {
		addressData(data) {
			this.formData.saleStore.returnAddr = data.address;
			this.formData.saleStore.returnZipCode = data.zonecode;
		},
		async updateStoreFnc() {
			try {
				this.formData.saleStore.bizNo =
					this.formData.saleStore.bizNoFront +
					this.formData.saleStore.bizNoMiddle +
					this.formData.saleStore.bizNoBack;

				if (!nullValidation(this.formData.saleStore)) {
					return;
				}

				const result = await updateStore(this.formData);
				if (result) {
					alert('수정되었습니다.');
					this.dialog = !this.dialog;
					this.filterData.pageNo = 1;
					this.$store.dispatch('SaleStoreMgmtModule/getList', this.filterData);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		this.formData.saleStore.saleStoreName = this.infoDialogData.saleStoreName;
		this.formData.saleStore.telecom = this.infoDialogData.telecom;
		this.formData.saleStore.bizNo = this.infoDialogData.bizNo.replace(
			/[^0-9]/g,
			'',
		);
		this.formData.saleStore.chargerName = this.infoDialogData.chargerName;
		this.formData.saleStore.chargerPhone1 = this.infoDialogData.chargerPhone1;
		this.formData.saleStore.chargerPhone2 = this.infoDialogData.chargerPhone2;
		this.formData.saleStore.chargerPhone3 = this.infoDialogData.chargerPhone3;
		this.formData.saleStore.returnZipCode = this.infoDialogData.returnZipCode;
		this.formData.saleStore.returnAddr = this.infoDialogData.returnAddr;
		this.formData.saleStore.returnAddrDetail = this.infoDialogData.returnAddrDetail;
		this.formData.saleStore.storeId = this.infoDialogData.storeId;
		this.formData.saleStore.bizNoFront = this.formData.saleStore.bizNo.substring(
			0,
			3,
		);
		this.formData.saleStore.bizNoMiddle = this.formData.saleStore.bizNo.substring(
			3,
			5,
		);
		this.formData.saleStore.bizNoBack = this.formData.saleStore.bizNo.substring(
			5,
			this.infoDialogData.bizNo.length,
		);
	},
};
</script>
