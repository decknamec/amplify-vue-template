<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="fetchData">Daten laden</button>
    <p v-if="responseData">{{ responseData }}</p>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MyComponent",
  data() {
    return {
      title: "Hallo, Vue mit TypeScript!",
      responseData: null,
      errorMessage: null as string | null,
    };
  },
  methods: {
    async fetchData() {
      try {
        // API-Request mit Axios
        const response = await axios.get(
          "https://hqewww6uyof7umxy6fivskqrfi0yewrh.lambda-url.eu-central-1.on.aws/"
        );
        // Setze die Antwort in responseData
        this.responseData = response.data;
        this.errorMessage = null; // Setze Fehlermeldung zurück
      } catch (error) {
        // Fehlerbehandlung
        this.responseData = null;
        this.errorMessage = "Fehler beim Laden der Daten!";
      }
    },
  },
});
</script>

<style scoped>
h1 {
  color: blue;
}
button {
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 10px;
  font-size: 1.2em;
}
</style>
