<template>
	<div class="commonInput disFX">
		<!--		<div>-->
		<!--			<span class="disIN" :style="`width: ${titleWidth}px`">-->
		<!--				{{ title }}-->
		<!--				<span v-if="necessary"> *</span>-->
		<!--			</span>-->
		<!--		</div>-->
		<div class="disFx" style="flex-grow: 1; width: 100%; display: inline-flex">
			<v-autocomplete
				@input="setNewData"
				:items="optionList"
				:item-text="itemText"
				:item-value="itemValue"
				v-model.number="inputValue"
				:disabled="disableYN"
				:outlined="!UnderLined"
				:filled="UnderLined"
			></v-autocomplete>
		</div>
	</div>
</template>

<script>
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
		optionList: { type: Array },
		itemText: { type: String, default: 'name' },
		itemValue: { type: String, default: 'value' },
		disableYN: { type: Boolean },
		necessary: { type: Boolean },
		UnderLined: { type: Boolean },
		titleWidth: { type: Number, default: 120 },
	},
	data: () => ({
		inputValue: '',
	}),
	methods: {
		setNewData(newValue) {
			this.$emit('input', this.data.name, newValue);
		},
		setInputData() {
			this.inputValue = this.data.value;
		},
	},
	created() {
		this.setInputData();
	},
};
</script>

<style scoped></style>
