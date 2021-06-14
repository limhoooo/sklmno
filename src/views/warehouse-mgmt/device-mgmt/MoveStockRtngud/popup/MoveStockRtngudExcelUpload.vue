<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="550"
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
export default {
	data: () => ({
		excelFile: [],
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.MoveStockRtngudModule.excelUploadDialog;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.excelUploadDialog = newValue;
			},
		},
	},
	methods: {
		handleFileChange(e) {
			this.excelFile = e.target.files[0];
		},
		async excelUploadFnc() {
			const formData = new FormData();
			formData.append('excelFile', this.excelFile);
			if (!this.excelFile || this.excelFile.length === 0) {
				alert('파일을 선택해주세요.');
				return;
			}
			const result = await this.$store.dispatch(
				'MoveStockRtngudModule/insertReturnStockExcel',
				formData,
			);
			if (result.data && result.data.length > 0) {
				alert(result.data.length + '건이 등록 실패했습니다.');
				let data = {
					failList: result.data,
				};
				await this.$store.dispatch(
					'MoveStockRtngudModule/insertReturnStockExcelException',
					data,
				);
			} else {
				alert('등록되었습니다.');
			}
			const data = this.$store.state.MoveStockRtngudModule.filterData;
			await this.$store.dispatch(
				'MoveStockRtngudModule/getReturnStockList',
				data,
			);
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
