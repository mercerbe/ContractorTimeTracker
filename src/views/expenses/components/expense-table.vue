<script>
import firebase from "firebase";
import { formatDollar } from "@/utils/format-dollar";
import { convertTimestamp } from "@/views/timetracker/utils/timestamp-converter";

import { ProcessData } from "@/utils/data-process";
export default {
  props: {
    headers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data: () => ({
    dialog: false,
    data: [],
    tableData: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      type: "",
      description: "",
      amount: "",
      created_at: new Date()
    },
    defaultItem: {
      name: "",
      type: "",
      description: "",
      amount: "",
      created_at: new Date()
    },
    valid: false,
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 100 || "Name must be less than 100 characters"
    ],
    typeRules: [],
    amountRules: [],
    search: ""
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let ref = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("expenses");
      ref.onSnapshot(snap => {
        snap.forEach(doc => {
          let item = doc.data();
          item.id = doc.id;
          this.data.push(item);
        });
      });
    },

    convertTS(ts) {
      return convertTimestamp(ts);
    },
    formatMoney(val) {
      return formatDollar(val);
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1) &&
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("expenses")
          .doc(item.id)
          .delete();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("expenses")
          .doc(this.editedItem.id)
          .update(this.editedItem);
      } else {
        // this.data.push(this.editedItem);
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("expenses")
          .add(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<template>
  <v-data-table
    v-if="headers"
    :headers="headers"
    :items="data"
    :search="search"
    sort-by="created_at"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Your Expenses</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark class="mb-2" v-on="on">New Expense</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.amount"
                      prepend-inner-icon="mdi-currency-usd"
                      label="Amount"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      :value="editedItem.created_at.seconds ? convertTS(editedItem.created_at.seconds) : editedItem.created_at"
                      label="Created At"
                      :disabled="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal" text @click="close">Cancel</v-btn>
              <v-btn color="teal" dark @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-row class="pl-2">
        <v-col :cols="5">
          <v-text-field
            label="Search"
            v-model="search"
            color="teal"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.amount="{item}">{{formatMoney(item.amount)}}</template>
    <template v-slot:item.created_at="{item}">{{convertTS(item.created_at.seconds)}}</template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <p>You haven't logged any expenses...</p>
    </template>
  </v-data-table>
</template>