<template>
	<div class="groupBtnCont1 disFX" style="z-index: 1">
		<div class="disFx">
			<span>상담</span>
			<InputStatusSelect
				style="width: 210px"
				title="상담"
				:data="{
					name: 'consultTaskStatus',
					value: formData.basic.consultTaskStatus,
				}"
				@input="setNewData"
				:optionList="ConsultTaskStatusList"
				:formData="formData"
				:disableYN="disableConsult"
			></InputStatusSelect>
		</div>
		<div class="disFx ml20">
			<span style="line-height: 32px">개통</span>
			<InputStatusSelect
				style="width: 210px"
				title="개통"
				:formData="formData"
				:data="{
					name: 'openingTaskStatus',
					value: formData.basic.openingTaskStatus,
				}"
				@input="setNewData"
				:optionList="OpeningTaskStatusList"
				:titleWidth="40"
				:disableYN="disableOpening"
			></InputStatusSelect>
		</div>
		<div class="disFx ml20">
			<span style="line-height: 32px">물류</span>
			<InputStatusSelect
				style="width: 210px"
				title="물류"
				:data="{
					name: 'logisticsTaskStatus',
					value: formData.basic.logisticsTaskStatus,
				}"
				:formData="formData"
				@input="setNewData"
				:optionList="optionList.LogisticsTaskStatusList"
				:titleWidth="40"
				:disableYN="disableLogistics"
			></InputStatusSelect>
		</div>
	</div>
</template>

<script>
import InputStatusSelect from '../../../../../components/input/InputStatusSelect';

export default {
	props: {
		// optionList
		// formData
		// disableConsult: 상담 disable 여부
		// disableOpening: 개통 disable 여부
		// disableLogistics: 물류 disable 여부
		optionList: { type: Object, required: true },
		formData: { type: Object, required: true },
		disableConsult: { type: Boolean, default: false },
		disableOpening: { type: Boolean, default: false },
		disableLogistics: { type: Boolean, default: false },
	},
	components: { InputStatusSelect },
	data: () => ({
		statusDialog: false,
	}),
	computed: {
		modifyState() {
			return this.$store.state.QuickOpeningPopModule.modifyState;
		},
		ConsultTaskStatusList() {
			const list = [...this.optionList.ConsultTaskStatusList];
			let data = [];
			for (let item in list) {
				data.push({
					name: list[item].name.replace('(상담)', ''),
					value: list[item].value,
				});
			}
			return data;
		},
		OpeningTaskStatusList() {
			const list = [...this.optionList.OpeningTaskStatusList];
			let data = [];
			for (let item in list) {
				data.push({
					name: list[item].name.replace('(개통)', ''),
					value: list[item].value,
				});
			}
			return data;
		},
	},
	methods: {
		setNewData(name, value, beforeValue) {
			this.formData.basic[name] = value;
			let data = {
				name: name,
				value: value,
				beforeValue: beforeValue,
			};
			this.$emit('changeWorkStatusFnc', data);
		},
	},
};
</script>

<style scoped></style>
