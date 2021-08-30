<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="600">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">조정 출고</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w180">조정 출고 날짜</td>
									<td>
										<div style="display: inline-block">
											<v-menu
												v-model.trim="menu1"
												:close-on-content-click="false"
												:nudge-right="40"
												transition="scale-transition"
												offset-y
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														outlined
														readonly
														v-bind="attrs"
														v-on="on"
														class="input_custom1"
														placeholder="0000-00-00"
														v-model.trim="mediationFormData.mediationOutDate"
													></v-text-field>
												</template>
												<v-date-picker
													@input="menu1 = false"
													locale="ko-KR"
													v-model.trim="mediationFormData.mediationOutDate"
												></v-date-picker>
											</v-menu>
										</div>
									</td>
								</tr>
								<tr>
									<td>사유</td>
									<td>
										<input
											class="w350 borderRadi3Px borderContColor2 padW10 lh30"
											type="text"
											placeholder="사유를 입력하세요."
											v-model.trim="mediationFormData.mediationOutMemo"
										/>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt20">
							<v-btn
								text
								class="backColorMint1 mainWhite borderReset w80"
								@click="insertMediationOut"
							>
								저장
							</v-btn>
							<v-btn
								text
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								@click="closeFnc"
							>
								닫기
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { nullValidation2 } from '../../../../../../common/common.js';

export default {
	name: 'MediationReleasePop',
	components: { nullValidation2 },
	computed: {
		dialog: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.mediationDialog;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.mediationDialog = newValue;
			},
		},
		mediationFormData: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.mediationFormData;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.mediationFormData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.filterData;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.filterData = newValue;
			},
		},
	},
	data: () => ({
		menu1: false,
	}),
	methods: {
		closeFnc() {
			this.dialog = false;
		},
		async insertMediationOut() {
			if (!nullValidation2(this.mediationFormData, ['mediationOutDate'])) {
				return;
			}
			await this.$store.dispatch(
				'MgmtTargetDeviceModule/insertMediationOut',
				this.mediationFormData,
			);
			await this.getList(this.filterData);
			this.dialog = false;
		},
		getList(data) {
			this.$store.dispatch(
				'MgmtTargetDeviceModule/getMgmtTargetDevicePage',
				data,
			);
		},
	},
	created() {
		this.mediationFormData.mediationOutDate = '';
		this.mediationFormData.mediationOutMemo = '';
	},
};
</script>

<style scoped></style>
