import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';
import { router } from './router/index.js';
import vuetify from './plugins/vuetify.js';
import './plugins/fontAwesomeIcon.js';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
// @ts-ignore
import vueMoment from 'vue-moment';
import VueClipboard from 'vue-clipboard2';
// @ts-ignore
// https://github.com/noomerzx/vue-barcode-scanner/blob/master/index.js
import VueBarcodeScanner from './common/barcodeScanner';

Vue.use(vueMoment);
Vue.use(VueSidebarMenu);
Vue.use(VueClipboard);
Vue.use(VueBarcodeScanner);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	store,
	vuetify,
	router,
}).$mount('#app');
