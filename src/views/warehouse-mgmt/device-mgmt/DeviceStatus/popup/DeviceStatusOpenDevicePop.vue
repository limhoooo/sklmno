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
								<p>개통정보</p>
							</div>
							<div class="rowHeader mt20">
								<p><span class="redfont">*</span> 개통정보</p>
							</div>
							<div class="mt-3 dateContCustom2">
								<span class="font-7397A4">개통일자</span>
								<div class="datePickerCustom ml10P">
									<div class="dateCustom" style="display: inline-block">
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
													v-model.trim="formData.openingDate"
													v-bind="attrs"
													v-on="on"
													class="datePickerInput input_custom1"
												></v-text-field>
											</template>
											<v-date-picker
												v-model.trim="formData.openingDate"
												@input="menu1 = false"
												locale="ko-KR"
											></v-date-picker>
										</v-menu>
									</div>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>고객정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>고객명</p>
									<span>
										{{ openDeviceDialogData.cusName }}
									</span>
								</div>
								<div class="rowItem ml10P">
									<p>전화번호</p>
									<span>
										{{ openDeviceDialogData.cusPhone1 }} -
										{{ openDeviceDialogData.cusPhone2 }} -
										{{ openDeviceDialogData.cusPhone3 }}
									</span>
								</div>
							</div>
							<div class="rowItem w100P">
								<p style="width: 95px">주소</p>
								<span>
									{{ openDeviceDialogData.addr1 }}
									{{ openDeviceDialogData.addr2 }}
									( {{ openDeviceDialogData.zipCode }} )
								</span>
							</div>
							<div class="rowHeader mt20">
								<p>개통메모</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText" style="padding: 10px">
									<div class="" style="margin-left: 10px">
										<div class="selectCustom" style="width: 550px">
											<textarea
												cols="74"
												style="border: 1px solid #aaa; padding: 10px"
												placeholder="개통메모를 적어주세요."
												v-model.trim="formData.openingMemo"
											></textarea>
										</div>
									</div>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn text @click="submit" style="background-color: #17a5ae">
								저장
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
		openDeviceDialogData: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		menu1: false,
		formData: {
			dvcId: '',
			openingDate: '',
			openingMemo: '',
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.DeviceStatusModule.openDeviceDialog;
			},
			set(newValue) {
				this.$store.state.DeviceStatusModule.openDeviceDialog = newValue;
			},
		},
	},
	methods: {
		async submit() {
			if (!this.formData.openingDate) {
				alert('개통일자를 입력해주세요.');
				return;
			}
			const result = await this.$store.dispatch(
				'DeviceStatusModule/insertOpening',
				this.formData,
			);
			if (result) {
				this.dialog = !this.dialog;
				const data = this.$store.state.DeviceStatusModule.filterData;
				await this.$store.dispatch('DeviceStatusModule/getList', data);
			}
		},
	},
	async created() {
		this.formData.dvcId = this.openDeviceDialogData.dvcId;
	},
};
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
