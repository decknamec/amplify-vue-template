<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyComponent",
  data() {
    return {
      title: "Hallo, Vue mit TypeScript!",
    };
  },
});
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
