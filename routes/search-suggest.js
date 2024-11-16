//development
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const searchSuggestRouter = express.Router();
searchSuggestRouter.get("/search-suggest", async (req, res) => {
  const { lat, lng, query } = req.query;
  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&includeIMItem=true`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error submitting data:",
      error.message,
      error.response ? error.response.data : ""
    );
    res.status(500).send("Error submitting data");
  }
});
export default searchSuggestRouter;
