<script setup>
import Todos from "./components/Todos.vue";
import AdminLayout from "./components/AdminLayout.vue";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { onMounted } from "vue";

const auth = useAuthenticator();
const user = auth;
onMounted(() => {
  console.log("user");
});
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId }}'s todos</h1>
        <h2>{{ user.signInDetails }}</h2>
        <h2>{{ user.signInDetails }}</h2>
        <Todos />
        <AdminLayout />

        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>
