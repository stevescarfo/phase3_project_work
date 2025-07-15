// server.js file
const express = require("express");

const path = require("path"); // for handling file paths
const da = require("./data-access"); // import data access module

const app = express();
const port = process.env.PORT || 4000; // use env var or default to 4000

// Set the static directory to serve files from
app.use(express.static(path.join(__dirname, "public")));

app.get("/customers", async (req, res) => {
  const cust = await da.getCustomers();
  res.send(cust);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
