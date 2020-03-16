<script>
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
  }
};
</script>

<template>
  <v-container>
    <v-data-table :headers="reportHeaders" :items="reportData">
      <template v-slot:item="props">
        <tr>
          <td v-for="(item, idx, i) in props.item" :key="idx">
            <template v-if="reportHeaders[i]">
              <template v-if="reportHeaders[i].class !== 'hidden'">{{ item }}</template>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>