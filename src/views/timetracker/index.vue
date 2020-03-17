<script>
import firebase from "firebase";
import layout from "@/layouts/main.vue";
import categories from "@/views/timetracker/components/categories-modal.vue";
import activity from "@/views/timetracker/components/activity-modal";
import stopwatch from "@/views/timetracker/components/timetracker-stopwatch";
import {
  convertTimestamp,
  msToHMS
} from "@/views/timetracker/utils/timestamp-converter";
import { ProcessData } from "@/utils/data-process";
export default {
  components: { layout, categories, activity, stopwatch },
  data() {
    return {
      loading: false,
      activities: [],
      categories: [],
      selectedCategory: null,
      activityCategory: null,
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
        { text: "Actions", value: "action", sortable: false },
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
        category: this.activityCategory,
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

    <!-- activity modal -->
    <activity
      :selected-activity="selectedActivity"
      :categories="categories"
      @close="selectedActivity = null"
    />

    <v-container>
      <!-- stopwatch component -->
      <v-card class="elevation-1">
        <v-card-subtitle>Start New Activity</v-card-subtitle>
        <v-autocomplete
          v-model="activityCategory"
          :items="categories"
          label="Client"
          item-text="name"
          item-value="name"
          placeholder="Select a client..."
          color="teal"
          clearable
          class="px-5"
        >
          <template v-slot:no-data>
            <div class="text-center">
              <v-btn color="teal" dark @click="$refs.CategoryModal.openDialog()">Add Client</v-btn>
            </div>
          </template>
        </v-autocomplete>
        <stopwatch v-if="activityCategory" @timer_stopped="addNewActivity" />
      </v-card>
      <v-row>
        <!-- table -->
        <v-col cols="12" md="9" sm="12">
          <v-data-table
            :headers="headers.slice(0,-1)"
            :items="tableData"
            :search="search"
            sort-by="starttime"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Activity Log</v-toolbar-title>
              </v-toolbar>
              <v-col cols="12" mb="5" sm="12">
                <v-text-field
                  v-model="search"
                  style="max-width: 275px;"
                  append-icon="mdi-magnify"
                  label="Search"
                  color="teal"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="openActivity(item)">mdi-pencil</v-icon>
            </template>
          </v-data-table>
        </v-col>

        <!-- clients/categories -->
        <v-col cols="12" md="3" sm="12">
          <v-card outlined class="px-3 py-3 elevation-1">
            <p class="title pt-1">Clients:</p>
            <!-- categories/clients modal -->
            <categories
              :selected-category="selectedCategory"
              ref="CategoryModal"
              @close="selectedCategory = null"
            />
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
