<template>
	<div>
		<header>
			<h1 :class="process === 'production' ? '' : 'localBgColor'" class="logo">
				<a href="/login" style="color: #003a53">
					<span v-if="process === 'production'">SKLMNO</span>
					<span v-else>테스트</span>
				</a>
			</h1>
		</header>
		<section>
			<div class="w1000">
				<div class="mt40">
					<h2 class="signFont1 boldWt mainBlack2 signUpTitle">회원가입</h2>
				</div>

				<div>
					<div class="title">
						<h3 class="mt20 mainBlack2">지점 정보</h3>
					</div>
					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td class="w140 h50 padW20">
									영업점명<span class="redfont">*</span>
								</td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.saleStoreName"
										@change="saleStoreNameChangeCheck"
									/>
									<button
										class="borderRadi3Px h36 w70 backColorGray2 mainWhite ml5 subFontS11"
										@click="storeNameExistsData()"
									>
										중복검사
									</button>
									<span v-if="storeNameCheckMsg">
										<span
											class="disIn ml20"
											:class="existsCheckClass(storeNameCheck)"
										>
											{{ storeNameCheckMsg }}
										</span>
									</span>
								</td>
							</tr>
							<tr>
								<td class="w140 h50 padW20">
									사업자번호<span class="redfont">*</span>
								</td>
								<td>
									<input
										type="text"
										class="w60 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.bizNoFront"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="3"
										@change="bizNoChangeCheck"
									/>
									-
									<input
										type="text"
										class="w50 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.bizNoMiddle"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="2"
										@change="bizNoChangeCheck"
									/>
									-
									<input
										type="text"
										class="w70 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.bizNoBack"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="4"
										@change="bizNoChangeCheck"
									/>
									<button
										class="borderRadi3Px h36 w70 backColorGray2 mainWhite ml5 subFontS11"
										@click="biznoExistsData()"
									>
										중복검사
									</button>
									<span v-if="bizNoCheckMsg">
										<span
											class="disIn ml20"
											:class="existsCheckClass(bizNoCheck)"
										>
											{{ bizNoCheckMsg }}
										</span>
									</span>
								</td>
							</tr>
							<tr>
								<td class="w140 h50 padW20">
									대표자명<span class="redfont">*</span>
								</td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.ceoName"
									/>
								</td>
							</tr>
							<tr>
								<td class="h50 padW20">반품주소</td>
								<td class="signUpPost">
									<div class="disFx">
										<input
											type="text"
											placeholder="우편번호"
											@click="postDialog = !postDialog"
											readonly
											:postDialog="postDialog"
											class="w120 borderContColor1 borderRadi3Px h36 outLineNone padW10 mr5"
											v-model.trim="formData.saleStore.returnZipCode"
										/>
										<post-api
											@postapi="addressData"
											:postDialog="postDialog"
											@closeDialog="dialogClose"
										></post-api>
										<input
											type="text"
											placeholder="기본주소"
											@click="postDialog = !postDialog"
											readonly
											class="w290 borderContColor1 borderRadi3Px h36 outLineNone padW10 ml10"
											:postDialog="postDialog"
											v-model.trim="formData.saleStore.returnAddr"
										/>
										<input
											type="text"
											placeholder="상세주소 입력"
											class="w290 borderContColor1 borderRadi3Px h36 outLineNone padW10 ml5"
											v-model.trim="formData.saleStore.returnAddrDetail"
										/>
									</div>
								</td>
							</tr>
							<tr>
								<td class="h50 padW20">통신사</td>
								<td>
									<div class="disFx">
										<div class="radioStyleTable w20 ml20">
											<input
												type="radio"
												id="ModalSKTTel"
												name="telecom"
												value="5"
												v-model.trim="formData.saleStore.telecom"
											/><label for="ModalSKTTel">SKT</label>
										</div>
										<div class="radioStyleTable w20 ml40">
											<input
												type="radio"
												id="ModalKTTel"
												name="telecom"
												value="6"
												v-model.trim="formData.saleStore.telecom"
											/><label for="ModalKTTel">KT</label>
										</div>
										<div class="radioStyleTable w20 ml40">
											<input
												type="radio"
												id="ModalLGUTel"
												name="telecom"
												value="7"
												v-model.trim="formData.saleStore.telecom"
											/><label for="ModalLGUTel">LGU</label>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>

					<div class="title">
						<h3 class="mt30 mb10 mainBlack2">지점 담당자</h3>
					</div>
					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td class="w140 h50 padW20">
									담당자명<span class="redfont">*</span>
								</td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.chargerName"
									/>
								</td>
							</tr>
							<tr>
								<td>담당자 연락처<span class="redfont">*</span></td>
								<td>
									<input
										type="text"
										class="w50 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.chargerPhone1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="3"
									/>
									-
									<input
										type="text"
										class="w60 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.chargerPhone2"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="4"
									/>
									-
									<input
										type="text"
										class="w60 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.chargerPhone3"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="4"
									/>
								</td>
							</tr>
							<tr>
								<td>담당자 이메일<span class="redfont">*</span></td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.saleStore.chargerEmail"
									/>
								</td>
							</tr>
						</table>
					</div>

					<div
						class="title disFx mt30 mb10 mainBlack2 justify-md-space-between"
					>
						<h3>로그인 계정</h3>
						<div class="checkStyleCont5 floatL ml20">
							<input
								class="checkStyle"
								id="a1982"
								type="checkbox"
								v-model.trim="checked"
								@change="checkSameInfo"
							/>
							<label for="a1982" style="font-size: 12px"
								>지점 담당자 정보와 동일</label
							>
						</div>
					</div>
					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td class="w140 h50 padW20">
									계정명<span class="redfont">*</span>
								</td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										@change="userNameChangeCheck"
										v-model.trim="formData.member.username"
									/>
									<button
										class="borderRadi3Px h36 w70 backColorGray2 mainWhite ml5 subFontS11"
										@click="userNameExistsData()"
									>
										중복검사
									</button>
									<span v-if="userNameCheckMsg">
										<span
											class="disIn ml20"
											:class="existsCheckClass(userNameCheck)"
										>
											{{ userNameCheckMsg }}
										</span>
									</span>
								</td>
							</tr>
							<tr>
								<td>비밀번호<span class="redfont">*</span></td>
								<td>
									<input
										type="password"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.member.password"
										@input="passwordCheck1()"
									/>
								</td>
							</tr>
							<tr>
								<td>비밀번호 확인<span class="redfont">*</span></td>
								<td>
									<input
										type="password"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="passwordChk"
										@input="passwordCheck2()"
									/>
									<span v-if="passwordChk">
										<span
											class="disIn ml20"
											:class="existsCheckClass(passwordCheck)"
										>
											{{ passwordMsg }}
										</span>
									</span>
								</td>
							</tr>
							<tr>
								<td>사용자명<span class="redfont">*</span></td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.member.name"
									/>
								</td>
							</tr>
							<tr>
								<td>연락처<span class="redfont">*</span></td>
								<td>
									<input
										type="text"
										class="w40 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.member.phone1"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="3"
									/>
									-
									<input
										type="text"
										class="w60 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.member.phone2"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="4"
									/>
									-
									<input
										type="text"
										class="w60 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.member.phone3"
										oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										maxlength="4"
									/>
								</td>
							</tr>
							<tr>
								<td>이메일<span class="redfont">*</span></td>
								<td>
									<input
										type="text"
										class="w280 borderRadi3Px borderContColor1 h36 outLineNone padW10"
										v-model.trim="formData.member.email"
									/>
								</td>
							</tr>
						</table>
					</div>
				</div>

				<!--						<tr>
							<th><span class="redfont">*</span>비밀번호</th>
							<td>
								<v-text-field
									class="input_custom1"
									type="password"
									outlined
									v-model.trim="formData.member.password"
									@change="passwordCheck1($event)"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>비밀번호 확인</th>
							<td>
								<v-text-field
									class="input_custom1"
									type="password"
									outlined
									@change="passwordCheck2($event)"
									v-model.trim="passwordChk"
								></v-text-field>
								<span v-if="passwordChk">
									<p :class="existsCheckClass(passwordCheck)">
										{{ passwordMsg }}
									</p>
								</span>
							</td>
						</tr>-->

				<!-- <div class="deliveryInfo">
                    <div class="title">
						<h3>- 택배 정보</h3>
					</div>
                    <table>
                        <tr>
                            <th>택배업체</th>
                            <td>우체국택배</td>
                        </tr>
                        <tr>
                            <th>회원아이디</th>
                            <td>
                                <v-text-field class="input_custom1" outlined></v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <th>회원번호</th>
                            <td>
                                <v-text-field class="input_custom1" outlined></v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <th>계약승인번호</th>
                            <td>
                                <v-text-field class="input_custom1" outlined></v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <th>API SECURITY SEED KEY</th>
                            <td>
                                <v-text-field class="input_custom1" outlined></v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <th>API SECURITY AUTH KEY</th>
                            <td>
                                <v-text-field class="input_custom1" outlined></v-text-field>
                            </td>
                        </tr>
                    </table>
                </div> -->
				<div class="btnCont disFx justify-end">
					<button
						class="w180 h60 backColorBlue2 mainWhite boldWt borderRadi3Px mt30 mb100"
						@click="submit"
					>
						회원가입
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import PostApi from '../../components/PostApi.vue';
import { existsData, signUp, signUpStore } from '../../api/member/login';
import { nullValidation, validateEmail } from '../../common/common';

