<template>
  <div>
    <button @click="fetchData">Daten laden</button>
    <p v-if="responseData">{{ responseData }}</p>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyComponent",
  data() {
    return {
      responseData: null,
      errorMessage: null as string | null,
    };
  },
  methods: {
    async fetchData() {
      try {
        // API-Request mit Axios LAMBDA FUNC
        /*const response = await axios.get(
          "https://hqewww6uyof7umxy6fivskqrfi0yewrh.lambda-url.eu-central-1.on.aws/"
        ); */

        // this is our own lambda function in node js
        const response = await axios.get(
          "https://dj3d6pl3xm6b2x5bkds5yqzm6i0qrrep.lambda-url.eu-central-1.on.aws"
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
