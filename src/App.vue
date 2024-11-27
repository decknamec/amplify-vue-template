<script setup lang="ts">
import Todos from "./components/Todos.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { onMounted, ref } from "vue";

const userGroups = ref([]);

onMounted(async () => {
  try {
    const currentUser = await getCurrentUser();
    console.log("User:", currentUser);
    if (currentUser) {
      const session = await fetchAuthSession();
      console.log("Session:", session);

      const jwtToken = session.tokens?.accessToken;
      console.log("JWT Token:", jwtToken);

      if (!session.tokens) {
        return;
      }

      // Extrahiere Gruppeninformationen aus dem AccessToken
      const groups = session.tokens.accessToken.payload["cognito:groups"] || [];
      userGroups.value = groups;
      console.log("User Groups:", userGroups.value);

      const { username, userId, signInDetails } = currentUser;
      console.log("Username:", username);
      console.log("User ID:", userId);
      console.log("Sign-In Details:", signInDetails);
    }
  } catch (error) {
    console.error("Error getting current session:", error);
  }
});
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId }}'s todos</h1>
        <Todos />
        <h2>Du bist {{ userGroups.join(", ") }}</h2>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>
