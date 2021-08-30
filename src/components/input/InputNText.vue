<template>
	<div class="commonInput disFX">
		<!--		<div>-->
		<!--			<span class="disIN" :style="`width: ${titleWidth}px`">-->
		<!--				{{ title }}-->
		<!--				<span v-if="necessary"> *</span>-->
		<!--			</span>-->
		<!--		</div>-->
		<div class="disFx" :style="`width: calc(100% - ${titleWidth}px)`">
			<input
				v-model.trim="inputValue[0].value"
				:disabled="disableYN"
				type="number"
				class="underLineInput fll"
				:style="`width: ${inputWidth}%`"
				@input="setFirstValue(inputValue[0])"
			/>
			<div v-if="inputAmount">
				<div v-for="n in inputAmount - 1">
					<span class="dash fll">-</span>
					<input
						v-model.trim="inputValue[n].value"
						:class="{ password: masking }"
						:disabled="disableYN"
						type="number"
						class="underLineInput fll"
						:style="`width: ${inputWidth}%`"
						@input="setSecondValue(inputValue[n])"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		// title : 제목
		// data : {name: ,value: }형태로 내려주세요.
		// disableYN : true 일 경우 disabled
		// masking: 뒷자리들 마스크 처리할 수 있습니다.
		// necessary : 제목 옆에 '*' 를 붙여준다.(*: 필수값을 나타냄)
		// titleWidth : title 의 width 를 customize 할 수 있습니다.
		title: { type: String, required: true },
		data: { type: Array, required: true },
		masking: { type: Boolean },
		disableYN: { type: Boolean },
		necessary: { type: Boolean },
		titleWidth: { type: Number, default: 120 },
	},
	data: () => ({
		inputValue: [],
		inputWidth: '',
		customizeWidth: '',
	}),
	watch: {
		data: {
			deep: true,
			handler(newData) {
				this.inputValue = newData;
			},
		},
	},
	computed: {
		inputAmount() {
			return this.data.length;
		},
		maxlength: function () {
			if (
				this.data[0].name === 'cusRegiNum1' ||
				this.data[1].name === 'cusRegiNum2'
			) {
				return 6;
			} else {
				return 3;
			}
		},
	},
	methods: {
		setNewValue(inputValue) {
			this.$emit('input', inputValue.name, inputValue.value);
		},
		setFirstValue(inputValue) {
			if (inputValue.value.length > this.maxlength) {
				inputValue.value = inputValue.value.slice(0, this.maxlength);
			}
			this.setNewValue(inputValue);
		},
		setSecondValue(inputValue) {
			if (inputValue.value.length > this.maxlength + 1) {
				inputValue.value = inputValue.value.slice(0, this.maxlength + 1);
			}
			this.setNewValue(inputValue);
		},
		setInputData() {
			this.inputValue = this.data;
		},
	},
	created() {
		if (this.inputAmount) {
			this.inputWidth = Number(100 / this.inputAmount - 5);
		}
		this.setInputData();
	},
};
</script>

<style scoped>
input {
	padding: 0 10px;
	border: 1px solid #989898;
	border-radius: 3px;
	height: 30px;
}
input:not(:first-of-type) {
	color: red;
}

.dash {
	padding: 4px 6px;
}
.password {
	-webkit-text-security: disc;
}
</style>
