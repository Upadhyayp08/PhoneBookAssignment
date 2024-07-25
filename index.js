// app.js

const express = require("express");
const bodyParser = require("body-parser");
const phoneBookroutes = require("./routes/phoneBookroutes");
const dbConnection = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

dbConnection();

// Routes
app.use("/api", phoneBookroutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
