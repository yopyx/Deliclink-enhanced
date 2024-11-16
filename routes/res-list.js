//development
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const resListRouter = express.Router();

resListRouter.get("/res-list", (req, res) => {
  res.status(200).send("Hey, You are in my backend!!!");
});

resListRouter.post("/res-list", async (req, res) => {
  const { lat, lng, dataObj } = req.body;
  try {
    const response = await axios.post(
      `https://www.swiggy.com/api/seo/getListing?lat=${lat}&lng=${lng}&isDineoutCollection=false`,
      dataObj,
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

export default resListRouter;
