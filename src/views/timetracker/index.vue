<script>
import firebase from "firebase";
import layout from "@/layouts/main.vue";
import categories from "@/views/timetracker/components/categories-modal.vue";
import activity from "@/views/timetracker/components/activity-modal";
import stopwatch from "@/views/timetracker/components/timetracker-stopwatch";
import { convertTimestamp } from "@/views/timetracker/utils/timestamp-converter";
import { msToHMS } from "@/views/timetracker/utils/timestamp-converter";
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
        { text: "Category", value: "category", class: "" },
        { text: "Notes", value: "description", class: "" },
        { text: "Duration", value: "duration", class: "duration" },
        { text: "End", value: "endtime", class: "timestamp" },
        { text: "Id", value: "id", class: "hidden" },
        { text: "Start", value: "starttime", class: "timestamp" }
      ],
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
      console.log(start, end, diff);
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
    <div class="d-flex justify-space-between">
      <div class="flex-grow-1">
        <!-- stopwatch component -->
        <stopwatch @timer_stopped="addNewActivity" />
        <activity
          :selected-activity="selectedActivity"
          :categories="categories"
          @close="selectedActivity = null"
        />
        <p class="title">Activity Log:</p>
        <div class="px-2">
          <v-text-field
            v-model="search"
            style="max-width: 275px;"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-data-table :headers="headers" :items="activities" :search="search">
            <template v-slot:headers="props">
              <tr>
                <th v-for="(header, idx) in props.headers" :key="idx">
                  <template v-if="header.class !== 'hidden'">
                    {{ header }}
                  </template>
                </th>
              </tr>
            </template>
            <template v-slot:item="props">
              <tr style="cursor: pointer;" @click="openActivity(props.item)">
                <td v-for="(item, idx, i) in props.item" :key="idx">
                  <template v-if="headers[i].class === 'timestamp'">
                    {{ convertTS(item.seconds) }}
                  </template>
                  <template v-else-if="headers[i].class === 'duration'">
                    {{ convertMS(item) }}
                  </template>
                  <template v-else-if="headers[i].class !== 'hidden'">
                    {{ item }}
                  </template>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </div>
      <div>
        <categories
          :selected-category="selectedCategory"
          @close="selectedCategory = null"
        />
        <span class="title">Clients:</span>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(c, idx) in categories"
              :key="c.id"
              @click="openCategory(c)"
            >
              {{ c.name }}
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </layout>
</template>
