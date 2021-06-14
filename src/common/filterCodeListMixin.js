export default {
	methods: {
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getStockListFnc() {
			// get 보유처
			if (this.filterData.stockId) {
				this.filterData.stockId = '';
			}
			const data = this.filterData.telecom;
			await this.$store.dispatch('CodeModule/getStockListFnc', data);
			await this.getDeviceListFnc();
			this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
			if (this.filterData.nextStockId) {
				this.filterData.nextStockId = '';
			}
		},
		async getDeviceListFnc() {
			// get 제조사
			this.filterData.goodsId = '';
			this.filterData.capacity = '전체';
			this.filterData.colorName = '전체';
			this.codeList.capacityList = [{ capacity: '전체' }];
			this.codeList.colorList = [{ colorName: '전체' }];

			let data = {
				telecomId: this.filterData.telecom,
				makerId: this.filterData.maker,
			};
			await this.$store.dispatch('CodeModule/getDeviceList', data);
			this.codeList.deviceList.unshift({ modelName: '전체', goodsId: '' });
		},
		async getCapacityListFnc() {
			// get 용량
			// 하위 체인들 초기화
			this.codeList.colorList = [{ colorName: '전체' }];
			this.filterData.capacity = '전체';
			this.filterData.colorName = '전체';

			if (this.filterData.goodsId) {
				await this.$store.dispatch(
					'CodeModule/getCapacityList',
					this.filterData.goodsId,
				);
			} else {
				// 기기 전체 선택시 용량 초기화
				this.codeList.capacityList = [];
			}
			this.codeList.capacityList.unshift({ capacity: '전체' });
		},
		async getDeviceColorList() {
			// get 색상
			this.filterData.colorName = '전체';

			if (this.filterData.capacity !== '전체') {
				let data = {
					goodsId: this.filterData.goodsId,
					capacity: this.filterData.capacity,
				};
				await this.$store.dispatch('CodeModule/getDeviceColorList', data);
			} else {
				// 용량 전체 선택시 컬러 초기화
				this.codeList.colorList = [];
			}
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},
};
