<template>
	<section
		class="bookmarkWrapper"
		:class="{ open: collapsed, closed: !collapsed }"
	>
		<div class="bookmarkCont">
			<div class="bookmarkTitle" @click="tglBookmark">
				<h2>즐겨찾기</h2>
				<!--			<button v-if="!editMode" class="editCont" @click="editBookmark"></button>-->
				<!--		 v-if="collapsed"  	<button v-if="editMode" class="editCont" @click="saveBookmark"></button>-->
			</div>
			<transition name="list">
				<div class="bookmarkList">
					<a
						v-for="(item, index) in bookmarkList"
						:href="item.href"
						class="bookmarkItem"
						:key="index"
					>
						<h3>
							{{ item.title }}
						</h3>
						<button
							v-on:click.prevent="removeBookmark(index)"
							class="starOn deleteStar"
						></button>
					</a>
				</div>
			</transition>
		</div>
	</section>
</template>

<script>
import { jsonToQueryString } from '../common/common';

export default {
	name: 'LnbBookmark',
	data: () => ({
		collapsed: true,
		editMode: false,
	}),
	computed: {
		bookmarkList: {
			get() {
				return this.$store.state.bookmarkList;
			},
			set(newValue) {
				this.$store.state.bookmarkList = newValue;
			},
		},
	},
	methods: {
		tglBookmark() {
			this.collapsed = !this.collapsed;
		},
		editBookmark() {
			if (confirm('편집하시겠습니까?')) {
				this.editMode = !this.editMode;
			}
		},
		saveBookmark() {
			if (confirm('저장하시겠습니까?')) {
				this.$store.dispatch('saveBookmarkList');
				this.editMode = !this.editMode;
			}
		},
		removeBookmark(index) {
			this.$store.dispatch('removeBookmark', index);
		},
		onToggleCollapse(collapsed) {
			this.$store.state.drawer = collapsed;
		},
	},
	async created() {
		await this.$store.dispatch('getBookmarkList');
	},
};
</script>

<style scoped>
/*.editCont {
	position: absolute;
	margin: 5px 0;
	right: 0;
	width: 80px;
	height: 20px;
	background: lightgray;
}*/
.closed {
	/*animation: fade-out 0.3s ease-out;*/
	max-height: 43px;
	transition: all 0.3s ease-in-out;
}
.open {
	/*animation: fade-in 0.3s ease-in-out;*/
	max-height: 100%;
	transition: all 0.3s ease-in-out;
	transition-delay: 0.1s;
}
.open .bookmarkTitle {
	background-color: rgba(242, 242, 242, 0.5);
	border-bottom: 1px solid #eeeeee;
}
.bookmarkWrapper {
	display: inline-block !important;
	padding-bottom: 4px;
	width: 250px;
	z-index: 10;
	position: relative;
	top: 58px;
	left: 0;
	border-bottom: 1px solid #eeeeee;
	overflow: hidden;
}
.bookmarkCont {
	position: relative;
}

.bookmarkTitle {
	z-index: 10;
	position: relative;
	height: 43px;
	width: 250px;
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.3s ease;
	border-bottom: 1px solid #eeeeee;
}
.bookmarkTitle:hover {
	background-color: rgba(242, 242, 242, 0.5);
}
.bookmarkTitle h2 {
	color: #262626;
}
.bookmarkTitle h2 {
	/*margin-left: 38px;*/
	margin-left: 32px;
	font-size: 13px;
}
/*.bookmarkTitle h2:before {
	z-index: 10;
	content: url('../../src/assets/img/star_menu.png');
	position: absolute;
	top: 12px;
	left: 16px;
	width: 28px;
	height: 28px;
}*/
.bookmarkList {
	position: relative;
	padding: 2px 0;
	z-index: 13;
	display: flex;
	flex-direction: column;
}
.bookmarkItem {
	z-index: 10;
	margin: 2px 0;
	display: flex;
	width: 250px;
	position: relative;
	height: 44px;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.3s ease;
}
.bookmarkItem:hover {
	background-color: rgba(242, 242, 242, 0.5);
}
.bookmarkItem h3 {
	color: #262626;
	/*margin-left: 64px;*/
	/*margin-left: 48px;*/
	margin-left: 50px;
	font-size: 13px;
}
.deleteStar:before {
	top: 8px !important;
	right: 10px;
	padding: 4px 4px;
}
.list-leave-active {
	transition: 0.3s;
}
</style>
