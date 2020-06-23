import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'

import { router } from './_helpers';
import App from './app/App';
import {BootstrapVueIcons} from 'bootstrap-vue';
//import axios from 'axios';
import VueAxios from './plugins/vue-axios';
import VueMoment from 'vue-moment';


// setup fake backend
import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios);
Vue.use(VueMoment)

//Vue.use(axios);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});