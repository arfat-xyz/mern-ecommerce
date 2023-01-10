const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
// import all routes
const product = require("./routes/productRouter");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoutes");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
