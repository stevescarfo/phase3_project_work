// server.js file
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path"); // for handling file paths
const da = require("./data-access"); // import data access module

const app = express();
const port = process.env.PORT || 4000; // use env var or default to 4000

// Set the static directory to serve files from
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/customers", async (req, res) => {
  const [cust, err] = await da.getCustomers();
  if (cust) {
    res.send(cust);
  } else {
    res.status(500);
    res.send(err);
  }
});

// app.post("/customers", async (req, res) => {
//   const newCustomer = req.body;
//   if (newCustomer === null || req.body != {}) {
//     res.status(400);
//     res.send("missing request body");
//   } else {
//     // return array format [status, id, errMessage]
//     const [status, id, errMessage] = await da.addCustomer(newCustomer);
//     if (status === "success") {
//       res.status(201);
//       let response = { ...newCustomer };
//       response["_id"] = id;
//       res.send(response);
//     } else {
//       res.status(400);
//       res.send(errMessage);
//     }
//   }
// });

app.post("/customers", async (req, res) => {
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

app.get("/reset", async (req, res) => {
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
