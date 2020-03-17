<script>
import layout from "@/layouts/main.vue";
// import navigation from "@/components/NavBar.vue";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  data() {
    return {};
  },
  components: {
    layout
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/", // This redirect can be achived by route using callback.
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<template>
  <layout>
    <div class="d-flex justify-center">
      <v-card width="500" class="items-center py-2 mt-10">
        <p class="text-center display-3 font-weight-light">
          Login
          <br />
          <img src="../../assets/login.svg" alt />
        </p>
        <section slot="default" id="firebaseui-auth-container"></section>
      </v-card>
    </div>
  </layout>
</template>

<style></style>
