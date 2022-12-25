const app = require("./app");
const dotenv = require("dotenv");
const connectDatabse = require("./config/database");

// config
dotenv.config({ path: "backend/config/config.env" });

// connnection database
connectDatabse();

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
