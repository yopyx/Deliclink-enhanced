const express = require("express");
const searchRouter = express.Router();

searchRouter.get("/search/suggest", async (req, res) => {
  const { lat, lng, q } = req.query;
  if (!lat || !lng || !q) {
    return res.status(400).json({ error: "lat, lng and q are required" });
  }
  const params = new URLSearchParams({
    lat,
    lng,
    str: q,
    trackingId: "undefined",
    includeIMItem: "true",
  });
  const url = `https://www.swiggy.com/dapi/restaurants/search/suggest?${params}`;
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

searchRouter.get("/search/results", async (req, res) => {
  const { lat, lng, q, meta, facets, sortKey, displayLabel } = req.query;
  if (!lat || !lng || !q || !meta || !displayLabel) {
    return res
      .status(400)
      .json({ error: "lat, lng, q, meta and displayLabel are required!" });
  }
  const params = new URLSearchParams({
    lat,
    lng,
    str: q,
    trackingId: "undefined",
    submitAction: "SUGGESTION",
    metaData: meta,
    selectedPLTab: displayLabel,
  });
  if (sortKey) {
    params.set("sortKey", sortKey);
  }
  const url = `https://www.swiggy.com/dapi/restaurants/search/v3?${params}${facets}`;
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

module.exports = searchRouter;
