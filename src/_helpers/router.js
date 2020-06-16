import Vue from 'vue';
import Router from 'vue-router';
import AdminPage from '../pages/AdminPage';
import HomePage from '../pages/HomePage';
import HeadersStatus from '../pages/HeadersStatus';
import SamplePage from '../pages/SamplePage';


Vue.use(Router);

export const router = new Router({
  base: 'vue-admin-ui',
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/admin', component: AdminPage },
    { path: '/samples', component:HeadersStatus },
    // { path: '/selectedHeaders', component:SelectedHeaders },
   {path: '/sample', component:SamplePage},
    // // otherwise redirect to home
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