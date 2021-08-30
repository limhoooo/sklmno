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
						<h2 class="mainWhite mainFontS boldWt">재고 수동 검수</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<p class="mainRed mj0">* 필수입력입니다</p>
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">수동 검수 유형</td>
									<td>
										<div class="disFx">
											<span
												v-for="(item, index) in stockManualCheckStatus"
												:key="item.index"
											>
												<div class="radioStylePop ml30">
													<input
														:id="`stockStatus${index}`"
														:value="item.value"
														v-model="formData.stockManualCheckStatus"
														name="stockStatus"
														type="radio"
													/>
													<label :for="`stockStatus${index}`">
														{{ item.name }}
													</label>
												</div>
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td>사유</td>
									<td>
										<textarea
											v-model="formData.stockManualCheckMemo"
											style="border: 1px solid #ddd; resize: none"
											cols="50"
										></textarea>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								@click="submit"
								class="backColorMint1 mainWhite borderReset w80"
							>
								저장
							</v-btn>
							<v-btn
								@click="dialog = false"
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							>
								닫기
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import {objectClone} from '../../../../../common/common';

export default {
	props: ['overlapDvcId'],
	data: () => ({
		stockManualCheckStatus: [],
		formData: {
			selDvcId: 0,
			stockManualCheckMemo: '',
			stockManualCheckStatus: '',
			stockCheckType: '',
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.StockStatusModule.stockCheckPop;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.stockCheckPop = newValue;
			},
		},
		statusList() {
			return this.$store.state.StockStatusModule.statusList;
		},
	},
	methods: {
		async submit() {
			if (!this.formData.stockManualCheckStatus) {
				alert('수동검수유형을 선택해주세요.');
				return;
			}
			const result = await this.$store.dispatch(
				'StockStatusModule/checkStoreStockDto',
				this.formData,
			);
			if (result) {
				alert('완료됐습니다.');
				this.dialog = false;
				this.$emit('resultCheckPop', true);
			} else {
				alert('알수없는 에러');
			}
		},
		createFnc() {
			// 필터 수동검수유형 전체 연동으로인한 복사 후 0번지(전체) 삭제
			this.stockManualCheckStatus = objectClone(
				this.statusList.stockManualCheckStatus,
			);
			if (this.stockManualCheckStatus) {
				this.stockManualCheckStatus.shift();
			}
			this.formData.selDvcId = this.overlapDvcId;
			this.formData.stockCheckType = 'MANUAL';
		},
	},
	async created() {
		this.createFnc();
	},
};
</script>

<style></style>
