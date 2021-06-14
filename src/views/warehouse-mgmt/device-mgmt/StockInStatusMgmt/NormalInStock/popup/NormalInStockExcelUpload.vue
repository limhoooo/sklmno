<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="700"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>엑셀 업로드</p>
							</div>
							<div class="rowHeader mt20">
								<p>기기정보</p>
							</div>
							<div class="contRow mt10">
								<div>
									<div class="selectCustom" style="width: 33%; margin-left: 0">
										<v-select
											:items="codeList.prov"
											label="공급처"
											outlined
											item-text="provName"
											item-value="provId"
											v-model.trim="formData.prov"
										></v-select>
									</div>
									<div
										class="selectCustom"
										style="width: 33%; margin-left: 3px"
									>
										<v-select
											:items="codeList.telecom"
											label="통신사"
											outlined
											@change="selectList"
											item-text="codeNm"
											item-value="codeSeq"
											v-model.trim="formData.telecom"
										></v-select>
									</div>
									<div
										class="selectCustom"
										style="width: 33%; margin-left: 3px"
									>
										<v-select
											:items="codeList.stock"
											label="보유처"
											outlined
											item-text="stockName"
											item-value="stockId"
											v-model.trim="formData.stock"
										></v-select>
									</div>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>엑셀 파일선택</p>
							</div>
							<div class="rowCont">
								<div class="rowItem" style="width: 90%">
									<!--                  <p>제조사</p>-->
									<!--                  <input-->
									<!--                      type="text"-->
									<!--                      class="cursorDefault"-->
									<!--                      readonly-->
									<!--                  />-->
									<div class="tableCont">
										<table>
											<thead>
												<tr>
													<th>파일명</th>
												</tr>
											</thead>
											<tbody>
												<template>
													<tr>
														<td>
															<input
																type="file"
																style="border: 1px solid #ddd"
																@change="handleFileChange"
															/>
														</td>
													</tr>
												</template>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn
								text
								style="background-color: #17a5ae"
								@click="excelUploadFnc"
							>
								확인
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								닫기
							</v-btn>
						</div>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { nullValidation } from '@/common/common';

export default {
	data: () => ({
		excelFile: [],
		formData: {
			prov: '',
			telecom: '',
			stock: '',
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.NormalInStockModule.excelUploadDialog;
			},
			set(newValue) {
				this.$store.state.NormalInStockModule.excelUploadDialog = newValue;
			},
		},
		codeList() {
			return this.$store.state.NormalInStockModule.codeList;
		},
	},
	methods: {
		async selectList() {
			let data = this.formData.telecom;
			await this.$store.dispatch('NormalInStockModule/selectCodeList', data);
		},
		handleFileChange(e) {
			this.excelFile = e.target.files[0];
		},
		async excelUploadFnc() {
			const formData = new FormData();
			formData.append('excelFile', this.excelFile);
			formData.append('inStockStatus', 'NORMAL');
			formData.append('provId', this.formData.prov);
			formData.append('stockId', this.formData.stock);
			formData.append('telecom', this.formData.telecom);
			if (!nullValidation(this.formData)) {
				return;
			}
			if (!this.excelFile || this.excelFile.length === 0) {
				alert('파일을 선택해주세요.');
				return;
			}
			const result = await this.$store.dispatch(
				'NormalInStockModule/insertInStockWaitExcel',
				formData,
			);
			if (result.data && result.data.length > 0) {
				alert(result.data.length + '건이 등록 실패했습니다.');
				let data = {
					failList: result.data,
				};
				await this.$store.dispatch(
					'NormalInStockModule/insertInStockWaitExcelException',
					data,
				);
			} else {
				alert('등록되었습니다.');
			}
			await this.$store.dispatch('NormalInStockModule/getList');
			this.dialog = false;
		},
	},
	created() {},
};
</script>

<style scoped>
.tableCont table th {
	padding: 3px 0;
}
</style>
