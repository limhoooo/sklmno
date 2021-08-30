<template>
	<div class="changeUserInfo">
		<section>
			<div class="signForm">
				<div class="title">
					<h2>비밀번호 수정</h2>
					<span v-if="this.pu === 'N'" style="font-size: 14px; color: #dd0000"
						>최초 로그인 사용자입니다. 비밀번호 변경 후 재로그인 해주세요.</span
					>
				</div>
				<div class="loginInfo">
					<div class="title"></div>
					<table>
						<tr>
							<th>현재 비밀번호</th>
							<td>
								<v-text-field
									class="input_custom1"
									type="password"
									outlined
									style="display: inline-block"
									v-model.trim="formData.oriPw"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th>새 비밀번호</th>
							<td>
								<div class="disFX">
									<v-text-field
										class="input_custom1"
										type="password"
										outlined
										v-model.trim="formData.newPw1"
										@input="passwordCheck1($event)"
										style="flex: none"
									></v-text-field>
									<span
										v-if="validCheck"
										class="checkTag"
										style="color: #0037a1"
										>사용가능</span
									>
									<span
										v-if="!validCheck"
										class="checkTag"
										style="color: #dd0000"
										>사용불가</span
									>
								</div>
								<span
									style="
										font-size: 12px;
										color: #9e9e9e;
										letter-spacing: normal;
									"
								>
									※ 8~20자의 영문, 숫자, 특수문자 사용
								</span>
							</td>
						</tr>
						<tr>
							<th>새 비밀번호 확인</th>
							<td>
								<v-text-field
									class="input_custom1"
									type="password"
									outlined
									@input="passwordCheck2($event)"
									v-model.trim="passwordChk"
								></v-text-field>
								<span v-if="passwordChk">
									<p
										:class="existsCheckClass(passwordCheck)"
										style="font-size: 12px"
									>
										{{ passwordMsg }}
									</p>
								</span>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnCont mt20" style="display: flex; justify-content: center">
				<v-btn
					style="background: #0037a1; color: #fff; margin-right: 4px"
					@click="updatePwd"
					>수정</v-btn
				>
				<v-btn
					v-if="this.pu === 'Y'"
					style="background: #fefefe"
					@click="goToPrev()"
				>
					취소
				</v-btn>
			</div>
		</section>
	</div>
</template>

<script>
import {nullValidation2} from '../../common/common';
import {updatePassword} from '../../api/member/login';

export default {
	components: {},
	data() {
		return {
			process: '',
			validCheck: false,
			passwordCheck: false,
			passwordMsg: '',
			passwordChk: '',
			formData: {
				oriPw: '',
				newPw1: '',
				newPw2: '',
			},
		};
	},
	computed: {
		pu() {
			return this.$store.state.pu;
		},
	},
	methods: {
		goToPrev() {
			this.$router.go(-1);
		},
		existsCheckClass(data) {
			if (data) {
				return 'font-blue';
			} else {
				return 'font-red';
			}
		},
		passwordCheck1(data) {
			this.checkPwd() ? (this.validCheck = true) : (this.validCheck = false);
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			if (this.passwordChk === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		passwordCheck2(data) {
			this.formData.newPw2 = data;
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			if (this.formData.newPw1 === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		async updatePwd() {
			if (!nullValidation2(this.formData, ['oriPw', 'newPw1', 'newPw2'])) {
				return;
			}
			if (!this.passwordCheck) {
				alert('비밀번호를 확인해주세요.');
				return;
			}
			let validPwd = this.checkPwd();
			if (!validPwd) {
				alert(
					'비밀번호는 8~20자이어야 하며, \n 영문, 숫자, 특수문자 모두를 포함해야 합니다.',
				);
				return;
			}
			if (confirm('수정하시겠습니까?')) {
				let result = await updatePassword(this.formData);
				if (result && result.data.resultCode === '0000') {
					alert('변경되었습니다.');
					//어디로 튕길지 분기태우기
					if (this.pu === 'Y') {
						this.goToPrev();
					} else {
						await this.$router.replace('/login');
					}
				} else if (result && result.data.resultCode === '9005') {
					alert(result.data.resultMsg);
				} else {
					alert(result.data.resultMsg);
				}
			}
		},
		checkPwd() {
			let reg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
			let pwd = this.formData.newPw1;
			return true === reg.test(pwd);
		},
	},
	created() {},
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
	background-color: #fff;
	padding: 5px 10px;
	line-height: 30px;
}

.loginInfo {
	margin-top: 10px;
}
.loginInfo h3 {
	display: inline;
	float: left;
	margin-right: 16px;
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
.checkTag {
	margin-left: 8px;
	font-size: 12px;
}
</style>
