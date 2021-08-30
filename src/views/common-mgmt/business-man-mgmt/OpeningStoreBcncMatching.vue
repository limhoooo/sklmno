<template>
	<div>
		<div class="wrapper">
			<book-mark path="/openingstorebcnc-matching"></book-mark>
			<div class="pageTitle"><h2>개통점 / 영업점 매칭</h2></div>
			<div id="matchingTitle">
				<div class="selectCont disFx justify-lg-space-between w100P">
					<div>
						<div v-if="roleVal" class="disFx mr10">
							<p class="lh26">관리점</p>
							<v-select
								attach
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
						<div class="disFx">
							<p class="lh26">통신사</p>
							<v-select
								attach
								class="select_custom1"
								:items="telecomList"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								@change="selectGetTelecomList($event)"
								name="division"
								v-model.trim="telecomSelect"
							>
							</v-select>
						</div>
					</div>
					<div style="text-align: right" class="mb10">
						<v-btn @click="submit">저장</v-btn>
					</div>
				</div>
			</div>
			<div
				class="newTableStyle tableSticky"
				style="overflow: auto; width: 100%; height: 650px"
			>
				<table
					class="w100P"
					v-if="
						!saleStoreMapInfoList.openStoreList ||
						saleStoreMapInfoList.openStoreList.length === 0
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
				<table v-else style="white-space: nowrap">
					<thead>
						<tr>
							<th></th>
							<th
								class="padW10 lh40"
								style="width: 150px !important"
								v-for="(
									openStoreData, openStoreIndex
								) in saleStoreMapInfoList.openStoreList"
								v-bind:key="openStoreData.index"
							>
								{{ openStoreData.openStoreName }}
								<span v-if="openStoreData.parentSaleStoreName">
									( {{ openStoreData.parentSaleStoreName }} )
								</span>
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
						<tr v-if="saleStoreMapInfoList.saleStoreList.length === 0">
							<td :colspan="saleStoreMapInfoList.openStoreList.length + 1">
								데이터가없습니다.
							</td>
						</tr>
						<tr
							v-else
							v-for="(
								saleStoreData, saleStoreIndex
							) in saleStoreMapInfoList.saleStoreList"
							v-bind:key="saleStoreData.index"
						>
							<th>
								{{ saleStoreData.saleStore.saleStoreName }}
								<input
									type="checkbox"
									class="ml10"
									:checked="saleStoreChecked(saleStoreIndex)"
									@click="
										saleStoreCheckAll(
											saleStoreData.saleStore.storeId,
											saleStoreIndex,
											$event.target.checked,
										)
									"
								/>
							</th>
							<td
								class="saleStoreDataTd"
								style="width: 160px"
								:class="
									checkClassFnc(
										saleStoreData.saleStore.storeId,
										openStoreMapData[0],
									)
								"
								v-for="(openStoreMapData, index) in saleStoreData.openStoreMap"
								v-bind:key="openStoreMapData.index"
							>
								<input
									class="choiceBg"
									type="checkbox"
									:id="`checkInput${saleStoreData.saleStore.storeId}-${openStoreMapData[0]}`"
									:checked="openStoreMapData[1] === 'Y'"
									@click="
										choiceFnc(
											saleStoreData.saleStore.storeId,
											openStoreMapData[0],
											openStoreMapData[1],
											saleStoreMapInfoList.openStoreList[index].parentHierarchy,
										)
									"
								/>
								<label
									class="TbLabel"
									:for="`checkInput${saleStoreData.saleStore.storeId}-${openStoreMapData[0]}`"
								></label>
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
	getSaleStoreMapInfo,
	setSalesStoreMapInfo,
} from '../../../api/common-mgmt/businessman-mgmt/OpeningStoreBcncMatchingApi';
import { commonCodeListFnc } from '../../../common/common';
import BookMark from '../../../components/BookMark';

