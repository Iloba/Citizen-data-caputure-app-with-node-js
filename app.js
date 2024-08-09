const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/api");
const errorHandler = require("./app/http/middleware/ErrorHandler");
const databaseUrl = "mongodb://localhost/citizens";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/api/v4", router);

app.use(errorHandler);

mongoose.connect(databaseUrl);

const conn = mongoose.connection;

conn.on("open", () => console.log("Database connected"));

app.listen(3030, () => console.log("Server running"));
