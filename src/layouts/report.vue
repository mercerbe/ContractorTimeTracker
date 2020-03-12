

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
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div style="height: 100vh;">
    <v-row style="height: 100%;">
      <v-col :cols="9" style="height: 100%;">
        <ReportTable :report-data="reportData" :report-headers="reportHeaders" />
      </v-col>
      <v-col
        :cols="3"
        style="border-left: 1px solid #c0c0b6;height: 100%;background-color: #fefefe;"
      >
        <ReportFilters
          :report-filters="reportFilters"
          :report-headers="reportHeaders"
          :report-data="reportData"
          :report-meta="reportMeta"
          :export-fields="exportFields"
          @filter_changed="updateDateFilter"
          @search="runQuery"
          @export="exportQuery"
        />
      </v-col>
    </v-row>
  </div>
</template>
