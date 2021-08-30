<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="700">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">엑셀 업로드</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<p class="mainRed mj0">* 필수입력입니다</p>

						<div class="new_popTable1 vuetify_pop1">
							<table class="w100P">
								<tr>
									<td class="w120">기기정보<span class="mainRed">*</span></td>
									<td>
										<div class="floatL w120">
											<v-select
												:items="codeList.prov"
												label="공급처"
												outlined
												item-text="provName"
												item-value="provId"
												v-model.trim="formData.prov"
											></v-select>
										</div>
										<div class="w120 ml10 floatL">
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
										<div class="w120 ml10 floatL">
											<v-select
												:items="codeList.stock"
												label="보유처"
												outlined
												item-text="stockName"
												item-value="stockId"
												v-model.trim="formData.stock"
											></v-select>
										</div>
									</td>
								</tr>
								<tr>
									<td>엑셀파일선택</td>
									<td>
										<input
											class="lh40 borderRadi3Px w100P"
											type="file"
											style="border: 1px solid #ddd"
											@change="handleFileChange"
										/>
									</td>
								</tr>
							</table>

							<div class="disFx justify-end mt10">
								<v-btn
									class="backColorMint1 mainWhite borderReset w80"
									@click="excelUploadFnc"
								>
									확인
								</v-btn>
								<v-btn
									class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
									@click="dialog = false"
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
				return this.$store.state.OpenInStockModule.excelUploadDialog;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.excelUploadDialog = newValue);
			},
		},
		codeList() {
			return this.$store.state.OpenInStockModule.codeList;
		},
	},
	methods: {
		async selectList() {
			let data = this.formData.telecom;
			await this.$store.dispatch('OpenInStockModule/selectCodeList', data);
		},
		handleFileChange(e) {
			this.excelFile = e.target.files[0];
		},
		async excelUploadFnc() {
			const formData = new FormData();
			formData.append('excelFile', this.excelFile);
			formData.append('inStockStatus', 'OPEN');
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
				'OpenInStockModule/insertInStockWaitExcel',
				formData,
			);
			if (result.data && result.data.length > 0) {
				alert(result.data.length + '건이 등록 실패했습니다.');
				let data = {
					failList: result.data,
				};
				await this.$store.dispatch(
					'OpenInStockModule/insertInStockWaitExcelException',
					data,
				);
			} else {
				alert('등록되었습니다.');
			}
			let Open = 'OPEN';
			await this.$store.dispatch('OpenInStockModule/getList', Open);
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
