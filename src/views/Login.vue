<template>
  <section class="loginSection">
    <h1 v-if="!isValidUser && user !== null">
      Hey, <b>{{ user.email }}</b>!
      <br/>Please use a Mulesoft account to log in.
    </h1>
    <div id="firebaseui-auth-container"></div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import firebase from "firebase/app";

const uiConfig = {
  signInSuccessUrl: "/vote",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};
export default {
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["isValidUser", "getFBUiApp"])
  },
  mounted() {
    this.getFBUiApp.start("#firebaseui-auth-container", uiConfig);
  },
  destroyed() {
    this.fbUiApp.reset();
  }
};
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
<style>
.loginSection {
  display: inline-block;
  margin: 50px 0;
  min-height: 50px;
}
</style>

