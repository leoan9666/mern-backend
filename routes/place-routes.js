const express = require("express");
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world!",
    location: {
      lat: 40.7484474,
      log: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001, United States",
    creater: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.find((place) => {
    return place.id === placeId;
  });

  if (!places) {
    const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    throw error;
  }

  res.status(200).json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((place) => {
    return place.creater === userId;
  });

  if (!places) {
    const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    return next(error);
  }

  res.status(200).json({ places });
});

module.exports = router;
