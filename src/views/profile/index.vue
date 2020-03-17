<script>
import layout from "@/layouts/main.vue";
import information from "@/views/profile/components/profile-info.vue";
import todos from "@/views/profile/components/todos.vue";
import sparklines from "@/views/profile/components/profile-sparklines.vue";
import snapshot from "@/views/profile/components/profile-snapshot.vue";
import firebase from "firebase";

// dates to query
let d = new Date();
d.setHours(0, 0, 0, 0);
// week
let startWeek = d.getDate() - d.getDay();
let endWeek = startWeek + 6;
const weekStart = new Date(d.setDate(startWeek));
const weekEnd = new Date(d.setDate(endWeek));
// month
const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);

export default {
  data() {
    return {
      user: null,
      snapshots: [
        {
          collection: "activities",
          value: "duration",
          query: ["starttime", ">=", weekStart],
          query2: ["starttime", "<=", weekEnd],
          subtitle: "Logged this week"
        },
        {
          collection: "todos",
          query: ["completed", "==", false],
          subtitle: "Incomplete Tasks"
        },
        { collection: "categories", query: null, subtitle: "Clients" },
        { collection: "activities", query: null, subtitle: "Activities logged" }
      ],
      sparklines: [
        {
          collection: "activities",
          query: ["starttime", ">=", monthStart],
          query2: ["starttime", "<=", monthEnd],
          value: "duration",
          name: "Activity this month"
        },
        {
          collection: "expenses",
          value: "amount",
          query: ["created_at", ">=", monthStart],
          query2: ["created_at", "<=", monthEnd],
          name: "Expenses this month"
        }
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

        <p class="display-1">Welcome back, {{ user.displayName }}!</p>
      </div>
    </div>

    <v-container>
      <!-- snapshot data -->
      <v-row>
        <v-col v-for="(i,idx) in snapshots" :key="idx" cols="12" md="3" sm="12" xs="12">
          <snapshot
            :ref="`snapshot${i.collection}`"
            :key="idx"
            :collection="i.collection"
            :query="i.query"
            :query-compound="i.query2"
            :subtitle="i.subtitle"
          />
        </v-col>
      </v-row>

      <!-- sparkline charts -->
      <v-row>
        <v-col v-for="(sparkline, idx) in sparklines" :key="idx" cols="12" md="6" sm="12" xs="12">
          <sparklines
            :user="user"
            :name="sparkline.name"
            :collection="sparkline.collection"
            :query="sparkline.query"
            :query-compound="sparkline.query2"
            :query-value="sparkline.value"
          />
        </v-col>
      </v-row>
      <!-- profile data and todo list -->
      <v-row>
        <!-- <v-col :md="6" :sm="12">
          <information v-if="user" :user="user" />
        </v-col>-->
        <v-col :md="12" :sm="12">
          <todos @status_updated="$refs.snapshottodos[0].runQuery()" />
        </v-col>
      </v-row>
    </v-container>
  </layout>
</template>
