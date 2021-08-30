<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="720">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">중복 일련번호</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<h2 class="mainFontS boldWt mainBlack mb10">일련번호 선택</h2>

						<div class="newTableStyle mt10">
							<table class="w100P">
								<thead>
									<tr>
										<th>선택</th>
										<th>제조사</th>
										<th>기기</th>
										<th>용량</th>
										<th>색상</th>
										<th>일련번호</th>
										<th>자급제여부</th>
									</tr>
								</thead>
								<tbody>
									<template v-if="overlapDeviceData.length > 0">
										<tr
											v-for="item in overlapDeviceData"
											v-bind:key="item.index"
										>
											<td>
												<input
													name="division"
													type="radio"
													:value="item"
													v-model="dvcInfo"
													style="display: inline-block"
												/>
											</td>
											<td>{{ item.makerName }}</td>
											<td>
												{{ item.goodsName }} <br />
												( {{ item.modelName }} )
											</td>
											<td>{{ item.capacity }}</td>
											<td>{{ item.colorName }}</td>
											<td>
												<span v-if="item.rawBarcode">
													{{ item.rawBarcode }}
												</span>
												<span v-else> - </span>
											</td>
											<td>
												<span v-if="item.unLockYn === 'Y'">
													{{ item.unLockYn }}
												</span>
												<span v-else> N </span>
											</td>
										</tr>
									</template>
									<template v-else>
										<tr>
											<td colspan="5">데이터가 없습니다.</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								class="backColorMint1 mainWhite borderReset w80"
								@click="submit"
							>
								확인
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
export default {
	props: {
		overlapDialog: {
			type: Boolean,
		},
		overlapDeviceData: {
			type: Array,
		},
	},
	data: () => ({
		dialog: '',
		dvcInfo: '',
	}),
	methods: {
		submit() {
			if (this.dvcInfo) {
				this.$emit(
					'overlapSuccessFnc',
					this.dvcInfo.dvcId,
					this.dvcInfo.rawBarcode,
				);
			}
			this.dialog = !this.dialog;
			// await this.$store.dispatch(
			// 	'MoveStockRtngudModule/getDeviceInfo',
			// 	dvcId,
			// );
		},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog, 'overlapDevicePop');
				}
			},
		},
	},
	created() {
		this.dialog = this.overlapDialog;
	},
};
</script>

<style scoped>
.tableCont table th {
	padding: 5px;
}
.tableCont table td {
	color: #333;
}
</style>
