<script setup lang="ts">
import "@/assets/main.css";
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema["Todo"]["type"]>>([]);
const AdminTodos = ref<Array<Schema["Todo"]["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items;
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
function listAdminTodos() {
  client.models.AdminContent.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      AdminTodos.value = items;
    },
  });
}

function createAdminTodo() {
  client.models.Todo.create({
    content: window.prompt("Admin Todo content"),
  }).then(() => {
    // After creating a new todo, update the list of todos
    listAdminTodos();
  });
}

function deleteAdminTodo(id: string) {
  client.models.AdminContent.delete({ id });
}

// fetch todos when the component is mounted
onMounted(() => {
  listTodos();
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
      🥳 App successfully hosted. Try creating a new todo.
      <br />
    </div>
  </main>
</template>
