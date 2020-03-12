<script>
import {
  convertTimestamp,
  msToHMS
} from "@/views/timetracker/utils/timestamp-converter";
export default {
  props: {
    reportData: {
      type: Array,
      required: false,
      default: () => []
    },
    reportHeaders: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data() {
    return {};
  },
  methods: {
    convertTS(ts) {
      return convertTimestamp(ts);
    },
    convertMS(ts) {
      return msToHMS(ts);
    }
  }
};
</script>

<template>
  <v-container>
    <v-data-table :headers="reportHeaders" :items="reportData"></v-data-table>
  </v-container>
</template>