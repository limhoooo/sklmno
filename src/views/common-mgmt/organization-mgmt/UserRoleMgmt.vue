<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>역할 관리</h2></div>
			<div id="matchingTitle">
				<div class="selectCont">
					<template v-if="roleVal">
						<p>관리점 :</p>
						<v-select
							class="select_custom1"
							:items="storeSelectList"
							item-text="saleStoreName"
							item-value="storeId"
							v-model.trim="storeSelect"
							@change="selectGetList($event)"
							outlined
							name="division"
						>
						</v-select>
					</template>
					<p style="width: 70px; margin-left: 10px !important">기능 선택 :</p>
					<v-select
						class="select_custom1"
						:items="roleGroupList"
						value="1"
						item-text="name"
						item-value="value"
						outlined
						name="division"
						v-model.trim="choiceGroup"
					>
					</v-select>
				</div>
				<div id="BtnCont">
					<v-btn @click="setFuncRoleMapInfoFnc">저장</v-btn>
					<v-btn @click="userRoleRegiPopFnc">역할등록</v-btn>
				</div>
			</div>
			<div id="ListTableCont">
				<table>
					<thead>
						<tr>
							<th width="100"></th>
							<th
								v-for="(roleList, roleMapIndex) in roleMapListCopy.roleList"
								:key="roleList.index"
							>
								{{ roleList.roleName }}
								<input
									type="checkbox"
									class="ml10"
									:checked="roleChecked(roleMapIndex)"
									@click="
										roleCheckRowAll(
											roleList.roleId,
											roleMapIndex,
											$event.target.checked,
										)
									"
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(
								funcRoleList, funcRoleListIndex
							) in roleMapListCopy.funcRoleList"
							:key="funcRoleList.index"
						>
							<td style="padding: 5px">
								{{ funcRoleList.func.title }}
								<input
									type="checkbox"
									class="ml10"
									:checked="funcRoleChecked(funcRoleListIndex)"
									@click="
										funcRoleCheckAll(
											funcRoleList.func.groupId,
											funcRoleList.func.funcId,
											funcRoleListIndex,
											$event.target.checked,
										)
									"
								/>
							</td>
							<td
								class="saleStoreDataTd"
								v-for="roleMap in funcRoleList.roleMap"
								:key="roleMap.index"
								:class="
									checkClassFnc(
										funcRoleList.func.groupId,
										funcRoleList.func.funcId,
										roleMap[0],
									)
								"
							>
								<input
									type="checkbox"
									:checked="roleMap[1] == 'Y'"
									:id="`checkInput${funcRoleList.func.groupId}_${funcRoleList.func.funcId}_${roleMap[0]}`"
									@click="
										choiceFnc(
											funcRoleList.func.groupId,
											funcRoleList.func.funcId,
											roleMap[0],
											roleMap[1],
										)
									"
								/>
								<label
									class="TbLabel"
									:for="`checkInput${funcRoleList.func.groupId}_${funcRoleList.func.funcId}_${roleMap[0]}`"
								></label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="text-align: right" class="mt10">
				<v-btn class="mr10" @click="setFuncRoleMapInfoFnc">저장</v-btn>
				<v-btn @click="userRoleRegiPopFnc">역할등록</v-btn>
			</div>
		</div>
		<UserRoleRegiPop
			v-if="userRoleRegiPop"
			@closeDialog="dialogClose"
			:userRoleRegiData="storeId"
		></UserRoleRegiPop>
	</div>
</template>

<script>
import {
	getFuncRoleMapInfo,
	setFuncRoleMapInfo,
} from '../../../api/common-mgmt/organization-mgmt/UserroleMgmtApi';
import { commonCodeListFnc } from '../../../common/common';
import UserRoleRegiPop from './popup/UserRoleRegiPop';

