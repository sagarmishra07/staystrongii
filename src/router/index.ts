import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    routes: routes(),
    scrollBehavior(to) {
      if (to.hash) {
        if (document.querySelector(to.hash)) {
          return {
            selector: to.hash,
            offset: { x: 0, y: 0 },
            behavior: 'smooth',
          };
        }
        return;
        false;
      } else {
        return {
          x: 0,
          y: 0,
        };
      }
    },
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });
  Router.beforeEach(async (to, from, next) => {
    next();
    // if (
    //   !store.getters['user/isAuthenticated'] &&
    //   to.meta.requiresAuth === true
    // ) {
    //     next({name:'login'});
    // }else if(
    //   store.getters['user/isAuthenticated'] &&
    //   to.name == 'login'
    // ){
    //   next('/');
    // }else{
    //   next();
    // }
  });
  return Router;
});
