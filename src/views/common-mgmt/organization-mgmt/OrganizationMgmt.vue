<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>조직 관리</h2></div>
			<div id="SearchBoxCont">
				<div>
					<div class="devideCont" v-if="roleVal">
						<p>관리점</p>
						<v-select
							class="select_custom1"
							:items="storeSelectList"
							outlined
							name="division"
							item-text="saleStoreName"
							item-value="storeId"
							v-model.trim="storeId"
							@change="selectGetList($event)"
						>
						</v-select>
					</div>
					<div class="checkCont">
						<p>사용자명</p>
						<input type="text" class="inputTextDefault" v-model.trim="name" />
					</div>
				</div>
				<div>
					<div class="devideCont">
						<p>이메일</p>
						<input type="text" class="inputTextDefault" v-model.trim="email" />
					</div>
					<div>
						<p>연락처</p>
						<input
							type="text"
							class="inputTextDefault"
							oninput="this.value = this.value.replace(/[^0-9]/g, '');"
							v-model.trim="phone"
						/>
					</div>
				</div>
			</div>
			<div id="BtnCont">
				<v-btn @click="filterSubmit()">검색</v-btn>
				<v-btn @click="filterInit()">초기화</v-btn>
			</div>
			<v-card style="margin-top: 60px">
				<v-row class="pa-4" justify="space-between">
					<v-col cols="3" @click="getRegiUrl">
						<div
							class="textRight"
							style="border-bottom: 1px solid #ddd; padding: 8px"
						>
							<v-btn @click="teamRegiBtn" class="mr5">등록</v-btn>
							<v-btn @click="teamUpdBtn" class="mr5">수정</v-btn>
							<v-btn @click="teamDelBtn">삭제</v-btn>
						</div>
						<!-- 좌측 팀 tree -->
						<v-treeview
							v-model.trim="selection"
							:active.sync="activeGroupData"
							:items="organizationList"
							:selection-type="selectionType"
							return-object
							activatable
							transition
							class="mt10"
						></v-treeview>
					</v-col>

					<v-divider vertical style="margin: 0 10px"></v-divider>

					<v-col class="">
						<div style="border-bottom: 1px solid #ddd; padding: 8px">
							<v-btn
								v-if="activeGroupData.length > 0"
								v-clipboard:copy="regiUrl"
								v-clipboard:success="onCopy"
								v-clipboard:error="onError"
								class="fll"
								>초대 링크 복사</v-btn
							>
							<div class="textRight">
								<v-btn @click="userRegiBtn" class="mr5">등록</v-btn>
								<v-btn @click="updateUserUseFnc" class="mr5">승인</v-btn>
								<v-btn @click="userDelBtn">삭제</v-btn>
							</div>
						</div>
						<div>
							<div id="ListTableCont">
								<!-- 우측 사용자 Box -->
								<table class="tableStyle01">
									<thead>
										<tr>
											<th>선택</th>
											<th>조직명</th>
											<th>계정</th>
											<th>사용자명</th>
											<th>이메일</th>
											<th>연락처</th>
											<th>승인여부</th>
										</tr>
									</thead>
									<tbody v-if="userList.length === 0">
										<tr>
											<td colspan="8">사용자가 없습니다.</td>
										</tr>
									</tbody>
									<tbody v-else>
										<tr
											v-for="node in userList"
											v-bind:key="node.userId"
											@click="userInfoBtn(node)"
										>
											<td onclick="event.cancelBubble=true">
												<input
													type="checkbox"
													:value="node.member.seq"
													v-model.trim="userCheckArr"
												/>
											</td>
											<td>
												<span> {{ node.member.orgName }} </span>
											</td>
											<td>
												<span> {{ node.member.username }} </span>
											</td>
											<td>
												<span> {{ node.member.name }} </span>
											</td>
											<td>
												<span> {{ node.member.email }} </span>
											</td>
											<td>
												<span>
													{{ node.member.phone1 }}
													<span>-</span>
													{{ node.member.phone2 }}
													<span>-</span>
													{{ node.member.phone3 }}
												</span>
											</td>
											<td>
												<span>
													<span v-if="node.member.userStatus === '1'"
														>미승인</span
													>
													<span v-if="node.member.userStatus === '6'"
														>승인</span
													>
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-card>
		</div>
		<organization-team-regi-pop
			v-if="teamRegiPop"
			:TeamChioceData="teamInfoData"
			:storeIdData="storeId"
		></organization-team-regi-pop>
		<organization-team-upd-pop
			v-if="teamUpdPop"
			:TeamChioceData="teamInfoData"
			:storeIdData="storeId"
		></organization-team-upd-pop>
		<organization-user-regi-pop
			v-if="userRegiPop"
			:storeIdData="storeId"
		></organization-user-regi-pop>
		<organization-user-info-pop
			v-if="userInfoPop"
			:userChioceData="userInfoData"
			:storeIdData="storeId"
		></organization-user-info-pop>
	</div>
