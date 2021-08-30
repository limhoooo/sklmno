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
			await this.getDeviceListFnc();
			if (this.filterData.nextStockIds) {
				this.filterData.nextStockIds = '';
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
				telecomId: this.filterData.telecom || '',
				makerId: this.filterData.maker || '',
			};
			await this.$store.dispatch('CodeModule/getDeviceList', data);
			this.codeList.deviceList.unshift({ modelName: '전체', goodsId: '' });
		},
		async getCapacityListFnc() {
			// get 용량
			// 하위 체인들 초기화
			this.codeList.capacityList = [];
			this.codeList.colorList = [{ colorName: '전체' }];
			this.filterData.capacity = '전체';
			this.filterData.colorName = '전체';
			if (this.filterData.goodsId) {
				if (
					// 유심선택 안하는 컴포넌트
					typeof this.filterData['goodsId'] !== 'object'
				) {
					await this.$store.dispatch(
						'CodeModule/getCapacityList',
						this.filterData.goodsId,
					);
				} else if (
					// 유심선택하는 컴포넌트
					// return obj 로 들어오는 값중 name이 유심이 아닐경우
					// getCapacityList call
					typeof this.filterData['goodsId'] === 'object' &&
					this.filterData.goodsId.modelName.indexOf('유심') === -1
				) {
					// return obj 로 들어왔던 객체값
					// 다시 value 로 변경
					this.filterData['goodsId'] = this.filterData.goodsId.goodsId;
					await this.$store.dispatch(
						'CodeModule/getCapacityList',
						this.filterData.goodsId,
					);
				} else if (
					// 유심선택하는 컴포넌트
					// return obj 로 들어오는 값중 name이 유심일 경우
					typeof this.filterData['goodsId'] === 'object' &&
					this.filterData.goodsId.modelName.indexOf('유심') !== -1
				) {
					// return obj 로 들어왔던 객체값
					// 다시 value 로 변경
					this.filterData['goodsId'] = this.filterData.goodsId.goodsId;
				}
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
