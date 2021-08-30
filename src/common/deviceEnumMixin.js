export default {
	methods: {
		async getGoodsSelectListFnc() {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getGoodsSelectList',
				this.joinData.openingTelecomCodeId,
			);
		},
		async deviceData(value) {
			this.joinData.goodsId = value;
			this.capacityItems = [];
			this.colorItems = [];
			await this.getCapacityListFnc();
			if (this.capacityItems.length !== 0) {
				this.joinData.capacity = this.capacityItems[0].capacity;
			}
			await this.getColorListFnc();
			await this.resetPriceFnc();
		},
		async getCapacityListFnc() {
			this.colorItems = [];
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getCapacitySelectList',
				this.joinData.goodsId,
			);
		},
		async getColorListFnc() {
			let data = {
				goodsId: this.joinData.goodsId,
				capacity: this.joinData.capacity,
			};
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getColorSelectList',
				data,
			);
		},
	},
};
