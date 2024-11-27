<template>
  <button @click="fetchData">Fetch Data</button>
  <div v-if="responseData">
    <pre>{{ responseData }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const responseData = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://hqewww6uyof7umxy6fivskqrfi0yewrh.lambda-url.eu-central-1.on.aws/"
    );
    responseData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
