<script>
import layout from "@/layouts/main.vue";
import report from "@/layouts/report.vue";
export default {
  components: { layout, report },
  data() {
    return {
      tab: null,
      tabs: [
        { title: "Time", json: "activities" },
        { title: "Expenses", json: "expenses" }
      ]
    };
  }
};
</script>

<template>
  <layout>
    <!-- page header -->
    <v-col class="text-center">
      <img src="../../assets/report.svg" alt />
      <p class="display-1">Reports</p>
    </v-col>
    <div>
      <v-tabs v-model="tab" background-color="transparent" color="teal" grow>
        <v-tab v-for="tab in tabs" :key="tab.title">{{ tab.title }}</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.title">
          <v-card flat color="#fafafa">
            <report file-path="@/views/reports/config" :title="tab.title" :json="tab.json" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </layout>
</template>
