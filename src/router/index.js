import Vue from 'vue';
import VueRouter from 'vue-router';
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
      component: () => import('../views/MeetupsPage'),
    },

    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: LoginPage,
    },
    {
      path: '/meetups/create',
      name: 'form',
      component: FormPage,
    },
    {
      path: '/meetups/:meetupId',
      name: 'meetup',
      props: true,
      component: () => import('../views/MeetupPage'),
    },
  ],
});
