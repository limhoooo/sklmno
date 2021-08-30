<template>
	<div class="commonInput disFX">
		<!--		<div>-->
		<!--			<span class="disIN" :style="`width: ${titleWidth}px`">-->
		<!--				{{ title }}-->
		<!--				<span v-if="necessary"> *</span>-->
		<!--			</span>-->
		<!--		</div>-->
		<div class="disFx inputSelect">
			<ul>
				<li
					v-for="(option, index) in optionList"
					:key="index"
					style="float: left; padding-right: 24px"
				>
					<div class="radioStyleCommon ml10 h40 lh40">
						<input
							v-model="selected"
							type="radio"
							:value="itemValue || option.value"
							:id="itemText || option.name"
							@input="setNewValue($event.target.value)"
							:disabled="disableYN"
						/>
						<label class="font-size-12 ml5" :for="option.name">{{
							option.name
						}}</label>
					</div>
				</li>
			</ul>
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
		title: { type: String },
		data: { type: Object, required: true },
		itemText: { type: String },
		itemValue: { type: String },
		optionList: { type: Array },
		necessary: { type: Boolean },
		disableYN: { type: Boolean },
		titleWidth: { type: Number, default: 120 },
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
			this.$emit('input', this.data.name, newValue);
		},
		setInputData() {
			this.selected = this.data.value;
		},
	},
	created() {
		this.setInputData();
	},
};
</script>

<style scoped>
.inputSelect ul {
	display: flex;
	flex-flow: wrap;
}
.inputSelect li {
}
.inputSelect li label {
	padding: 10px 0 0 4px;
	cursor: pointer;
}
.inputSelect li:last-of-type label {
	padding-right: 0;
}
input:disabled + label,
input:disabled + label:before {
	cursor: default !important;
}
</style>
