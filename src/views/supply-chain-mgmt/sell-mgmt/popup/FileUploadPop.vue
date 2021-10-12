<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="600"
				style="border-radius: 0 !important"
			>
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">파일확인</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">파일첨부</td>
									<td>
										<div class="disIN w100P mt10">
											<FileUpload
												:applId="applId"
												:modifyState="modifyState"
												@fileValueFnc="fileValueFnc"
											></FileUpload>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div class="disFx justify-end mt10">
							<v-btn
								class="backColorMint1 borderContColor1 mainWhite"
								text
								@click="submit"
							>
								저장
							</v-btn>
						</div>

						<div class="sideMenuBar pd10 font-btn-color mt20">
							<TaskHistory :applId="applId"></TaskHistory>
						</div>

						<div class="disFx justify-end mt10">
							<!--							<v-btn text @click="submit" style="background-color: #17a5ae">-->
							<!--								등록-->
							<!--							</v-btn>-->
							<v-btn
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								text
								@click="dialog = false"
							>
								닫기
							</v-btn>
						</div>
					</v-card-text>

					<!--					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>파일확인</p>
							</div>
							<div class="rowHeader mt20">
								<p style="display: inline-block; width: 80%">첨부파일</p>
								<span class="display_in">
									<input
										type="checkbox"
										id="docTargetYn"
										true-value="Y"
										false-value="N"
										v-model="docTarget"
										@click="docTargetYnFnc($event)"
									/>
									<label for="docTargetYn" class="ml5" style="cursor: pointer"
										>서류심사대상</label
									>
								</span>
							</div>
							<div class="rowCont">
								<div class="rowItem" style="width: 100%; padding: 10px">
									<FileUpload
										:applId="applId"
										:modifyState="modifyState"
										@fileValueFnc="fileValueFnc"
									></FileUpload>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem" style="border: none; width: 100%">
									<div>
										<v-card-actions style="padding: 15px 20px">
											<div class="memberCont"></div>
											<v-spacer></v-spacer>
											<div class="infoDialogCont">
												<v-btn
													text
													@click="submit"
													style="background-color: #17a5ae"
												>
													저장
												</v-btn>
												&lt;!&ndash;                        <v-btn&ndash;&gt;
												&lt;!&ndash;                            text&ndash;&gt;
												&lt;!&ndash;                            @click="dialog = false"&ndash;&gt;
												&lt;!&ndash;                            style="background-color: #bdbdbd"&ndash;&gt;
												&lt;!&ndash;                        >&ndash;&gt;
												&lt;!&ndash;                          취소&ndash;&gt;
												&lt;!&ndash;                        </v-btn>&ndash;&gt;
											</div>
										</v-card-actions>
									</div>
								</div>
							</div>
							<div
								class="sideMenuBar pd10 font-btn-color"
								style="background-color: rgb(245, 245, 245)"
							>
								<TaskHistory :applId="applId"></TaskHistory>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							&lt;!&ndash;							<v-btn text @click="submit" style="background-color: #17a5ae">&ndash;&gt;
							&lt;!&ndash;								등록&ndash;&gt;
							&lt;!&ndash;							</v-btn>&ndash;&gt;
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								취소
							</v-btn>
						</div>
					</v-card-actions>-->
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import FileUpload from '../../../../components/FileUpload.vue';
import TaskHistory from '../../../../components/TaskHistory.vue';
import { htmlParse } from '../../../../common/common';

export default Vue.extend({
	props: {
		applId: {
			type: Number,
		},
		docTargetYn: {
			type: String,
		},
	},
	components: {
		FileUpload,
		TaskHistory,
	},
	data: () => ({
		dialog: true,
		fileData: [],
		docTarget: 'N',
		modifyState: true,
	}),
	methods: {
		fileValueFnc(value: any) {
			this.fileData = value;
		},
		async submit() {
			if (this.fileData.length === 0) {
				alert('변경된 데이터가 없습니다.');
				return;
			}
			let fileHtml = []; // 파일 이력
			let formData: any = new FormData();
			formData.append('applId', this.applId);
			for (let i = 0; i < this.fileData.length; i++) {
				let fileObj: any = {
					title: '파일추가',
					// @ts-ignore
					data: this.fileData[i].name,
				};
				formData.append('attachFile', this.fileData[i]);
				fileHtml.push(fileObj);
			}
			// 파일 이력
			let fileHtmlString = htmlParse(fileHtml);
			formData.append('memoContents', fileHtmlString);
			formData.append('taskMemoId', null);

			const result = await this.$store.dispatch(
				'ApplicationFormCreationModule/fileUpload',
				formData,
			);

			if (result) {
				alert('등록되었습니다.');
				this.modifyState = !this.modifyState;
				await this.getHistoryList();
			}
		},
		async docTargetYnFnc(e: any) {
			if (confirm('서류심사대상으로 체크하시겠습니까?')) {
				let value1 = this.docTarget; // 기존값
				let value2 = this.docTarget === 'Y' ? 'N' : 'Y'; // 변경값
				let html = `<span style="font-weight: bold">서류심사대상</span>
					<span>${value1}</span> >
					<span>${value2}</span><br/>`;
				let data = {
					applId: this.applId,
					checkStatusUpdateType: 'DOC_TARGET_YN',
					memoContents: html,
				};
				const result = await this.$store.dispatch(
					'SellStatusModule/updateDocTargetYn',
					data,
				);
				if (result) {
					await this.getList();
					await this.getHistoryList();
				} else {
					e.preventDefault();
				}
			} else {
				e.preventDefault();
			}
		},
		async getHistoryList() {
			let data = {
				applId: this.applId,
			};
			await this.$store.dispatch('TaskHistoryModule/getHistoryList', data);
		},
		async getList() {
			const data = this.$store.state.SellStatusModule.filterData;
			await this.$store.dispatch('SellStatusModule/getSellCurrentPage', data);
		},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog, 'fileUploadDialog');
				}
			},
		},
	},
	created() {
		this.docTarget = this.docTargetYn;
	},
});
</script>

<style scoped>
/*.uploadBtn {*/
/*	background-color: #003a53;*/
/*	color: #fff;*/
/*	padding: 10px 15px;*/
/*	border-radius: 5px;*/
/*	font-size: 12px;*/
/*	cursor: pointer;*/
/*}*/
.ml5 {
	margin-left: 5px;
}
.tableCont table tbody tr {
	cursor: auto;
}
.customThTd {
	text-align: left;
	padding-left: 15px;
}
</style>
