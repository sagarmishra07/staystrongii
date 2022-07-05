<template>
  <main class="fixed-center">
    <q-card>
      <q-card-section class="row items-center justify-center text-h5">
        Log In</q-card-section
      >

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="Login()">
          <q-input label="Email" v-model="login.email" filled />
          <q-input
            label="Password"
            type="password"
            v-model="login.password"
            filled
          />

          <div>
            <q-btn
              class="full-width"
              color="primary"
              label="Login"
              type="submit"
            ></q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script>
import { auth } from '../../firebase/firebase';
import { errorNotify, successNotify } from 'src/utils/notify';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async Login() {
      try {
        await signInWithEmailAndPassword(
          auth,
          this.login.email,
          this.login.password
        );
        successNotify('Logged In');
        this.$router.push('/');
      } catch (error) {
        errorNotify('Worng Credentials ');
      }
    },
  },
};
</script>

<style scoped></style>
