<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {};
  }
};
</script>

<template>
  <v-card height="100">
    <v-card-title>title</v-card-title>
    <v-card-text class="subtitle">subtitle</v-card-text>
  </v-card>
</template>
