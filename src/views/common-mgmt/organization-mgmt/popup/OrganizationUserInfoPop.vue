<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="510">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>사용자 정보 수정</h2>
				</v-card-title>
				<v-card-text>
					<p><span class="redfont">*</span>필수입력정보</p>
					<div>
						<p>계정</p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.username"
							outlined
							disabled
							placeholder="계정을 입력주세요."
						></v-text-field>
					</div>
					<div>
						<p>
							비밀번호변경
							<input
								type="checkbox"
								@click="passwordFnc($event.target.checked)"
							/>
						</p>
						<v-text-field
							class="input_custom1"
							outlined
							:placeholder="passwordInputPlaceholder"
							:disabled="passwordInputDisabled"
							v-model.trim="formData.password"
						></v-text-field>
					</div>
					<div>
						<p>사용자명</p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.name"
							outlined
							placeholder="사용자명을 입력주세요."
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
									:checked="formData"
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
							outlined
							placeholder="이메일을 입력주세요."
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
							:checked="formData.userStatus === '6'"
						/>
						<label for="voteUseY">승인</label>
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
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="updateUserFnc">
						수정
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
