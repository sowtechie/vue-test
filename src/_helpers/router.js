import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import CustomersPage from '../pages/CustomersPage'
import ProfilePage from '../pages/profile/ProfilePage'
import AdminPage from '../pages/AdminPage'

Vue.use(Router);

export const router = new Router({
  base: 'vue-admin-ui',
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/updateProfile', component: ProfilePage },
    { path: '/customersList', component: CustomersPage },
    { path: '/admin', component: AdminPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next({ 
      path: '/login', 
      query: { returnUrl: to.path } 
    });
  }

  next();
})