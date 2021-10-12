<template>
	<div class="disFX">
		<input
			style="margin-right: 4px"
			:placeholder="placeholder || `${title} 을(를) 입력해주세요.`"
			class="lh32 borderRadi4Px borderContColor1 padW10"
			v-model.trim="inputValue"
			:type="type"
			:disabled="disableYN"
			@input="setNewData($event.target.value)"
			:style="maxWidth"
		/>
		<slot
			name="slot"
			:notify="notify"
			:getBlackListFnc="getBlackListFnc"
		></slot>
	</div>
</template>

<script>
import { formatToNumber } from '@/common/common';

export default {
	props: {
		// title : 제목
		// data : {name: ,value: }형태로 내려주세요.
		// formatType : 반환 값의 데이터 타입을 정해준다. ('String', 'Number')
		// type: input 의 타입을 지정해줄 수 있습니다. ('text', 'number', 'password'...)
		// placeholder : placeholder customize 가능.
		// disableYN : true 일 경우 disabled
		// titleWidth : title 의 width 를 customize 할 수 있습니다.
		title: { type: String, required: true },
		data: { type: Object, required: true },
		formatType: { type: String, default: 'String' },
		type: { type: String, default: 'text' },
		placeholder: { type: String },
		width: { type: String },
		disableYN: { type: Boolean },
		titleWidth: { type: Number, default: 120 },
		customerData: { type: Object },
	},
	data: () => ({
		inputValue: '',
	}),
	watch: {
		data: {
			deep: true,
			handler(newData) {
				this.inputValue = newData.value;
			},
		},
	},
	computed: {
		maxWidth() {
			return `width: ${this.width}px`;
		},
	},
	methods: {
		setNewData(newValue) {
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
		notify() {
			const text = '매칭하시겠습니까?';
			if (confirm(text)) {
			}
		},
		async getBlackListFnc() {
			await this.$store.dispatch(
				'QuickOpeningPopModule/getBlackDetailList',
				'event',
			);
			if (this.inputValue === '') {
				this.$emit('input', 'blackAlert', '');
			}
		},
		setInputValue() {
			this.inputValue = this.data.value;
		},
	},
	created() {
		this.setInputValue();
	},
};
</script>

<style scoped>
button {
	background-color: #0037a1;
	border-radius: 3px;
	color: white;
	padding: 2px 5px;
	width: 60px;
}
button:disabled {
	background: #c8c8c8;
	cursor: default;
	color: #fff !important;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}
input[type='number'] {
	-moz-appearance: textfield;
}
</style>
