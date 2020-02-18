<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    signoutButtonPressed(e) {
      e.stopPropagation();
      firebase.auth().signOut();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<template>
  <div>
    <v-app-bar absolute dense color="teal" elevate-on-scroll app>
      <v-app-bar-nav-icon
        v-if="user"
        dark
        @click="$emit('toggle_drawer')"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        style="cursor: pointer; color: #fefefe;"
        @click="$router.push('/')"
      >
        Contractor TimeTracker
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn dark text v-show="!user && $route.name !== 'login'" to="/login">
        Login
      </v-btn>
      <v-btn text v-show="user" dark @click="signoutButtonPressed">
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>
