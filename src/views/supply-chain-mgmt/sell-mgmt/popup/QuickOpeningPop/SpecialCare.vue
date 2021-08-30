<template>
	<div style="text-align: right">
		<div style="display: block; position: relative; top: 0">
			<div class="checkStyleCont6">
				<input
					class="checkStyle"
					v-model="formData.basic.docTargetYn"
					type="checkbox"
					id="check1"
					:disabled="!modifyState"
					:true-value="'Y'"
					:false-value="'N'"
				/>
				<label
					class="font-btn-color ml-2"
					for="check1"
					style="margin-right: 48px"
					>서류심사대상</label
				>
			</div>
			<div class="checkStyleCont7">
				<input
					v-model="formData.basic.openingPriorityTargetYn"
					class="ml10 checkStyle"
					type="checkbox"
					id="check2"
					:disabled="!modifyState"
					:true-value="'Y'"
					:false-value="'N'"
				/>
				<label class="font-red ml-2" for="check2">우선순위대상</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {},
	data: () => ({}),
	computed: {
		modifyState() {
			return this.$store.state.QuickOpeningPopModule.modifyState;
		},
		formData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.formData;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.formData = newValue;
			},
		},
	},
	methods: {},
	created() {},
};
</script>

<style scoped>
.checkBoxCont > div {
	display: inline;
}
.checkStyleCont6,
.checkStyleCont7 {
	display: inline-flex;
}
.checkStyleCont6 label,
.checkStyleCont7 label {
	cursor: pointer;
}
.checkStyleCont6 input:disabled + label,
.checkStyleCont7 input:disabled + label {
	cursor: default;
}
.checkStyleCont6 input[type='checkbox']:checked + label {
	color: #000;
}
.checkStyleCont6 label:before {
	position: absolute;
	display: block;
	content: url('../../../../../assets/img/check Box_02.png');
	width: 8px;
	height: 8px;
	top: 3px;
	left: 1035px;
}
.checkStyleCont6 input[type='checkbox']:checked + label:before {
	position: absolute;
	display: block;
	content: url('../../../../../assets/img/check Box_01.png');
	width: 8px;
	height: 8px;
	top: 3px;
	left: 1035px;
}
.checkStyleCont7 label:before {
	position: absolute;
	display: block;
	content: url('../../../../../assets/img/check Box_02.png');
	width: 8px;
	height: 8px;
	top: 3px;
	left: 1175px;
}
.checkStyleCont7 input[type='checkbox']:checked + label:before {
	position: absolute;
	display: block;
	content: url('../../../../../assets/img/check Box_01.png');
	width: 8px;
	height: 8px;
	top: 3px;
	left: 1175px;
}
</style>
