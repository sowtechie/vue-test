import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'

import { router } from './_helpers';
import App from './app/App';
import {BootstrapVueIcons} from 'bootstrap-vue';



// setup fake backend
import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});