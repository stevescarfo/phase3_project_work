// server.js file
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path"); // for handling file paths
const da = require("./data-access"); // import data access module
const checkApiKey = require("./security").checkApiKey;
const app = express();
const port = process.env.PORT || 4000; // use env var or default to 4000

// Set the static directory to serve files from
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/customers", checkApiKey, async (req, res) => {
  const [cust, err] = await da.getCustomers();
  if (cust) {
    res.send(cust);
  } else {
    res.status(500);
    res.send(err);
  }
  yes;
});

app.post("/customers", checkApiKey, async (req, res) => {
  const newCustomer = req.body;

  if (!newCustomer || Object.keys(newCustomer).length === 0) {
    return res.status(400).send("missing request body");
  }

  const [status, id, errMsg] = await da.addCustomer(newCustomer);

  if (status === "success") {
    newCustomer._id = id;
    res.status(201).json(newCustomer);
  } else {
    res.status(400).send(errMsg);
  }
});

app.get("/customers/:id", checkApiKey, async (req, res) => {
  const id = req.params.id;
  // return array [customer, errMessage]
  const [cust, err] = await da.getCustomerById(id);
  if (cust) {
    res.send(cust);
  } else {
    res.status(404);
    res.send(err);
  }
});

app.put("/customers/:id", checkApiKey, async (req, res) => {
  const id = req.params.id;
  const updatedCustomer = req.body;

  if (updatedCustomer === null || req.body == {}) {
    res.status(400);
    res.send("missing request body");
  } else {
    delete updatedCustomer._id;
    // return array format [message, errMessage]
    const [message, errMessage] = await da.updateCustomer(updatedCustomer);
    if (message) {
      res.send(message);
    } else {
      res.status(400);
      res.send(errMessage);
    }
  }
});

app.delete("/customers/:id", checkApiKey, async (req, res) => {
  const id = req.params.id;
  // return array [message, errMessage]
  const [message, errMessage] = await da.deleteCustomerById(id);
  if (message) {
    res.send(message);
  } else {
    res.status(404);
    res.send(errMessage);
  }
});

app.get("/reset", checkApiKey, async (req, res) => {
  const [result, err] = await da.resetCustomers();
  if (result) {
    res.send(result);
  } else {
    res.status(500);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
