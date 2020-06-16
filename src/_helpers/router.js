import Vue from 'vue';
import Router from 'vue-router';
import FormRule from '../pages/FormRule';
import HomePage from '../home/HomePage';
import AdminPage from '../pages/AdminPage';
import HeadersStatus from '../pages/HeadersStatus';

import EditRule from '../pages/EditRule';
import UrlManager from '../pages/UrlManager';

import Search from '../components/search/Search';
import ElasticRule from '../components/elrule/ElasticRule';
import {BootstrapVueIcons} from 'bootstrap-vue';



Vue.use(Router);
Vue.use(BootstrapVueIcons)


export const router = new Router({
  base: 'vue-admin-ui',
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/admin', component: AdminPage },
    { path: '/samples', component:HeadersStatus },
    { path: '/formRule', component:FormRule },
    
    { path: '/editRule', component:EditRule },
    { path:'/svm', component:UrlManager},
    

    { path:'/search', component:Search},
    { path:'/svel', component:ElasticRule} ,
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next({ 
//       path: '/login', 
//       query: { returnUrl: to.path } 
//     });
//   }

//   next();
// })