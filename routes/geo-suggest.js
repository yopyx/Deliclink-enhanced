//development
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const geoRouter = express.Router();
geoRouter.get("/geo-suggest", async (req, res) => {
  const { address } = req.query;
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${address
        .trim()
        .replace(/ /g, "+")}&key=${
        process.env.VITE_APP_GEO_KEY
      }&language=en&no_annotations=1&pretty=1`,
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
export default geoRouter;
