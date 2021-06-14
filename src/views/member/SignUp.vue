<template>
	<div>
		<header>
			<h1 class="logo"><a href="/login" style="color: #003a53">SKLMNO</a></h1>
		</header>
		<section>
			<div class="signForm">
				<div class="title">
					<h2>회원가입</h2>
				</div>
				<div class="spotInfo">
					<div class="title">
						<h3>- 지점 정보</h3>
					</div>
					<table>
						<tr>
							<th><span class="redfont">*</span>영업점명</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									style="display: inline-block"
									v-model.trim="formData.saleStore.saleStoreName"
									@change="saleStoreNameChangeCheck"
								></v-text-field>
								<v-btn style="margin-left: 10px" @click="storeNameExistsData()"
									>중복검사</v-btn
								>
								<span v-if="storeNameCheckMsg">
									<p :class="existsCheckClass(storeNameCheck)">
										{{ storeNameCheckMsg }}
									</p>
								</span>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>사업자번호</th>
							<td style="border: 0px">
								<v-text-field
									style="width: 80px; float: left"
									class="input_custom1"
									outlined
									maxlength="3"
									placeholder="3자리"
									v-model.trim="formData.saleStore.bizNoFront"
									@change="bizNoChangeCheck"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								></v-text-field>
								<v-text-field
									style="width: 70px; margin-left: 5px; float: left"
									class="input_custom1"
									outlined
									maxlength="2"
									placeholder="2자리"
									v-model.trim="formData.saleStore.bizNoMiddle"
									@change="bizNoChangeCheck"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								></v-text-field>
								<v-text-field
									style="width: 150px; margin-left: 5px; float: left"
									class="input_custom1"
									outlined
									maxlength="5"
									placeholder="5자리"
									v-model.trim="formData.saleStore.bizNoBack"
									@change="bizNoChangeCheck"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								></v-text-field>
								<v-btn style="margin-left: 10px" @click="biznoExistsData()"
									>중복검사</v-btn
								>
								<div>
									<span v-if="bizNoCheckMsg">
										<p :class="existsCheckClass(bizNoCheck)">
											{{ bizNoCheckMsg }}
										</p>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>대표자명</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.saleStore.ceoName"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th>반품 주소</th>
							<td>
								<div id="addressCont">
									<input
										type="text"
										placeholder="우편번호"
										id="postcode"
										@click="postDialog = !postDialog"
										readonly
										:postDialog="postDialog"
										class="cur_p"
										v-model.trim="formData.saleStore.returnZipCode"
									/>
									<input
										type="text"
										placeholder="기본주소"
										id="roadAddress"
										@click="postDialog = !postDialog"
										readonly
										class="cur_p"
										:postDialog="postDialog"
										v-model.trim="formData.saleStore.returnAddr"
									/>
									<post-api
										@postapi="addressData"
										:postDialog="postDialog"
										@closeDialog="dialogClose"
									></post-api>
									<input
										type="text"
										placeholder="상세주소 입력"
										id="detailAddress"
										v-model.trim="formData.saleStore.returnAddrDetail"
									/>
								</div>
							</td>
						</tr>
						<tr>
							<th>통신사</th>
							<td>
								<div class="labelCont">
									<input
										type="radio"
										id="ModalSKTTel"
										name="telecom"
										value="5"
										v-model.trim="formData.saleStore.telecom"
									/><label for="ModalSKTTel">SKT</label>
									<input
										type="radio"
										id="ModalKTTel"
										name="telecom"
										value="6"
										v-model.trim="formData.saleStore.telecom"
									/><label for="ModalKTTel">KT</label>
									<input
										type="radio"
										id="ModalLGUTel"
										name="telecom"
										value="7"
										v-model.trim="formData.saleStore.telecom"
									/><label for="ModalLGUTel">LGU</label>
								</div>
							</td>
						</tr>
						<!-- <tr>
							<th>ictmarket(사전승락인증) 번호</th>
							<td>
								<v-text-field class="input_custom1" outlined></v-text-field>
							</td>
						</tr>
						<tr>
							<th>ictmarket(사전승락인증) 이미지 파일</th>
							<td class="fileInput">
								<v-file-input
									label="파일 선택"
									outlined
									dense
									style="width: 250px; height: 30px"
								></v-file-input>
							</td>
						</tr>
						<tr>
							<th>지점 LOGO 이미지 파일</th>
							<td class="fileInput">
								<v-file-input
									label="파일 선택"
									outlined
									dense
									style="width: 250px; height: 30px"
								></v-file-input>
							</td>
						</tr> -->
					</table>
				</div>
				<div class="spotManagerInfo">
					<div class="title">
						<h3>- 지점 담당자</h3>
					</div>
					<table>
						<tr>
							<th><span class="redfont">*</span>담당자명</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.saleStore.chargerName"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>담당자 연락처</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.saleStore.chargerPhone1"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="3"
									style="width: 50px; float: left"
								></v-text-field>
								<span
									style="
										display: inline-block;
										float: left;
										margin: 0 3px;
										color: #aaa;
									"
								>
									-
								</span>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.saleStore.chargerPhone2"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 90px; float: left"
								></v-text-field>
								<span
									style="
										display: inline-block;
										float: left;
										margin: 0 3px;
										color: #aaa;
									"
								>
									-
								</span>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.saleStore.chargerPhone3"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 90px; float: left"
								></v-text-field>
							</td>
						</tr>

						<tr>
							<th><span class="redfont">*</span>담당자 이메일</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.saleStore.chargerEmail"
								></v-text-field>
							</td>
						</tr>
					</table>
				</div>

				<div class="loginInfo">
					<div class="title">
						<h3>- 로그인 계정</h3>
						<fieldset class="sameInfoCheckbox">
							<input
								id="sameInfo"
								type="checkbox"
								v-model.trim="checked"
								@change="checkSameInfo"
							/>
							<label for="sameInfo">지점 담당자 정보와 동일</label>
						</fieldset>
					</div>
					<table>
						<tr>
							<th><span class="redfont">*</span>계정명</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									style="display: inline-block"
									@change="userNameChangeCheck"
									v-model.trim="formData.member.username"
								></v-text-field>
								<v-btn style="margin-left: 10px" @click="userNameExistsData()"
									>중복검사</v-btn
								>
								<span v-if="userNameCheckMsg">
									<p :class="existsCheckClass(userNameCheck)">
										{{ userNameCheckMsg }}
									</p>
								</span>
							</td>
						</tr>
						<tr>
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
								<span v-if="passwordMsg">
									<p :class="existsCheckClass(passwordCheck)">
										{{ passwordMsg }}
									</p>
								</span>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>사용자명</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.member.name"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>연락처</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.member.phone1"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="3"
									style="width: 50px; float: left"
								></v-text-field>
								<span
									style="
										display: inline-block;
										float: left;
										margin: 0 3px;
										color: #aaa;
									"
								>
									-
								</span>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.member.phone2"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 90px; float: left"
								></v-text-field>
								<span
									style="
										display: inline-block;
										float: left;
										margin: 0 3px;
										color: #aaa;
									"
								>
									-
								</span>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.member.phone3"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 90px; float: left"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th><span class="redfont">*</span>이메일</th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.member.email"
								></v-text-field>
							</td>
						</tr>
					</table>
				</div>
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
				<div class="btnCont">
					<v-btn @click="submit">회원가입</v-btn>
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
		passwordCheck1(data) {
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지않습니다.';
			if (this.passwordChk === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		passwordCheck2(data) {
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지않습니다.';
			if (this.formData.member.password === data) {
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
				console.log(this.formData);
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
				console.log(path);
				result = await signUpStore(this.formData, path);
			} else {
				result = await signUp(this.formData);
			}
			if (result.data.resultCode === '0000') {
				alert('가입되었습니다.');
				location.replace('/login');
				await this.$router.replace('login');
			} else {
				console.log(result.data.status);
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
};
</script>

<style>
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
</style>
