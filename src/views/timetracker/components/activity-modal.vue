<script>
import firebase from "firebase";
import { convertTimestamp } from "@/views/timetracker/utils/timestamp-converter";
import { msToHMS } from "@/views/timetracker/utils/timestamp-converter";
export default {
  props: {
    selectedActivity: {
      type: Object,
      required: false,
      default: null
    },
    categories: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  watch: {
    selectedActivity(val) {
      if (val) {
        this.activity = val;
        this.dialog = true;
        if (val.category) {
          this.updating = true;
        }
      }
    }
  },
  data() {
    return {
      dialog: false,
      updating: false,
      activity: {
        category: "",
        description: "",
        starttime: "",
        endtime: "",
        duration: ""
      }
    };
  },

  methods: {
    addActivity() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("activities")
        .add({
          ...this.activity
        });
      this.$emit("close");
      this.dialog = false;
    },
    updateActivity() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("activities")
        .doc(this.activity.id)
        .update({
          ...this.activity
        });

      this.$emit("close");
      this.dialog = false;
    },
    close() {
      this.$emit("close");
      this.dialog = false;
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
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <div class="flex flex-row">Activity</div>
        <v-btn text @click="close">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="activity.category"
          :items="categories"
          color="teal"
          item-text="name"
          item-value="name"
          label="Client"
        />
        <v-text-field label="Activity Description" v-model="activity.description" color="teal" />
        <v-text-field :value="activity.starttime" label="Start" :disabled="true" color="teal" />
        <v-text-field :disabled="true" v-model="activity.endtime" label="End" color="teal" />
        <v-text-field
          label="Duration"
          :disabled="true"
          :value="convertMS(activity.duration)"
          color="teal"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="activity.id" color text @click="updateActivity">Update</v-btn>
        <v-btn v-else color text @click="addActivity">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
