import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  let position = {};

  if (
    to.matched.some((route) => route.meta && route.meta.saveScrollPosition) &&
    from.matched.some((route) => route.meta && route.meta.saveScrollPosition)
  ) {
    position = false;
  } else if (to.hash) {
    position.selector = to.hash;
  } else if (savedPosition) {
    position = savedPosition;
  } else {
    position = { x: 0, y: 0 };
  }
  return position;
}

export const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/MeetupsPage'),
    },

    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('@/views/MeetupsPage'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/LoginPage'),
    },
    {
      path: '/meetups/create',
      name: 'form',
      component: () => import('@/views/FormPage'),
    },
    {
      path: '/meetups/:meetupId/edit',
      name: 'editMeetup',
      props: true,
      component: () => import('@/views/FormPage')
    },
    {
      path: '/meetups/:meetupId',
      name: 'meetup',
      props: true,
      component: () => import('@/views/MeetupPage'),
      meta: {
        showReturnToMeetups: true,
      },
      beforeEnter(to, from, next) {
        if (typeof to.params.meetupId === 'number') next();
        else next(false);
      },
      children: [
        {
          path: '/meetups/:meetupId/description',
          name: 'description',
          component: () => import('@/components/MeetupDescription'),
        },
        {
          path: '/meetups/:meetupId/agenda',
          name: 'agenda',
          component: () => import('@/components/MeetupAgenda'),
        },
      ],
    },
  ],
});
