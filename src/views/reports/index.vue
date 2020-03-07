<script>
import layout from "@/layouts/main.vue";
import report from "@/layouts/report.vue";
export default {
  components: { layout, report },
  data() {
    return {
      tab: null,
      tabs: ["Time", "Notes", "Tasks"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<template>
  <layout>
    Coming Soon
    <!-- <div>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab">
          <v-card color="basil" flat>
            <report />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>-->
  </layout>
</template>
