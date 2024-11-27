<script setup lang="ts">
import Todos from "./components/Todos.vue";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { ref, onMounted } from "vue";

const auth = useAuthenticator();
const user = ref(null);
const isAdmin = ref(false);

onMounted(async () => {
  const currentUser = await auth.user;
  if (currentUser) {
    const groups =
      currentUser.signInDetails?.attributes["cognito:groups"] || [];
    isAdmin.value = groups.includes("ADMINS"); // Überprüfen, ob der Benutzer in der Admin-Gruppe ist
  }
});
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId }}'s todos</h1>
        <Todos />
        <button @click="signOut">Sign Out</button>
        <p v-if="isAdmin">You are an admin.</p>
        <p v-else>You are not an admin.</p>
      </template>
    </authenticator>
  </main>
</template>
