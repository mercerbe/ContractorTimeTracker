<script>
import DatePicker from "@/components/DatePicker";
import JsonExcel from "vue-json-excel";
export default {
  components: { DatePicker, JsonExcel },
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
      <DatePicker
        v-if="filter.type === 'daterange'"
        :filter="filter"
        :key="idx"
        @filter_changed="$emit('filter_changed')"
      />
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