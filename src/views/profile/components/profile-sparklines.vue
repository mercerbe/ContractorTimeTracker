<script>
import firebase from "firebase";
import Query from "@/mixins/query.js";
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    collection: {
      type: String,
      required: true
    },
    query: {
      type: Array,
      required: true
    },
    queryCompound: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  mixins: [Query],
  data() {
    return {
      loading: false,
      data: null,
      value: [423, 446, 675, 510, 590, 610, 760]
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    queryData() {
      this.runQuery();
    }
  }
};
</script>

<template>
  <v-card class="mx-1 text-center flex-grow-1" color="#80CBC4" dark max-width="600">
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">{{ item.value }}</template>
        </v-sparkline>
      </v-sheet>
      <p>{{name}}</p>
    </v-card-text>
  </v-card>
</template>
