<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="510">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">사용자 정보 수정</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text class="pad30">
					<p class="mainRed mj0">* 필수입력입니다</p>

					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td>계정</td>
								<td>
									<v-text-field
										class="input_custom1"
										v-model.trim="formData.username"
										outlined
										disabled
										placeholder="계정을 입력주세요."
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>
									비밀번호변경
									<div class="checkStyleCont3">
										<input
											type="checkbox"
											id="checkPass1"
											class="checkStyle"
											@click="passwordFnc($event.target.checked)"
										/>
										<label for="checkPass1"></label>
									</div>
								</td>
								<td>
									<v-text-field
										class="input_custom1"
										outlined
										type="password"
										:placeholder="passwordInputPlaceholder"
										:disabled="passwordInputDisabled"
										v-model.trim="formData.password"
									></v-text-field>
								</td>
							</tr>
							<tr>
								<td>사용자명</td>
								<td>
									<v-text-field
										class="input_custom1"
										v-model.trim="formData.name"
										outlined
										placeholder="사용자명을 입력주세요."
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
													:checked="formData"
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
										outlined
										placeholder="이메일을 입력주세요."
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
										></v-text-field>
										<v-text-field
											class="input_custom1 w80"
											v-model.trim="formData.phone2"
											maxlength="4"
											outlined
											placeholder="중간자리"
										></v-text-field>
										<v-text-field
											class="input_custom1 w80"
											v-model.trim="formData.phone3"
											maxlength="4"
											outlined
											placeholder="끝자리"
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
											:checked="formData.userStatus === '6'"
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
											:checked="formData.userStatus === '1'"
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
								@click="updateUserFnc"
							>
								수정
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
import { nullValidation, validateEmail } from '../../../../common/common';

export default {
	props: ['userChioceData', 'storeIdData'],
	data() {
		return {
			roleList: [],
			passwordInputDisabled: true,
			passwordInputPlaceholder: '*******',
			formData: {
				username: '',
				name: '',
				roleIds: [],
				email: '',
				phone1: '',
				phone2: '',
				phone3: '',
				orgName: '',
				seq: '',
				userStatus: '',
				storeId: this.storeIdData,
				orgId: this.userChioceData.id,
				chgPassword: 'N',
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.OrganizationMgmtModule.userInfoPop;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.userInfoPop = newValue;
			},
		},
	},
	methods: {
		async updateUserFnc() {
			try {
				// null check
				if (!nullValidation(this.formData, ['storeId', 'seq'])) {
					return;
				}
				if (!validateEmail(this.formData.email)) {
					return;
				}
				const result = await this.$store.dispatch(
					'OrganizationMgmtModule/updateUserFnc',
					this.formData,
				);
				if (result) {
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
		passwordFnc(val) {
			if (val) {
				this.formData.chgPassword = 'Y';
				this.passwordInputDisabled = false;
				this.passwordInputPlaceholder = '비밀번호를 변경해주세요.';
			} else {
				this.formData.chgPassword = 'N';
				this.passwordInputDisabled = true;
				this.passwordInputPlaceholder = '******';
				delete this.formData.password;
			}
		},
		dataSet() {
			this.formData.email = this.userChioceData.userInfoData.member.email;
			this.formData.name = this.userChioceData.userInfoData.member.name;
			this.formData.orgId = this.userChioceData.userInfoData.member.orgId;
			this.formData.orgName = this.userChioceData.userInfoData.member.orgName;
			this.formData.phone1 = this.userChioceData.userInfoData.member.phone1;
			this.formData.phone2 = this.userChioceData.userInfoData.member.phone2;
			this.formData.phone3 = this.userChioceData.userInfoData.member.phone3;
			this.formData.seq = this.userChioceData.userInfoData.member.seq;
			this.formData.roleIds = this.userChioceData.userInfoData.roleIds;
			this.formData.userStatus = String(
				this.userChioceData.userInfoData.member.userStatus,
			);
			this.formData.username = this.userChioceData.userInfoData.member.username;
			let roleList = this.userChioceData.storeRoleList;
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
