const express = require("express");
const resListRouter = express.Router();

resListRouter.post("/reslist", async (req, res) => {
  const { lat, lng, dataObj } = req.body;
  if (!lat || !lng || !dataObj) {
    return res.status(400).json({ error: "lat, lng and dataObj are required" });
  }
  const params = new URLSearchParams({
    lat,
    lng,
    isDineoutCollection: "false",
  });
  const url = `https://www.swiggy.com/api/seo/getListing?${params}`;

  const dataResponse = await fetch(url, {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
    body: JSON.stringify(dataObj),
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

module.exports = resListRouter;