export default {
	components: { BookMark },
	data: () => ({
		telecomSelect: '0',
		telecomList: [],
		storeSelectList: [],
		storeSelect: [],
		saleStoreMapInfoList: [],
		salesStoreMapList: [],
		storeId: 0,
		codeList: {
			network: [],
			telecom: [],
			maker: [],
		},
	}),
	computed: {
		roleVal() {
			return this.$store.state.role === 'A';
		},
	},
	methods: {
		async getList(data) {
			try {
				const result = await getSaleStoreMapInfo(data);
				if (result) {
					this.saleStoreMapInfoList = {};
					this.salesStoreMapList = [];
					this.saleStoreMapInfoList = result.data.data;
				}
			} catch (error) {
				console.log(error);
			}
		},
		checkClassFnc(saleStoreId, openStoreId) {
			const mapList = this.salesStoreMapList;
			if (mapList.length === 0) return;

			for (let data of mapList) {
				if (
					data.openStoreId === parseInt(openStoreId) &&
					data.saleStoreId === parseInt(saleStoreId)
				) {
					if (data.mapYn === 'Y') return 'choiceBg';
					if (data.mapYn === 'N') return 'unChoiceBg';
				}
			}
		},
		choiceFnc(saleStoreId, openStoreId, mapYn, parentHierarchy) {
			mapYn = mapYn === 'Y' ? 'N' : 'Y';
			const mapParam = {
				saleStoreId: parseInt(saleStoreId),
				openStoreId: parseInt(openStoreId),
				storeId: this.storeId,
				mapYn: mapYn,
				parentHierarchy: parentHierarchy,
			};
			const mapList = this.salesStoreMapList;
			for (let i = 0; i < mapList.length; i++) {
				if (
					mapList[i].openStoreId === parseInt(openStoreId) &&
					mapList[i].saleStoreId === parseInt(saleStoreId)
				) {
					return mapList.splice(i, 1);
				}
			}
			this.salesStoreMapList.push(mapParam);
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
		async submit() {
			try {
				const confirmText = '저장하시겠습니까?';
				if (this.salesStoreMapList.length <= 0) {
					return alert('변경된 값이 없습니다.');
				}
				if (confirm(confirmText)) {
					const result = await setSalesStoreMapInfo(this.salesStoreMapList);
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
			const saleStoreList = this.saleStoreMapInfoList.saleStoreList;
			saleStoreList.forEach(item => {
				if (event && item.openStoreMap[index][1] === 'N') {
					this.choiceFnc(
						item.saleStore.storeId,
						openStoreId,
						item.openStoreMap[index][1],
						this.saleStoreMapInfoList.openStoreList[index].parentHierarchy,
					);
					item.openStoreMap[index][1] = 'Y';
				}
				if (!event && item.openStoreMap[index][1] === 'Y') {
					this.choiceFnc(
						item.saleStore.storeId,
						openStoreId,
						item.openStoreMap[index][1],
						this.saleStoreMapInfoList.openStoreList[index].parentHierarchy,
					);
					item.openStoreMap[index][1] = 'N';
				}
			});
		},
		saleStoreCheckAll(storeId, index, event) {
			const saleStoreList = this.saleStoreMapInfoList.saleStoreList[index]
				.openStoreMap;
			const parentHierarchy = this.saleStoreMapInfoList.openStoreList;
			// 개통점 parentHierarchy 추가
			for (let i = 0; i < saleStoreList.length; i++) {
				saleStoreList[i].push(parentHierarchy[i].parentHierarchy);
			}
			saleStoreList.forEach(item => {
				if (event && item[1] === 'N') {
					this.choiceFnc(storeId, item[0], item[1], item[2]);
					item[1] = 'Y';
				}
				if (!event && item[1] === 'Y') {
					this.choiceFnc(storeId, item[0], item[1], item[2]);
					item[1] = 'N';
				}
			});
		},
		saleStoreChecked(index) {
			const saleStoreList = this.saleStoreMapInfoList.saleStoreList[index]
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
			const saleStoreList = this.saleStoreMapInfoList.saleStoreList;
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
		capySaleStoreMapInfoList() {
			// if(this.saleStoreMapInfoList){
			//   for(let i = 0 ; i<this.saleStoreMapInfoList.openStoreList.length; i++){
			//     this.saleStoreMapInfoList.openStoreList[i].parentHierarchy
			//     for(let j = 0 ; j<this.saleStoreMapInfoList.saleStoreList.length; i++) {
			//       this.saleStoreMapInfoList.saleStoreList[j].openStoreMap
			//     }
			//   }
			// }
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
		await this.capySaleStoreMapInfoList();
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
