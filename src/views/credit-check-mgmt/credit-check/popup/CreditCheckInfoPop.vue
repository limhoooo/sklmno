<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="700">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">신용조회 이력</h2>
						<span class="closeBtn1 cur_p" @click="dialog = false"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<h2 class="mainFontS boldWt mainBlack mb10">
							고객정보
							<span class="font-size-12" style="font-weight: normal"
								>({{ infoPopData.telecomName }}, {{ infoPopData.joinTypeMsg }},
								{{ infoPopData.cusTypeMsg }})</span
							>
						</h2>
						<div class="new_popTable1">
							<table class="w100P">
								<template v-if="!updateDialog">
									<template>
										<tr v-if="infoPopData.cusName">
											<td class="w100">고객명</td>
											<td class="w180">
												<span>{{ infoPopData.cusName }}</span>
											</td>
											<template v-if="infoPopData.cusType !== 'FOREIGN'">
												<td class="w100">주민등록번호</td>
												<td class="w180">
													<span
														>{{ infoPopData.cusRegiNum1 }}-{{
															infoPopData.cusRegiNum2
														}}</span
													>
												</td>
											</template>
											<template v-else>
												<td class="w120">외국인등록번호</td>
												<td class="w180">
													<span
														>{{ infoPopData.licenseNum1 }}-{{
															infoPopData.licenseNum2
														}}</span
													>
												</td>
											</template>
										</tr>
										<tr v-if="infoPopData.bizName">
											<td class="w100">법인명</td>
											<td class="w180">
												{{ infoPopData.bizName }}
											</td>
											<template v-if="infoPopData.bizRegiNum1">
												<td class="w100">법인번호</td>
												<td class="w180">
													{{ infoPopData.bizRegiNum1 }}-{{
														infoPopData.bizRegiNum2
													}}
												</td>
											</template>
										</tr>
										<tr v-if="infoPopData.bizNum">
											<td>사업자번호</td>
											<td colspan="3">{{ infoPopData.bizNum }}</td>
										</tr>
										<template v-if="infoPopData.cusType === 'FOREIGN'">
											<tr v-if="infoPopData.ntnlCodeMsg">
												<template v-if="infoPopData.ntnlCodeMsg">
													<td>국적</td>
													<td>{{ infoPopData.ntnlCodeMsg }}</td>
												</template>
												<template v-if="infoPopData.licenseIssueDate">
													<td>발급일자</td>
													<td>{{ infoPopData.licenseIssueDate }}</td>
												</template>
											</tr>
											<tr v-if="infoPopData.stayCodeMsg">
												<td>체류코드</td>
												<td>{{ infoPopData.stayCodeMsg }}</td>
												<td>만료일자</td>
												<td>{{ infoPopData.licenseExpiredDate }}</td>
											</tr>
										</template>
										<template v-if="infoPopData.courtProctorName">
											<tr>
												<td>법정대리인<br />성명</td>
												<td>{{ infoPopData.courtProctorName }}</td>
												<td>법정대리인<br />주민등록번호</td>
												<td>
													{{ infoPopData.courtProctorRegiNum1 }}-{{
														infoPopData.courtProctorRegiNum2
													}}
												</td>
											</tr>
										</template>
									</template>
									<template v-if="infoPopData.joinType === 'DVC_CHANGE'">
										<tr v-if="infoPopData.cusPhone">
											<td>휴대폰번호</td>
											<td colspan="3">
												<span v-if="infoPopData.cusPhone1">
													{{ infoPopData.cusPhone1 }} -
													{{ infoPopData.cusPhone2 }} -
													{{ infoPopData.cusPhone3 }}
												</span>
											</td>
										</tr>
										<tr v-if="infoPopData.bizPhone">
											<td>휴대폰번호</td>
											<td colspan="3" v-if="infoPopData.bizPhone">
												{{ infoPopData.bizPhone1 }}-{{ infoPopData.bizPhone2 }}
											</td>
										</tr>
										<tr v-if="infoPopData.courtProctorPhone1">
											<td>법정대리인<br />휴대폰번호</td>
											<td colspan="3">
												{{ infoPopData.courtProctorPhone1 }}-{{
													infoPopData.courtProctorPhone2
												}}-{{ infoPopData.courtProctorPhone3 }}
											</td>
										</tr>
									</template>
								</template>
							</table>
						</div>

						<h2 class="mainFontS boldWt mainBlack mb10 mt20">신용조회 내역</h2>
						<div class="borderContColor1 historyPop1">
							<ul>
								<li v-for="(item, index) in getHistoryData" :key="index">
									<div
										class="lh36 disFx justify-lg-space-between"
										style="padding-bottom: 1px"
									>
										<span>
											<span class="fakeLine6">{{
												item.saleStoreIdString
											}}</span>
											<span class="ml20">{{ item.regiUserIdString }}</span>
											<span
												class="ml20 backColorBlue1 mainBlue2 lh20 disIn padW10 borderRadi50px"
												>{{ item.historyStatusMsg }}</span
											>
										</span>
										<span>{{
											item.regiDatetime | moment('YYYY-MM-DD HH:mm:ss')
										}}</span>
									</div>
									<div
										v-if="item.historyContents"
										class="lh36"
										style="border-top: 1px solid #eeeeee"
									>
										<span
											v-html="
												htmlParse(
													item.historyContents.replace(
														/(?:\r\n|\r|\n)/g,
														'<br />',
													),
												)
											"
										></span>
									</div>
								</li>
							</ul>
						</div>
						<div class="disFx justify-end mt10">
							<v-btn
								text
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

<script>
import { unescapeHtml } from '@/common/common';

export default {
	name: 'CreditCheckInfoPop',
	computed: {
		dialog: {
			get() {
				return this.$store.state.CreditCheckModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.infoDialog = newValue;
			},
		},
		infoPopData() {
			return this.$store.state.CreditCheckModule.infoPopData;
		},
		getHistoryData() {
			return this.$store.state.CreditCheckModule.getHistoryData;
		},
	},
	data: () => ({
		updateDialog: false, // 수정버튼엑티브
	}),
	methods: {
		updateFnc() {
			// 수정버튼 액션 똑딱이
			this.updateDialog = !this.updateDialog;
		},
		htmlParse(html) {
			return unescapeHtml(html);
		},
	},
	created() {
		this.updateDialog = false;
	},
};
</script>

<style scoped>
.historyPop1 li {
	font-size: 12px;
	color: #000;
	border-bottom: 1px solid #eeeeee;
	padding: 0 15px;
}
.historyPop1 li:last-child {
	border-bottom: 0 !important;
}
</style>
