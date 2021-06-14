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
								<p>판정상태변경</p>
							</div>
							<div class="rowHeader mt20">
								<p>판정상태</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText">
									<input
										type="radio"
										id="division01"
										value="PROGRESS"
										name="outStockState"
										v-model.trim="formData.judgeStatus"
									/>
									<label for="division01">판정진행중</label>
									<input
										type="radio"
										id="division02"
										value="COMPL"
										name="outStockState"
										v-model.trim="formData.judgeStatus"
									/>
									<label for="division02">판정완료</label>
									<input
										type="radio"
										id="division03"
										value="REJECT"
										name="outStockState"
										v-model.trim="formData.judgeStatus"
									/>
									<label for="division03">판정반려</label>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>판정사유</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText">
									<textarea
										style="width: 100%; border: 1px solid #ddd; margin-top: 5px"
										v-model.trim="formData.judgeMemo"
										placeholder="입고메모"
									></textarea>
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
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.FaultyDeviceStatusModule.modifyDialog;
			},
			set(newValue) {
				this.$store.state.FaultyDeviceStatusModule.modifyDialog = newValue;
			},
		},
	},
	methods: {
		async submit() {
			let data = this.formData;
			const result = await this.$store.dispatch(
				'FaultyDeviceStatusModule/updateJudgementStatus',
				data,
			);
			if (result) {
				this.dialog = false;
				const data = this.$store.state.FaultyDeviceStatusModule.filterData;
				if (data && data.capacity === '전체') {
					data.capacity = '';
				}
				if (data && data.colorName === '전체') {
					data.colorName = '';
				}
				await this.$store.dispatch('FaultyDeviceStatusModule/getList', data);
				if (data && data.capacity === '') {
					data.capacity = '전체';
				}
				if (data && data.colorName === '') {
					data.colorName = '전체';
				}
			}
		},
	},
	created() {
		this.formData.dvcId = this.infoDialogData.dvcId;
		this.formData.judgeStatus = this.infoDialogData.judgeStatus;
		this.formData.judgeMemo = this.infoDialogData.judgeMemo;
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
</style>
