<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      items: [
        { title: "Profile", icon: "mdi-account", route: "/profile" },
        { title: "TimeTracker", icon: "mdi-timetable", route: "/timetracker" },
        { title: "Reports", icon: "mdi-file-chart", route: "/reports" },
        { title: "Expenses", icon: "mdi-cash-multiple", route: "/expenses" }
      ]
    };
  }
};
</script>

<template>
  <v-navigation-drawer v-model="drawer" app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="user.photoURL" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" @click="$router.push(item.route)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
