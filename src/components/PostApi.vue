<template>
	<div>
		<v-app id="inspire">
			<v-dialog v-model.trim="dialog" width="450" id="modal">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color=" lighten-2" dark v-bind="attrs" v-on="on"
						>주소검색</v-btn
					>
				</template>

				<v-card>
					<v-card-text>
						<vue-daum-postcode @complete="resultData"></vue-daum-postcode>
					</v-card-text>
				</v-card>
			</v-dialog>
		</v-app>
	</div>
</template>

<script>
import Vue from 'vue';
import VueDaumPostcode from 'vue-daum-postcode';

Vue.use(VueDaumPostcode);

export default {
	props: ['postDialog'],
	data() {
		return {
			dialog: false,
		};
	},
	methods: {
		resultData(data) {
			let addressData = {
				address: data.address,
				zonecode: data.zonecode,
			};
			this.$emit('postapi', addressData);
			this.dialog = !this.dialog;
		},
	},
	watch: {
		postDialog: {
			deep: true,
			handler: function (newVal) {
				this.dialog = newVal;
			},
		},
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog);
				}
			},
		},
	},
};
</script>

<style scoped>
.vue-daum-postcode {
	width: 100% !important;
	display: block !important;
}
</style>
