<template>
	<div class="commonInput disFX">
		<div
			style="flex-grow: 1; width: 100%; display: inline-flex; line-height: 2"
		>
			<input
				style="width: 95%; height: 30px; margin: 4px 0"
				class="textRight underLineInput"
				type="text"
				v-model.trim="formatValue"
				placeholder="0"
				@input="setNewData($event.target.value)"
				:disabled="disableYN"
				@blur="setZero"
			/><span class="won">원</span>
		</div>
	</div>
</template>

<script>
import { formatToNumber } from '../../common/common';

export default {
	props: {
		// title : 제목
		// data : {name: ,value: }형태로 내려주세요.
		// disableYN : true 일 경우 disabled
		// titleWidth : title 의 width 를 customize 할 수 있습니다.
		title: { type: String, required: true },
		data: { type: Object, required: true },
		disableYN: { type: Boolean },
		titleWidth: { type: Number, default: 120 },
	},
	data: () => ({
		formatValue: 0,
	}),
	watch: {
		inputValue: function (newValue) {
			null !== newValue
				? (this.formatValue = this.format(newValue))
				: (this.formatValue = 0);
		},
	},
	computed: {
		inputValue() {
			return this.data.value;
		},
	},
	methods: {
		setZero() {
			if (this.formatValue === '') {
				this.formatValue = 0;
			}
		},
		setInputValue() {
			this.data.value != null
				? (this.formatValue = this.format(this.data.value))
				: (this.formatValue = 0);
		},
		format(newValue) {
			newValue = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return newValue;
		},
		setNewData(newValue) {
			const formatValue = newValue.replace(/[^0-9]/g, '');
			this.formatValue = formatValue;
			this.$emit('input', this.data.name, formatToNumber(formatValue));
		},
	},
	created() {
		this.setInputValue();
	},
};
</script>

<style scoped>
input:disabled {
	cursor: text;
	color: #7397a4 !important;
}
.won {
	font-size: 12px;
	line-height: 28px;
	padding-left: 2px;
}
</style>
