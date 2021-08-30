<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="510">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">사용자 등록</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text class="pad30">
					<p class="mainRed mj0">* 필수입력입니다</p>

					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td class="w30P">조직명</td>
								<td>{{ activeGroupData.name }}</td>
							</tr>
							<tr>
								<td>계정명</td>
								<td>
									<v-text-field
										class="input_custom1 w150 floatL"
										v-model.trim="formData.username"
										outlined
										placeholder="계정명을 입력주세요."
										@change="userNameChangeCheck"
									></v-text-field>
									<v-btn class="ml10 h30" @click="userNameExistsData"
										>중복검사</v-btn
									>
									<span v-if="userNameCheckMsg" class="mj0">
										<p class="mj0" :class="existsCheckClass(userNameCheck)">
											{{ userNameCheckMsg }}
										</p>
									</span>
								</td>
							</tr>
							<tr>
								<td>비밀번호</td>
								<td>
									<v-text-field
										class="input_custom1"
										outlined
										v-model.trim="formData.password"
										@change="passwordCheck1($event)"
										type="password"
										placeholder="비밀번호를 입력주세요."
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>비밀번호확인</td>
								<td>
									<v-text-field
										class="input_custom1"
										outlined
										v-model.trim="passwordChk"
										@change="passwordCheck2($event)"
										type="password"
										placeholder="비밀번호를 입력주세요."
									></v-text-field>
									<span v-if="passwordMsg">
										<p class="mj0" :class="existsCheckClass(passwordCheck)">
											{{ passwordMsg }}
										</p>
									</span>
								</td>
							</tr>
							<tr>
								<td>사용자명</td>
								<td>
									<v-text-field
										class="input_custom1"
										v-model.trim="formData.name"
										placeholder="사용자명을 입력주세요."
										outlined
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>역할</td>
								<td>
									<div style="width: 240px">
										<span v-for="item in roleList" :key="item.index">
											<div class="checkStyleCont2 floatL w50 ml20">
												<input
													:id="`role_${item.value}`"
													type="checkbox"
													class="checkStyle"
													:value="item.value"
													v-model.trim="formData.roleIds"
												/>
												<label
													:for="`role_${item.value}`"
													style="margin: 0 4px 0 2px"
													>{{ item.name }}</label
												>
											</div>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td>이메일</td>
								<td>
									<v-text-field
										class="input_custom1"
										v-model.trim="formData.email"
										placeholder="이메일을 입력주세요."
										outlined
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>연락처</td>
								<td>
									<div class="disFx w250">
										<v-text-field
											class="input_custom1 w50"
											v-model.trim="formData.phone1"
											maxlength="3"
											outlined
											placeholder="앞자리"
											oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										></v-text-field>
										<v-text-field
											class="input_custom1 w80"
											v-model.trim="formData.phone2"
											maxlength="4"
											outlined
											placeholder="중간자리"
											oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										></v-text-field>
										<v-text-field
											class="input_custom1 w80"
											v-model.trim="formData.phone3"
											maxlength="4"
											outlined
											placeholder="끝자리"
											oninput="this.value = this.value.replace(/[^0-9]/g, '');"
										></v-text-field>
									</div>
								</td>
							</tr>
							<tr>
								<td>승인여부</td>
								<td>
									<div class="radioStylePop w50 ml20 floatL">
										<input
											type="radio"
											id="voteUseY"
											value="6"
											name="voteUse"
											v-model.trim="formData.userStatus"
										/>
										<label for="voteUseY">승인</label>
									</div>
									<div class="radioStylePop w50 ml20 floatL">
										<input
											type="radio"
											id="voteUseN"
											value="1"
											name="voteUse"
											v-model.trim="formData.userStatus"
										/>
										<label for="voteUseN">미승인</label>
									</div>
								</td>
							</tr>
						</table>

						<div class="disFx justify-end mt10">
							<v-btn
								outlined
								class="backColorMint1 mainWhite borderReset w80"
								text
								@click="insertUserFnc"
							>
								등록
							</v-btn>
							<v-btn
								outlined
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								text
								@click="dialog = !dialog"
							>
								취소
							</v-btn>
						</div>
					</div>
				</v-card-text>
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
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
			if (this.passwordChk === data) {
				result = true;
				this.passwordMsg = '비밀번호가 일치합니다.';
			}
			this.passwordCheck = result;
		},
		passwordCheck2(data) {
			let result = false;
			this.passwordMsg = '비밀번호가 일치하지 않습니다.';
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
