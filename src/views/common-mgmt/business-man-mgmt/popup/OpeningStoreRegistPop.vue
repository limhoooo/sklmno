<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="620">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">개통점 등록</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text class="pad30">
					<p class="mainRed mj0">* 필수입력입니다</p>
					<div class="new_popTable1">
						<table class="w100P">
							<tbody>
								<tr>
									<td>개통점명<span class="mainRed">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.openStoreName"
											placeholder="개통점명을 입력해주세요."
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>통신사<span class="mainRed">*</span></td>
									<td class="disFx">
										<span v-for="item in infoDialogData.telecom" :key="item.id">
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
									<td>사업자번호<span class="mainRed">*</span></td>
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
									<td>담당자명<span class="mainRed">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.chargerName"
											placeholder="담당자명을 입력해주세요."
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>담당자연락처<span class="mainRed">*</span></td>
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
									<td>주소<span class="mainRed">*</span></td>
									<td class="h75">
										<div class="addressTd1">
											<input
												type="text"
												placeholder="우편번호"
												@click="postDialog = !postDialog"
												v-model.trim="formData.returnZipCode"
												readonly
												:postDialog="postDialog"
												class="cur_p h30 floatL w120"
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
											/>
											<post-api
												@postapi="addressData"
												:postDialog="postDialog"
												@closeDialog="dialogClose"
											></post-api>
											<input
												type="text"
												class="h30 w100P"
												placeholder="상세주소 입력"
												v-model.trim="formData.returnAddrDetail"
												id="detailAddress"
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
								@click="insertStoreFnc"
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
</template>

<script>
import PostApi from '../../../../components/PostApi';
import { nullValidation } from '../../../../common/common';
import { insertStore } from '../../../../api/common-mgmt/businessman-mgmt/OpeningStoreMgmtApi.js';

export default {
	props: ['infoDialogData', 'storeIdData'],
	data() {
		return {
			postDialog: false,
			formData: {
				storeId: this.storeIdData,
				openStoreName: '',
				telecom: 5,
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
				delYn: 'N',
				useYn: 'Y',
			},
		};
	},
	components: {
		PostApi,
	},
	computed: {
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
				return this.$store.state.OpeningStoreMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.regiDialog = newValue;
			},
		},
	},
	methods: {
		dialogClose(data) {
			this.postDialog = data;
		},
		addressData(data) {
			this.formData.returnAddr = data.address;
			this.formData.returnZipCode = data.zonecode;
		},
		async insertStoreFnc() {
			try {
				this.formData.bizNo =
					this.formData.bizNoFront +
					this.formData.bizNoMiddle +
					this.formData.bizNoBack;

				// null check
				if (!nullValidation(this.formData, ['storeId'])) {
					return;
				}
				const result = await insertStore(this.formData);
				if (result.data.status === 200) {
					alert('등록되었습니다.');
					this.dialog = !this.dialog;
					this.filterData.pageNo = 1;
					this.$store.dispatch(
						'OpeningStoreMgmtModule/getList',
						this.filterData,
					);
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
				// null 체크
			} catch (e) {
				console.log(e);
			}
		},
	},
};
</script>

<style>
.input_custom2 {
	width: 120px;
}
</style>
