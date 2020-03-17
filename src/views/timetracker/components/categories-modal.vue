<script>
import firebase from "firebase";
export default {
  props: {
    selectedCategory: {
      type: Object,
      required: false,
      default: null
    }
  },
  watch: {
    selectedCategory(val) {
      if (val) {
        this.category = val;
        this.dialog = true;
      }
    }
  },
  data() {
    return {
      dialog: false,
      category: {
        name: ""
      }
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    addCategory() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("categories")
        .add({
          ...this.category
        });
      this.dialog = false;
    },
    updateCategory() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("categories")
        .doc(this.category.id)
        .update({
          ...this.category
        });
      this.$emit("close");
      this.dialog = false;
    },
    deleteCategory() {},
    close() {
      this.$emit("close");
      this.dialog = false;
    }
  }
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn small color="#80CBC4" v-on="on">
          <v-icon>mdi-plus</v-icon>&nbsp;New Client
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <div class="flex flex-row">Client</div>
          <v-btn text @click="close">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Client Name" v-model="category.name" color="teal" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="selectedCategory" color text @click="updateCategory">Update</v-btn>
          <v-btn v-else color text @click="addCategory">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
