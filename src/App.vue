<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { ref, onMounted } from "vue";

const userGroups = ref<string[]>([]);

const { user } = useAuthenticator();

onMounted(() => {
  if (user.value) {
    const groups =
      user.value.signInUserSession?.accessToken?.payload["cognito:groups"] ||
      [];
    userGroups.value = groups;
  }
});
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1 v-if="user">Hello {{ user.signInDetails?.loginId }}'s todos</h1>
        <h2 v-if="user">Groups:</h2>
        <ul v-if="user">
          <li v-for="group in userGroups" :key="group">{{ group }}</li>
        </ul>
        <Todos />
        <button v-if="user" @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>
