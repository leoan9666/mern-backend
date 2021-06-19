const express = require("express");
const placeRoutes = require("./routes/place-routes");

const HttpError = require("./models/http-model");

const app = express();

app.use(express.json());

app.use("/api/places", placeRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error has occurred!" });
});

app.listen(5000);
