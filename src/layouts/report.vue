

<script>
export default {
  name: "ReportLayout"
};
</script>

<template>
  <div style="height: 100vh;">
    <v-row style="height: 100%;">
      <v-col :cols="9" style="height: 100%;">Table</v-col>
      <v-col :cols="3" style="border-left: 1px solid #c0c0b6;height: 100%;">Filters</v-col>
    </v-row>
  </div>
</template>
