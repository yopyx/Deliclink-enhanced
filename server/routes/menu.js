const express = require("express");
const menuDataRouter = express.Router();

menuDataRouter.get("/menu", async (req, res) => {
  const { lat, lng, resId } = req.query;
  if (!lat || !lng || !resId) {
    return res.status(400).json({ error: "lat, lng and resId are required" });
  }
  const params = new URLSearchParams({
    "page-type": "REGULAR_MENU",
    "complete-menu": true,
    lat,
    lng,
    restaurantId: resId,
    submitAction: "ENTER",
  });
  // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=873313&submitAction=ENTER
  const url = `https://www.swiggy.com/dapi/menu/pl?${params}`;
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

module.exports = menuDataRouter;