</template>
<script>
import OrganizationTeamRegiPop from './popup/OrganizationTeamRegiPop.vue';
import OrganizationTeamUpdPop from './popup/OrganizationTeamUpdPop.vue';
import OrganizationUserRegiPop from './popup/OrganizationUserRegiPop.vue';
import OrganizationUserInfoPop from './popup/OrganizationUserInfoPop.vue';
import { commonCodeListFnc } from '../../../common/common';

import { generatorJoinPath } from '../../../api/common/common.js';

export default {
	components: {
		OrganizationTeamRegiPop,
		OrganizationUserRegiPop,
		OrganizationTeamUpdPop,
		OrganizationUserInfoPop,
	},
	data: () => ({
		storeSelectList: [],
		teamInfoData: [],
		userInfoData: [],
		userCheckArr: [],
		selectionType: 'leaf',
		selection: [],
		regiUrl: '',
		defaultFilterMemberList: [],
	}),
	computed: {
		roleVal() {
			return this.$store.state.role;
		},
		teamRegiPop() {
			return this.$store.state.OrganizationMgmtModule.teamRegiPop;
		},
		teamUpdPop() {
			return this.$store.state.OrganizationMgmtModule.teamUpdPop;
		},
		userRegiPop() {
			return this.$store.state.OrganizationMgmtModule.userRegiPop;
		},
		userInfoPop() {
			return this.$store.state.OrganizationMgmtModule.userInfoPop;
		},
		organizationList() {
			return this.$store.state.OrganizationMgmtModule.organizationList;
		},
		defaultMemberList() {
			return this.$store.state.OrganizationMgmtModule.defaultMemberList;
		},
		storeRoleList() {
			return this.$store.state.OrganizationMgmtModule.storeRoleList;
		},
		userList: {
			get() {
				return this.$store.state.OrganizationMgmtModule.userList;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.userList = newValue;
			},
		},
		activeGroupData: {
			get() {
				return this.$store.state.OrganizationMgmtModule.activeGroupData;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.activeGroupData = newValue;
				this.$store.commit('OrganizationMgmtModule/setUserList', newValue);
			},
		},
		storeId: {
			get() {
				return this.$store.state.OrganizationMgmtModule.filterData.storeId;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.filterData.storeId = newValue;
			},
		},
		name: {
			get() {
				return this.$store.state.OrganizationMgmtModule.filterData.name;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.filterData.name = newValue;
			},
		},
		email: {
			get() {
				return this.$store.state.OrganizationMgmtModule.filterData.email;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.filterData.email = newValue;
			},
		},
		phone: {
			get() {
				return this.$store.state.OrganizationMgmtModule.filterData.phone;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.filterData.phone = newValue;
			},
		},
	},
	methods: {
		filterInit() {
			this.activeGroupData = [];
			this.phone = '';
			this.email = '';
			this.name = '';
			if (this.roleVal) {
				this.storeId = this.storeSelectList[0].storeId;
			} else {
				this.storeId = 0;
			}
		},
		async selectGetList(val) {
			this.storeId = val;
			let data = {
				storeId: this.storeId,
			};
			this.userList = [];
			await this.getOrgnztListFnc(data);
			this.userList = this.defaultMemberList;
		},
		teamRegiBtn() {
			// 팀 등록 Btn
			if (this.activeGroupData[0] && this.activeGroupData[0].depth >= 3) {
				alert('조직 등록은 3단계까지만 가능합니다.');
				return;
			}
			if (!this.activeGroupDataValidation('등록', 'teamRegi')) return;
			if (this.activeGroupData[0]) {
				this.teamInfoData = this.activeGroupData[0];
			} else {
				this.teamInfoData = [];
			}
			this.$store.state.OrganizationMgmtModule.teamRegiPop = !this.$store.state
				.OrganizationMgmtModule.teamRegiPop;
		},
		teamUpdBtn() {
			// 팀 수정 Btn
			if (!this.activeGroupDataValidation('수정')) return;
			this.teamInfoData = this.activeGroupData[0];
			this.$store.state.OrganizationMgmtModule.teamUpdPop = !this.$store.state
				.OrganizationMgmtModule.teamUpdPop;
		},
		userRegiBtn() {
			// 사용자 등록 Btn
			if (!this.activeGroupDataValidation('등록', 'userRegi')) return;
			this.$store.state.OrganizationMgmtModule.userRegiPop = !this.$store.state
				.OrganizationMgmtModule.userRegiPop;
		},
		userInfoBtn(data) {
			// 사용자 상세보기
			this.userInfoData = {
				userInfoData: data,
				storeRoleList: this.storeRoleList,
			};
			this.$store.state.OrganizationMgmtModule.userInfoPop = !this.$store.state
				.OrganizationMgmtModule.userInfoPop;
		},
		async getOrgnztListFnc(data) {
			// 리스트 GET
			await this.$store.dispatch(
				'OrganizationMgmtModule/getOrgnztListFnc',
				data,
			);
		},
		async filterSubmit() {
			// 검색필터
			const data = this.$store.state.OrganizationMgmtModule.filterData;
			this.activeGroupData = [];
			await this.getOrgnztListFnc(data);
			this.userList = [];
			this.userList = this.defaultMemberList;
		},

		async teamDelBtn() {
			try {
				// 팀 삭제 Btn
				if (!this.activeGroupDataValidation('삭제')) return;
				let confirmText =
					this.activeGroupData[0].name + '을(를) 삭제하시겠습니까?';
				if (confirm(confirmText) === true) {
					let data = {
						orgId: this.activeGroupData[0].id,
						storeId: this.storeId,
					};
					const result = await this.$store.dispatch(
						'OrganizationMgmtModule/deleteOrgnztFnc',
						data,
					);
					if (result) {
						// 리스트 재호출
						const filterData = this.$store.state.OrganizationMgmtModule
							.filterData;
						await this.$store.dispatch(
							'OrganizationMgmtModule/getOrgnztListFnc',
							filterData,
						);
						this.userList = [];
					}
				}
			} catch (e) {
				console.log(e);
			}
		},

		async userDelBtn() {
			try {
				// 사용자 삭제 Btn
				if (this.userCheckArr.length === 0) {
					alert('하나 이상의 삭제할 사용자를 선택해주세요.');
				} else if (this.defaultMemberList.length === 1) {
					alert('마지막 사용자는 삭제 할 수 없습니다.');
					return;
				} else {
					let confirmText = '사용자를 삭제하시겠습니까?';
					if (confirm(confirmText)) {
						let delUserId = {
							delUserId: this.userCheckArr,
						};
						const result = await this.$store.dispatch(
							'OrganizationMgmtModule/deleteUserFnc',
							delUserId,
						);
						if (result) {
							await this.userListInit();
						}
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async updateUserUseFnc() {
			// 사용자 미승인 Btn
			try {
				// 사용자 삭제 Btn
				if (this.userCheckArr.length === 0) {
					alert('하나 이상의 승인할 사용자를 선택해주세요.');
				} else {
					let confirmText = '사용자를 승인하시겠습니까?';
					if (confirm(confirmText)) {
						let userId = {
							userId: this.userCheckArr,
						};
						const result = await this.$store.dispatch(
							'OrganizationMgmtModule/updateUserUseFnc',
							userId,
						);
						if (result) {
							await this.userListInit();
						}
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async userListInit() {
			const data1 = this.$store.state.OrganizationMgmtModule.filterData;
			await this.$store.dispatch(
				'OrganizationMgmtModule/getOrgnztListFnc',
				data1,
			);
			const data2 = this.$store.state.OrganizationMgmtModule.activeGroupData;
			await this.$store.commit('OrganizationMgmtModule/setUserList', data2);
			this.userCheckArr = [];
		},
		activeGroupDataValidation(text, type) {
			// validation Btn
			if (this.activeGroupData.length === 0) {
				if (type === 'teamRegi') {
					return true;
				} else {
					this.teamInfoData = [];
					alert(`${text} 할 조직을 선택해주세요.`);
					return false;
				}
			}
			if (this.activeGroupData[0].name === '기본그룹') {
				if (type === 'userRegi') {
					return true;
				} else {
					alert(`기본그룹은 변경 할 수 없습니다.`);
					return false;
				}
			}
			return true;
		},
		async commonCodeListFnc() {
			let data = {
				initData: ['storeList'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.storeSelectList = commonCodeList.storeList;
			this.storeId = this.storeSelectList[0].storeId;
		},
		onCopy() {
			alert('초대 링크가 복사되었습니다.');
		},
		onError() {
			alert('오류');
		},
		async getRegiUrl() {
			if (this.activeGroupData.length > 0) {
				let data = {
					type: 'USER',
					orgId: this.activeGroupData[0].id,
					storeId: this.storeId,
				};
				const result = await generatorJoinPath(data);
				this.regiUrl = window.location.origin + result.data.data;
				return;
			}
		},
	},
	async created() {
		let data;
		if (this.roleVal) {
			await this.commonCodeListFnc();
			data = {
				storeId: this.storeSelectList[0].storeId,
			};
		}
		await this.getOrgnztListFnc(data);
		this.userList = this.defaultMemberList;
	},
};
</script>
