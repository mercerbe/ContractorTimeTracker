<script>
import { formatDate } from "@/views/timetracker/utils/timestamp-converter";
export default {
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  watch: {
    filter: {
      immediate: true,
      handler(val) {
        if (!val.value) this.init();
      }
    }
  },
  data() {
    return {
      modal: false,
      dates: []
    };
  },
  created() {},
  methods: {
    init() {
      let d1 = new Date(new Date().setHours(0, 0, 0, 0));
      let d2 = new Date(new Date().setHours(0, 0, 0, 0));

      let startDate = new Date(
        d1.setDate(d1.getDate() - this.filter.default[0])
      );
      let endDate = new Date(d2.setDate(d2.getDate() - this.filter.default[1]));
      this.filter.value = [startDate, endDate];
      this.filter.display = `${formatDate(
        startDate,
        "LL/dd/yyyy"
      )} - ${formatDate(endDate, "LL/dd/yyyy")}`;
      this.dates = [
        formatDate(startDate, "yyyy-LL-dd"),
        formatDate(endDate, "yyyy-LL-dd")
      ];
      this.$emit("filter_changed");
    },
    datePickerChanged(val) {
      if (val.length === 2) {
        console.log(val);
        let startDate = new Date(new Date(val[0]).setHours(0, 0, 0, 0));
        let endDate = new Date(new Date(val[1]).setHours(0, 0, 0, 0));
        this.filter.value = [startDate, endDate];
        this.filter.display = `${formatDate(
          startDate,
          "LL/dd/yyyy"
        )} - ${formatDate(endDate, "LL/dd/yyyy")}`;
      }
    }
  }
};
</script>

<template>
  <v-dialog
    v-if="filter.type === 'daterange'"
    ref="dialog"
    v-model="modal"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="filter.display"
        :label="filter.label"
        color="teal"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      range
      scrollable
      color="teal"
      reactive
      @change="datePickerChanged"
    >
      <v-spacer></v-spacer>
      <v-btn text color="teal" @click="$emit('filter_changed'), modal = !modal">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>