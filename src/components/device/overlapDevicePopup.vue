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
								<p>중복 일련번호</p>
							</div>
							<div class="rowHeader mt20">
								<p>일련번호 선택</p>
							</div>
							<div class="rowCont">
								<div class="rowItem" style="width: 100%">
									<div class="tableCont">
										<table>
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
																:value="item.dvcId"
																v-model="dvcId"
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
															<span v-if="item.commonBarcode">
																{{ item.commonBarcode }}
															</span>
															<span v-else> - </span>
														</td>
														<td>
															<span v-if="item.unLockYn">
																{{ item.unLockYn }}
															</span>
															<span v-else> - </span>
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
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn text style="background-color: #17a5ae" @click="submit">
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
		dvcId: '',
	}),
	methods: {
		submit() {
			this.$emit('overlapSuccessFnc', this.dvcId);
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
