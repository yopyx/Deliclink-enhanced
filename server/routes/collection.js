const express = require("express");
const collectionRouter = express.Router();

collectionRouter.get("/collection", async (req, res) => {
  const { lat, lng, params, sortKey, facet } = req.query;
  if (!lat || !lng || !params) {
    return res.status(400).json({ error: "lat, lng and params are required!" });
  }
  const urlParams = new URLSearchParams({
    lat,
    lng,
  });
  if (sortKey) {
    urlParams.set("sortAttribute", sortKey);
  }
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?${urlParams}&${params}${facet}`;
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
module.exports = collectionRouter;
