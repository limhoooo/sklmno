<template>
	<div class="loginWrap">
		<div>
			<div class="login">
				<h2 class="LogoImg"></h2>
				<div class="loginBox">
					<form class="loginInputBox clearfix" @keyup.enter="submit">
						<div class="idBox borderRadi3Px h55 w350">
							<input
								class="subFontS padW20 outLineNone"
								type="text"
								v-model.trim="username"
								placeholder="아이디"
							/>
						</div>
						<div class="pwBox mt10 borderRadi3Px h55 w350">
							<input
								class="subFontS padW20 outLineNone"
								type="password"
								v-model.trim="password"
								placeholder="비밀번호"
								@input="resetErrorMsg"
							/>
						</div>
					</form>
					<div class="loginBtnBox">
						<a
							class="loginBtn w350 h55 borderRadi3Px backColorBlue2 boldWt lh30"
							@click="submit"
							>로그인</a
						>
					</div>
					<div class="loginBoxBottom"></div>
					<div class="registerBox borderReset">
						<p class="font-red">{{ errorMsg }}</p>
					</div>
					<div>
						<!--						<span class="fakeLine3">
							<router-link class="subFontS12 mainBlack mr30" to="/sign-up"
								>아이디 찾기</router-link
							>
						</span>
						<span class="fakeLine3">
							<router-link class="subFontS12 mainBlack mr30" to="/sign-up"
								>비밀번호 찾기</router-link
							>
						</span>-->
						<router-link class="subFontS12" to="/sign-up">회원가입</router-link>
					</div>
				</div>
			</div>
		</div>
		<div id="copyRight">
			<div class="copyRightCont disFx">
				<div class="copyLogoCont"></div>
				<div class="ml30">
					<!--					<div>
						<span class="fakeLine2"
							><a class="subFontS12 mainBlack2">이용약관</a></span
						><a class="subFontS12 mainBlack2 ml30">개인정보취급방침</a>
					</div>-->
					<div class="subFontS11 mainBlack3 mt15 lh20">
						<div>
							<span>상호 : 주식회사 대마</span>
							<span class="ml10">사업자 등록번호: 264-81-51441</span>
							<span class="ml10">
								통신판매업 신고번호 : 제2020-경기시흥-2777호
							</span>
						</div>
						<div>
							<span>
								주소 : 경기도 시흥시 서울대학로278번길 19-14 배곧프라자 706호
							</span>
							<span class="ml10">대표이사 : 송대호</span>
						</div>
						<div class="boldWt">
							<span>TEL : 1833-9413</span>
							<span class="ml10">FAX : 070-8680-9413</span>
						</div>
					</div>
					<div class="boldWt subFontS11 mt15">
						Copyright © DAEMA. All rights reserved
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
	computed: {
		sct() {
			return this.$store.state.sct;
		},
		pu() {
			return this.$store.state.pu;
		},
	},
	methods: {
		resetErrorMsg() {
			if (this.errorMsg) {
				this.errorMsg = '';
			}
		},
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
					if (this.pu === 'N') {
						await this.$router.push('/change-password');
					} else {
						if (this.sct === 'CWS' || this.sct === 'CS') {
							await this.$router.push('/sell-status');
						} else if (this.sct === 'CW') {
							await this.$router.push('/device/normal-in-stock');
						} else {
							await this.$router.push('/dashboard');
						}
						// history.pushState(null, null, location.href);
						// window.onpopstate = function () {
						// 	history.go(1);
						// };
					}
				} else if (result.data.resultCode === '9999') {
					this.errorMsg = '아이디 또는 비밀번호가 일치하지 않습니다.';
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
.LogoImg {
	margin: 0 auto;
	width: 300px;
	height: 50px;
	background-image: url('../../assets/img/SKLMNO.png');
}
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
#copyRight {
	position: fixed;
	background-color: #f6f6f6;
	height: 400px;
}
.copyRightCont {
	width: 650px;
	margin: 30px auto;
	height: 110px;
}
.copyLogoCont {
	width: 100px;
	height: 17px;
	margin: auto 0;
	background-image: url('../../assets/img/SKLMNO_gray1.png');
}
</style>
