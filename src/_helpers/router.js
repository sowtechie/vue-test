import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage';
import AdminPage from '../pages/AdminPage';
import HeadersStatus from '../pages/HeadersStatus';


Vue.use(Router);

export const router = new Router({
  base: 'vue-admin-ui',
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/admin', component: AdminPage },
    { path: '/headersStatus', component:HeadersStatus },
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