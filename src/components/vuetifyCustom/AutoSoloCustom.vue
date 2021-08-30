<template>
	<div class="AutoSoloCustom1">
		<v-autocomplete
			@input="$emit('inputValue', itemsData)"
			:items="listItems"
			:item-text="name"
			:item-value="value"
			v-model.number="itemsData"
			outlined
			:attach="true"
			placeholder="검색해주세요."
		></v-autocomplete>
	</div>
</template>

<script>
export default {
	name: 'AutoSoloCustom',
	props: ['listItems', 'name', 'value'],
	data: () => ({
		itemsData: 0,
	}),
};
</script>

<style scoped></style>
