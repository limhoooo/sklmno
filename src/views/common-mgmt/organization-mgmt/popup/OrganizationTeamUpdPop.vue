<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="510">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>조직 정보 수정</h2>
				</v-card-title>
				<v-card-text>
					<p><span class="redfont">*</span>필수입력정보</p>
					<div>
						<p>기존조직명</p>
						<p>
							{{ TeamChioceData.name }}
						</p>
					</div>

					<div>
						<p>조직명<span class="redfont">*</span></p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.orgName"
							outlined
						></v-text-field>
					</div>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="updateOrgnztFnc">
						수정
					</v-btn>
					<v-btn outlined color="primary" text @click="dialog = !dialog">
						취소
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { updateOrgnzt } from '../../../../api/common-mgmt/organization-mgmt/OrganizationMgmtApi.js';

export default {
	props: ['TeamChioceData', 'storeIdData'],
	data() {
		return {
			dialog: true,
			formData: {
				orgId: '',
				orgName: '',
				storeId: this.storeIdData,
			},
		};
	},
	methods: {
		async updateOrgnztFnc() {
			try {
				if (!this.formData.orgName) {
					return alert('조직명을 입력해주세요.');
				}
				const result = await this.$store.dispatch(
					'OrganizationMgmtModule/updateOrgnztFnc',
					this.formData,
				);
				if (result) {
					// 리스트 재호출
					const data = this.$store.state.OrganizationMgmtModule.filterData;
					await this.$store.dispatch(
						'OrganizationMgmtModule/getOrgnztListFnc',
						data,
					);
					this.$store.state.OrganizationMgmtModule.activeGroupData = [];
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		this.formData.orgId = this.TeamChioceData.id;
		//	this.formData.storeId = this.TeamChioceData.storeId;
	},
};
</script>

<style></style>
