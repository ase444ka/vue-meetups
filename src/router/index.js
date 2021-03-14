import Vue from 'vue';
import VueRouter from 'vue-router';
import MeetupsPage from '../views/MeetupsPage';
import LoginPage from '../views/LoginPage';
import FormPage from '../views/FormPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: MeetupsPage,
    },

    {
      path: '/meetups',
      name: 'meetups',
      component: MeetupsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage,
    },
  ],
});
