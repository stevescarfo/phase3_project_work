require("dotenv").config();
const express = require("express");
const app = express();

const API_KEY = process.env.API_KEY || "fox-api-key";

function checkApiKey(req, res, next) {
  const apiKey = req.query.api_key || req.headers["x-api-key"];

  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(403).send("Forbidden: Invalid API Key");
  }
}

app.use(checkApiKey);

app.get("/", (req, res) => {
  console.log("received a request");
  res.send("Welcome!, authenticated user with a valid API key!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
