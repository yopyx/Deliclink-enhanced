const express = require("express");
const preSearchRouter = express.Router();

preSearchRouter.get("/pre-search-cuisines", async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required" });
  }
  const params = new URLSearchParams({
    lat,
    lng,
  });
  const url = `https://www.swiggy.com/dapi/landing/PRE_SEARCH?${params}`;

  const dataResponse = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!dataResponse.ok) {
    const err = new Error();
    err.status = dataResponse.status;
    err.message = dataResponse.statusText;
    throw err;
  }
  const data = await dataResponse.json();
  res.json({ data });
});

module.exports = preSearchRouter;
