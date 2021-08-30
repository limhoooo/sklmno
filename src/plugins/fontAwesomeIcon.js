import Vue from 'vue';

import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import {
	faPlus,
	faCalendarAlt,
	faBell,
	faQuestionCircle,
	faCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

faLibrary.add(faPlus, faCalendarAlt, faBell, faQuestionCircle, faCog);
Vue.component('font-awesome-icon', FontAwesomeIcon);
