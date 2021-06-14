<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>반려 사유</h2>
					</v-card-title>

					<v-card-text class="textFieldCustom">
						<p v-if="roleVal"><span class="redfont">*</span>필수입력정보</p>
						<div>
							<v-container>
								<v-textarea
									label="반려사유"
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
							color="primary"
							text
							outlined
							@click="updateReqStatusFnc()"
							v-if="roleVal"
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
import { updateReqStatus } from '../../../../../api/common-mgmt/addition-serviece-mgmt/AdditionServiceRequestApi.js';

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
		getRegReqData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.getRegReqData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.getRegReqData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.filterData = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.rejectDialog;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.rejectDialog = newValue;
			},
		},
	},
	methods: {
		async getList(data) {
			this.getRegReqData = [];
			await this.$store.dispatch('AdditionServiceRequestModule/getList', data);
		},
		async updateReqStatusFnc() {
			try {
				const reqStatusData = {
					addSvcCharge: this.reqData.addSvcCharge,
					addSvcName: this.reqData.addSvcName,
					addSvcRegReqId: this.reqData.addSvcRegReqId,
					regReqRejectDto: {
						rejectComment: this.comment,
					},
					reqStatus: 9,
					reqStoreId: this.reqData.reqStoreId,
					telecom: this.reqData.telecom,
				};
				await updateReqStatus(reqStatusData);
				this.dialog = !this.dialog;
				await this.getList(this.filterData);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