export default {
	components: {
		UserRoleRegiPop,
	},
	data() {
		return {
			storeSelect: [],
			storeSelectList: [],
			storeId: 0, // 추후 수정
			userRoleRegiPop: false,
			roleGroupList: [],
			roleMapList: {},
			roleMapListCopy: {},
			roleMapAddList: [],
			choiceGroup: 1,
			choiceRoleMapList: [],
			formData: {},
		};
	},
	computed: {
		roleVal() {
			return this.$store.state.role;
		},
	},
	methods: {
		dialogClose(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		async getFuncRoleMapInfoFnc(data) {
			try {
				const result = await getFuncRoleMapInfo(data);
				if (result) {
					this.roleMapList = [];
					this.roleMapAddList = [];
					this.roleMapList = result.data.data;
					this.roleGroupNameObjAddFnc();
				}

				// this.roleGroupNameObjAddFnc();
			} catch (e) {
				console.log(e);
			}
		},
		roleGroupNameObjAddFnc() {
			//  1.그룹명의 중복 데이터를 걸러온다. : roleHeaderTh
			//  2.roleHeaderTh 와 getList 의 groupId 를 비교해서 원본데이터 제일 상단 객체에 추가시킨다.

			const choiceGroup = this.choiceGroup;

			let choiceRoleMapList = [];
			this.roleMapListCopy = [];
			for (let i = 0; i < this.roleMapList.funcRoleList.length; i++) {
				if (this.roleMapList.funcRoleList[i].func.groupId === choiceGroup) {
					choiceRoleMapList.push(this.roleMapList.funcRoleList[i]);
				}
			}
			this.roleMapListCopy = {
				funcRoleList: choiceRoleMapList,
				roleList: this.roleMapList.roleList,
			};

			// groupName List
			this.roleGroupList = [];
			const roleList = this.roleMapList.funcRoleList;
			// 1
			let roleGroupList = roleList.filter((item, i) => {
				return (
					roleList.findIndex(item2 => {
						return item.func.groupId === item2.func.groupId;
					}) === i
				);
			});
			let roleGroupData = [];
			roleGroupList.forEach(item => {
				let data = {
					name: item.func.groupName,
					value: item.func.groupId,
				};
				roleGroupData.push(data);
			});
			this.roleGroupList = roleGroupData;
		},
		funcRoleCheckAll(groupId, funcId, index, event) {
			const roleList = this.roleMapListCopy.funcRoleList[index];
			roleList.roleMap.forEach(item => {
				if (event && item[1] === 'N') {
					this.choiceFnc(groupId, funcId, item[0], item[1]);
					item[1] = 'Y';
				}
				if (!event && item[1] === 'Y') {
					this.choiceFnc(groupId, funcId, item[0], item[1]);
					item[1] = 'N';
				}
			});
		},
		roleCheckRowAll(roleId, index, event) {
			const roleList = this.roleMapListCopy.funcRoleList;
			roleList.forEach(item => {
				if (event && item.roleMap[index][1] === 'N') {
					this.choiceFnc(
						item.func.groupId,
						item.func.funcId,
						roleId,
						item.roleMap[index][1],
					);
					item.roleMap[index][1] = 'Y';
				}
				if (!event && item.roleMap[index][1] === 'Y') {
					this.choiceFnc(
						item.func.groupId,
						item.func.funcId,
						roleId,
						item.roleMap[index][1],
					);
					item.roleMap[index][1] = 'N';
				}
			});
		},
		async setFuncRoleMapInfoFnc() {
			try {
				const confirmText = '저장하시겠습니까?';
				if (this.roleMapAddList.length <= 0) {
					return alert('변경된 값이 없습니다.');
				}
				if (confirm(confirmText)) {
					const result = await setFuncRoleMapInfo(this.roleMapAddList);
					let data = {
						storeId: this.storeId,
					};
					if (result) await this.getFuncRoleMapInfoFnc(data);
				}
			} catch (e) {
				console.log(e);
			}
		},
		checkClassFnc(groupId, funcId, roleId) {
			const mapList = this.roleMapAddList;
			if (mapList.length === 0) return;

			for (let data of mapList) {
				if (
					data.groupId === parseInt(groupId) &&
					data.roleId === parseInt(roleId) &&
					data.funcId === funcId
				) {
					if (data.mapYn === 'Y') return 'choiceBg';
					if (data.mapYn === 'N') return 'unChoiceBg';
				}
			}
		},
		funcRoleChecked(index) {
			const dataList = this.roleMapListCopy.funcRoleList[index].roleMap;
			let result = true;
			for (let i = 0; i < dataList.length; i++) {
				if (dataList[i][1] === 'N') {
					result = false;
					break;
				}
			}
			return result;
		},
		roleChecked(index) {
			const dataList = this.roleMapListCopy.funcRoleList;
			let result = true;
			for (let i = 0; i < dataList.length; i++) {
				if (dataList[i].roleMap[index][1] === 'N') {
					result = false;
					break;
				}
			}
			return result;
		},
		choiceFnc(groupId, funcId, roleId, mapYn) {
			mapYn = mapYn === 'Y' ? 'N' : 'Y';
			const mapParam = {
				groupId: parseInt(groupId),
				funcId: funcId,
				roleId: parseInt(roleId),
				mapYn: mapYn,
				storeId: this.storeId,
			};
			const mapList = this.roleMapAddList;
			// roleMapAddList 에 이미 값 있는지 체크
			for (let i = 0; i < mapList.length; i++) {
				if (
					mapList[i].groupId === parseInt(groupId) &&
					mapList[i].funcId === funcId &&
					mapList[i].roleId === parseInt(roleId)
				) {
					return mapList.splice(i, 1);
				}
			}
			this.roleMapAddList.push(mapParam);
		},
		userRoleRegiPopFnc() {
			this.userRoleRegiPop = !this.userRoleRegiPop;
		},
		async commonCodeListFnc() {
			let data = {
				initData: ['storeList'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.storeSelect = commonCodeList.storeList[0];
			this.storeSelectList = commonCodeList.storeList;
		},
		async selectGetList(val) {
			this.storeId = val;
			let data = {
				storeId: this.storeId,
			};
			await this.getFuncRoleMapInfoFnc(data);
		},
	},
	watch: {
		choiceGroup: {
			deep: true,
			handler: function () {
				this.roleGroupNameObjAddFnc();
			},
		},
	},
	async created() {
		let data;
		if (this.roleVal) {
			await this.commonCodeListFnc();
			data = {
				storeId: this.storeSelectList[0].storeId,
			};
			this.storeId = this.storeSelectList[0].storeId;
		} else {
			data = {
				storeId: this.storeId,
			};
		}
		await this.getFuncRoleMapInfoFnc(data);
	},
};
</script>

<style>
.saleStoreDataTd {
	position: relative;
	width: 160px;
}
.TbLabel {
	margin-right: 10px;
	cursor: pointer;
	margin-left: 5px;
	position: absolute;
	width: 100%;
	left: 0;
	height: 100%;
	top: 0;
	margin: 0;
	content: '';
}
</style>
