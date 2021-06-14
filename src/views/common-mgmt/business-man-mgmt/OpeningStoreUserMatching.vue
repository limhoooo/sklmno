<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>개통점 / 사용자 매칭</h2></div>
			<div id="matchingTitle">
				<div class="selectCont">
					<div v-if="roleVal">
						<p>관리점</p>
						<v-select
							class="select_custom1"
							:items="storeSelectList"
							item-text="saleStoreName"
							item-value="storeId"
							@change="selectGetList($event)"
							outlined
							name="division"
							v-model.trim="storeSelect"
						>
						</v-select>
					</div>
					<p>통신사</p>
					<v-select
						class="select_custom1"
						:items="telecomList"
						item-text="codeNm"
						item-value="codeSeq"
						@change="selectGetTelecomList($event)"
						outlined
						name="division"
						v-model.trim="telecomSelect"
					>
					</v-select>
					<div></div>
				</div>
			</div>
			<div id="ListTableCont">
				<div style="text-align: right" class="mb10">
					<v-btn @click="submit">저장</v-btn>
				</div>
				<table
					v-if="
						!saleStoreMapInfoList.openStoreList ||
						saleStoreMapInfoList.openStoreList.length == 0
					"
				>
					<thead>
						<tr>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>데이터가없습니다.</td>
						</tr>
					</tbody>
				</table>
				<table v-else>
					<thead>
						<tr>
							<th style="width: 120px"></th>
							<th
								v-for="(
									openStoreData, openStoreIndex
								) in saleStoreMapInfoList.openStoreList"
								v-bind:key="openStoreData.index"
							>
								{{ openStoreData.openStoreName }}
								<input
									type="checkbox"
									class="ml10"
									:checked="openStoreChecked(openStoreIndex)"
									@click="
										openStoreCheckAll(
											openStoreData.openStoreId,
											openStoreIndex,
											$event.target.checked,
										)
									"
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="saleStoreMapInfoList.userList.length === 0">
							<td :colspan="saleStoreMapInfoList.openStoreList.length + 1">
								데이터가없습니다.
							</td>
						</tr>
						<tr
							v-else
							v-for="(userList, userIndex) in saleStoreMapInfoList.userList"
							v-bind:key="userList.index"
						>
							<th>
								{{ userList.user.name }}
								<input
									type="checkbox"
									class="ml10"
									:checked="saleStoreChecked(userIndex)"
									@click="
										saleStoreCheckAll(
											userList.user.seq,
											userIndex,
											$event.target.checked,
										)
									"
								/>
							</th>
							<td
								class="saleStoreDataTd"
								style="width: 155px"
								:class="checkClassFnc(userList.user.seq, openStoreMapData[0])"
								v-for="openStoreMapData in userList.openStoreMap"
								v-bind:key="openStoreMapData.index"
							>
								<input
									class="choiceBg"
									type="checkbox"
									:id="`checkInput${userList.user.seq}-${openStoreMapData[0]}`"
									:checked="openStoreMapData[1] === 'Y'"
									@click="
										choiceFnc(
											userList.user.seq,
											openStoreMapData[0],
											openStoreMapData[1],
										)
									"
								/>
								<label
									class="TbLabel"
									:for="`checkInput${userList.user.seq}-${openStoreMapData[0]}`"
								>
								</label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="text-align: right" class="mt10">
				<v-btn @click="submit">저장</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getUserMapInfo,
	setUserMapInfo,
} from '../../../api/common-mgmt/businessman-mgmt/openingStoreUserMatchingApi';
import { commonCodeListFnc } from '../../../common/common';

