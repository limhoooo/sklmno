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
										id="checkId2"
										type="checkbox"
										value="all"
										class="checkStyle"
										v-model.trim="allCheckedBox"
										@click="allChecked($event.target.checked)"
									/>
									<label for="checkId2"></label>
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
						<tr v-for="item in getList" :key="item.index">
							<td>
								<div class="checkStyleCont1">
									<input
										:id="`checkBox${item.waitId}`"
										type="checkbox"
										class="checkStyle"
										v-model.trim="checkListIdArray"
										:value="item.waitId"
									/>
									<label :for="`checkBox${item.waitId}`"></label>
								</div>
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
							<td>
								<span v-if="item.productMissYn === 'Y'"
									>{{ item.extrrStatusMsg }}<br />구성품누락</span
								>
								<span v-else>{{ item.extrrStatusMsg }}<br />-</span>
							</td>
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
						<tr v-if="getModelList.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr v-else v-for="item in getModelList" :key="item.index">
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

		<open-in-stock-regist-pop v-if="registDialog"></open-in-stock-regist-pop>
		<open-in-stock-excel-upload
			v-if="excelUploadDialog"
		></open-in-stock-excel-upload>
	</div>
</template>

<script>
import OpenInStockRegistPop from './popup/OpenInStockRegistPop';
import OpenInStockExcelUpload from './popup/OpenInStockExcelUpload.vue';

export default {
	components: { OpenInStockRegistPop, OpenInStockExcelUpload },
	computed: {
		excelFormDownloadUrl() {
			return this.$store.state.commonModule.excelFormDownloadUrl;
		},
		excelUploadDialog: {
			get() {
				return this.$store.state.OpenInStockModule.excelUploadDialog;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.excelUploadDialog = newValue);
			},
		},
		checkListIdArray: {
			get() {
				return this.$store.state.OpenInStockModule.checkListIdArray;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.checkListIdArray = newValue);
			},
		},
		allCheckedBox: {
			get() {
				return this.$store.state.OpenInStockModule.allCheckedBox;
			},
			set(newValue) {
				this.$store.state.OpenInStockModule.allCheckedBox = newValue;
			},
		},
		getList() {
			return this.$store.state.OpenInStockModule.getListData;
		},
		getModelList() {
			return this.$store.state.OpenInStockModule.getModelListData;
		},
		registDialog() {
			return this.$store.state.OpenInStockModule.registDialog;
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
				'OpenInStockModule/deleteList',
				this.checkListIdArray,
			);
			await this.getListData();
		},
		async getListData() {
			let data = 'OPEN';
			await this.$store.dispatch('OpenInStockModule/getList', data);
		},
	},
};
</script>

<style scoped></style>
