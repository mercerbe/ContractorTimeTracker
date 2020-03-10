<script>
import layout from "@/layouts/main";
import ExpenseTable from "@/views/expenses/components/expense-table";
import firebase from "firebase";
export default {
  components: { layout, ExpenseTable },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Type", value: "type" },
        { text: "Description", value: "description" },
        { text: "Amount", value: "amount" },
        { text: "Created At", value: "created_at", class: "timestamp" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  }
};
</script>

<template>
  <layout>
    <!-- page header -->
    <v-col class="text-center">
      <img src="../../assets/expense.svg" alt />
      <p class="display-1">Expenses</p>
    </v-col>
    <v-container>
      <!-- main -->
      <main class="text-center headline">
        <!-- table to manage expenses -->
        <ExpenseTable :headers="headers" />
      </main>
    </v-container>
  </layout>
</template>