<template>
	<div class="AutoSoloCustom3">
		<v-autocomplete
			style="font-size: 12px"
			v-model.trim="itemArray"
			:items="items"
			:item-text="itemText"
			:item-value="itemValue"
			outlined
			:label="itemLabel"
			multiple
			name="fg"
			@input="$emit('inputValue', itemArray)"
		>
			<template v-slot:selection="{ item, index }">
				<span name="cde" v-if="index === 0">{{ item[itemText] }}</span>
				<span
					name="cde"
					v-if="index === 1"
					class="grey--text text-caption ml10"
				>
					<span>( 외 {{ itemArray.length - 1 }} 개 )</span>
				</span>
			</template>
		</v-autocomplete>
	</div>
</template>

<script>
/*@keypress="autoFnc(true)"
@focus="autoFnc(true)"
@blur="autoFnc(false)"
@click="autoFnc(true)"
v-click-outside="autoFnc2()"*/
export default {
	name: 'MultiSearchInput',
	props: ['itemText', 'itemValue', 'itemLabel', 'items', 'multiReset'],
	data: () => ({
		itemArray: [],
		itemDialog: false,
	}),
	computed: {
		multiResetData() {
			return this.multiReset;
		},
	},
	methods: {
		/*		autoFnc2() {
			this.itemDialog = false;
			document.getElementsByName('cde').forEach(value => {
				value.style.visibility = 'visible';
			});
		},
		autoFnc3() {
			document.getElementsByName('cde').forEach(value => {
				value.style.visibility = 'hidden';
			});
		},*/
		/*autoFnc(abc) {
			if (abc) {
				document.getElementsByName('cde').forEach(value => {
					value.style.visibility = 'hidden';
				});

				document.getElementsByName('fg').forEach(value => {
					value.style.visibility = 'visible';
				});
			} else {
				document.getElementsByName('cde').forEach(value => {
					value.style.visibility = 'visible';
				});


			}
		},*/
	},
	watch: {
		multiResetData: {
			deep: true,
			handler: function (newVal) {
				if (newVal) {
					this.itemArray = [];
				}
			},
		},
		itemArray: {
			deep: true,
			handler: function () {
				/*				document.getElementsByName('cde').forEach(value => {
					value.style.visibility = 'hidden';
				});*/
				/*				if (!this.itemDialog) {
					document.getElementsByName('fg').forEach(value => {
						value.style.visibility = 'hidden';
					});
				}*/
			},
		},
	},
};
</script>

<style scoped>
.AutoSoloCustom3 .v-select__selections > input {
	position: absolute !important;
}
</style>
