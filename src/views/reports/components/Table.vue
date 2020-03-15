<script>
import { ProcessData } from "@/utils/data-process";
import { formatDollar } from "@/utils/format-dollar";
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
  computed: {
    tableData() {
      return ProcessData(this.reportData, this.reportHeaders);
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
    },
    formatMoney(val) {
      return formatDollar(val);
    }
  }
};
</script>

<template>
  <v-container>
    <v-data-table :headers="reportHeaders" :items="tableData">
      <template v-slot:item="props">
        <tr>
          <td v-for="(item, idx, i) in props.item" :key="idx">
            <template v-if="reportHeaders[i]">
              <template v-if="reportHeaders[i].class === 'timestamp'">{{ convertTS(item.seconds) }}</template>
              <template v-else-if="reportHeaders[i].class === 'duration'">{{ convertMS(item) }}</template>
              <template v-else-if="reportHeaders[i].class === 'dollar'">{{formatMoney(item)}}</template>
              <template v-else-if="reportHeaders[i].class !== 'hidden'">{{ item }}</template>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>