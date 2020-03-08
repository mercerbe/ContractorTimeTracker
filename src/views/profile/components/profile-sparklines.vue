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
      data: []
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
  <v-card class="text-center flex-grow-1" color="#80CBC4" dark>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="data"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        ></v-sparkline>
      </v-sheet>
      <p class="subtitle">{{name}}</p>
    </v-card-text>
  </v-card>
</template>
