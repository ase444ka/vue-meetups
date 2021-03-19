import Vue from 'vue';
import VueRouter from 'vue-router';

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
      component: () => import('../views/LoginPage'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/LoginPage'),
    },
    {
      path: '/meetups/create',
      name: 'form',
      component: () => import('../views/FormPage'),
    },
    {
      path: '/meetups/:meetupId',
      name: 'meetup',
      props: true,
      component: () => import('../views/MeetupPage'),
      meta: {
        showReturnToMeetups: true,
      },
      beforeEnter(to, from, next) {
        if (typeof to.params.meetupId === 'number') next();
        else next(false);
      },
    },
  ],
});
