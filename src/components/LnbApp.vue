<template>
	<div class="lnbWrapper" v-if="!drawer">
		<lnb-bookmark></lnb-bookmark>
		<div>
			<sidebar-menu
				:menu="menu"
				showOneChild
				class="vsm_white-theme"
				@toggle-collapse="onToggleCollapse"
			>

			</sidebar-menu>
		</div>
	</div>
</template>

<script>
// https://github.com/yaminncco/vue-sidebar-menu
// https://yaminncco.github.io/vue-sidebar-menu/#/styling
import {SidebarMenu} from 'vue-sidebar-menu';
import LnbBookmark from '@/components/LnbBookmark';
import lnb from '../common/lnb';

export default {
	props: {
		// Sidebar menu (required)

		// Keep only one child opened at a time (first level only)
		showOneChild: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		menu: [],
	}),
	components: {
		LnbBookmark,
		SidebarMenu,
	},
	computed: {
    drawer() {
      return this.$store.state.drawer;
    },
	  roleVal() {
			return this.$store.state.role === 'A';
		},
		sct() {
			return this.$store.state.sct;
		},
    st() {
      return this.$store.state.st;
    },
	},
	methods: {
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
		this.menu = lnb(this.sct, this.st);
		await this.$store.dispatch('getBookmarkList');
		if (this.roleVal) {
			let data = {
				title: '공시지원금관리',
				icon: 'far fa-copyright',
				child: [
					{
						href: '/pnsupportmoney-mgmt',
						title: '공시지원금관리',
					},
					{
						href: '/pnsupportmoneydata-mgmt',
						title: '공시지원금데이터관리',
					},
				],
			};
			this.menu.push(data);
		}
	},
};
</script>

<style>
.lnbWrapper {
	z-index: 1;
	display: inline-block;
	flex-direction: column;
	height: 100vh;
	width: 250px;
	overflow-x: hidden;
	overflow-y: scroll;
	background: #fff;
}
.lnbWrapper::-webkit-scrollbar {
	display: none; /* Chrome, Safari, Opera*/
}
</style>
