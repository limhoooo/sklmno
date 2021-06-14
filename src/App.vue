<template>
	<v-app id="app">
		<template v-if="loginToken">
			<header-app></header-app>
			<lnb-app class="defaultboxShadow"></lnb-app>
			<v-main
				style="background-color: #f5f5f5; overflow: scroll"
				class="drawerOn"
				:class="{ drawerOff: drawerToggle }"
			>
				<v-container fluid>
					<router-view></router-view>
				</v-container>
			</v-main>
			<footer-app></footer-app>
			<progress-loading-bar :loading="loadingStatus"></progress-loading-bar>
		</template>
		<template v-else>
			<router-view></router-view>
		</template>
	</v-app>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';
import LnbApp from './components/LnbApp.vue';
import FooterApp from './components/FooterApp.vue';
import bus from './common/bus.js';
import ProgressLoadingBar from './components/progressLoadingBar.vue';

export default {
	components: {
		HeaderApp,
		LnbApp,
		FooterApp,
		ProgressLoadingBar,
	},
	data() {
		return {
			loadingStatus: false,
		};
	},
	computed: {
		drawerToggle() {
			return this.$store.state.drawer;
		},
		loginToken() {
			let result;
			if (this.$store.state.name) {
				result = true;
			} else {
				result = false;
			}
			return result;
		},
	},
	methods: {
		startSpinner() {
			this.loadingStatus = true;
		},
		endSpinner() {
			this.loadingStatus = false;
		},
	},
	created() {
		bus.$on('start:spinner', this.startSpinner);
		bus.$on('end:spinner', this.endSpinner);
	},
	beforeDestroy() {
		bus.$off('start:spinner', this.startSpinner);
		bus.$off('end:spinner', this.endSpinner);
	},
};
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/style.css';
@import './assets/css/common.css';
</style>
