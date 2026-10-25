const express = require("express");
const geoRouter = express.Router();
const geoData = require("../geolocations.json");

geoRouter.get("/geolocation/autocomplete", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "q is required" });
  }
  const suggestedKeys = Object.keys(geoData).filter((e) =>
    e.startsWith(q.trim().toLowerCase()),
  );

  const data = suggestedKeys.map((e) => ({
    city: e,
    geometry: geoData[e],
  }));
  res.json({ data });
});

// geoRouter.get("/geolocation", async (req, res) => {
//   const { city } = req.query;
//   if (!city) {
//     return res.status(400).json({ error: "city is required" });
//   }
//   const geoLocation = geoData[city.trim().toLowerCase()];
//   if (!geoLocation) {
//     return res
//       .status(404)
//       .json({ error: "City Geolocation data is not found" });
//   }
//   res.json({ data: { [city.trim().toLowerCase()]: geoLocation } });
// });
module.exports = geoRouter;
