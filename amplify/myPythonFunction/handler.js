const express = require("express");
const cors = require("cors");
const serverlessExpress = require("@vendia/serverless-express");

const app = express();

// CORS aktivieren (wichtig für die Kommunikation mit Nuxt)
app.use(
  cors({
    origin: "https://main.d3sa6211036fsg.amplifyapp.com", // URL des Nuxt-Projekts
    credentials: true,
  })
);

// API-Endpunkt
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Exportieren des Lambda-Handlers
exports.handler = serverlessExpress({ app });
