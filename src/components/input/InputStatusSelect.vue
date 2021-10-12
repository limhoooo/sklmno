<template>
	<div class="commonInput disFX">
		<!--		<div>-->
		<!--			<span class="disIN" :style="`width: ${titleWidth}px`">-->
		<!--				{{ title }}-->
		<!--				<span v-if="necessary"> *</span>-->
		<!--			</span>-->
		<!--		</div>-->
		<div style="flex-grow: 1; width: 100%; display: inline-flex">
			<select
				style="flex-grow: 1; width: 100%; cursor: pointer"
				v-model.trim="selected"
				@input="setNewValue($event.target.value)"
				:disabled="disableYN"
			>
				<option disabled selected>{{ title }}을 선택하세요</option>
				<!--  DLVR_PEND : 배송보류      -->
				<!--  배송보류로 이미 선택되어있는 상태일때만 배송보류 노출      -->
				<!--  아닐시 배송보류 미노출      -->
				<option
					v-if="selected !== 'DLVR_PEND' && option.value !== 'DLVR_PEND'"
					v-for="(option, index) in optionList"
					:value="option.value"
					:key="index"
				>
					{{ option.name }}
				</option>
				<!--   배송보류 노출     -->
				<option
					v-if="selected === 'DLVR_PEND'"
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
import {formatToNumber} from '@/common/common';

export default {
	props: {
		// title : 제목
		// data : {name: ,value: }형태로 내려주세요.
		// optionList : {name: value:} 선택항목 list 를 내려주세요.
		// disableYN : true 일 경우 disabled
		// necessary : 제목 옆에 '*' 를 붙여준다.(*: 필수값을 나타냄)
		// titleWidth : title 의 width 를 customize 할 수 있습니다.
		title: { type: String, required: true },
		data: { type: Object, required: true },
		formatType: { type: String, default: 'String' },
		//todo:
		//optionList: { type: Array, required: true },
		optionList: { type: Array },
		disableYN: { type: Boolean },
		necessary: { type: Boolean },
		titleWidth: { type: Number, default: 120 },
		formData: { type: Object, required: true },
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
			this.$emit('input', this.data.name, formatValue, this.selected);
		},
	},
	created() {
		this.selected = this.data.value;
	},
};
</script>

<style scoped>
select:disabled {
	cursor: default !important;
}
.commonInput option:first-child {
	background-color: #f1f1f1;
	color: #000;
}
</style>
