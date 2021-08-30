<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="500">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt" v-if="this.reqYn === 'N'">
							상품 등록
						</h2>
						<h2 class="mainWhite mainFontS boldWt" v-else>상품 요청</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<p class="mainRed mj0">* 필수입력입니다</p>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>제조사<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
											class="select_custom1"
											:items="infoDialogData.maker"
											item-text="codeNm"
											item-value="codeSeq"
											outlined
											v-model.trim="formData.maker"
											name="division"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>통신망<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
											class="select_custom1"
											:items="infoDialogData.network"
											item-text="codeNm"
											item-value="codeSeq"
											outlined
											v-model.trim="formData.network"
											name="division"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>통신사<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
											class="select_custom1"
											:items="infoDialogData.telecom"
											item-text="codeNm"
											item-value="codeSeq"
											item-disabled="전체"
											outlined
											v-model.trim="formData.telecom"
											name="division"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>상품명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.goodsName"
											placeholder="상품명을 입력해주세요."
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>모델명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.modelName"
											placeholder="모델명을 입력해주세요."
										>
										</v-text-field>
									</td>
								</tr>
							</table>

							<div class="disFx justify-end mt10">
								<v-btn
									v-if="this.reqYn === 'N'"
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="insertDataFnc"
									outlined
								>
									등록
								</v-btn>
								<v-btn
									v-else
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="insertDataFnc"
									outlined
								>
									요청
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
import { insertData } from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';
import { nullValidation } from '../../../../common/common.js';

export default {
	props: ['reqYn', 'infoDialogData'],
	data() {
		return {
			formData: {
				delYn: 'N',
				goodsId: 1,
				goodsName: '',
				modelName: '',
				maker: 0,
				matchingYn: 'N',
				network: this.infoDialogData.network[1].codeSeq,
				optionCnt: 1,
				telecom: this.infoDialogData.telecom[1].codeSeq,
				useYn: 'N',
				reqYn: this.reqYn,
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.MobilephoneListModule.registDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.registDialog = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.MobilephoneListModule.filterData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.filterData = newValue;
			},
		},
	},
	methods: {
		codeListShiftFnc() {
			/* TODO 리펙토링 */
			const findItem = this.infoDialogData.maker.find(item => {
				return item.codeSeq === '0';
			});
			const findItem1 = this.infoDialogData.telecom.find(item => {
				return item.codeSeq === '0';
			});
			const findItem2 = this.infoDialogData.network.find(item => {
				return item.codeSeq === '0';
			});

			if (findItem != undefined) {
				const idx = this.infoDialogData.maker.indexOf(findItem);
				this.infoDialogData.maker.splice(idx, 1);
			}

			if (findItem1 != undefined) {
				const idx = this.infoDialogData.telecom.indexOf(findItem1);
				this.infoDialogData.telecom.splice(idx, 1);
			}

			if (findItem2 != undefined) {
				const idx = this.infoDialogData.network.indexOf(findItem2);
				this.infoDialogData.network.splice(idx, 1);
			}
			this.formData.maker = this.infoDialogData.maker[0].codeSeq;
			this.formData.network = this.infoDialogData.network[0].codeSeq;
			this.formData.telecom = this.infoDialogData.telecom[0].codeSeq;
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async insertDataFnc() {
			try {
				if (!nullValidation(this.formData)) {
					return;
				}

				const result = await insertData(this.formData);
				if (result.data.status === 200) {
					alert('등록되었습니다.');
					this.dialog = !this.dialog;
					await this.getList(this.filterData);
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		/*this.infoDialogData.maker.shift();*/
		this.codeListShiftFnc();
	},
};
</script>
