<script>
import layout from "@/layouts/main.vue";
import information from "@/views/profile/components/profile-info.vue";
import todos from "@/views/profile/components/todos.vue";
import sparklines from "@/views/profile/components/profile-sparklines.vue";
import snapshot from "@/views/profile/components/profile-snapshot.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      user: null
    };
  },
  components: {
    layout,
    information,
    sparklines,
    snapshot,
    todos
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  }
};
</script>

<template>
  <layout>
    <!-- welcome section -->
    <div v-if="user" class="d-flex justify-center">
      <div>
        <img
          :src="user.photoURL"
          style="width:125px;height:125px;border-radius:50%;border:2px solid #333"
        />

        <p class="title">&nbsp; Welcome back, {{ user.displayName }}!</p>
      </div>
    </div>

    <!-- snapshot data -->
    <div class="d-flex flex-row justify-space-between py-2">
      <snapshot v-for="(i, idx) in 4" :key="idx" class="flex-grow-1 mx-1" />
    </div>

    <!-- sparkline charts -->
    <sparklines :user="user" />

    <!-- profile data and todo list -->
    <div class="d-flex flex-row  justify-space-between py-5">
      <information class="flex-shrink-1 mx-1" v-if="user" :user="user" />
      <todos class="flex-grow-1 mx-1" />
    </div>
  </layout>
</template>
