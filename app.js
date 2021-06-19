const express = require("express");
const placeRoutes = require("./routes/place-routes");

const app = express();
app.use("/api/places", placeRoutes);

app.listen(5000);
