<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="990">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>옵션관리</h2>
					</v-card-title>

					<v-card-text>
						<div class="option_sec">
							<div>
								<p v-if="!roleVal" style="width: 500px">
									<span class="redfont">*</span>필수입력정보 (최대 20개까지 구성
									가능합니다.)
								</p>
							</div>
							<div><v-btn @click="addRow" v-if="!roleVal">추가</v-btn></div>
						</div>
						<div>
							<!--시스템관리자 -->
							<template v-if="!roleVal">
								<table class="optionTable">
									<thead>
										<tr>
											<th style="width: 20%">
												<span class="redfont">*</span> 용량
											</th>
											<th style="width: 25%">
												<span class="redfont">*</span> 컬러
											</th>
											<th style="width: 36%">공통바코드</th>
											<th style="width: 10%">자급제여부</th>
											<th style="width: 15%">삭제</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in optionData" :key="item.index">
											<td>
												<v-select
													class="select_custom1"
													outlined
													v-model.trim="optionData[index].capacity"
													:items="codeList.capacityListBasic"
													item-text="codeNm"
													:disabled="roleVal"
												>
												</v-select>
											</td>
											<td class="outlined">
												<input
													type="text"
													v-model.trim="optionData[index].colorName"
													placeholder="컬러를 입력해주세요."
													:disabled="roleVal"
												/>
											</td>
											<td class="outlined">
												<input
													type="text"
													v-model.trim="optionData[index].commonBarcode"
													placeholder="공통바코드를 입력해주세요."
													:disabled="roleVal"
												/>
											</td>
											<td class="text-center font-black">
												<input
													type="checkbox"
													v-model.trim="optionData[index].unLockYn"
													true-value="Y"
													false-value="N"
												/>
											</td>
											<td style="text-align: center">
												<a @click="removeRow(index)" v-if="!roleVal">삭제</a>
											</td>
										</tr>
									</tbody>
								</table>
							</template>
							<!--    일반사용자          -->
							<template v-else>
								<table class="optionTable">
									<thead>
										<tr>
											<th style="width: 24%">용량</th>
											<th style="width: 26%">컬러</th>
											<th style="width: 36%">공통바코드</th>
											<th style="width: 26%">자급제여부</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in optionData" :key="item.index">
											<td class="text-center font-black">
												{{ optionData[index].capacity }}
											</td>
											<td class="text-center font-black">
												{{ optionData[index].colorName }}
											</td>

											<td class="text-center font-black">
												{{ optionData[index].commonBarcode }}
											</td>
											<td class="text-center font-black">
												<input
													type="checkbox"
													:checked="optionData[index].unLockYn === 'Y'"
													disabled
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</template>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							v-if="!roleVal"
							color="primary"
							text
							@click="saveOptionInfoFnc"
							outlined
						>
							등록
						</v-btn>
						<v-btn color="primary" text @click="dialog = !dialog" outlined>
							취소
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { saveOptionInfo } from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';

export default {
	props: ['optionListData'],
	data() {
		return {
			formData: {
				capacity: '',
				colorName: '',
				commonBarcode: '',
				unLockYn: '',
			},
			optionData: [],
		};
	},
	computed: {
		roleVal() {
			return !this.$store.state.role;
		},
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		dialog: {
			get() {
				return this.$store.state.MobilephoneListModule.optionDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.optionDialog = newValue;
			},
		},
	},
	methods: {
		optionVal() {
			const option = this.optionData;
			let result = true;
			for (let i = 0; i < option.length; i++) {
				if (!option[i].capacity) {
					alert('용량를 입력해주세요.');
					result = false;
					break;
				}
				if (!option[i].colorName) {
					alert('색상을 입력해주세요.');
					result = false;
					break;
				}
			}
			return result;
		},
		addRow() {
			if (this.optionData.length < 20) {
				this.optionData.push({
					goodsId: this.optionListData[1],
					goodsOptionId: '',
					capacity: '',
					colorName: '',
					commonBarcode: '',
				});
			}
		},
		removeRow(index) {
			if (this.optionData.length > 1) {
				this.optionData.splice(index, 1);
			} else {
				alert('최소 1개의 옵션을 입력해주세요.');
			}
		},
		async saveOptionInfoFnc() {
			const result = this.optionVal();
			if (!result) return;
			let optionData = this.optionData;
			await saveOptionInfo(optionData);
			alert('등록되었습니다.');
			this.dialog = !this.dialog;
			const data = this.$store.state.MobilephoneListModule.filterData;
			await this.getList(data);
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async getCommonCodeList() {
			let data = {
				code: ['CAPACITY'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
		},
	},
	created() {
		this.commonFilterInit();
		this.getCommonCodeList();
		for (let i = 0; i < this.optionListData[0].length; i++) {
			let data = {
				capacity: this.optionListData[0][i].capacity,
				colorName: this.optionListData[0][i].colorName,
				commonBarcode: this.optionListData[0][i].commonBarcode,
				goodsId: this.optionListData[0][i].goodsId,
				goodsOptionId: this.optionListData[0][i].goodsOptionId,
				unLockYn: this.optionListData[0][i].unLockYn,
			};
			this.optionData.push(data);
		}
		if (this.optionData.length === 0) {
			this.optionData.push({
				goodsId: this.optionListData[1],
				goodsOptionId: '0',
				capacity: null,
				colorName: null,
				commonBarcode: null,
			});
		}
	},
};
</script>
<style scoped>
.optionTable .v-text-field--outlined .v-label {
	top: 6px !important;
}
</style>
