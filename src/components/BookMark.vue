<template>
	<div class="bookmark addMark" style="z-index: 1" @click="toggleBookmark()">
		<span>즐겨찾기</span>
		<span v-if="bookmarkData.index === -1">추가</span>
		<div
			:class="{
				starOn: bookmarkData.index >= 0,
				starOff: bookmarkData.index < 0,
			}"
			style="width: 18px; height: 18px; margin-left: 2px; right: 0"
		></div>
	</div>
</template>
<script>
export default {
	name: 'BookMark',
	props: {
		path: { type: String, required: true },
	},
	computed: {
		mq() {
			return this.$store.state.mq;
		},
		bookmarkData() {
			let data = this.$store.state.BookmarkModule.menu.find(
				menu => menu.href === this.path,
			);
			let index = this.$store.state.bookmarkList.findIndex(
				list => list.href === this.path,
			);
			return { data: data, index: index };
		},
	},
	methods: {
		toggleBookmark() {
			let data = this.bookmarkData.data;
			try {
				this.bookmarkData.index < 0
					? this.addBookmark(data)
					: this.removeBookmark(data);
			} catch (e) {
				alert(
					'로그인 정보에 오류가 있어 즐겨찾기 추가를 할 수 없습니다.\n다시 로그인해 주세요.',
				);
			}
		},
		addBookmark(data) {
			this.$store.dispatch('addBookmark', data);
		},
		removeBookmark() {
			this.$store.dispatch('removeBookmark', this.bookmarkData.index);
		},
	},
	created() {},
};
</script>

<style scoped>
.bookmark {
	display: flex;
	position: absolute;
	top: 18px;
	right: 16px;
	cursor: pointer;
}
.starOff:before,
.starOn:before {
	top: -2px;
}
.addMark {
	display: flex;
	font-size: 12px;
	font-weight: bold;
	color: rgb(126, 126, 126);
}
.addMark span {
	margin: 0 2px;
}
</style>