export default {
	data: () => ({
		telecomSelect: '0',
		telecomList: [],
		storeSelectList: [],
		storeSelect: [],
		saleStoreMapInfoList: [],
		setMapList: [],
		storeId: 1,
	}),
	computed: {
		roleVal() {
			return this.$store.state.role;
		},
	},
	methods: {
		async getList(data) {
			try {
				this.saleStoreMapInfoList = [];
				this.setMapList = [];
				const result = await getUserMapInfo(data);
				this.saleStoreMapInfoList = result.data.data;
			} catch (error) {
				console.log(error);
			}
		},
		checkClassFnc(seq, openStoreId) {
			const mapList = this.setMapList;
			if (mapList.length === 0) return;

			for (let data of mapList) {
				if (
					data.openStoreId === parseInt(openStoreId) &&
					data.userId === parseInt(seq)
				) {
					if (data.mapYn === 'Y') return 'choiceBg';
					if (data.mapYn === 'N') return 'unChoiceBg';
				}
			}
		},
		choiceFnc(seq, openStoreId, mapYn) {
			mapYn = mapYn === 'Y' ? 'N' : 'Y';
			const mapParam = {
				userId: parseInt(seq),
				openStoreId: parseInt(openStoreId),
				mapYn: mapYn,
			};
			const mapList = this.setMapList;
			for (let i = 0; i < mapList.length; i++) {
				if (
					mapList[i].openStoreId === parseInt(openStoreId) &&
					mapList[i].userId === parseInt(seq)
				) {
					return mapList.splice(i, 1);
				}
			}
			this.setMapList.push(mapParam);
		},
		async submit() {
			try {
				const confirmText = '저장하시겠습니까?';
				if (this.setMapList.length <= 0) {
					return alert('변경된 값이 없습니다.');
				}
				if (confirm(confirmText)) {
					const result = await setUserMapInfo(this.setMapList);
					let data = {
						storeId: this.storeId,
					};
					if (result) await this.getList(data);
				}
			} catch (e) {
				console.log(e);
			}
		},

		openStoreCheckAll(openStoreId, index, event) {
			const saleStoreList = this.saleStoreMapInfoList.userList;
			saleStoreList.forEach(item => {
				if (event && item.openStoreMap[index][1] === 'N') {
					this.choiceFnc(
						item.user.seq,
						openStoreId,
						item.openStoreMap[index][1],
					);
					item.openStoreMap[index][1] = 'Y';
				}
				if (!event && item.openStoreMap[index][1] === 'Y') {
					this.choiceFnc(
						item.user.seq,
						openStoreId,
						item.openStoreMap[index][1],
					);
					item.openStoreMap[index][1] = 'N';
				}
			});
		},
		saleStoreCheckAll(seq, index, event) {
			const saleStoreList = this.saleStoreMapInfoList.userList[index]
				.openStoreMap;
			saleStoreList.forEach(item => {
				if (event && item[1] === 'N') {
					this.choiceFnc(seq, item[0], item[1]);
					item[1] = 'Y';
				}
				if (!event && item[1] === 'Y') {
					this.choiceFnc(seq, item[0], item[1]);
					item[1] = 'N';
				}
			});
		},
		saleStoreChecked(index) {
			const saleStoreList = this.saleStoreMapInfoList.userList[index]
				.openStoreMap;
			let result = true;
			for (let i = 0; i < saleStoreList.length; i++) {
				if (saleStoreList[i][1] === 'N') {
					result = false;
					break;
				}
			}
			return result;
		},
		openStoreChecked(index) {
			const saleStoreList = this.saleStoreMapInfoList.userList;
			let result = true;
			for (let i = 0; i < saleStoreList.length; i++) {
				if (saleStoreList[i].openStoreMap[index][1] === 'N') {
					result = false;
					break;
				}
			}
			return result;
		},
		async commonCodeListFnc() {
			let data;
			if (this.roleVal) {
				data = {
					initData: ['storeList'],
					code: ['TELECOM'],
				};
			} else {
				data = {
					code: ['TELECOM'],
				};
			}
			const commonCodeList = await commonCodeListFnc(data);
			if (this.roleVal) {
				this.storeSelect = commonCodeList.storeList[0];
				this.storeSelectList = commonCodeList.storeList;
			}
			this.telecomList = commonCodeList.codeList.TELECOM;
			this.telecomList.unshift({ codeNm: '전체', codeSeq: '0' });
		},
		async selectGetList(val) {
			this.storeId = val;
			this.telecomSelect = this.telecomList[0];
			let data = {
				storeId: val,
				telecom: 0,
			};
			await this.getList(data);
		},
		async selectGetTelecomList(val) {
			let data;
			if (this.roleVal) {
				data = {
					storeId: this.storeId,
					telecom: val,
				};
			} else {
				data = {
					telecom: val,
				};
			}
			await this.getList(data);
		},
	},

	async created() {
		await this.commonCodeListFnc();
		let data;
		if (this.roleVal) {
			data = {
				storeId: this.storeSelectList[0].storeId,
			};
			this.storeId = this.storeSelectList[0].storeId;
		} else {
			data = {
				storeId: this.storeId,
			};
		}
		await this.getList(data);
	},
};
</script>
<style>
.saleStoreDataTd {
	position: relative;
	width: 160px;
}
.selectCont > div {
	display: flex;
}
.selectCont > div:first-of-type {
	padding-right: 20px;
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
