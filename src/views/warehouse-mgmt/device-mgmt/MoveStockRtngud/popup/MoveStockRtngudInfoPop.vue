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
								<p>반품조회</p>
							</div>
							<div class="rowHeader mt20">
								<p>제품정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>제조사</p>
									<input
										type="text"
										:value="infoDialogData.makerName"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>통신사</p>
									<input
										type="text"
										:value="getTelecomName(infoDialogData.telecom)"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>기기명</p>
									<input
										type="text"
										:value="infoDialogData.goodsName"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>모델명</p>
									<input
										type="text"
										:value="infoDialogData.modelName"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>색상</p>
									<input
										type="text"
										:value="infoDialogData.colorName"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>용량</p>
									<input
										type="text"
										:value="infoDialogData.capacity"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>일련번호</p>
									<input
										type="text"
										:value="infoDialogData.rawBarcode"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>재고구분</p>
									<input
										type="text"
										:value="infoDialogData.statusStr"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>이력조회</p>
							</div>
							<div class="rowItem w100P">
								<p
									style="width: 100%; border-bottom: 1px solid #ddd"
									v-for="item in deviceHistory"
									:key="item.index"
								>
									<span style="font-size: 15px" class="mr5">{{
										item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss')
									}}</span>
									<span>{{ item.storeName }}</span> |
									<span class="mr5">{{ item.regiUserName }}</span>
									<span class="historyNoti">
										{{ item.stockTypeMsg }}
									</span>
									<br /><span style="color: #333" class="countingCutsom">
										{{ item.memo }}
									</span>
								</p>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
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
import { getTelecomName } from '../../../../../common/common';

export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
	}),
	computed: {
		deviceHistory() {
			return this.$store.state.MoveStockRtngudModule.deviceHistory;
		},
		dialog: {
			get() {
				return this.$store.state.MoveStockRtngudModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async getRetrieveDeviceHistory() {
			let data = {
				dvcId: this.infoDialogData.dvcId,
			};
			await this.$store.dispatch(
				'MoveStockRtngudModule/getRetrieveDeviceHistory',
				data,
			);
		},
	},
	created() {
		this.getRetrieveDeviceHistory();
	},
};
</script>

<style scoped></style>
