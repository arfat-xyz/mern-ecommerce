const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
// import all routes
const product = require("./routes/productRouter");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
