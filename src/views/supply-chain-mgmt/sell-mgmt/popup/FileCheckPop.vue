<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="650"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>파일확인</p>
							</div>
							<div class="rowHeader mt20">
								<p>파일목록</p>
							</div>
							<div class="rowCont">
								<div class="rowItem" style="width: 100%">
									<div class="tableCont">
										<table>
											<thead>
												<tr>
													<th
														class="customThTd"
														style="background-color: #eee; color: #333"
													>
														파일명
													</th>
												</tr>
											</thead>
											<tbody>
												<tr v-if="fileData.length === 0">
													<td class="customThTd">파일이 없습니다.</td>
												</tr>
												<tr v-else>
													<td class="customThTd">
														<div v-for="item in fileData">
															{{ item.name }}
															<a @click="deleteFile(item.name)">x</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
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
	data: () => ({
		dialog: true,
		fileData: [],
	}),
	methods: {
		handleFileChange(e) {
			this.fileData = e.target.files || [];
		},
		deleteFile(name) {
			// file 은 읽기만 가능해서 splice 를 사용할 수 없다.
			let fileCopy = [];
			// 깊은 복사 활용
			this.fileData.forEach(i => {
				if (i.name !== name) fileCopy.push(i);
			});
			// 값 바꾸기
			this.fileData = fileCopy;
		},
		async submit() {},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog, 'fileCheckDialog');
				}
			},
		},
	},
};
</script>

<style scoped>
.uploadBtn {
	background-color: #003a53;
	color: #fff;
	padding: 10px 15px;
	border-radius: 5px;
	font-size: 12px;
	cursor: pointer;
}
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
