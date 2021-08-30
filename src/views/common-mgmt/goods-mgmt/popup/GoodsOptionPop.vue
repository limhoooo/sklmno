<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="990">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">옵션관리</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text>
						<div class="option_sec">
							<div>
								<p v-if="!roleVal" style="width: 500px">
									<span class="redfont">*</span>필수입력정보 (최대 20개까지 구성
									가능합니다.)
								</p>
							</div>
							<div>
								<v-btn
									class="backColorGray1 mainWhite boldWt borderReset w80 mb10"
									@click="addRow"
									v-if="!roleVal"
									>추가</v-btn
								>
							</div>
						</div>
						<div>
							<!--시스템관리자 -->
							<template v-if="!roleVal">
								<div class="newTableStyle mt10">
									<table class="w100P">
										<thead>
											<tr>
												<th style="width: 20%">
													<span class="redfont">*</span> 용량
												</th>
												<th style="width: 25%">
													<span class="redfont">*</span> 컬러
												</th>
												<th>공통바코드</th>
												<th style="width: 10%">자급제여부</th>
												<th style="width: 15%">삭제</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in optionData" :key="item.index">
												<td>
													<v-select
														attach
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
													<v-text-field
														class="input_custom1"
														outlined
														v-model.trim="optionData[index].colorName"
														placeholder="컬러를 입력해주세요."
														:disabled="roleVal"
													>
													</v-text-field>
												</td>
												<td class="outlined txAnC">
													<v-text-field
														class="input_custom1"
														outlined
														v-model.trim="optionData[index].commonBarcode"
														placeholder="공통바코드를 입력해주세요."
														:disabled="roleVal"
													>
													</v-text-field>
													<!--													<input
														type="text"
														v-model.trim="optionData[index].commonBarcode"
														placeholder="공통바코드를 입력해주세요."
														:disabled="roleVal"
													/>-->
												</td>
												<td class="text-center font-black">
													<div class="checkStyleCont1 posHand1">
														<input
															type="checkbox"
															:id="`checkBox123${index}`"
															class="checkStyle"
															v-model.trim="optionData[index].unLockYn"
															true-value="Y"
															false-value="N"
														/>
														<label :for="`checkBox123${index}`"></label>
													</div>
												</td>
												<td style="text-align: center">
													<a @click="removeRow(index)" v-if="!roleVal">삭제</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</template>
							<!--    일반사용자          -->
							<template v-else>
								<div class="newTableStyle mt10">
									<table class="w100P">
										<thead>
											<tr>
												<th style="width: 25%">용량</th>
												<th style="width: 25%">컬러</th>
												<th style="width: 42%">공통바코드</th>
												<th style="width: 8%">자급제여부</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in optionData" :key="item.index" class="h40">
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
													<div
														class="checkStyleCont1"
														style="margin-left: 14px"
													>
														<input
															type="checkbox"
															class="checkStyle"
															id="check122"
															:checked="optionData[index].unLockYn === 'Y'"
															disabled
														/>
														<label for="check122"></label>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</template>

							<div class="disFx justify-end mt10">
								<v-btn
									v-if="!roleVal"
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="saveOptionInfoFnc"
									outlined
								>
									등록
								</v-btn>
								<v-btn
									class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
									text
									@click="dialog = !dialog"
									outlined
								>
									취소
								</v-btn>
							</div>
						</div>
					</v-card-text>
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
			return this.$store.state.role !== 'A';
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
