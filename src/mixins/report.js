import firebase from "firebase";
import {
  formatDate,
  convertTimestamp
} from "@/views/timetracker/utils/timestamp-converter";
import { ProcessData } from "@/utils/data-process";

export default {
  data() {
    return {
      loading: false,
      reportJson: null,
      reportLoading: false,
      reportData: [],
      reportHeaders: [],
      reportFilters: [],
      reportMeta: {},
      exportFields: {}
    };
  },
  methods: {
    init() {
      this.loading = true;
      this.reportJson = require(`@/views/reports/config/${this.json}.json`);
      this.reportMeta = this.reportJson.report_meta;
      this.reportHeaders = this.reportJson.report_headers.headers;
      this.reportFilters = this.reportJson.report_filters.filters;
      this.exportFields = this.reportJson.export_fields;
      this.loadFilters();
    },
    async loadFilters() {
      this.reportFilters.map(filter => {
        switch (filter.type) {
          case "select":
            let ref = firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection(filter.data);
            ref.onSnapshot(snap => {
              snap.forEach(d => {
                let option = d.data();
                option.id = d.id;
                filter.options.push({
                  text: option[filter.item_text],
                  value: option[filter.item_value]
                });
              });
            });
            break;
          case "daterange":
            let d1 = new Date(new Date().setHours(0, 0, 0, 0));
            let d2 = new Date(new Date().setHours(0, 0, 0, 0));

            let startDate = new Date(
              d1.setDate(d1.getDate() - filter.value[0])
            );
            let endDate = new Date(d2.setDate(d2.getDate() - filter.value[1]));
            filter.value = [startDate, endDate];
            filter.display = `${formatDate(
              startDate,
              "LL/dd/yyyy"
            )} - ${formatDate(endDate, "LL/dd/yyyy")}`;
            filter.vuetify = [
              formatDate(startDate, "yyyy-LL-dd"),
              formatDate(endDate, "yyyy-LL-dd")
            ];
          default:
            break;
        }
      });
      this.loading = false;
      if (this.reportMeta.auto_start) this.runQuery();
    },
    updateDateFilter(filter) {
      // update filter value and
    },
    async runQuery() {
      this.reportLoading = true;
      //   build query
      let data = [];
      let query;
      let queries = [];
      let filters = this.reportFilters.filter(f => !!f.value);
      filters.map(filter => {
        switch (filter.type) {
          case "select":
            queries.push([filter.param, "==", filter.value]);
            break;
          case "daterange":
            let sortedDates = filter.value.sort((a, b) => {
              return a - b;
            });
            console.log("sorted", sortedDates);
            queries.push([filter.param, ">=", sortedDates[0]]);
            queries.push([filter.param, "<=", sortedDates[1]]);
            break;
          default:
            break;
        }
      });
      //   grab collection ref
      let ref = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(this.reportMeta.collection);

      // build and execute query
      console.log(...queries);
      queries.map((q, idx) => {
        query = ref.where(...q);
      });
      query.get().then(snap => {
        this.reportData = snap.docs.map(doc => doc.data());
      });
    },
    exportQuery() {}
  }
};
