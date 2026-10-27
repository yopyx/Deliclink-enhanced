const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(
  cors({
    origin: ["https://deliclink.vercel.app", "http://localhost:5173"],
  }),
);

app.use(express.json()); // Middleware to parse JSON request bodies
const searchRouter = require("./routes/search");
const cityDataRouter = require("./routes/cityData");
const geoRouter = require("./routes/geoLocation");
const preSearchRouter = require("./routes/pre-search-cuisines");
const collectionRouter = require("./routes/collection");
const menuDataRouter = require("./routes/menu");
const resListRouter = require("./routes/reslist");

app.use("/", geoRouter);
app.use("/", cityDataRouter);
app.use("/", searchRouter);
app.use("/", preSearchRouter);
app.use("/", collectionRouter);
app.use("/", menuDataRouter);
app.use("/", resListRouter);

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
    status: err.status,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
