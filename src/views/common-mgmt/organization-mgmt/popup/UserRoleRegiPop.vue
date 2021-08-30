<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="610">
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">역할 등록</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text>
					<p class="mj0 mainFontS boldWt">등록</p>
					<div class="newTableStyle mt10">
						<table class="w100P">
							<thead>
								<tr>
									<th v-if="!roleVal">필수</th>
									<th>역할명</th>
									<th>역할타입</th>
									<th>등록</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td v-if="!roleVal">
										<input
											v-if="!roleVal"
											type="checkbox"
											true-value="Y"
											false-value="N"
											v-model.trim="formData.necessaryYn"
										/>
									</td>
									<td>
										<input
											type="text"
											v-model.trim="formData.roleName"
											class="inputTextDefault"
										/>
									</td>
									<td class="customSelectBox">
										<select
											class="selectDefault w100"
											v-model="formData.roleType"
										>
											<option
												v-for="item in roleTypeList"
												v-text="item.name"
												:value="item.value"
												:key="item.id"
											></option>
										</select>
									</td>
									<td style="text-align: center">
										<button class="btnDefault" @click="insertRoleFnc">
											등록
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</v-card-text>
				<v-card-text>
					<p class="mj0 mainFontS boldWt">목록</p>
					<div class="newTableStyle mt10">
						<table class="w100P">
							<thead>
								<tr>
									<th>구분</th>
									<th>역할명</th>
									<th>역할타입</th>
									<th>등록일시</th>
									<th>수정</th>
									<th>삭제</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in roleList" :key="item.index">
									<td>
										<span class="redfont" v-if="item.necessaryYn === 'Y'"
											>필수</span
										>
									</td>
									<td>
										<input
											type="text"
											v-model.trim="item.roleName"
											class="inputTextDefault"
											:disabled="item.necessaryYn === 'Y' && roleVal"
										/>
									</td>
									<td class="customSelectBox">
										<select
											class="selectDefault w100"
											:disabled="item.necessaryYn === 'Y' && roleVal"
											v-model.trim="item.roleType"
										>
											<option
												v-for="item in roleTypeList"
												v-text="item.name"
												:value="item.value"
												:key="item.id"
											></option>
										</select>
									</td>
									<td>
										{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
									</td>
									<td style="text-align: center">
										<template v-if="!roleVal">
											<button class="btnDefault" @click="updateRole(index)">
												수정
											</button>
										</template>
										<template v-else>
											<button
												class="btnDefault"
												@click="updateRole(index)"
												v-if="item.necessaryYn === 'N'"
											>
												수정
											</button>
										</template>
									</td>
									<td style="text-align: center">
										<template v-if="!roleVal">
											<button
												class="btnDefault"
												@click="deleteRole(item.roleId)"
											>
												삭제
											</button>
										</template>
										<template v-else>
											<button
												class="btnDefault"
												@click="deleteRole(item.roleId)"
												v-if="item.necessaryYn === 'N'"
											>
												삭제
											</button>
										</template>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="disFx justify-end mt10">
						<v-btn
							outlined
							class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							text
							@click="dialog = !dialog"
						>
							취소
						</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {
	deleteRole,
	getFuncRoleMapInfo,
	getRoleType,
	insertRole,
	updateRole,
} from '../../../../api/common-mgmt/organization-mgmt/UserroleMgmtApi';

export default {
	props: ['userRoleRegiData'],
	data() {
		return {
			roleList: [],
			dialog: true,
			updateInput: [],
			roleTypeList: [],
			formData: {
				storeId: this.userRoleRegiData,
				roleName: '',
				necessaryYn: 'N',
				roleType: '',
			},
		};
	},
	computed: {
		admin() {
			return this.$store.state.admin;
		},
		roleVal() {
			return this.$store.state.role !== 'A';
		},
	},
	methods: {
		async getFuncRoleMapInfoFnc() {
			try {
				let data = { storeId: this.userRoleRegiData };
				const result = await getFuncRoleMapInfo(data);
				if (result) {
					this.roleList = [];
					this.roleList = result.data.data.roleList;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertRoleFnc() {
			try {
				if (!this.formData.roleName) {
					alert('역할명을 입력해주세요.');
					return;
				}
				if (!this.formData.roleType) {
					alert('역할타입을 지정해주세요.');
					return;
				}
				const result = await insertRole(this.formData);
				if (result) {
					alert('등록되었습니다.');
					this.formData.roleName = '';
					this.formData.necessaryYn = 'N';
					this.formData.roleType = '';
					await this.getFuncRoleMapInfoFnc();
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deleteRole(roleId) {
			try {
				const conText = '삭제하시겠습니까?';
				if (confirm(conText) === true) {
					let delRoleId = {
						delRoleId: roleId,
						storeId: this.userRoleRegiData,
					};
					const result = await deleteRole(delRoleId);
					if (result) {
						alert('삭제되었습니다.');
						await this.getFuncRoleMapInfoFnc();
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async updateRole(index) {
			try {
				let data = {
					storeId: this.formData.storeId,
					necessaryYn: this.roleList[index].necessaryYn,
					roleId: this.roleList[index].roleId,
					roleName: this.roleList[index].roleName,
					roleType: this.roleList[index].roleType,
				};
				const result = await updateRole(data);
				if (result) {
					alert('수정되었습니다.');
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getRoleType() {
			let data = {
				initEnumData: ['UserRoleType'],
			};
			const result = await getRoleType(data);
			if (result) {
				console.log(result);
				this.roleTypeList = [];
				this.roleTypeList = result.data.data.UserRoleType || [];
			}
		},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog, 'userRoleRegiPop');
				}
			},
		},
	},
	async created() {
		await this.getFuncRoleMapInfoFnc();
		await this.getRoleType();
	},
};
</script>

<style>
.customSelectBox .select_custom1 {
	width: 140px;
	margin: 0 auto;
}
.customSelectBox .select_custom1 .v-input__control {
	width: 140px !important;
}
</style>
