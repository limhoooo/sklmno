<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="620">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">장기 재고 알람설정</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">재판매 마감</td>
									<td>
										<div class="disFx">
											<div class="radioStylePop ml20">
												<input
													type="radio"
													id="division01"
													value="30"
													@change="checkEvn1($event.target.value)"
													:checked="alarmData.resellDay === 30"
													name="outStockState"
												/>
												<label for="division01">30일</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division02"
													value="45"
													@change="checkEvn1($event.target.value)"
													:checked="alarmData.resellDay === 45"
													name="outStockState"
												/>
												<label for="division02">45일</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division03"
													value="60"
													@change="checkEvn1($event.target.value)"
													:checked="alarmData.resellDay === 60"
													name="outStockState"
												/>
												<label for="division03">60일</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division04"
													value="etc"
													@change="checkEvn1($event.target.value)"
													name="outStockState"
													:checked="
														alarmData.resellDay != 30 &&
														alarmData.resellDay != 45 &&
														alarmData.resellDay != 60
													"
												/>
												<label for="division04">기타</label>
											</div>
											<input
												:disabled="!resellDayChk"
												type="text"
												v-model="resellDayInput"
												style="
													line-height: 26px;
													border: 1px solid #aaa;
													width: 50px;
													text-align: center;
													margin: 5px 0 5px 5px;
													height: 20px;
												"
											/>
											<span class="lh30 ml5">일</span>
										</div>
									</td>
								</tr>
								<tr>
									<td>미출고 시점</td>
									<td>
										<div class="disFx">
											<div class="radioStylePop ml20">
												<input
													type="radio"
													id="division05"
													value="15"
													@change="checkEvn2($event.target.value)"
													:checked="alarmData.undeliveredDay === 15"
													name="outStockState1"
												/>
												<label for="division05">15일</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division06"
													value="30"
													@change="checkEvn2($event.target.value)"
													:checked="alarmData.undeliveredDay === 30"
													name="outStockState1"
												/>
												<label for="division06">30일</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division07"
													value="45"
													@change="checkEvn2($event.target.value)"
													:checked="alarmData.undeliveredDay === 45"
													name="outStockState1"
												/>
												<label for="division07">45일</label>
											</div>
											<div class="radioStylePop ml30">
												<input
													type="radio"
													id="division08"
													value="etc"
													:checked="
														alarmData.undeliveredDay != 15 &&
														alarmData.undeliveredDay != 30 &&
														alarmData.undeliveredDay != 45
													"
													@change="checkEvn2($event.target.value)"
													name="outStockState1"
												/>
												<label for="division08">기타</label>
											</div>
											<input
												:disabled="!undeliveredDayChk"
												type="text"
												v-model="undeliveredDayInput"
												style="
													border: 1px solid #aaa;
													width: 50px;
													text-align: center;
													margin: 5px 0 5px 5px;
													height: 20px;
												"
											/>
											<span class="lh30 ml5">일</span>
										</div>
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
	data: () => ({
		resellDayChk: false,
		undeliveredDayChk: false,
		resellDayInput: 0,
		undeliveredDayInput: 0,
		formData: {
			resellDay: '',
			undeliveredDay: '',
		},
	}),
	computed: {
		alarmData() {
			return this.$store.state.LongtimeStockModule.alarmData;
		},
		dialog: {
			get() {
				return this.$store.state.LongtimeStockModule.notiDialog;
			},
			set(newValue) {
				this.$store.state.LongtimeStockModule.notiDialog = newValue;
			},
		},
	},
	methods: {
		checkEvn1(val) {
			if (val === 'etc') {
				this.formData.resellDay = '';
				this.resellDayChk = true;
			} else {
				this.formData.resellDay = val;
				this.resellDayInput = 0;
				this.resellDayChk = false;
			}
		},
		checkEvn2(val) {
			if (val === 'etc') {
				this.formData.undeliveredDay = '';
				this.undeliveredDayChk = true;
			} else {
				this.formData.undeliveredDay = val;
				this.undeliveredDayInput = 0;
				this.undeliveredDayChk = false;
			}
		},
		async submit() {
			if (!this.formData.resellDay) {
				this.formData.resellDay = this.resellDayInput;
			}
			if (!this.formData.undeliveredDay) {
				this.formData.undeliveredDay = this.undeliveredDayInput;
			}

			const data = {
				resellDay: Number(this.formData.resellDay),
				undeliveredDay: Number(this.formData.undeliveredDay),
			};
			const result = await this.$store.dispatch(
				'LongtimeStockModule/setLongTimeStoreStockAlarm',
				data,
			);
			if (result) {
				await this.getLongTimeStoreStockAlarm();
				this.dialog = false;
				const data = this.$store.state.LongtimeStockModule.filterData;
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				await this.$store.dispatch('LongtimeStockModule/getList', data);
				if (data && data.capacity === '') {
					data.capacity = '전체';
				}
				if (data && data.colorName === '') {
					data.colorName = '전체';
				}
			}
		},
		async getLongTimeStoreStockAlarm() {
			await this.$store.dispatch(
				'LongtimeStockModule/getLongTimeStoreStockAlarm',
			);
		},
		dataSet() {
			if (
				this.alarmData.resellDay !== 30 &&
				this.alarmData.resellDay !== 45 &&
				this.alarmData.resellDay !== 60
			) {
				this.resellDayChk = true;
				this.resellDayInput = this.alarmData.resellDay;
			} else {
				this.formData.resellDay = this.alarmData.resellDay;
			}
			if (
				this.alarmData.undeliveredDay !== 15 &&
				this.alarmData.undeliveredDay !== 30 &&
				this.alarmData.undeliveredDay !== 45
			) {
				this.undeliveredDayChk = true;
				this.undeliveredDayInput = this.alarmData.undeliveredDay;
			} else {
				this.formData.undeliveredDay = this.alarmData.undeliveredDay;
			}
		},
	},
	async created() {
		await this.dataSet();
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
