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
  background: rgb(242, 245, 241);
  background: linear-gradient(
    180deg,
    rgba(242, 245, 241, 1) 0%,
    rgba(229, 229, 232, 1) 65%,
    rgba(209, 209, 209, 1) 100%
  );
}
</style>
