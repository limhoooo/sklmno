<template>
	<div class="underCont disFX">
		<div class="selectCustom" style="display: flex; flex-grow: 3">
			<v-autocomplete
				style="font-size: 12px"
				placeholder="기기명"
				class="AutoCompleteCustom"
				outlined
				v-model.trim="filterData.goodsId"
				:items="codeList.deviceList"
				item-text="modelName"
				item-value="goodsId"
				:attach="true"
				@change="getCapacityList"
			></v-autocomplete>
		</div>
		<div class="selectCustom ml20" style="display: flex; flex-grow: 1">
			<v-select
				label="용량"
				v-model.trim="filterData.capacity"
				:items="codeList.capacityList"
				item-text="capacity"
				outlined
				@change="getDeviceColorList"
			>
			</v-select>
		</div>
		<div class="selectCustom ml20" style="display: flex; flex-grow: 2">
			<v-select
				label="색상"
				v-model.trim="filterData.colorName"
				:items="codeList.colorList"
				item-text="colorName"
				outlined
			>
			</v-select>
		</div>
	</div>
</template>

<script>
export default {
	name: 'filterDevice',
	props: {
		filterData: { type: Object, required: true },
	},
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
	},
	methods: {
		initList(listName) {
			this.codeList[listName] = [];
			if (listName === 'capacityList') {
				this.codeList.capacityList.unshift({ capacity: '전체' });
			}
			if (listName === 'colorList') {
				this.codeList.colorList.unshift({ colorName: '전체' });
			}
		},
		initData(dataName) {
			this.filterData[dataName] = '전체';
		},
		async getCapacityList() {
			this.initList('capacityList');
			this.initList('colorList');
			this.initData('capacity');
			this.initData('colorName');
			let data = this.filterData.goodsId;
			await this.$store.dispatch('CodeModule/getCapacityList', data);
			this.codeList.capacityList.unshift({ capacity: '전체' });
		},
		async getDeviceColorList() {
			this.initList('colorList');
			this.initData('colorName');
			let data = {
				goodsId: this.filterData.goodsId,
				capacity: this.filterData.capacity,
			};
			await this.$store.dispatch('CodeModule/getDeviceColorList', data);
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},
	created() {
		this.codeList.capacityList.unshift({ capacity: '전체' });
		this.codeList.colorList.unshift({ colorName: '전체' });
	},
};
</script>

<style scoped></style>
