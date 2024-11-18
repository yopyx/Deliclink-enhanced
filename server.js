//development
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import collectionRouter from "./routes/collection.js";
import resListRouter from "./routes/res-list.js";
import cityDataRouter from "./routes/city-res-data.js";
import geoRouter from "./routes/geo-suggest.js";
import menuDataRouter from "./routes/menu-data.js";
import preCuisinesRouter from "./routes/pre-search-cuisines.js";
import searchResultsRouter from "./routes/search-results.js";
import searchSuggestRouter from "./routes/search-suggest.js";

const app = express();
app.use(express.json());
app.use(cors());
const environment = "development";
const PORT = 3001;
if (process.env.VITE_ENVIRONMENT === "production") {
  app.use(express.static(path.resolve("__dirname", "dist")));
}

app.use("/", collectionRouter);
app.use("/", geoRouter);
app.use("/", resListRouter);
app.use("/", cityDataRouter);
app.use("/", geoRouter);
app.use("/", menuDataRouter);
app.use("/", preCuisinesRouter);
app.use("/", searchResultsRouter);
app.use("/", searchSuggestRouter);

app.listen(PORT);
