<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="700"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>장기 재고 알람설정</p>
							</div>
							<div class="rowHeader mt20">
								<p>재판매 마감</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText">
									<input
										type="radio"
										id="division01"
										value="30"
										@change="checkEvn1($event.target.value)"
										:checked="alarmData.resellDay === 30"
										name="outStockState"
									/>
									<label for="division01">30일</label>
									<input
										type="radio"
										id="division02"
										value="45"
										@change="checkEvn1($event.target.value)"
										:checked="alarmData.resellDay === 45"
										name="outStockState"
									/>
									<label for="division02">45일</label>
									<input
										type="radio"
										id="division03"
										value="60"
										@change="checkEvn1($event.target.value)"
										:checked="alarmData.resellDay === 60"
										name="outStockState"
									/>
									<label for="division03">60일</label>
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
									<input
										:disabled="!resellDayChk"
										type="text"
										v-model="resellDayInput"
										style="
											border: 1px solid #aaa;
											width: 25px;
											text-align: center;
											margin: 5px 0 5px 5px;
											height: 25px;
										"
									/>
									일
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>미출고 시점</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText">
									<input
										type="radio"
										id="division05"
										value="15"
										@change="checkEvn2($event.target.value)"
										:checked="alarmData.undeliveredDay === 15"
										name="outStockState1"
									/>
									<label for="division05">15일</label>
									<input
										type="radio"
										id="division06"
										value="30"
										@change="checkEvn2($event.target.value)"
										:checked="alarmData.undeliveredDay === 30"
										name="outStockState1"
									/>
									<label for="division06">30일</label>
									<input
										type="radio"
										id="division07"
										value="45"
										@change="checkEvn2($event.target.value)"
										:checked="alarmData.undeliveredDay === 45"
										name="outStockState1"
									/>
									<label for="division07">45일</label>
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
									<input
										:disabled="!undeliveredDayChk"
										type="text"
										v-model="undeliveredDayInput"
										style="
											border: 1px solid #aaa;
											width: 25px;
											text-align: center;
											margin: 5px 0 5px 5px;
											height: 25px;
										"
									/>
									일
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn text @click="submit" style="background-color: #17a5ae">
								저장
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								닫기
							</v-btn>
						</div>
					</v-card-actions>
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
			console.log(data);
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
