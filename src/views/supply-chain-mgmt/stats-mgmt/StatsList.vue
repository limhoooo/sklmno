<template>
	<div>
		<div class="disFx mt10" style="padding-right: 4%">
			<div class="disFx statsRadioCont1 fakeLine2">
				<input
					type="radio"
					id="statsRadio1"
					name="statsRadioCategory"
					checked
					value=""
					v-model.trim="storeId"
				/>
				<label for="statsRadio1">전체</label>
				<input
					type="radio"
					id="statsRadio2"
					name="statsRadioCategory"
					value="1"
					v-model.trim="storeId"
				/>
				<label for="statsRadio2" class="ml5">개통점</label>
				<input
					type="radio"
					id="statsRadio3"
					name="statsRadioCategory"
					value="2"
					v-model.trim="storeId"
				/>
				<label for="statsRadio3" class="ml5">영업점</label>
			</div>
			<div class="disFx statsRadioCont1 ml30">
				<input
					type="radio"
					id="statsRadio7"
					name="statsRadioTelecom"
					checked
					v-model.trim="formData.telecomId"
					value=""
				/>
				<label for="statsRadio7" @click="getStatisticsList('')">전체</label>
				<input
					type="radio"
					id="statsRadio5"
					name="statsRadioTelecom"
					v-model.trim="formData.telecomId"
					value="5"
				/>
				<label for="statsRadio5" class="ml5" @click="getStatisticsList(5)"
					>SK</label
				>
				<input
					type="radio"
					id="statsRadio4"
					name="statsRadioTelecom"
					v-model.trim="formData.telecomId"
					value="6"
				/>
				<label for="statsRadio4" class="ml5" @click="getStatisticsList(6)"
					>KT</label
				>
				<input
					type="radio"
					id="statsRadio6"
					name="statsRadioTelecom"
					v-model.trim="formData.telecomId"
					value="7"
				/>
				<label for="statsRadio6" class="ml5" @click="getStatisticsList(7)"
					>LGU</label
				>
			</div>
		</div>
		<div class="mt10" style="padding-right: 4%">
			<ul class="statsListCont1">
				<li
					class="mt5"
					v-for="item in openStoreList"
					:key="item.index"
					v-if="storeId === '' || storeId === '1'"
				>
					<span class="w120 mainBlue2">{{ item.storeName }}</span>
					<span class="w85"
						>접수완료(<span>{{
							item.consultCompl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w80"
						>개통요청(<span>{{
							item.openingDmnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w80"
						>개통중(<span>{{
							item.openingProg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w90"
						>개통완료(<span>{{
							item.openingCompl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w85"
						>개통취소(<span>{{
							item.openingCancel
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<!--					<span>신조요청(<span>00</span>)</span>
					<span>신조완료(<span>00</span>)</span>-->
				</li>
				<li
					v-if="storeId === ''"
					class="mt10 mb10"
					style="background-color: #eeeeee"
				></li>
				<li
					class="mt5"
					v-for="(item, index) in saleStoreList"
					:key="index"
					v-if="storeId === '' || storeId === '2'"
				>
					<span class="w120">{{ item.storeName }}</span>
					<span class="w85"
						>접수완료(<span>{{
							item.consultCompl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w80"
						>개통요청(<span>{{
							item.openingDmnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w80"
						>개통중(<span>{{
							item.openingProg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w90"
						>개통완료(<span>{{
							item.openingCompl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<span class="w85"
						>개통취소(<span>{{
							item.openingCancel
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}</span
						>)</span
					>
					<!--					<span>신조요청(<span>00</span>)</span>
					<span>신조완료(<span>00</span>)</span>-->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StatsList',
	computed: {
		formData: {
			get() {
				return this.$store.state.StatsMgmtModule.formData;
			},
			set(newValue) {
				return (this.$store.state.StatsMgmtModule.formData = newValue);
			},
		},
		storeId: {
			get() {
				return this.$store.state.StatsMgmtModule.storeId;
			},
			set(newValue) {
				return (this.$store.state.StatsMgmtModule.storeId = newValue);
			},
		},
		totalList() {
			return this.$store.state.StatsMgmtModule.totalList;
		},
		openStoreList() {
			return this.$store.state.StatsMgmtModule.openStoreList;
		},
		saleStoreList() {
			return this.$store.state.StatsMgmtModule.saleStoreList;
		},
	},
	methods: {
		getStatisticsList(item) {
			if (!item) {
				item = '';
			}
			let data = {
				srhStartDate: this.formData.srhStartDate,
				srhEndDate: this.formData.srhEndDate,
				telecomId: item,
			};
			this.$store.dispatch('StatsMgmtModule/getStatisticsList', data);
		},
	},
	async created() {
		await this.getStatisticsList();
		this.formData.telecomId = '';
		this.formData.srhStartDate = '';
		this.formData.srhEndDate = '';
	},
};
</script>

<style scoped>
.statsRadioCont1 input[type='radio'] {
	display: none;
}
.statsRadioCont1 label {
	text-align: center;
	width: 50px;
	font-size: 10px !important;
	background-color: #fff;
	color: #00aac1;
	line-height: 20px;
	border-radius: 50px;
	font-weight: bold;
}
.statsRadioCont1 input[type='radio']:checked + label {
	background-color: #00aac1;
	color: #fff;
}
.statsListCont1 {
	width: 100%;
	font-size: 10px !important;
	border-radius: 3px;
}
.statsListCont1 li {
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	line-height: 16px;
	border-radius: 3px;
	background-color: #fff;
}
.statsListCont1 li:first-child {
	margin-top: 0;
}
.statsListCont1 li > span {
	background-color: #fff;
	padding: 2px 5px;
	display: inline-block;
	text-align: center;
}
.statsListCont1 li > span:first-child {
	background-color: #e0e0e0;
	font-weight: bold;
}
</style>
