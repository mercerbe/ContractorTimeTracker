<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<template>
  <v-card v-if="user" class="px-2 py-5">
    <p class="title">Your Profile</p>
    <div class="card-stacked">
      <div class="card-content">
        <p>
          <br />email:
          <strong>{{ user.email }}</strong>
          <!-- <strong>{{ user.uid }}</strong> -->
          <br />provider:
          <strong class="teal-text">{{
            user.providerData[0].providerId
          }}</strong>
        </p>
      </div>
    </div>
  </v-card>
</template>
