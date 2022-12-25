const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");

app.use(express.json());
// import all routes
const product = require("./routes/productRouter");
app.use("/api/v1", product);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
