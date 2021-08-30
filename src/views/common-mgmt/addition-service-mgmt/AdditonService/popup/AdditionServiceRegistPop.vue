<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="500">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt" v-if="this.reqYn === 'N'">
							부가서비스 등록
						</h2>
						<h2 class="mainWhite mainFontS boldWt" v-else>부가서비스 요청</h2>
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
									<td>카테고리<span class="redfont">*</span></td>
									<td>
										<v-select
											attach
											class="select_custom1"
											:items="addsvcTypeData"
											item-text="name"
											item-value="value"
											outlined
											v-model.trim="formData.addSvcType"
											name="division1"
										>
										</v-select>
									</td>
								</tr>
								<tr>
									<td>부가서비스명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											placeholder="부가서비스명을 입력해주세요."
											class="input_custom1"
											outlined
											v-model.trim="formData.addSvcName"
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>요금<span class="redfont">*</span></td>
									<td>
										<v-text-field
											placeholder="요금을 입력해주세요."
											class="input_custom1"
											outlined
											v-model.trim="formData.addSvcCharge"
											oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>메모</td>
									<td>
										<v-text-field
											placeholder="메모를 입력해주세요."
											class="input_custom1"
											outlined
											v-model.trim="formData.addSvcMemo"
										>
										</v-text-field>
									</td>
								</tr>
							</table>

							<div class="disFx justify-end mt10">
								<v-btn
									class="backColorMint1 mainWhite borderReset w80"
									text
									@click="insertDataFnc"
									outlined
								>
									저장
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
import { insertData } from '../../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceMgmtApi.js';
import {
	commonCodeListFnc,
	nullValidation,
} from '../../../../../common/common.js';

export default {
	props: ['reqYn', 'codeData'],
	data() {
		return {
			codeList: {
				telecom: [],
			},
			addsvcTypeData: [
				{ name: '일반', value: 'NORMAL' },
				{ name: '보험', value: 'INSURANCE' },
			],
			formData: {
				addSvcName: '',
				telecom: 5,
				addSvcType: '',
				addSvcCharge: '',
				addSvcMemo: '',
				delYn: 'N',
				useYn: 'N',
				reqYn: this.reqYn,
			},
		};
	},
	computed: {
		getListData: {
			get() {
				return this.$store.state.AdditionServiceModule.getListData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.getListData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.filterData = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.AdditionServiceModule.registDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.registDialog = newValue;
			},
		},
	},
	methods: {
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('AdditionServiceModule/getList', data);
		},
		async insertDataFnc() {
			try {
				if (!nullValidation(this.formData, ['addSvcMemo'])) {
					return;
				}
				const result = await insertData(this.formData);
				if (result) {
					alert('등록되었습니다.');
					this.dialog = !this.dialog;
					await this.getList(this.filterData);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async commonCodeListFnc() {
			let data = {
				code: ['TELECOM'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.formData.addSvcType = this.addsvcTypeData[0].value;
		},
	},
	created() {
		this.commonCodeListFnc();
	},
};
</script>
