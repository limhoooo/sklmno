<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="550">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt" v-if="this.reqYn === 'N'">
							요금 등록
						</h2>
						<h2 class="mainWhite mainFontS boldWt" v-else>요금 요청</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<p class="mainRed mj0">* 필수입력입니다</p>

						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>통신사<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
											class="select_custom1"
											:items="codeData.telecom"
											item-text="codeNm"
											item-value="codeSeq"
											outlined
											v-model.trim="formData.telecom"
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
											:items="codeData.network"
											item-text="codeNm"
											item-value="codeSeq"
											outlined
											name="division"
											v-model.trim="formData.network"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>요금제명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											placeholder="요금제를 입력해주세요."
											v-model.trim="formData.chargeName"
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>카테고리<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.category"
											placeholder="카테고리를 입력해주세요."
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>요금<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.chargeAmt"
											placeholder="요금을 입력해주세요."
											oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
										></v-text-field>
									</td>
								</tr>
								<tr>
									<td>요금코드<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.chargeCode"
											placeholder="요금코드를 입력해주세요."
										></v-text-field>
									</td>
								</tr>
							</table>
							<div class="disFx justify-end mt10">
								<v-btn
									v-if="this.reqYn === 'N'"
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="insertStoreFnc"
									outlined
								>
									등록
								</v-btn>
								<v-btn
									v-else
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="insertStoreFnc"
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
import {insertStore} from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtApi.js';
import {nullValidation} from '../../../../common/common.js';

export default {
	props: ['reqYn', 'codeData'],
	data() {
		return {
			formData: {
				telecom: this.codeData.telecom[0].codeSeq,
				chargeName: '',
				chargeAmt: '',
				chargeCode: '',
				network: this.codeData.network[1],
				category: '',
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.ChargeListModule.registDialog;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.registDialog = newValue;
			},
		},
		getListData: {
			get() {
				return this.$store.state.ChargeListModule.getListData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.getListData = newValue;
			},
		},
	},
	methods: {
		codeDataShiftFnc() {
			/* TODO 리펙토링 */
			const findItem2 = this.codeData.network.find(item => {
				return item.codeSeq === 0;
			});
			if (findItem2 != undefined) {
				const idx = this.codeData.network.indexOf(findItem2);
				this.codeData.network.splice(idx, 1);
			}
			this.formData.network = this.codeData.network[0].codeSeq;
		},
		async getListFnc(data) {
			this.getListData = [];
			await this.$store.dispatch('ChargeListModule/getList', data);
		},
		async insertStoreFnc() {
			const data = {
				// category: this.formData.category,
				chargeId: 1,
				telecom: this.formData.telecom,
				network: this.formData.network,
				chargeName: this.formData.chargeName,
				useYn: 'N',
				delYn: 'N',
				matchingYn: 'N',
				category: this.formData.category,
				chargeAmt: this.formData.chargeAmt,
				reqYn: this.reqYn,
				chargeCode: this.formData.chargeCode,
			};
			if (!nullValidation(data)) {
				return;
			}
			const result = await insertStore(data);
			if (result.data.status === 200) {
				alert('저장 되었습니다.');
				this.dialog = !this.dialog;
				this.getListFnc();
			} else {
				alert(`알수없는 오류가 발생했습니다.`);
			}
		},
	},
	created() {
		this.codeDataShiftFnc();
	},
};
</script>

<style></style>
