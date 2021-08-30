<template>
	<div>
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
							<span class="mainRed boldWt">{{ listData.length }}</span></span
						>
					</div>
					<div>
						<span style="display: none" @click="uploadFnc"> 엑셀 업로드 </span>
						<form
							id="excelFormDownloadUrl"
							name="excelFormDownloadUrl"
							style="display: inline-block"
							:action="`${excelFormDownloadUrl}inStockWaitExcelTemplate`"
							method="GET"
						>
							<input
								style="display: none"
								type="submit"
								value="엑셀 양식 다운로드"
								@click="excelFormDownloadBtn"
							/>
						</form>
						<span class="mr10"></span>
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
											id="checkId3"
											type="checkbox"
											value="all"
											class="checkStyle"
											v-model.trim="allCheckedBox"
											@click="allChecked($event.target.checked)"
										/>
										<label for="checkId3"></label>
									</div>
								</th>
								<th>통신사</th>
								<th>보유처</th>
								<th>재고구분</th>
								<th>제조사</th>
								<th>유심명 (모델명)</th>
								<th>일련번호</th>
								<th>입고단가</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="listData.length === 0">
								<td colspan="20">데이터가 없습니다.</td>
							</tr>
							<tr v-for="(item, index) in listData" :key="index">
								<td onclick="event.cancelBubble=true">
									<template>
										<div class="checkStyleCont1">
											<input
												:id="`checkBox${item.waitId}`"
												type="checkbox"
												class="checkStyle"
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
								<td>{{ item.rawBarcode }}</td>
								<td>
									{{
										item.inStockAmt
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}}
									원
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div>
				<div>
					<div class="disFx mt30 mb10">
						<h2>모델별 입력정보</h2>
						<span class="ml20 subFontS"
							>총 수량:
							<span class="mainRed boldWt">{{ listData.length }}</span></span
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
								<th>유심명 (모델명)</th>
								<th>수량</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="modelListData.length === 0">
								<td colspan="20">데이터가 없습니다.</td>
							</tr>
							<tr v-for="item in modelListData" :key="item.index">
								<td>{{ item.telecomName }}</td>
								<td>{{ item.stockName }}</td>
								<td>{{ item.makerName }}</td>
								<td>{{ item.goodsName }}<br />({{ item.modelName }})</td>
								<td>{{ item.totalCount }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<usim-excel-upload v-if="uploadDialog"></usim-excel-upload>
	</div>
</template>

<script>
import UsimExcelUpload from '../UsimInStock/popup/UsimExcelUpload.vue';

export default {
	name: 'UsimInStockList',
	components: { UsimExcelUpload },
	computed: {
		excelFormDownloadUrl() {
			return this.$store.state.commonModule.excelFormDownloadUrl;
		},
		uploadDialog: {
			get() {
				return this.$store.state.UsimInStockModule.uploadDialog;
			},
			set(newValue) {
				this.$store.state.UsimInStockModule.uploadDialog = newValue;
			},
		},
		checkListIdArray: {
			get() {
				return this.$store.state.UsimInStockModule.checkListIdArray;
			},
			set(newValue) {
				this.$store.state.UsimInStockModule.checkListIdArray = newValue;
			},
		},
		listData() {
			return this.$store.state.UsimInStockModule.listData;
		},
		modelListData() {
			return this.$store.state.UsimInStockModule.modelListData;
		},
		allCheckedBox: {
			get() {
				return this.$store.state.UsimInStockModule.allCheckedBox;
			},
			set(newValue) {
				this.$store.state.UsimInStockModule.allCheckedBox = newValue;
			},
		},
	},
	methods: {
		allChecked(e) {
			let checkArr = [];
			if (e) {
				this.checkListIdArray = [];
				this.listData.forEach(item => {
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
			await this.getWaitList();
		},
		uploadFnc() {
			this.uploadDialog = true;
		},
		async excelFormDownloadBtn() {
			let data = 'inStockWaitExcelTemplate';
			const result = await this.$store.dispatch(
				'commonModule/excelFormDownload',
				data,
			);
		},
		getWaitList() {
			this.$store.dispatch('UsimInStockModule/getWaitInStockUsimList');
			this.allCheckedBox = '';
		},
	},
	async created() {
		await this.getWaitList();
	},
};
</script>

<style scoped></style>
