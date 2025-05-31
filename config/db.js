const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected To Database ${mongoose.connection.host}`.bgCyan);
  }
  catch (error) {
    console.log("DB Error", error);
  }
};

module.exports = connectDb;
