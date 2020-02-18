<script>
import firebase from "firebase";
export default {
  name: "Todos",
  data() {
    return {
      todos: [],
      todo: {
        title: ""
      }
    };
  },
  created() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      var todosRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos");
      todosRef.onSnapshot(snap => {
        this.todos = [];
        snap.forEach(doc => {
          var todo = doc.data();
          todo.id = doc.id;
          this.todos.push(todo);
        });
      });
    },
    addTodo() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .add({
          title: this.todo.title,
          created_at: new Date(),
          completed: false
        });
      this.todo.title = "";
    },
    updateTodoItem(docId, e) {
      console.log(e);
      var isChecked = e;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .update({
          completed: isChecked
        });
    },
    deleteToDo(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .delete();
    }
  }
};
</script>

<template>
  <v-card class=" py-5">
    <div class="px-5">
      <p class="title">Your Tasks</p>
      <div class="d-flex align-center">
        <div class="flex-grow-1">
          <v-text-field
            id="new_todo"
            label=""
            class="validate"
            v-model="todo.title"
          />
        </div>
        <div class="flex-shrink-1 pl-2">
          <v-btn color="teal" dark @click="addTodo">Add</v-btn>
        </div>
      </div>
    </div>

    <!-- created todos -->
    <div
      class="d-flex justify-space-between align-center px-5"
      :style="todo.completed ? 'background: #e9ecef' : ''"
      v-for="todo in todos"
      :key="todo.id"
    >
      <v-checkbox
        v-model="todo.completed"
        color="teal"
        :label="todo.title"
        @change="updateTodoItem(todo.id, $event)"
      />
      <v-icon color="red" @click="deleteToDo(todo.id)">mdi-trash-can</v-icon>
    </div>
  </v-card>
</template>
