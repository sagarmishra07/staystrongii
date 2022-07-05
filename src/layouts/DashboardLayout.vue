<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu">
        </q-btn>

        <q-toolbar-title> Stand Strong </q-toolbar-title>
        <q-btn flat round dense icon="apps" class="q-mr-xs" />
        <q-btn flat round dense icon="assignment_ind" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="200"
      :breakpoint="700"
      elevated
      content-class="bg-white text-dark"
      class="full-height text-blue-grey-10 print-hide"
    >
      <q-scroll-area class="fit">
        <div class="text-h6 items-center q-gutter-y-sm">
          <div class="text-subtitle2 items-center">
            <div v-for="(nav, key) in navItem" :key="key">
              <span class="cursor-pointer" @click="routeChange(nav.routeName)">
                <q-item
                  active
                  clickable
                  v-ripple
                  :class="$route.path == nav.routeName ? 'active' : 'text-dark'"
                >
                  <q-item-section> {{ nav.label }}</q-item-section>
                </q-item>
              </span>
            </div>
            <div class="q-pl-md q-pt-sm cursor-pointer" @click="LOGOUT()">
              Logout
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page padding> <router-view /> </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

export default {
  name: 'DashboardLayout',
  data() {
    return {
      //routes for sidebars
      navItem: [
        {
          routeName: '/counsellor',
          label: 'counsellor',
        },
        {
          routeName: '/client',
          label: 'client',
        },
      ],
      drawerLeft: false,
    };
  },

  computed: {
    getCurrentRoutes() {
      return this.$route.path;
    },
  },
  methods: {
    routeChange(routeName) {
      if (routeName === this.getCurrentRoutes) return;
      this.$router.push(routeName);
    },
    LOGOUT() {
      signOut(auth).then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style scoped>
.active {
  color: black;
  background: #d9dbe9;
}
</style>
