<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="610">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>역할 등록</h2>
				</v-card-title>
				<v-card-text>
					<p>등록</p>
					<table class="tableStyle_1">
						<thead>
							<tr>
								<th v-if="!roleVal">필수</th>
								<th>역할명</th>
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
								<td style="text-align: center">
									<button class="btnDefault" @click="insertRoleFnc">
										등록
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</v-card-text>
				<v-card-text>
					<p>목록</p>
					<table class="tableStyle_1">
						<thead>
							<tr>
								<th>구분</th>
								<th>역할명</th>
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
									/>
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
										<button class="btnDefault" @click="deleteRole(item.roleId)">
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
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="dialog = !dialog">
						취소
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import {
	deleteRole,
	getFuncRoleMapInfo,
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
			formData: {
				storeId: this.userRoleRegiData, // 추후 수정
				roleName: '',
				necessaryYn: 'N',
			},
		};
	},
	computed: {
		admin() {
			return this.$store.state.admin;
		},
		roleVal() {
			let result;
			if (!this.$store.state.role) {
				result = true;
			} else {
				result = false;
			}
			return result;
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
				const result = await insertRole(this.formData);
				if (result) {
					alert('등록되었습니다.');
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
						this.getFuncRoleMapInfoFnc();
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
				};
				const result = await updateRole(data);
				if (result) {
					alert('수정되었습니다.');
				}
			} catch (e) {
				console.log(e);
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
	},
};
</script>

<style></style>
