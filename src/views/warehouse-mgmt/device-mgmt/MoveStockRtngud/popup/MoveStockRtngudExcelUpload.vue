<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="550"
				style="border-radius: 0 !important"
			>
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">엑셀업로드</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">엑셀 파일선택</td>
									<td>
										<input
											type="file"
											@change="handleFileChange"
										/>
									</td>
								</tr>
							</table>

							<div class="infoDialogCont disFx justify-end mt20">
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
						</div>
					</v-card-text>
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
