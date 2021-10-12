<template>
	<div class="commonInput wm680">
		<!--		<div class="display_in leftBox" :style="`width: ${titleWidth}px`">
			<span> 첨부파일 </span>
			<span v-if="necessary" class="font-red"> *</span>
		</div>-->
		<div>
			<input
				id="fileInput"
				type="file"
				multiple
				style="display: none"
				:disabled="disableYN"
				@change="handleFileChange"
			/>
			<label
				class="uploadBtn disIN"
				style="width: 80px; height: 30px; line-height: 30px"
				for="fileInput"
				>파일 추가</label
			>
		</div>
		<div
			v-if="propsFileList.length !== 0 || fileData.length !== 0"
			class="fileListBox mt-1"
		>
			<div v-for="item in propsFileList" :key="item.id" class="alignBox">
				<div class="left cur_p">
					<span>
						{{ item.regiDatetime | moment('YYYY-MM-DD HH:mm:ss') }}
					</span>
				</div>
				<div class="right">
					<span
						class="ellipsisH display_in w130"
						style="padding-top: 0; text-align: right"
					>
						{{ item.attachName }}.{{ item.attachExt }}
					</span>
					<span
						class="display_in"
						style="vertical-align: super; padding-top: 0"
					>
						<span
							v-if="item.attachExt !== 'pdf' && !beforeAdmin"
							@click="filePreview(item)"
							style="margin: 0 5px"
						>
							<v-icon style="color: #7e7e7e; font-size: 12px; cursor: pointer"
								>fas fa-search</v-icon
							>
						</span>
						<v-icon
							style="
								color: #7e7e7e;
								background: none;
								margin: 0 5px;
								font-size: 12px;
								padding: 0;
							"
							@click="fileDownload(item)"
							>fas fa-download</v-icon
						>
						<v-icon
							v-if="modifyState"
							style="
								color: #7e7e7e;
								background: none;
								margin: 0 5px;
								font-size: 12px;
								padding: 0;
							"
							@click="deleteAttach(item)"
							>fas fa-trash</v-icon
						>
					</span>
				</div>
			</div>
			<div v-for="item in fileData" :key="item.id" class="alignBox">
				<div class="left">
					<span>
						{{ todayDate() | moment('YYYY-MM-DD HH:mm:ss') }}
					</span>
				</div>
				<div class="right">
					<span class="ellipsisH display_in w130" style="padding-top: 0">
						{{ item.name }}
					</span>
					<span
						class="display_in"
						style="vertical-align: super; padding-top: 0"
					>
						<v-icon
							style="
								color: #7e7e7e;
								background: none;
								margin: 0 5px;
								font-size: 12px;
								padding: 0;
							"
							@click="deleteFile(item.name, item.size)"
							>fas fa-trash</v-icon
						>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import {htmlParse} from '../common/common';

