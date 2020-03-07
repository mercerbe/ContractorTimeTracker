<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    svg: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<template>
  <div class="d-flex">
    <img :src="`../assests/${this.svg}.svg`" alt />
    <p class="headline">{{title}}</p>
  </div>
</template>