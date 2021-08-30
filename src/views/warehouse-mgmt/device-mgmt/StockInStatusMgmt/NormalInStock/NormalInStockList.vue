<template>
	<div>
		<div>
			<div
				class="disFx mt30 justify-lg-space-between"
				style="align-items: center"
			>
				<div class="disFx lh40">
					<h2>기기별 입력정보</h2>
					<span class="ml20 subFontS"
						>총 수량:
						<span class="mainRed boldWt">{{ getList.length }}</span></span
					>
				</div>
				<div>
					<span
						class="new-excel-btn"
						@click="excelUploadDialog = !excelUploadDialog"
					>
						엑셀 업로드
					</span>
					<form
						id="excelFormDownloadUrl"
						name="excelFormDownloadUrl"
						style="display: inline-block"
						:action="`${excelFormDownloadUrl}inStockWaitExcelTemplate`"
						method="GET"
					>
						<input
							type="submit"
							class="new-excel-btn ml10"
							value="엑셀 양식 다운로드"
							@click="excelFormDownloadBtn"
						/>
					</form>
					<span class="ml10"></span>
					<button class="boldBtn boldWt" @click="deleteFnc">삭제</button>
				</div>
			</div>
			<div class="newTableStyle">
				<table class="w100P">
					<thead>
						<tr>
							<th class="w50">
								<div class="checkStyleCont1">
									<input
										id="checkId1"
										class="checkStyle"
										type="checkbox"
										value="all"
										v-model.trim="allCheckedBox"
										@click="allChecked($event.target.checked)"
									/>
									<label for="checkId1"></label>
								</div>
							</th>
							<th>통신사</th>
							<th>보유처</th>
							<th>재고구분</th>
							<th>제조사</th>
							<th>기기명 (모델명)</th>
							<th>용량</th>
							<th>색상</th>
							<th>일련번호</th>
							<th>입고단가</th>
							<th>입고상태</th>
							<th>제품상태</th>
							<th>외장상태</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="getList.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr v-else v-for="item in getList" :key="item.index">
							<td onclick="event.cancelBubble=true">
								<template>
									<div class="checkStyleCont1">
										<input
											:id="`checkBox${item.waitId}`"
											class="checkStyle"
											type="checkbox"
											:value="item.waitId"
											v-model.trim="checkListIdArray"
										/>
										<label :for="`checkBox${item.waitId}`"></label>
									</div>
								</template>
							</td>
							<td>{{ item.telecomName }}</td>
							<td>{{ item.stockName }}</td>
							<td>{{ item.statusStrMsg }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
							<td>{{ item.capacity }}</td>
							<td>{{ item.colorName }}</td>
							<td>{{ item.rawBarcode }}</td>
							<td>
								{{
									item.inStockAmt
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}}
								원
							</td>
							<td>{{ item.inStockStatusMsg }}</td>
							<td>
								<span v-if="item.productFaultyYn === 'N'">-</span>
								<span v-else>불량</span>
							</td>
							<td>{{ item.extrrStatusMsg }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div>
			<div>
				<div class="disFx mt30">
					<h2>모델별 입력정보</h2>
					<span class="ml20 subFontS"
						>총 수량:
						<span class="mainRed boldWt">{{ getList.length }}</span></span
					>
				</div>
			</div>
			<div class="newTableStyle mt10">
				<table class="w100P">
					<thead>
						<tr>
							<th>통신사</th>
							<th>보유처</th>
							<th>제조사</th>
							<th>기기명 (모델명)</th>
							<th>용량</th>
							<th>색상</th>
							<th>수량</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="getListModelData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr v-for="item in getListModelData" :key="item.index">
							<td>{{ item.telecomName }}</td>
							<td>{{ item.stockName }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
							<td>{{ item.capacity }}</td>
							<td>{{ item.colorName }}</td>
							<td>{{ item.totalCount }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<normal-in-stock-excel-upload
			v-if="excelUploadDialog"
		></normal-in-stock-excel-upload>
	</div>
</template>

<script>
import NormalInStockExcelUpload from './popup/NormalInStockExcelUpload.vue';

export default {
	components: { NormalInStockExcelUpload },
	computed: {
		excelFormDownloadUrl() {
			return this.$store.state.commonModule.excelFormDownloadUrl;
		},
		getList() {
			return this.$store.state.NormalInStockModule.getListData;
		},
		getListModelData() {
			return this.$store.state.NormalInStockModule.getModelListData;
		},
		excelUploadDialog: {
			get() {
				return this.$store.state.NormalInStockModule.excelUploadDialog;
			},
			set(newValue) {
				return (this.$store.state.NormalInStockModule.excelUploadDialog = newValue);
			},
		},
		allCheckedBox: {
			get() {
				return this.$store.state.NormalInStockModule.allCheckedBox;
			},
			set(newValue) {
				return (this.$store.state.NormalInStockModule.allCheckedBox = newValue);
			},
		},
		checkListIdArray: {
			get() {
				return this.$store.state.NormalInStockModule.checkListIdArray;
			},
			set(newValue) {
				return (this.$store.state.NormalInStockModule.checkListIdArray = newValue);
			},
		},
	},
	methods: {
		async excelFormDownloadBtn() {
			let data = 'inStockWaitExcelTemplate';
			const result = await this.$store.dispatch(
				'commonModule/excelFormDownload',
				data,
			);
		},
		allChecked(e) {
			let checkArr = [];
			if (e) {
				this.checkListIdArray = [];
				this.getList.forEach(item => {
					checkArr.push(item.waitId);
				});
				this.checkListIdArray = checkArr;
			} else {
				this.checkListIdArray = checkArr;
			}
		},
		async deleteFnc() {
			await this.$store.dispatch(
				'NormalInStockModule/deleteList',
				this.checkListIdArray,
			);
			await this.getListData();
		},
		async getListData() {
			await this.$store.dispatch('NormalInStockModule/getList');
		},
		getCodeList() {
			/*this.$store.state.NormalInStockModule.codeList.stock = [];*/
			this.$store.dispatch('NormalInStockModule/getCommonCodeList');
		},
		itemsInit() {
			this.$store.commit('NormalInStockModule/itemsInit');
		},
	},
	async created() {
		await this.itemsInit();
		await this.getCodeList();
		await this.getListData();
	},
};
</script>

<style scoped></style>
