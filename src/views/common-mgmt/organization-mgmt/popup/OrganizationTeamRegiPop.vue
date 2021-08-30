<template>
	<div class="text-center">
		<v-dialog
			v-model.trim="dialog"
			width="510"
			style="background: rgb(246, 246, 246)"
		>
			<v-card class="borderRadiReset">
				<v-card-title
					class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
				>
					<h2 class="mainWhite mainFontS boldWt">조직 등록</h2>
					<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
				</v-card-title>
				<v-card-text class="pad30">
					<p class="mainRed mj0">* 필수입력입니다</p>

					<div class="new_popTable1">
						<table class="w100P">
							<tr>
								<td>상위조직명</td>
								<td>{{ TeamChioceData.name }}</td>
							</tr>
							<tr>
								<td>조직명</td>
								<td>
									<v-text-field
										placeholder="조직명을 입력해주세요."
										class="input_custom1"
										v-model.trim="formData.orgName"
										outlined
									></v-text-field>
								</td>
							</tr>
						</table>

						<div class="disFx justify-end mt10">
							<v-btn
								outlined
								class="backColorMint1 mainWhite borderReset w80"
								text
								@click="insertOrgnztFnc"
							>
								등록
							</v-btn>
							<v-btn
								outlined
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								text
								@click="dialog = !dialog"
							>
								취소
							</v-btn>
						</div>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ['TeamChioceData', 'storeIdData'],
	data() {
		return {
			formData: {
				parentOrgId: '',
				orgName: '',
				storeId: this.storeIdData,
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.OrganizationMgmtModule.teamRegiPop;
			},
			set(newValue) {
				this.$store.state.OrganizationMgmtModule.teamRegiPop = newValue;
			},
		},
	},
	methods: {
		async insertOrgnztFnc() {
			try {
				if (!this.formData.orgName) {
					return alert('조직명을 입력해주세요.');
				}
				const result = await this.$store.dispatch(
					'OrganizationMgmtModule/insertOrgnztFnc',
					this.formData,
				);
				if (result) {
					// 리스트 재호출
					const data = this.$store.state.OrganizationMgmtModule.filterData;
					await this.$store.dispatch(
						'OrganizationMgmtModule/getOrgnztListFnc',
						data,
					);
					//this.$store.state.HoldStoreMgmtModule.activeGroupData = [];
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		this.formData.parentOrgId = this.TeamChioceData.id;
	},
};
</script>

<style></style>
