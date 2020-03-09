<script>
export default {
  props: {
    file: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      json: null
    };
  },
  created() {
    this.initFilters();
  },
  methods: {
    initFilters() {
      this.json = require(`../config/${this.file}`);
    }
  }
};
</script>

<template>
  <div>test...</div>
</template>