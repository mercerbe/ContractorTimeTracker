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
    selectedExpense(val) {
      console.log(val);
      if (val) {
        this.expense = val;
        this.dialog = true;
      }
    }
  },
  data() {
    return {
      dialog: false,
      expense: {
        name: ""
      }
    };
  },
  methods: {
    addExpense() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("expenses")
        .add({
          ...this.expense
        });
      this.dialog = false;
    },
    updateExpense() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("expenses")
        .doc(this.expense.id)
        .update({
          ...this.expense
        });
      this.$emit("close");
      this.dialog = false;
    },
    deleteExpense() {},
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
          <v-icon>mdi-plus</v-icon>&nbsp;New Expense
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <div class="flex flex-row">Expense</div>
          <v-btn text @click="close">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Client Name" v-model="expense.name" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="selectedExpense" color text @click="updateExpense">Update</v-btn>
          <v-btn v-else color text @click="addExpense">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
