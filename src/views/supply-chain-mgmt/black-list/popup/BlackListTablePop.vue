<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="800">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<div class="mainWhite mainFontS boldWt">
							<h2>블랙리스트 정보</h2>
						</div>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<h2 class="boldWt mainBlack2 mb10">블랙리스트 이력</h2>

						<div class="new_popTable1 newTableStyle">
							<table class="w100P">
								<thead>
									<th>등록점/등록자</th>
									<th>유형</th>
									<th>고객명</th>
									<th>전화번호</th>
									<th>생년월일</th>
									<th>주소</th>
								</thead>
								<tbody>
									<tr v-for="item in blackListData" :key="item.id">
										<td>{{ item.storeName }}<br />{{ item.regiUserName }}</td>
										<td>
											{{ item.blackTypeMsg }}
										</td>
										<td>
											{{ item.blackName }}
										</td>
										<td>
											{{ item.blackPhone }}
										</td>
										<td>
											{{ item.blackDateBirth }}
										</td>
										<td>{{ item.blackAddr }} {{ item.blackAddrDetail }}</td>
										<!--                  <td>-->
										<!--                    <button class="btnDefault" @click="blackBtnFnc(item.blackTypeMsg)">확인</button>-->
										<!--                  </td>-->
									</tr>
								</tbody>
							</table>
						</div>
					</v-card-text>

					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn style="background-color: #bdbdbd" @click="closeDialogFnc">
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
		blackListData: {
			type: Array,
		},
	},
	components: {},
	data: () => ({
		dialog: true,
	}),
	computed: {},
	methods: {
		closeDialogFnc() {
			this.dialog = !this.dialog;
		},
		blackBtnFnc(blackTypeMsg) {
			this.dialog = !this.dialog;
			this.$emit('blackBtnFnc', blackTypeMsg);
		},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog);
				}
			},
		},
		menu1(val) {
			val && setTimeout(() => (this.activePicker = 'YEAR'));
		},
	},
	created() {},
};
</script>

<style></style>
