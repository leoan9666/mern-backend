const HttpError = require("../models/http-model");

const API_KEY = "NO KEY";

const getCoordsForAddress = async (address) => {
  const coordinates = await createLatLngPromise(address);

  if (!coordinates || coordinates.status === "ZERO_RESULTS") {
    throw new HttpError(
      "Could not find location for the specified address.",
      422
    );
  }
  return coordinates;
};

const createLatLngPromise = async (address) => {
  return new Promise((resolve, reject) => {
    resolve({ lat: 40.7484474, log: -73.9871516 });
  });
};

module.exports = getCoordsForAddress;
