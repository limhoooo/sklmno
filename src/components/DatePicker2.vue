<template>
	<span class="disFx">
		<div class="w120 posR">
			<v-menu
				v-model.trim="menu1"
				:close-on-content-click="false"
				:nudge-right="40"
				transition="scale-transition"
				offset-y
			>
				<template v-slot:activator="{ on, attrs }">
					<v-text-field
						style="font-size: 12px"
						outlined
						readonly
						v-bind="attrs"
						v-on="on"
						label="시작일"
						v-model.trim="startDtValue"
					></v-text-field>
				</template>
				<v-date-picker
					@input="menu1 = false"
					locale="ko-KR"
					v-model.trim="startDtValue"
				></v-date-picker>
			</v-menu>
			<span class="dateImg cur_p" @click="menu1 = true"></span>
		</div>
		<div class="w120 ml10 posR">
			<v-menu
				v-model.trim="menu2"
				:close-on-content-click="false"
				:nudge-right="40"
				transition="scale-transition"
				offset-y
			>
				<template v-slot:activator="{ on, attrs }">
					<v-text-field
						style="font-size: 12px"
						class="w100P"
						outlined
						readonly
						label="종료일"
						v-bind="attrs"
						v-on="on"
						v-model.trim="endDtValue"
					></v-text-field>
				</template>
				<v-date-picker
					@input="menu2 = false"
					locale="ko-KR"
					v-model.trim="endDtValue"
				></v-date-picker>
			</v-menu>
			<span class="dateImg cur_p" @click="menu2 = true"></span>
		</div>
	</span>
</template>
<script>
export default {
	props: ['dateReset', 'dataType'],
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
				dataType: this.dataType,
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
.dateImg {
	position: absolute;
	right: 2px;
	top: 8px;
	background-image: url('../assets/img/date_range_black_24dp 1.png');
	width: 24px;
	height: 24px;
}
</style>
