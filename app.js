const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const placeRoutes = require("./routes/place-routes");
const userRoutes = require("./routes/user-routes");

const HttpError = require("./models/http-model");

const app = express();

app.use(express.json());

app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error has occurred!" });
});

const MONGODB_API_USER = process.env.MONGODB_API_USER;
const MONGODB_API_PASSWORD = process.env.MONGODB_API_PASSWORD;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
const MONGODB_URI = `mongodb+srv://${MONGODB_API_USER}:${MONGODB_API_PASSWORD}@cluster0.tihvu.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then(() => app.listen(5000))
  .catch((error) => console.log(error));
