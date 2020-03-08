<script>
export default {
  data() {
    return {
      file: ""
    };
  },
  created() {
    this.initFilters();
  },
  methods: {
    initFilters() {
      let json = require(`../views/reports/config/${this.file}`);
    }
  }
};
</script>

<template>
  <div>test...</div>
</template>