export default Vue.extend({
	props: {
		titleWidth: {
			type: Number,
			default: 120,
		},
		disableYN: {
			type: Boolean,
		},
		necessary: {
			type: Boolean,
		},
		applId: {
			type: Number,
		},
		parentFileData: {
			type: Array,
		},
		modifyState: {
			type: Boolean,
		},
	},
	data: () => ({
		dialog: true,
		fileData: [],
		propsFileList: [],
		url: '',
	}),
	computed: {
		beforeAdmin() {
			return this.applId <= 28177;
		},
	},
	methods: {
		filePreview(item) {
			let url = `${this.url}download/file/application/${this.applId}/${item.applAttachId}`;
			let OpenWindow = window.open(
				'',
				'_blank',
				'width = 700,height=800, menubars=no, scrollbars=auto',
			);
			let img = new Image();
			img.src = url;
			OpenWindow.document.write(
				"<style>body{margin:0px;}</style><img src='" +
					url +
					"' width= 100%'" +
					"'>",
			);
		},
		async fileDownload(item) {
			console.log(item);

			let url;
			if (this.beforeAdmin) {
				url = `https://sklmno.kr/salesAttachment/fileDownload/${item.applAttachId}`;
			} else {
				url =
					process.env['VUE_APP_SERVER_AUTH'] +
					`download/file/application/${this.applId}/${item.applAttachId}`;
			}
			window.open(url, '', '');
		},
		// 파일 추가 Fnc
		handleFileChange(e) {
			// 벨리데이션
			let fileType = ['jpeg', 'jpg', 'gif', 'pdf', 'png'];
			for (let i = 0; i < e.target.files.length; i++) {
				let data = e.target.files[i].type.split('/');
				let fileTypeChk = false;
				if (e.target.files[i].size > 10485760) {
					alert(`파일용량이 초과했습니다. \n(한파일당 최대 : 10MB)`);
					break;
				}
				for (let j = 0; j < fileType.length; j++) {
					if (fileType[j] === data[1]) {
						fileTypeChk = true;
						break;
					}
				}
				if (!fileTypeChk) {
					alert(
						`파일형식이 다릅니다. \n(JPEG / JPG / GIF / PDF / PNG 형식만 가능)`,
					);
					return;
				}
			}
			// 파일 추가
			for (let i = 0; i < e.target.files.length; i++) {
				this.fileData.push(e.target.files[i]);
			}
		},
		// 파일 삭제
		deleteFile(name, size) {
			// file 은 읽기만 가능해서 splice 를 사용할 수 없다.
			let fileCopy = [];
			this.fileData.forEach(i => {
				// 기존에 들어있는 fileData 안의 값과
				// 받아온 값이 다른 데이터만 새로운 배열에 넣는다
				if (i['name'] !== name && i['size'] !== size) fileCopy.push(i);
			});
			// 값 바꾸기
			this.fileData = fileCopy;
		},
		// 현재 날짜
		todayDate() {
			let today = new Date();
			return today.toISOString();
		},
		async getApplicationAttachList() {
			let data = { applId: this.applId };
			if (this.applId) {
				const result = await this.$store.dispatch(
					'ApplicationFormCreationModule/getApplicationAttachList',
					data,
				);
				if (result) {
					this.propsFileList = result;
				}
			}
		},
		async deleteAttach(item) {
			if (!confirm('삭제하시겠습니까?')) {
				return;
			}
			let fileHtml = []; // 파일 이력
			let fileName = `${item.attachName}.${item.attachExt}`;
			let fileObj = {
				title: '파일삭제',
				data: fileName,
			};
			fileHtml.push(fileObj);
			let fileHtmlString = htmlParse(fileHtml);
			let data = {
				applicationAttachDto: {
					applAttachId: item.applAttachId,
					applId: this.applId,
				},
				memoContents: fileHtmlString,
			};
			const result = await this.$store.dispatch(
				'ApplicationFormCreationModule/deleteApplicationAttachAndMemo',
				data,
			);
			if (result) {
				alert('삭제되었습니다.');
				await this.getApplicationAttachList();
				await this.getHistoryList();
			}
		},
		async getHistoryList() {
			let data = {
				applId: this.applId,
			};
			await this.$store.dispatch('TaskHistoryModule/getHistoryList', data);
		},
	},
	watch: {
		fileData: {
			handler: function () {
				this.$emit('fileValueFnc', this.fileData);
			},
		},
		modifyState: {
			handler: function (newVal) {
				if (newVal === false) {
					this.fileData = [];
					this.getApplicationAttachList();
				}
			},
		},
	},
	created() {
		this.url = process.env['VUE_APP_SERVER_AUTH'];
		this.getApplicationAttachList();
	},
});
</script>

<style scoped>
.fileLabelBox {
	border: 1px solid #ddd;
	width: 80%;
	height: 30px;
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
}
.fileListBox {
	background-color: #dedede;
	padding: 10px;
	overflow-y: scroll;
	max-height: 120px;
}
.uploadBtn {
	background-color: #0037a1;
	color: #fff;
	border-radius: 3px;
	text-align: center;
	font-size: 12px;
	cursor: pointer;
}

.ml5 {
	margin-left: 5px;
}
.tableCont table tbody tr {
	cursor: auto;
}
.display_in {
	display: inline-block;
}
.leftBox {
	vertical-align: top;
}
.alignBox {
	display: table;
	width: 100%;
	padding: 0 10px;
}
.alignBox .left {
	float: left;
}
.alignBox .right {
	float: right;
}
input:disabled + label {
	background-color: #bdbdbd !important;
	cursor: default;
}
</style>
