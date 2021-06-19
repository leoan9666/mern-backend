const express = require("express");
const placeRoutes = require("./routes/place-routes");

const app = express();
app.use("/api/places", placeRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error has occurred!" });
});

app.listen(5000);
