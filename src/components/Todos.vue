<script setup lang="ts">
import "@/assets/main.css";
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Auth } from "@aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-vue";

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema["Todo"]["type"]>>([]);
const AdminTodos = ref<Array<Schema["AdminContent"]["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      console.log("Items:", items);
      console.log("Is Synced:", isSynced);
      todos.value = items;
    },
    error: (error) => {
      console.error("Error fetching todos:", error);
    },
  });
}

function createTodo() {
  client.models.Todo.create({
    content: window.prompt("Todo content"),
  }).then(() => {
    // After creating a new todo, update the list of todos
    listTodos();
  });
}

function deleteTodo(id: string) {
  client.models.Todo.delete({ id });
}

// ACHTUNG ADMIN

/*
function listAdminTodos() {
  client.models.AdminContent.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      AdminTodos.value = items;
    },
    error: (error) => {
      console.error('Error fetching admin todos:', error);
    }
  });
}

function createAdminTodo() {
  client.models.AdminContent.create({
    content: window.prompt("Admin content"),
  }).then(() => {
    // After creating a new admin todo, update the list of todos
    listAdminTodos();
  });
}

function deleteAdminTodo(id: string) {
  client.models.AdminContent.delete({ id });
} */

// fetch todos when the component is mounted
const auth = useAuthenticator();
const user = ref(null);
const isAdmin = ref(false);

onMounted(async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    if (currentUser) {
      user.value = currentUser;
      console.log("HELLO", currentUser);
      const groups =
        currentUser.signInUserSession.accessToken.payload["cognito:groups"] ||
        [];
      isAdmin.value = groups.includes("ADMINS"); // Überprüfen, ob der Benutzer in der Admin-Gruppe ist
    }
    listTodos();
  } catch (error) {
    console.error("Error getting current authenticated user:", error);
  }
});
</script>

<template>
  <main>
    <h1>My todos</h1>
    <button @click="createTodo">+ new</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="deleteTodo(todo.id)">
        {{ todo.content }}
      </li>
    </ul>

    <div>
      YOU ARE A {{ isAdmin ? "ADMIN" : "USER" }}
      <br />
    </div>
  </main>
</template>
