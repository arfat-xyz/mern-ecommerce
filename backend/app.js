const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
// import all routes
const product = require("./routes/productRouter");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