export default {
	components: {
		PostApi,
	},
	data() {
		return {
			process: '',
			checked: false,
			postDialog: false,
			storeNameCheck: 0,
			storeNameCheckMsg: '',
			userNameCheck: 0,
			userNameCheckMsg: '',
			bizNoCheck: 0,
			bizNoCheckMsg: '',
			passwordCheck: 0,
			passwordMsg: '',
			passwordChk: '',
			formData: {
				saleStore: {
					saleStoreName: '',
					bizNo: '',
					bizNoFront: '',
					bizNoMiddle: '',
					bizNoBack: '',
					ceoName: '',
					returnZipCode: '',
					returnAddr: '',
					returnAddrDetail: '',
					telecom: 5,
					chargerName: '',
					chargerPhone1: '',
					chargerPhone2: '',
					chargerPhone3: '',
					chargerEmail: '',
				},
				member: {
					username: '',
					password: '',
					name: '',
					phone1: '',
					phone2: '',
					phone3: '',
					email: '',
				},
			},
		};
	},
	methods: {
		dialogClose(data) {
			this.postDialog = data;
		},
		addressData(data) {
			this.formData.saleStore.returnAddr = data.address;
			this.formData.saleStore.returnZipCode = data.zonecode;
		},
		saleStoreNameChangeCheck() {
			this.storeNameCheck = false;
			this.storeNameCheckMsg = '중복검사를 진행해주십시오.';
		},
		bizNoChangeCheck() {
			this.bizNoCheck = false;
			this.bizNoCheckMsg = '중복검사를 진행해주십시오.';
		},
		userNameChangeCheck() {
			this.userNameCheck = false;
			this.userNameCheckMsg = '중복검사를 진행해주십시오.';
		},
		async storeNameExistsData() {
			if (!this.formData.saleStore.saleStoreName) {
				alert('영업점명을 입력해주세요');
				return;
			}
			let data = {
				storeName: this.formData.saleStore.saleStoreName,
			};
			const result = await existsData(data);
			if (result.data.resultCode === '9000') {
				this.storeNameCheck = true;
				this.storeNameCheckMsg = '사용가능한 영업점명 입니다.';
				return true;
			} else {
				this.storeNameCheck = false;
				this.storeNameCheckMsg = '이미 존재하는 영업점명 입니다.';
				return false;
			}
		},
		async userNameExistsData() {
			if (!this.formData.member.username) {
				alert('계정명을 입력해주세요');
				return;
			}
			let data = {
				userName: this.formData.member.username,
			};
			const result = await existsData(data);
			if (result.data.resultCode === '9000') {
				this.userNameCheck = true;
				this.userNameCheckMsg = '사용가능한 계정명 입니다.';
				return true;
			} else {
				this.userNameCheck = false;
				this.userNameCheckMsg = '이미 존재하는 계정명 입니다.';
				return false;
			}
		},
		async biznoExistsData() {
			let formdata = {
				bizNoFront: this.formData.saleStore.bizNoFront,
				bizNoMiddle: this.formData.saleStore.bizNoMiddle,
				bizNoBack: this.formData.saleStore.bizNoBack,
			};
			if (!nullValidation(formdata)) {
				return;
			}
			let data = {
				bizNo:
					this.formData.saleStore.bizNoFront +
					this.formData.saleStore.bizNoMiddle +
					this.formData.saleStore.bizNoBack,
			};
			const result = await existsData(data);
			if (result.data.resultCode === '9000') {
				this.bizNoCheck = true;
				this.bizNoCheckMsg = '사용가능한 사업자번호 입니다.';
				return true;
			} else {
				this.bizNoCheck = false;
				this.bizNoCheckMsg = '중복된 사업자번호 입니다.';
				return false;
			}
		},
		passwordCheck1() {
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			if (this.passwordChk === this.formData.member.password) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		passwordCheck2() {
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			if (this.formData.member.password === this.passwordChk) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		async submit() {
			if (!this.storeNameCheck) {
				alert('영업점명 중복검사를 해주세요.');
				return;
			}
			if (!this.bizNoCheck) {
				alert('사업자번호 중복검사를 해주세요.');
				return;
			}
			this.formData.saleStore.bizNo =
				this.formData.saleStore.bizNoFront +
				this.formData.saleStore.bizNoMiddle +
				this.formData.saleStore.bizNoBack;
			if (
				!nullValidation(this.formData.saleStore, [
					'bizNo',
					'returnZipCode',
					'returnAddr',
					'returnAddrDetail',
					'telecom',
				])
			) {
				return;
			}
			if (!this.userNameCheck) {
				alert('계정명 중복검사를 해주세요.');
				return;
			}
			if (!nullValidation(this.formData.member)) {
				return;
			}
			if (!this.passwordCheck) {
				alert('비밀번호를 확인해주세요.');
				return;
			}
			if (
				this.formData.member.email &&
				!validateEmail(this.formData.member.email)
			) {
				return;
			}
			if (!validateEmail(this.formData.saleStore.chargerEmail)) {
				return;
			}
			let result;
			if (window.location.pathname === '/store/sign-up') {
				let path = `Bearer ${this.$route.query.at}`;
				result = await signUpStore(this.formData, path);
			} else {
				result = await signUp(this.formData);
			}
			if (result.data.resultCode === '0000') {
				alert('가입되었습니다.');
				location.replace('/login');
				await this.$router.replace('login');
			} else {
				alert(`알수없는 오류가 발생했습니다.`);
			}
		},
		existsCheckClass(data) {
			if (data) {
				return 'font-blue';
			} else {
				return 'font-red';
			}
		},
		checkSameInfo() {
			let same = this.checked;
			if (same) {
				this.formData.member.name = this.formData.saleStore.chargerName;
				this.formData.member.phone1 = this.formData.saleStore.chargerPhone1;
				this.formData.member.phone2 = this.formData.saleStore.chargerPhone2;
				this.formData.member.phone3 = this.formData.saleStore.chargerPhone3;
				this.formData.member.email = this.formData.saleStore.chargerEmail;
			} else {
				this.formData.member.name = '';
				this.formData.member.phone1 = '';
				this.formData.member.phone2 = '';
				this.formData.member.phone3 = '';
				this.formData.member.email = '';
			}
		},
	},
	created() {
		this.process = process.env.VUE_APP_NAME;
	},
};
</script>

<style>
.signUpTitle {
	padding-bottom: 20px;
	border-bottom: 3px solid #333333;
}

header {
	width: 100%;
	border-bottom: 1px solid #bebebe;
	box-shadow: 3px 3px 3px #bebebe;
}
h1 {
	margin-left: 10px;
	font-style: italic;
	font-weight: bold;
	font-size: 30px;
	color: #003a53;
}
section {
	width: 1000px;
	margin: 0 auto;
}
section .signForm {
	margin-top: 30px;
}
section .signForm .btnCont {
	margin-top: 10px;
	display: flex;
	justify-content: center;
}
section .signForm > .title {
	border-bottom: 2px solid #000;
}
section .signForm .title h2 {
	font-size: 25px;
}
section .spotInfo .title {
	margin-top: 10px;
	font-size: 20px;
}
section .signForm table {
	width: 100%;
}
section .signForm table,
section .signForm tr,
section .signForm td,
section .signForm th {
	border: 1px solid #bebebe;
}
section .signForm th {
	background-color: #dedede;
	width: 300px;
}
section .signForm td {
	padding: 5px 10px;
	line-height: 30px;
}
.fileInput .v-input__control {
	height: 30px !important;
}
.fileInput .v-input__slot {
	min-height: 30px !important;
}
.fileInput label {
	font-size: 14px;
	top: 7px !important;
}
.mdi:before,
.mdi-set {
	font-size: 20px;
}
.fileInput .v-input__icon {
	width: 10px;
	height: 13px;
}
.spotManagerInfo,
.loginInfo,
.deliveryInfo {
	margin-top: 10px;
}
.loginInfo h3 {
	display: inline;
	float: left;
	margin-right: 16px;
}
.sameInfoCheckbox {
	border: none;
}
.sameInfoCheckbox input {
	transform: translateY(-5%);
}
.sameInfoCheckbox label {
	margin-left: 4px;
	vertical-align: top;
	font-size: 12px;
	letter-spacing: 0px;
	word-spacing: -0.5px;
}
.localBgColor {
	background-color: gold;
}
.signUpPost .v-btn {
	width: 73px;
}
.signUpPost button {
	box-shadow: none;
	border: 0;
	background-color: #0037a1 !important;
}
</style>
