<script>
import layout from "@/layouts/main.vue";
import information from "@/views/profile/components/profile-info.vue";
import todos from "@/views/profile/components/todos.vue";
import sparklines from "@/views/profile/components/profile-sparklines.vue";
import snapshot from "@/views/profile/components/profile-snapshot.vue";
import firebase from "firebase";

let d = new Date();
let start = d.getDate() - d.getDay();
let end = start + 6;
const weekStart = new Date(d.setDate(start));
const weekEnd = new Date(d.setDate(end));
console.log(weekStart, weekEnd);

export default {
  data() {
    return {
      user: null,
      snapshots: [
        {
          collection: "activities",
          query: ["starttime", ">=", weekStart],
          query2: ["starttime", "<=", weekEnd],
          subtitle: "Logged this week",
          class: "sum"
        },
        {
          collection: "todos",
          query: ["completed", "==", false],
          subtitle: "Incomplete Tasks"
        },
        { collection: "categories", query: null, subtitle: "Clients" },
        { collection: "activities", query: null, subtitle: "Activities logged" }
      ]
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
    <div v-if="user" class="d-flex justify-center pt-5">
      <div class="text-center">
        <img
          :src="user.photoURL"
          style="width:225px;height:225px;border-radius:50%;border:2px solid #333"
        />

        <p class="headline">Welcome back, {{ user.displayName }}!</p>
      </div>
    </div>

    <!-- snapshot data -->
    <div class="d-flex flex-row justify-space-between py-2">
      <snapshot
        v-for="(i, idx) in snapshots"
        :ref="`snapshot${i.collection}`"
        :key="idx"
        :collection="i.collection"
        :query="i.query"
        :query-compound="i.query2"
        :subtitle="i.subtitle"
        class="flex-grow-1 mx-1"
      />
    </div>

    <!-- sparkline charts -->
    <sparklines :user="user" />

    <!-- profile data and todo list -->
    <div class="d-flex flex-row justify-space-between py-5">
      <information class="flex-shrink-1 mx-1" v-if="user" :user="user" />
      <todos class="flex-grow-1 mx-1" @status_updated="$refs.snapshottodos[0].runQuery()" />
    </div>
  </layout>
</template>
