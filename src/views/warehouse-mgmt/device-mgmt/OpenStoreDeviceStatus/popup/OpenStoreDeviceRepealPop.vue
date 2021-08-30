<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="550">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">개통철회</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">철회일자</td>
									<td>
										<div>
											<div style="display: inline-block">
												<v-menu
													v-model.trim="menu1"
													:close-on-content-click="false"
													:nudge-right="40"
													transition="scale-transition"
													offset-y
												>
													<template v-slot:activator="{ on, attrs }">
														<v-text-field
															outlined
															readonly
															v-model.trim="cancelDate"
															v-bind="attrs"
															v-on="on"
															class="input_custom1"
														></v-text-field>
													</template>
													<v-date-picker
														v-model.trim="cancelDate"
														@input="menu1 = false"
														locale="ko-KR"
													></v-date-picker>
												</v-menu>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>철회종류</td>
									<td>
										<div class="disFx">
											<template v-for="(item, index) in statusList.RetractType">
												<div class="radioStylePop w80 ml20">
													<input
														:id="`division${index}`"
														:value="item.value"
														type="radio"
														v-model="cancelType"
														name="division"
													/>
													<label
														style="margin-left: 5px; margin-right: 8px"
														:for="`division${index}`"
														>{{ item.name }}</label
													>
												</div>
											</template>
										</div>
									</td>
								</tr>
								<tr>
									<td>철회사유</td>
									<td>
										<div>
											<textarea
												cols="45"
												style="
													border: 1px solid #aaa;
													padding: 10px;
													resize: none;
												"
												placeholder="철회사유를 입력해주세요."
												v-model.trim="cancelMemo"
											></textarea>
										</div>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								class="backColorMint1 mainWhite borderReset w80"
								text
								@click="submit"
							>
								저장
							</v-btn>
							<v-btn
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								@click="dialog = false"
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

<script lang="ts">
import Vue from 'vue';

interface dataType {
	menu1: boolean;
	openingDate: string;
	cancelDate: string;
	cancelType: string;
	cancelMemo: string;
	openingId: number;
}
export default Vue.extend({
	props: {
		infoDialogData: {
			type: Object,
			required: true,
		},
	},
	data: (): dataType => ({
		menu1: false,
		openingDate: '',
		cancelDate: '',
		cancelType: '',
		cancelMemo: '',
		openingId: 0,
	}),
	computed: {
		statusList(): any {
			return this.$store.state.OpenStoreDeviceStatusModule.statusList;
		},
		dialog: {
			get(): boolean {
				return this.$store.state.OpenStoreDeviceStatusModule.repealDialog;
			},
			set(newValue: boolean) {
				this.$store.state.OpenStoreDeviceStatusModule.repealDialog = newValue;
			},
		},
	},
	methods: {
		async submit() {
			if (!this.cancelDate) {
				alert('철회일자를 입력해주세요.');
				return;
			}
			if (!this.cancelType) {
				alert('철회종류를 입력해주세요.');
				return;
			}
			if (!this.cancelMemo) {
				alert('철회사유를 입력해주세요.');
				return;
			}
			let data = {
				openingId: this.openingId,
				cancelDate: this.cancelDate,
				cancelType: this.cancelType,
				cancelMemo: this.cancelMemo,
			};
			const result = await this.$store.dispatch(
				'OpenStoreDeviceStatusModule/updateCancel',
				data,
			);
			if (result) {
				this.dialog = !this.dialog;
				const filterData = this.$store.state.OpenStoreDeviceStatusModule
					.filterData;
				await this.$store.dispatch(
					'OpenStoreDeviceStatusModule/getList',
					filterData,
				);
			}
		},
		getEnumCommonCodeList() {
			this.$store.dispatch('OpenStoreDeviceStatusModule/getEnumCommonCodeList');
		},
	},
	watch: {
		cancelDate: {
			handler: function (newVal) {
				if (newVal < this.openingDate && this.cancelDate) {
					alert(
						`개통날짜보다 철회일자가 작습니다 \n( 개통일 : ${this.openingDate} ) `,
					);
					this.cancelDate = '';
				}
			},
		},
	},
	async created() {
		await this.getEnumCommonCodeList();
		this.openingId = this.infoDialogData.openingId;
		this.openingDate = this.infoDialogData.openingDate;
	},
});
</script>

<style scoped>
.rowItemText span {
	font-size: 12px;
	color: #7397a4;
	margin-right: 10px;
}
.rowItemText label {
	font-size: 12px;
	color: #7397a4;
	margin-left: 3px;
	margin-right: 5px;
}
.dateContCustom2 {
	border-bottom: 1px solid #dedede;
}
.font-7397A4 {
	color: #7397a4;
}
</style>
