<script>
import JsonExcel from "vue-json-excel";
export default {
  components: { JsonExcel },
  props: {
    reportFilters: {
      type: Array,
      required: true
    },
    reportHeaders: {
      type: Array,
      required: true
    },
    reportData: {
      type: Array,
      required: true
    },
    reportMeta: {
      type: Object,
      required: true
    },
    exportFields: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      modal: false
    };
  }
};
</script>

<template>
  <div class="px-2">
    <template v-for="(filter, idx) in reportFilters">
      <!-- select -->
      <v-select
        v-if="filter.type ==='select'"
        :label="filter.label"
        :items="filter.options"
        v-model="filter.value"
        color="teal"
        clearable
        :key="idx"
      ></v-select>
      <!-- date -->
      <v-dialog
        v-if="filter.type === 'daterange'"
        ref="dialog"
        v-model="modal"
        :return-value.sync="filter.vuetify"
        persistent
        width="290px"
        :key="idx"
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
        <v-date-picker v-model="filter.vuetify" range scrollable color="teal">
          <v-spacer></v-spacer>
          <v-btn text color="teal" @click="$emit('filter_changed', filter), modal = !modal">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <!-- query -->
      <v-btn v-if="filter.type === 'button'" :key="idx" dark @click="$emit('search')">Search</v-btn>
      <!-- export -->
      <v-btn v-if="filter.type === 'export'" color="green" dark :key="idx" @click="$emit('export')">
        <JsonExcel
          v-if="filter.type === 'export'"
          :key="idx"
          :data="reportData"
          :fields="exportFields"
          :worksheet="`CTC ${reportMeta.title}`"
          :name="`${reportMeta.title}.xlsx`"
        >Export</JsonExcel>
      </v-btn>
    </template>
  </div>
</template>