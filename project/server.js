// server.js file
const express = require("express");
const da = require("./data-access"); // import data access module
const path = require("path"); // for handling file paths

const app = express();
const port = process.env.PORT || 4000; // use env var or default to 4000

// Set the static directory to serve files from
app.use(express.static(path.join(__dirname, "public")));

app.get("/customers", async (req, res) => {
  try {
    const cust = await da.getCustomers();
    res.send(cust);
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).send({ error: "Failed to get customers" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
