<script setup lang="ts">
import Todos from "./components/Todos.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { getCurrentUser } from "aws-amplify/auth";
import { onMounted } from "vue";

import { fetchAuthSession } from "@aws-amplify/core";

async function getAuthToken() {
  try {
    // Abrufen der aktuellen Authentifizierungssession
    const session = await fetchAuthSession();

    if (!session.tokens) {
      return;
    } // Auth-Token aus der Session extrahieren

    const authToken = session.tokens.accessToken;

    console.log("Auth Token:", authToken);
    return authToken;
  } catch (error) {
    console.error("Fehler beim Abrufen des AuthTokens:", error);
  }
}

onMounted(async () => {
  const { username, userId, signInDetails } = await getCurrentUser();
  const abc = console.log("username", username);
  console.log("user id", userId);
  console.log("sign-in details", signInDetails);
});
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId }}'s todos</h1>
        <h2>{{ user.signInDetails }}</h2>
        <Todos />
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>
