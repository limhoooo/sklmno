<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="510">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>사용자 등록</h2>
				</v-card-title>
				<v-card-text>
					<p><span class="redfont">*</span>필수입력정보</p>
					<div>
						<p>조직명</p>
						<p>
							{{ activeGroupData.name }}
						</p>
					</div>
					<div>
						<p>계정명</p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.username"
							outlined
							placeholder="계정명을 입력주세요."
							@change="userNameChangeCheck"
							style="width: 100px"
						></v-text-field>
						<v-btn class="ml10" style="width: 80px" @click="userNameExistsData"
							>중복검사</v-btn
						>
					</div>
					<div>
						<p></p>
						<span v-if="userNameCheckMsg">
							<p :class="existsCheckClass(userNameCheck)">
								{{ userNameCheckMsg }}
							</p>
						</span>
					</div>
					<div>
						<p>비밀번호</p>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="formData.password"
							@change="passwordCheck1($event)"
							type="password"
							placeholder="비밀번호를 입력주세요."
						></v-text-field>
					</div>
					<div>
						<p>비밀번호확인</p>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="passwordChk"
							@change="passwordCheck2($event)"
							type="password"
							placeholder="비밀번호를 입력주세요."
						></v-text-field>
					</div>
					<div>
						<p></p>
						<span v-if="passwordMsg">
							<p :class="existsCheckClass(passwordCheck)">
								{{ passwordMsg }}
							</p>
						</span>
					</div>
					<div>
						<p>사용자명</p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.name"
							placeholder="사용자명을 입력주세요."
							outlined
						></v-text-field>
					</div>
					<div>
						<p>역할</p>
						<div style="width: 240px">
							<span v-for="item in roleList" :key="item.index">
								<input
									:id="`role_${item.value}`"
									type="checkbox"
									:value="item.value"
									v-model.trim="formData.roleIds"
								/>
								<label
									:for="`role_${item.value}`"
									style="margin: 0 4px 0 2px"
									>{{ item.name }}</label
								>
							</span>
						</div>
					</div>
					<div>
						<p>이메일</p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.email"
							placeholder="이메일을 입력주세요."
							outlined
						></v-text-field>
					</div>
					<div>
						<p>연락처</p>
						<div>
							<v-text-field
								class="input_custom1"
								v-model.trim="formData.phone1"
								placeholder="앞자리"
								maxlength="3"
								oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								outlined
								style="width: 70px; float: left"
							></v-text-field>
							<span
								style="
									color: #c8c8c8;
									display: inline-block;
									margin: 0 3px;
									padding-top: 5px;
									float: left;
								"
								>-</span
							>
							<v-text-field
								class="input_custom1"
								v-model.trim="formData.phone2"
								placeholder="중간자리"
								maxlength="4"
								oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								outlined
								style="width: 90px; float: left"
							></v-text-field>
							<span
								style="
									color: #c8c8c8;
									display: inline-block;
									margin: 0 3px;
									padding-top: 5px;
									float: left;
								"
								>-</span
							>
							<v-text-field
								class="input_custom1"
								v-model.trim="formData.phone3"
								placeholder="뒷자리"
								maxlength="4"
								oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								outlined
								style="width: 75px; float: left"
							></v-text-field>
						</div>
					</div>
					<div>
						<p>승인여부</p>
						<input
							type="radio"
							id="voteUseY"
							value="6"
							name="voteUse"
							v-model.trim="formData.userStatus"
						/>
						<label for="voteUseY">승인</label>
						<input
							type="radio"
							id="voteUseN"
							value="1"
							name="voteUse"
							v-model.trim="formData.userStatus"
						/>
						<label for="voteUseN">미승인</label>
					</div>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="insertUserFnc">
						등록
					</v-btn>
					<v-btn outlined color="primary" text @click="dialog = !dialog">
						취소
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { existsData } from '../../../../api/member/login';
import { nullValidation, validateEmail } from '../../../../common/common';

export default {
	props: ['storeIdData'],
	data() {
		return {
			roleList: [],
			userNameCheck: false,
			userNameCheckMsg: '',
			passwordCheck: 0,
			passwordMsg: '',
			passwordChk: '',
			formData: {
				username: '',
				password: '',
				name: '',
				roleIds: [],
				email: '',
				phone1: '',
				phone2: '',
				phone3: '',
				userStatus: 6,
				storeId: this.storeIdData,
				orgId: '',
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.OrganizationMgmtModule.userRegiPop;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.userRegiPop = newValue;
			},
		},
		activeGroupData() {
			return this.$store.state.OrganizationMgmtModule.activeGroupData[0];
		},
	},
	methods: {
		async insertUserFnc() {
			try {
				this.formData.orgId = this.activeGroupData.id;
				if (!this.userNameCheck) {
					alert('계정명 중복검사를 해주세요.');
					return;
				}
				if (!this.passwordCheck) {
					alert('비밀번호를 확인해주세요.');
					return;
				}
				if (!nullValidation(this.formData, ['storeId', 'orgId'])) {
					return;
				}
				if (!validateEmail(this.formData.email)) {
					return;
				}
				const result = await this.$store.dispatch(
					'OrganizationMgmtModule/insertUserFnc',
					this.formData,
				);
				if (result) {
					// 리스트 재호출
					const data1 = this.$store.state.OrganizationMgmtModule.filterData;
					await this.$store.dispatch(
						'OrganizationMgmtModule/getOrgnztListFnc',
						data1,
					);
					const data2 = this.$store.state.OrganizationMgmtModule
						.activeGroupData;
					await this.$store.commit('OrganizationMgmtModule/setUserList', data2);
					//this.$store.state.HoldStoreMgmtModule.activeGroupData = [];
				}
			} catch (e) {
				console.log(e);
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
			this.passwordMsg = '비밀번호가 일치하지않습니다.';
			if (this.formData.password === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
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
		dataSet() {
			let roleList = this.$store.state.OrganizationMgmtModule.storeRoleList;
			for (let i = 0; i < roleList.length; i++) {
				let data = {
					name: roleList[i].roleName,
					value: roleList[i].roleId,
				};
				this.roleList.push(data);
			}
		},
	},
	created() {
		this.dataSet();
	},
};
</script>

<style></style>
