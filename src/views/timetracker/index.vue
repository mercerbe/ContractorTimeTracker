<script>
import firebase from "firebase";
import layout from "@/layouts/main.vue";
import categories from "@/views/timetracker/components/categories-modal.vue";
import activity from "@/views/timetracker/components/activity-modal";
import stopwatch from "@/views/timetracker/components/timetracker-stopwatch";
import { convertTimestamp } from "@/views/timetracker/utils/timestamp-converter";
import { msToHMS } from "@/views/timetracker/utils/timestamp-converter";
import { ProcessData } from "@/utils/data-process";
export default {
  components: { layout, categories, activity, stopwatch },
  data() {
    return {
      loading: false,
      activities: [],
      categories: [],
      selectedCategory: null,
      // log activity
      activity: {
        category: "",
        description: "",
        starttime: "",
        endtime: "",
        duration: ""
      },
      selectedActivity: null,
      headers: [
        { text: "Start", value: "starttime", class: "timestamp" },
        { text: "End", value: "endtime", class: "timestamp" },
        { text: "Duration", value: "duration", class: "duration" },
        { text: "Client", value: "category", class: "" },
        { text: "Notes", value: "description", class: "" },
        { text: "", value: "id", class: "hidden" }
      ],
      tableData: [],
      search: null,
      // timer
      started: false,
      starttime: "",
      endtime: "",
      duration: ""
    };
  },
  created() {
    this.getActivities();
    this.getCategories();
  },
  methods: {
    // ---- CRUD ---- //
    // gets
    async getActivities() {
      var activitiesRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("activities");
      activitiesRef.onSnapshot(snap => {
        this.activities = [];
        snap.forEach(doc => {
          var activity = doc.data();
          activity.id = doc.id;
          this.activities.push(activity);
        });
        this.tableData = ProcessData(this.activities, this.headers);
      });
    },
    async getCategories() {
      var categoriesRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("categories");
      categoriesRef.onSnapshot(snap => {
        this.categories = [];
        snap.forEach(doc => {
          var category = doc.data();
          category.id = doc.id;
          this.categories.push(category);
        });
      });
    },
    // add based on stopwatch
    addNewActivity(start, end, diff) {
      this.selectedActivity = {
        starttime: start,
        endtime: end,
        duration: diff
      };
    },

    // deletes
    deleteActivity(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("activities")
        .doc(docId)
        .delete();
    },
    // ---- End Crud ---- //
    openActivity(activity) {
      this.selectedActivity = activity;
    },
    openCategory(category) {
      this.selectedCategory = category;
    },
    convertTS(ts) {
      return convertTimestamp(ts);
    },
    convertMS(secs) {
      return msToHMS(secs);
    }
  }
};
</script>

<template>
  <layout>
    <!-- page header -->
    <v-col class="text-center">
      <img src="../../assets/time.svg" alt />
      <p class="display-1">Time Tracker</p>
    </v-col>

    <!-- stopwatch component -->
    <stopwatch @timer_stopped="addNewActivity" />

    <!-- activity modal -->
    <activity
      :selected-activity="selectedActivity"
      :categories="categories"
      @close="selectedActivity = null"
    />

    <v-container>
      <v-row>
        <!-- table -->
        <v-col :md="9" :sm="12">
          <v-card>
            <v-card-title class="title">Activity Log:</v-card-title>
            <v-card-subtitle>
              <v-text-field
                v-model="search"
                style="max-width: 275px;"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-subtitle>

            <v-data-table :headers="headers.slice(0,-1)" :items="tableData" :search="search">
              <template v-slot:item="props">
                <tr style="cursor: pointer;" @click="openActivity(props.item)">
                  <td v-for="(item, idx, i) in props.item" :key="idx">
                    <template v-if="headers[i]">
                      <template
                        v-if="headers[i].class === 'timestamp'"
                      >{{ convertTS(item.seconds) }}</template>
                      <template v-else-if="headers[i].class === 'duration'">{{ convertMS(item) }}</template>
                      <template v-else-if="headers[i].class !== 'hidden'">{{ item }}</template>
                    </template>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

        <!-- clients/categories -->
        <v-col :md="3" :sm="12">
          <v-card outlined class="px-3 py-3">
            <p class="title pt-1">Clients:</p>
            <!-- categories/clients modal -->
            <categories :selected-category="selectedCategory" @close="selectedCategory = null" />
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="c in categories"
                  :key="c.id"
                  @click="openCategory(c)"
                >{{ c.name }}</v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </layout>
</template>
