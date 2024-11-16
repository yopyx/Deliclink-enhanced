//development
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const preCuisinesRouter = express.Router();
preCuisinesRouter.get("/pre-search-cuisines", async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`,
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
export default preCuisinesRouter;
