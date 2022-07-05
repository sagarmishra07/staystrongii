// import { RouteConfig } from 'vue-router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const routes = () =>
  // store
  {
    return [
      {
        path: '/login',
        component: () => import('pages/Auth/Login.vue'),
        beforeEnter: (to, from, next) => {
          onAuthStateChanged(auth, (user) => {
            if (!!user) {
              next('/');
            } else {
              next();
            }
          });
        },
      },
      {
        path: '/',
        beforeEnter: (to, from, next) => {
          onAuthStateChanged(auth, (user) => {
            if (!!user) {
              next();
            } else {
              next('/login');
            }
          });
        },

        component: () => import('src/layouts/DashboardLayout.vue'),

        children: [
          {
            path: '',
            component: () =>
              import('src/components/modules/dashboard/Counsellor.vue'),
          },
          {
            path: '/counsellor' || '',
            component: () =>
              import('src/components/modules/dashboard/Counsellor.vue'),
          },
          {
            path: '/client',
            component: () =>
              import('src/components/modules/dashboard/Client.vue'),
          },
        ],
      },
      {
        path: '*',
        component: () => import('pages/Error404.vue'),
      },
    ];
  };
export default routes;
