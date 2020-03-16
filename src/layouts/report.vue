

<script>
import ReportTable from "@/views/reports/components/Table";
import ReportFilters from "@/views/reports/components/Filters";
import ReportMixin from "@/mixins/report";
export default {
  name: "ReportLayout",
  components: { ReportTable, ReportFilters },
  mixins: [ReportMixin],
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    filePath: {
      type: String,
      required: true
    },
    json: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "small";
        case "sm":
          return "small";
        case "md":
          return "large";
        case "lg":
          return "large";
        case "xl":
          return "large";
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div style="height: 100%;">
    <v-row v-if="width === 'large'" style="height: 100%;">
      <v-col cols="12" md="9" sm="12" style="height: 100%;">
        <ReportTable :report-data="reportData" :report-headers="reportHeaders" />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="12"
        style="border-left: 1px solid #c0c0b6;height: 100vh;background-color: #fefefe;"
      >
        <ReportFilters
          :report-filters="reportFilters"
          :report-headers="reportHeaders"
          :report-data="reportData"
          :report-meta="reportMeta"
          :export-fields="exportFields"
          @filter_changed="runQuery"
          @search="runQuery"
          @export="exportQuery"
        />
      </v-col>
    </v-row>
    <v-row v-else style="height: 100%;">
      <v-col cols="12" md="3" sm="12" style="background-color: #fefefe;">
        <ReportFilters
          :report-filters="reportFilters"
          :report-headers="reportHeaders"
          :report-data="reportData"
          :report-meta="reportMeta"
          :export-fields="exportFields"
          @filter_changed="runQuery"
          @search="runQuery"
          @export="exportQuery"
        />
      </v-col>
      <v-col cols="12" md="9" sm="12" style="height: 100%;">
        <ReportTable :report-data="reportData" :report-headers="reportHeaders" />
      </v-col>
    </v-row>
  </div>
</template>
