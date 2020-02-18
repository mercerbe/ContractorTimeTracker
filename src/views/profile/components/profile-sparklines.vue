<script>
export default {
  props: {},
  data() {
    return {
      value: [423, 446, 675, 510, 590, 610, 760]
    };
  }
};
</script>

<template>
  <div class="d-flex flex-row">
    <v-card
      class="mx-1 text-center flex-grow-1"
      color="#80CBC4"
      dark
      max-width="600"
    >
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
            <template v-slot:label="item">{{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
        <p>Hours Over The Past Week</p>
      </v-card-text>
    </v-card>
    <v-card
      class="mx-1 text-center flex-grow-1"
      color="#80CBC4"
      dark
      max-width="600"
    >
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
            <template v-slot:label="item">{{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
        <p>Hours Over The Past Week</p>
      </v-card-text>
    </v-card>
  </div>
</template>
