<template>
	<div class="loginWrap">
		<div>
			<div class="login">
				<h2>SKLMNO</h2>
				<div class="loginBox">
					<form class="loginInputBox clearfix" @keyup.enter="submit">
						<div class="idBox">
							<input type="text" v-model.trim="username" />
						</div>
						<div class="pwBox mt10">
							<input type="password" v-model.trim="password" />
						</div>
					</form>
					<div class="loginBtnBox">
						<a class="loginBtn" @click="submit">로그인</a>
					</div>
					<div class="loginBoxBottom"></div>
					<div class="registerBox">
						<p class="font-red">{{ errorMsg }}</p>
					</div>
					<div class="signUpCont">
						<router-link to="/sign-up" class="signUpBtn" style="color: white"
							>회원가입</router-link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { loginSubmit } from '../../api/member/login';
import { nullValidation } from '../../common/common';

export default {
	data() {
		return {
			username: '',
			password: '',
			errorMsg: '',
		};
	},
	methods: {
		async submit() {
			try {
				const data = {
					username: this.username,
					password: this.password,
				};
				if (!nullValidation(data)) {
					return;
				}
				const result = await loginSubmit(data);
				if (result.data.resultCode === '0000') {
					await this.$store.dispatch('LOGIN', result.data.data);
					await this.$router.push('/dashboard');
				} else if (result.data.resultCode === '9999') {
					this.errorMsg = '아이디 또는 비밀번호가 일치하지않습니다.';
				} else if (result.data.resultCode === '9003') {
					this.errorMsg = '관리점 담당자에게 승인되지 않은 사용자입니다.';
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		console.log(process.env.VUE_APP_SERVER);
	},
};
</script>

<style>
.login h2 {
	font-style: italic;
	font-size: 50px;
	color: #003a53;
	font-weight: bold;
}
.signUpCont a {
	color: #fff;
	padding: 5px 50px;
	background-color: #003a53;
}
</style>
