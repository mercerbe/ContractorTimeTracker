<script>
import firebase from "firebase";
import navigation from "@/components/NavBar.vue";
import sidebar from "@/components/NavDrawer.vue";
export default {
  components: { navigation, sidebar },
  data() {
    return {
      drawer: true,
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>

<template>
  <v-app>
    <!-- sidebar -->
    <sidebar v-if="user" :user="user" :drawer="drawer"></sidebar>
    <!-- app bar -->
    <navigation @toggle_drawer="drawer = !drawer" />

    <!-- Sizes your content based upon application components -->
    <v-content class="content">
      <!-- Provides the application the proper gutter -->
      <!-- <v-container fluid> -->
      <slot />
      <!-- </v-container> -->
    </v-content>

    <v-footer app class="d-flex justify-center">
      <small>© Contractor TimeTracker 2020</small>
    </v-footer>
  </v-app>
</template>

<style>
.content {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(243, 243, 246, 1) 44%,
    rgba(205, 205, 205, 1) 100%
  );
}
</style>
