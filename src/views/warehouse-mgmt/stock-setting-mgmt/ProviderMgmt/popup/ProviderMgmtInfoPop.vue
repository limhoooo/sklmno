<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="700"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>공급처 정보수정</p>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>공급처</p>
									<input
										type="text"
										placeholder="공급처명을 입력하세요."
										v-model.trim="formData.provName"
									/>
								</div>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>담당자</p>
									<input
										type="text"
										placeholder="담당자명을 입력하세요."
										v-model.trim="formData.chargerName"
									/>
								</div>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>담당자 연락처</p>
									<div
										style="
											width: 460px;
											display: inline-block;
											border-bottom: 1px solid #c8c8c8;
											text-align: left;
										"
									>
										<input
											type="text"
											placeholder="앞자리"
											v-model.trim="formData.chargerPhone1"
											maxlength="3"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											style="width: 38px; border-bottom: none"
										/>
										<span
											style="
												color: #c8c8c8;
												display: inline-block;
												margin: 0 3px;
											"
											>-</span
										>
										<input
											type="text"
											placeholder="중간자리"
											v-model.trim="formData.chargerPhone2"
											maxlength="4"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											style="
												width: 50px;
												border-bottom: none;
												text-align: center;
											"
										/>
										<span
											style="
												color: #c8c8c8;
												display: inline-block;
												margin: 0 3px;
											"
											>-</span
										>
										<input
											type="text"
											placeholder="뒷자리"
											v-model.trim="formData.chargerPhone3"
											maxlength="4"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											style="
												width: 50px;
												border-bottom: none;
												text-align: center;
											"
										/>
									</div>
								</div>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>담당자 E-mail</p>
									<input
										type="text"
										v-model.trim="formData.chargerEmail"
										placeholder="E-mail 입력해주세요."
									/>
								</div>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p style="border: 0">반품주소</p>
									<input
										style="
											width: 100px;
											border: 1px solid #c8c8c8;
											border-radius: 3px;
											padding: 0 10px;
										"
										class="cur_p"
										@click="postDialog = !postDialog"
										v-model.trim="formData.returnZipCode"
										readonly
										:postDialog="postDialog"
										type="text"
										placeholder="우편번호"
									/>
									<input
										style="
											margin-left: 5px;
											width: 265px;
											border: 1px solid #c8c8c8;
											border-radius: 3px;
											padding: 0 10px;
										"
										class="cur_p"
										@click="postDialog = !postDialog"
										v-model.trim="formData.returnAddr"
										readonly
										:postDialog="postDialog"
										type="text"
										placeholder="기본주소"
									/>
									<span
										style="display: inline-block; width: 85px; margin-left: 6px"
									>
										<post-api
											@postapi="addressData"
											:postDialog="postDialog"
											@closeDialog="dialogClose"
										></post-api>
									</span>
									<br />
									<input
										style="
											border: 1px solid #c8c8c8;
											padding: 0 10px;
											border-radius: 3px;
											width: 370px;
											margin-top: 5px;
											margin-left: 10px;
										"
										type="text"
										placeholder="상세주소 입력"
										v-model.trim="formData.returnAddrDetail"
									/>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont">
							<!--							<p style="color: #003a53">-->
							<!--								담당자<span style="font-weight: bold; margin-left: 3px">-->
							<!--									{{ dialogData.name }}-->
							<!--								</span>-->
							<!--							</p>-->
							<!--							<p class="font-red">-->
							<!--								마지막저장일-->
							<!--								{{ dialogData.updDateTime | moment('YYYY-MM-DD HH:mm:ss') }}-->
							<!--							</p>-->
						</div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn
								text
								@click="updateProviderFnc()"
								style="background-color: #17a5ae"
							>
								수정
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								취소
							</v-btn>
						</div>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import PostApi from '../../../../../components/PostApi';
import { nullValidation, validateEmail } from '../../../../../common/common';

export default {
	props: ['dialogData'],
	data() {
		return {
			postDialog: false,
			formData: {
				provId: 0,
				provName: '',
				chargerName: '',
				chargerPhone1: '',
				chargerPhone2: '',
				chargerPhone3: '',
				chargerEmail: '',
				returnZipCode: '',
				returnAddr: '',
				returnAddrDetail: '',
			},
		};
	},
	components: {
		PostApi,
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.ProviderMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.infoDialog = newValue;
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
		async updateProviderFnc() {
			if (!nullValidation(this.formData)) {
				return;
			}
			if (!validateEmail(this.formData.chargerEmail)) {
				return;
			}
			const result = await this.$store.dispatch(
				'ProviderMgmtModule/updateProvider',
				this.formData,
			);
			if (result) {
				// 리스트 재호출
				const data = this.$store.state.ProviderMgmtModule.filterData;
				await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
			}
		},
		dataSet() {
			this.formData.provId = this.dialogData.provId;
			this.formData.provName = this.dialogData.provName;
			this.formData.chargerName = this.dialogData.chargerName;
			this.formData.chargerPhone1 = this.dialogData.chargerPhone1;
			this.formData.chargerPhone2 = this.dialogData.chargerPhone2;
			this.formData.chargerPhone3 = this.dialogData.chargerPhone3;
			this.formData.chargerEmail = this.dialogData.chargerEmail;
			this.formData.returnZipCode = this.dialogData.returnZipCode;
			this.formData.returnAddr = this.dialogData.returnAddr;
			this.formData.returnAddrDetail = this.dialogData.returnAddrDetail;
		},
	},
	created() {
		this.dataSet();
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
