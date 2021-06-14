<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>반려 사유</h2>
					</v-card-title>

					<v-card-text class="textFieldCustom">
						<p><span class="redfont">*</span>필수입력정보</p>
						<div>
							<v-container>
								<v-textarea
									label="사유입력"
									outlined
									auto-grow
									v-model.trim="comment"
									value=""
									:disabled="!roleVal"
								></v-textarea>
							</v-container>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							v-if="roleVal"
							color="primary"
							text
							outlined
							@click="updateReqStatusFnc()"
							>저장</v-btn
						>
						<v-btn color="primary" text @click="dialog = !dialog" outlined>
							취소
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { updateReqStatus } from '../../../../api/common-mgmt/charge-mgmt/ChargeMgmtRequestApi.js';

export default {
	props: ['reqData'],
	data() {
		return {
			comment: this.reqData.regReqRejectDto.rejectComment,
		};
	},
	computed: {
		roleVal() {
			return this.$store.state.role;
		},
		dialog: {
			get() {
				return this.$store.state.ChargeRequestModule.rejectDialog;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.rejectDialog = newValue;
			},
		},
	},
	methods: {
		async getList(data) {
			this.getRegReqList = [];
			await this.$store.dispatch('ChargeRequestModule/getList', data);
		},
		async updateReqStatusFnc() {
			try {
				const reqStatusData = {
					category: this.reqData.category,
					chargeName: this.reqData.chargeRegReqId,
					network: this.reqData.network,
					chargeRegReqId: this.reqData.chargeRegReqId,
					regReqRejectDto: {
						rejectComment: this.comment,
					},
					reqStatus: 9,
					telecom: this.reqData.telecom,
				};
				await updateReqStatus(reqStatusData);
				this.dialog = !this.dialog;
				const data = this.$store.state.ChargeRequestModule.filterData;
				await this.getList(data);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
