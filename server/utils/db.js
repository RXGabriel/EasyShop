const mongoose = require("mongoose");

require("dotenv").config();

const dbUrl = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log(`Database conectado com sucesso: ${data.connection.host}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
