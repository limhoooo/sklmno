<template>
	<div>
		<section>
			<div class="signForm changeInfo">
				<div class="title">
					<h2>회원정보 수정</h2>
				</div>
				<form>
					<table>
						<tr>
							<th>사용자명</th>
							<td>
								<p>{{ formData.name }}</p>
							</td>
						</tr>
						<tr>
							<th>연락처</th>
							<td>
								<input
									class="input_custom1"
									v-model.trim="formData.phone1"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="3"
									style="width: 46px; float: left"
									:disabled="!modifyState"
								/>
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
								<input
									class="input_custom1"
									v-model.trim="formData.phone2"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 50px; float: left"
									:disabled="!modifyState"
								/>
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
								<input
									type="text"
									class="input_custom1"
									v-model.trim="formData.phone3"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 50px; float: left"
									:disabled="!modifyState"
								/>
							</td>
						</tr>
						<tr>
							<th>이메일</th>
							<td>
								<input
									class="input_custom1"
									style="display: inline-block; width: 240px"
									v-model.trim="formData.email"
									:disabled="!modifyState"
								/>
							</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td>
								<router-link
									class="btnDefault"
									style="
										background-color: #0037a1;
										color: white;
										padding: 6px 12px;
									"
									to="/change-password"
									v-if="!modifyState"
								>
									비밀번호 수정
								</router-link>
							</td>
						</tr>
					</table>
					<div class="btnCont">
						<v-btn
							v-if="!modifyState"
							style="background: #fff"
							@click="modifyState = !modifyState"
							>정보수정</v-btn
						>
						<v-btn
							v-if="role === 'M'"
							class="btnDefault ml10"
							style="background-color: #0037a1; color: white; padding: 6px 12px"
              @click="maskingFnc()"
							>마스킹변경</v-btn
						>
						<v-btn
							v-if="modifyState"
							style="background: #0037a1; color: #fff; margin-right: 4px"
							@click="updateInfo"
							>수정</v-btn
						>
						<v-btn
							v-if="modifyState"
							style="background: #fff"
							@click="modifyState = !modifyState"
							>취소</v-btn
						>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import {getUserInfo, updateUserInfo} from '../../api/member/login';
import {nullValidation2, validateEmail} from '../../common/common';

export default {
	data() {
		return {
		  role: '',
			modifyState: false,
			userNameCheck: false,
			userNameCheckMsg: '',
			passwordCheck: false,
			passwordMsg: '',
			passwordChk: '',
			formData: {
				storeId: 0,
				storeName: '',
				orgId: 0,
				orgName: '',
				username: '',
				password: '',
				name: '',
				phone1: '',
				phone2: '',
				phone3: '',
				email: '',
			},
		};
	},
	methods: {
		passwordCheck1(data) {
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			if (this.passwordChk === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		passwordCheck2(data) {
			let result = false;
			if (this.formData.password === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			} else {
				result = false;
				this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			}
			this.passwordCheck = result;
		},
		existsCheckClass(data) {
			if (data) {
				return 'font-blue';
			} else {
				return 'font-red';
			}
		},
		async getUserInfo() {
			let result = await getUserInfo();
			this.formData.storeId = result.data.data.storeId;
			this.formData.orgId = result.data.data.orgId;
			this.formData.name = result.data.data.name;
			this.formData.phone = result.data.data.phone;
			this.formData.phone1 = result.data.data.phone1;
			this.formData.phone2 = result.data.data.phone2;
			this.formData.phone3 = result.data.data.phone3;
			this.formData.email = result.data.data.email;
		},
		async updateInfo() {
			if (
				!nullValidation2(this.formData, ['phone1', 'phone2', 'phone3', 'email'])
			) {
				return;
			}
			if (
				this.formData.phone2.length !== 4 ||
				this.formData.phone3.length !== 4
			) {
				alert('연락처를 확인해주세요.');
				return;
			}
			if (this.formData.email && !validateEmail(this.formData.email)) {
				return;
			}
			if (confirm('수정하시겠습니까?')) {
				try {
					let data = {
						email: this.formData.email,
						phone1: this.formData.phone1,
						phone2: this.formData.phone2,
						phone3: this.formData.phone3,
					};
					const result = await updateUserInfo(data);
					if (result && '0000' === result.data.resultCode) {
						alert('변경되었습니다.');
						this.modifyState = !this.modifyState;
						await this.getUserInfo();
					}
				} catch (e) {
					alert('오류가 발생했습니다. 다시 시도해 주세요.');
					console.log(e);
				}
			}
		},
    async maskingFnc(){
		  if(confirm('마스킹 처리하시겠습니까?')){
      await this.$store.dispatch('maskingFnc');
      }
    }
	},
	async created() {
	  this.role = this.$store.state.role;
		await this.getUserInfo();
	},
};
</script>

<style scoped>
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
h3 {
	margin: 20px 0 5px;
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
	margin-top: 30px;
}
section .signForm table,
section .signForm tr,
section .signForm td,
section .signForm th {
	border: 1px solid #bebebe;
	height: 48px;
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
.changeInfo {
}
.changeInfo input {
	border: 1px solid #989898;
	border-radius: 3px;
	padding: 0 6px;
}
.changeInfo input:focus {
	outline: none;
}
.changeInfo input:disabled {
	border: none;
}
.btnCont {
	margin-top: 20px !important;
}
</style>
