<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="665">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">공급처 정보수정</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w180">공급처</td>
									<td>
										<input
											type="text"
											placeholder="공급처명을 입력하세요."
											v-model.trim="formData.provName"
											class="borderRadi3Px borderContColor2 padW10 lh30"
										/>
									</td>
								</tr>
								<tr>
									<td class="w120">담당자</td>
									<td>
										<input
											type="text"
											placeholder="담당자명을 입력하세요."
											v-model.trim="formData.chargerName"
											class="borderRadi3Px borderContColor2 padW10 lh30"
										/>
									</td>
								</tr>
								<tr>
									<td>담당자 연락처</td>
									<td>
										<div class="disFx">
											<input
												type="text"
												placeholder="앞자리"
												v-model.trim="formData.chargerPhone1"
												maxlength="3"
												onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
												class="borderRadi3Px borderContColor2 padW10 lh30 w80"
											/>
											<input
												type="text"
												placeholder="중간자리"
												v-model.trim="formData.chargerPhone2"
												maxlength="4"
												onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
												class="borderRadi3Px borderContColor2 padW10 lh30 w80"
											/>
											<input
												type="text"
												placeholder="뒷자리"
												v-model.trim="formData.chargerPhone3"
												maxlength="4"
												onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
												class="borderRadi3Px borderContColor2 padW10 lh30 w80"
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td>담당자 E-mail</td>
									<td>
										<input
											type="text"
											v-model.trim="formData.chargerEmail"
											placeholder="E-mail 입력해주세요."
											class="borderRadi3Px borderContColor2 padW10 lh30"
										/>
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
											/>
											<post-api
												@postapi="addressData"
												:postDialog="postDialog"
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
							</table>
						</div>

						<div class="disFx justify-end mt20">
							<v-btn
								text
								@click="insertProviderFnc()"
								class="backColorMint1 mainWhite borderReset w80"
							>
								등록
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							>
								취소
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import PostApi from '../../../../../components/PostApi';
import { nullValidation, validateEmail } from '../../../../../common/common';

export default {
	components: {
		PostApi,
	},
	props: [],
	data() {
		return {
			postDialog: false,
			formData: {
				provName: '',
				chargerName: '',
				chargerPhone1: '',
				chargerPhone2: '',
				chargerPhone3: '',
				chargerEmail: '',
				returnZipCode: '',
				returnAddr: '',
				returnAddrDetail: '',
				useYn: 'Y',
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.ProviderMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.regiDialog = newValue;
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
		async insertProviderFnc() {
			if (!nullValidation(this.formData)) {
				return;
			}
			if (!validateEmail(this.formData.chargerEmail)) {
				return;
			}
			const result = await this.$store.dispatch(
				'ProviderMgmtModule/insertProvider',
				this.formData,
			);
			if (result) {
				// 리스트 재호출
				const data = this.$store.state.ProviderMgmtModule.filterData;
				await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
			}
		},
		dataInit() {
			this.formData.provName = '';
			this.formData.chargerName = '';
			this.formData.chargerPhone = '';
			this.formData.chargerEmail = '';
			this.formData.returnZipCode = '';
			this.formData.returnAddr = '';
			this.formData.returnAddrDetail = '';
		},
	},
};
</script>

<style scoped>
.infoCont .rowCont {
	display: block;
	text-align: center;
}
.rowItem p {
	display: inline-block;
	width: 100px;
	border-bottom: 1px solid #c8c8c8;
	font-size: 12px;
	color: #7397a4;
	text-align: left;
}
.rowItem input[type='text'] {
	border-bottom: 1px solid #c8c8c8;
	line-height: 30px;
	font-size: 12px;
	width: 460px;
}
.rowItem input[type='text']::placeholder {
	color: #bebebe;
}
.rowItem input[type='text']:focus {
	outline: none;
}
.rowItem button {
	background-color: #003a53;
	padding: 5px 15px;
	color: #fff;
	border-radius: 3px;
	margin-left: 5px;
}
</style>
