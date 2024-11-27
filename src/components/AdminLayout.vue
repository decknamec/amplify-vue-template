<script setup>
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
  <h1>isAdmin{{ isAdmin }} isAdmin.value = {{ isAdmin.value }}</h1>
</template>
