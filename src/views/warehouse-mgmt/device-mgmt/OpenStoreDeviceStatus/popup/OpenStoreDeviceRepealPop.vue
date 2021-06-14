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
								<p>개통철회</p>
							</div>
							<div class="rowHeader mt20">
								<p><span class="redfont">*</span> 철회상태</p>
							</div>
							<div class="mt-3 dateContCustom2">
								<span>철회일자</span>
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
													v-model.trim="cancelDate"
													v-bind="attrs"
													v-on="on"
													class="datePickerInput input_custom1"
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
							</div>
							<div class="rowHeader mt20">
								<p><span class="redfont">*</span> 철회사유</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText" style="padding: 10px">
									<div class="" style="margin-left: 10px">
										<div class="selectCustom" style="width: 550px">
											<textarea
												cols="74"
												style="border: 1px solid #aaa; padding: 10px"
												placeholder="철회사유를 적어주세요."
												v-model.trim="cancelMemo"
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

<script lang="ts">
import Vue from 'vue';

interface dataType {
	menu1: boolean;
	openingDate: string;
	cancelDate: string;
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
		cancelMemo: '',
		openingId: 0,
	}),
	computed: {
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
			if (!this.cancelMemo) {
				alert('철회사유를 입력해주세요.');
				return;
			}
			let data = {
				openingId: this.openingId,
				cancelDate: this.cancelDate,
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
