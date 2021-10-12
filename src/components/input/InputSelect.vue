<template>
	<div class="disFX borderRadi3Px borderContColor1 lh36" :style="inputWidth">
		<div style="flex-grow: 1; width: 100%; display: inline-flex">
			<select
				style="flex-grow: 1; width: 100%; height: 32px; line-height: 100%"
				v-model.trim="selected"
				@input="setNewValue($event.target.value)"
				:disabled="disableYN"
			>
				<option disabled selected>{{ title }}을 선택하세요</option>
				<option
					v-for="(option, index) in optionList"
					:value="option.value"
					:key="index"
				>
					{{ option.name }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
import { formatToNumber } from '@/common/common';

export default {
	props: {
		// title : 제목
		// data : {name: ,value: }형태로 내려주세요.
		// optionList : {name: value:} 선택항목 list 를 내려주세요.
		// disableYN : true 일 경우 disabled
		// titleWidth : title 의 width 를 customize 할 수 있습니다.
		title: { type: String, required: true },
		data: { type: Object, required: true },
		formatType: { type: String, default: 'String' },
		//optionList: { type: Array, required: true },
		optionList: { type: Array },
		disableYN: { type: Boolean },
		width: { type: String },
	},
	data: () => ({
		selected: '',
	}),
	watch: {
		data: {
			deep: true,
			handler(newData) {
				this.selected = newData.value;
			},
		},
	},
	computed: {
		inputWidth() {
			return `width: ${this.width}px`;
		},
	},
	methods: {
		setNewValue(newValue) {
			let formatValue;
			switch (this.formatType) {
				case 'String':
					formatValue = newValue;
					break;
				case 'Number':
					formatValue = formatToNumber(newValue);
					break;
			}
			this.$emit('input', this.data.name, formatValue);
		},
	},
	created() {
		this.selected = this.data.value;
	},
};
</script>

<style scoped>
select:disabled {
	cursor: default;
	color: #000 !important;
}
.commonInput option:first-child {
	background-color: #f1f1f1;
	color: #000;
}
</style>
