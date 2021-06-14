<template>
	<span style="padding-left: 12px">
		<div id="datePicker" class="pt10">
			<v-row align="center">
				<v-col cols="auto">
					<v-menu
						v-model.trim="menu1"
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model.trim="startDtValue"
								outlined
								append-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
								class="datePickerInput input_custom1"
							></v-text-field>
						</template>
						<v-date-picker
							v-model.trim="startDtValue"
							@input="menu1 = false"
							locale="ko-KR"
						></v-date-picker>
					</v-menu>
				</v-col>

				<v-col cols="auto" style="margin: 0 10px"> ~ </v-col>

				<v-col cols="auto">
					<v-menu
						v-model.trim="menu2"
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model.trim="endDtValue"
								outlined
								append-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
								class="datePickerInput input_custom1"
							></v-text-field>
						</template>
						<v-date-picker
							v-model.trim="endDtValue"
							@input="menu2 = false"
							locale="ko-KR"
						></v-date-picker>
					</v-menu>
				</v-col>
				<v-col cols="auto">
					<div class="radioCont">
						<input
							type="radio"
							id="all"
							name="date"
							value="0"
							v-model.trim="setDateBtn"
							@click="setDate('all')"
							checked
						/><label for="all">전체</label>
						<input
							type="radio"
							id="today"
							name="date"
							value="1"
							v-model.trim="setDateBtn"
							@click="setDate('day')"
						/><label for="today">오늘</label>
						<input
							type="radio"
							id="week"
							name="date"
							value="2"
							v-model.trim="setDateBtn"
							@click="setDate('week7')"
						/><label for="week">7일</label>
						<input
							type="radio"
							id="halfMonth"
							name="date"
							value="3"
							v-model.trim="setDateBtn"
							@click="setDate('week15')"
						/><label for="halfMonth">15일</label>
						<input
							type="radio"
							id="month"
							name="date"
							value="4"
							v-model.trim="setDateBtn"
							@click="setDate('month')"
						/><label for="month">한달</label>
					</div>
				</v-col>
			</v-row>
		</div>
	</span>
</template>
<script>
export default {
	props: ['dateReset'],
	data: () => ({
		start_dt: '',
		end_dt: '',
		menu: false,
		menu1: false,
		menu2: false,
		setDateBtn: 0,
	}),
	computed: {
		dateResetData() {
			return this.dateReset;
		},
		startDtValue: {
			get() {
				return this.start_dt;
			},
			set(date) {
				this.start_dt = date;
				this.datePickerData(this.start_dt, this.end_dt);
			},
		},
		endDtValue: {
			get() {
				return this.end_dt;
			},
			set(date) {
				this.end_dt = date;
				this.datePickerData(this.start_dt, this.end_dt);
			},
		},
	},
	methods: {
		setDate(criteria) {
			let now = new Date(); // 현재 날짜 및 시간
			let week7 = new Date(new Date().setDate(new Date().getDate() - 7)); // 일주일전
			let week15 = new Date(new Date().setDate(new Date().getDate() - 15)); // 보름 전
			let month = new Date(new Date().setMonth(new Date().getMonth() - 1)); // 한달 전

			if (criteria === 'day') {
				this.start_dt = this.getFormatDate(now);
				this.end_dt = this.getFormatDate(now);
			} else if (criteria === 'week7') {
				this.start_dt = this.getFormatDate(week7);
				this.end_dt = this.getFormatDate(now);
			} else if (criteria === 'week15') {
				this.start_dt = this.getFormatDate(week15);
				this.end_dt = this.getFormatDate(now);
			} else if (criteria === 'month') {
				this.start_dt = this.getFormatDate(month);
				this.end_dt = this.getFormatDate(now);
			} else if (criteria === 'all') {
				this.start_dt = '';
				this.end_dt = '';
			}
			this.datePickerData(this.start_dt, this.end_dt);
		},
		getFormatDate(date) {
			let year = date.getFullYear(); //yyyy
			let month = 1 + date.getMonth(); //M
			month = month >= 10 ? month : '0' + month; //month 두자리로 저장
			let day = date.getDate(); //d
			day = day >= 10 ? day : '0' + day; //day 두자리로 저장
			return year + '-' + month + '-' + day;
		},

		datePickerData(startDt, endDt) {
			// 상위 컴포넌트에 데이터 전달
			let dateData = {
				start_dt: startDt,
				end_dt: endDt,
			};
			this.$emit('datePickerData', dateData);
		},
	},
	watch: {
		dateResetData: {
			deep: true,
			handler: function (newVal) {
				if (newVal) {
					this.start_dt = '';
					this.end_dt = '';
					this.setDateBtn = 0;
				}
			},
		},
		startDtValue: {
			handler: function (newVal) {
				if (
					newVal > this.endDtValue &&
					this.endDtValue &&
					this.endDtValue !== this.startDtValue
				) {
					this.startDtValue = this.endDtValue;
				}
			},
		},
		endDtValue: {
			handler: function (newVal) {
				if (
					newVal < this.startDtValue &&
					this.startDtValue &&
					this.endDtValue !== this.startDtValue
				) {
					this.endDtValue = this.startDtValue;
				}
			},
		},
	},
};
</script>

<style>
.v-input__append-inner {
	margin-top: 4px !important;
}
</style>
