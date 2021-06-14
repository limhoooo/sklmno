<template>
	<div>
		<header>
			<h1 class="logo"><a href="/login" style="color: #003a53">SKLMNO</a></h1>
		</header>
		<section>
			<div class="signForm">
				<div class="title">
					<h2>사용자 등록</h2>
				</div>
				<form>
					<h3>- 관리점 정보</h3>
					<table>
						<tr>
							<th>관리점명</th>
							<td>{{ this.storeName }}</td>
							<th>조직명</th>
							<td>{{ this.orgName }}</td>
						</tr>
					</table>
					<h3>- 필수입력정보</h3>
					<table>
						<tr>
							<th>계정명 <span class="redfont">*</span></th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									style="display: inline-block"
									@change="userNameChangeCheck"
									v-model="formData.username"
								></v-text-field>
								<v-btn class="ml10" @click="userNameExistsData">중복검사</v-btn>
								<span v-if="userNameCheckMsg">
									<p :class="existsCheckClass(userNameCheck)">
										{{ userNameCheckMsg }}
									</p>
								</span>
							</td>
						</tr>
						<tr>
							<th>비밀번호 <span class="redfont">*</span></th>
							<td>
								<v-text-field
									class="input_custom1"
									type="password"
									outlined
									style="display: inline-block"
									@change="passwordCheck1($event)"
									v-model.trim="formData.password"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th>비밀번호 확인 <span class="redfont">*</span></th>
							<td>
								<v-text-field
									class="input_custom1"
									type="password"
									outlined
									style="display: inline-block"
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
							<th>사용자명 <span class="redfont">*</span></th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									style="display: inline-block"
									v-model.trim="formData.name"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th>연락처 <span class="redfont">*</span></th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.phone1"
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
									v-model.trim="formData.phone2"
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
									v-model.trim="formData.phone3"
									oninput="this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="4"
									style="width: 90px; float: left"
								></v-text-field>
							</td>
						</tr>
						<tr>
							<th>이메일 <span class="redfont">*</span></th>
							<td>
								<v-text-field
									class="input_custom1"
									outlined
									style="display: inline-block"
									v-model.trim="formData.email"
								></v-text-field>
							</td>
						</tr>
					</table>
					<div class="btnCont">
						<v-btn @click="submit">등록</v-btn>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import {existsData, existsDataChk} from '../../api/member/login';
import {insertUser} from '../../api/common-mgmt/organization-mgmt/OrganizationMgmtApi.js';
import {nullValidation, validateEmail} from '../../common/common';

export default {
	props: ['at'],
	data() {
		return {
			userNameCheck: false,
			userNameCheckMsg: '',
			passwordCheck: false,
			passwordMsg: '',
			passwordChk: '',
			storeName: '',
			orgName: '',
			formData: {
				username: '',
				password: '',
				name: '',
				roleIds: [],
				phone1: '',
				phone2: '',
				phone3: '',
				email: '',
				userStatus: 1,
				storeId: '',
				orgId: '',
			},
		};
	},
	methods: {
		async fetchIds() {
			let data = {
				userInsToken: { userInsToken: '' },
				value: `Bearer ${this.$route.query.at}`,
			};
			const result = await existsDataChk(data);
			let fetchedIds = result.data.data;
			if (result) {
				this.storeName = fetchedIds.storeName;
				this.formData.storeId = fetchedIds.storeId;
				this.orgName = fetchedIds.orgName;
				this.formData.orgId = fetchedIds.orgId;
			}
		},
		async userNameExistsData() {
			if (!this.formData.username) {
				alert('계정명을 입력해주세요');
				return;
			}
			let data = {
				userName: this.formData.username,
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
		userNameChangeCheck() {
			this.userNameCheck = false;
			this.userNameCheckMsg = '중복검사를 진행해주십시오.';
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
			if (this.formData.password === data) {
				console.log('same');
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
				console.log('same');
			} else {
				result = false;
				this.passwordMsg = '비밀번호가 일치하지않습니다.';
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
		async submit() {
			try {
				if (!nullValidation(this.formData)) {
					return;
				}
				if (this.formData.email && !validateEmail(this.formData.email)) {
					return;
				}
				const result = await insertUser(this.formData);
				if (result) {
					alert('승인 요청을 보냈습니다. 관리점 담당자에게 문의해주세요.');
					location.replace('/login');
				}
			} catch (e) {
				alert('오류가 발생했습니다. 다시 시도해 주세요.');
				console.log(e);
			}
		},
	},
	created() {
		this.fetchIds();
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
.btnCont {
	margin-top: 20px !important;
}
</style>
