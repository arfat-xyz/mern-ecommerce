const mongoose = require("mongoose");

const connectDatabse = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      //   useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connect with server: ${data.connection.host}`);
    });
};
module.exports = connectDatabse;
