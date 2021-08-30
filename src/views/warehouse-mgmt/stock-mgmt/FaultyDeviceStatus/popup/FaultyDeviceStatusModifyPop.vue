<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="620">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">개통점 등록</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">판정상태</td>
									<td>
										<div class="disFx">
											<div class="radioStylePop ml20">
												<input
													type="radio"
													id="division01"
													value="PROGRESS"
													name="outStockState"
													v-model.trim="formData.judgeStatus"
												/>
												<label for="division01">판정진행중</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division02"
													value="COMPL"
													name="outStockState"
													v-model.trim="formData.judgeStatus"
												/>
												<label for="division02">판정완료</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division03"
													value="REJECT"
													name="outStockState"
													v-model.trim="formData.judgeStatus"
												/>
												<label for="division03">판정반려</label>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td class="w120">판정사유</td>
									<td>
										<textarea
											style="
												width: 100%;
												border: 1px solid #ddd;
												margin-top: 5px;
												resize: none;
												padding-left: 10px;
											"
											v-model.trim="formData.judgeMemo"
											placeholder="입고메모"
										></textarea>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt20">
							<v-btn
								text
								@click="submit"
								class="backColorMint1 mainWhite borderReset w80"
							>
								저장
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
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
export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.FaultyDeviceStatusModule.modifyDialog;
			},
			set(newValue) {
				this.$store.state.FaultyDeviceStatusModule.modifyDialog = newValue;
			},
		},
	},
	methods: {
		async submit() {
			let data = this.formData;
			const result = await this.$store.dispatch(
				'FaultyDeviceStatusModule/updateJudgementStatus',
				data,
			);
			if (result) {
				this.dialog = false;
				const data = this.$store.state.FaultyDeviceStatusModule.filterData;
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				await this.$store.dispatch('FaultyDeviceStatusModule/getList', data);
				if (data && data.capacity === '') {
					data.capacity = '전체';
				}
				if (data && data.colorName === '') {
					data.colorName = '전체';
				}
			}
		},
	},
	created() {
		this.formData.dvcId = this.infoDialogData.dvcId;
		this.formData.judgeStatus = this.infoDialogData.judgeStatus;
		this.formData.judgeMemo = this.infoDialogData.judgeMemo;
	},
};
</script>

<style scoped>
.rowItemText span {
	font-size: 12px;
	color: #7397a4;
	margin-right: 10px;
}
.rowItemText label {
	font-size: 12px;
	color: #7397a4;
	margin-left: 3px;
	margin-right: 5px;
}
</style>
