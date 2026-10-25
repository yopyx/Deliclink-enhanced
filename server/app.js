const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(
  cors({
    origin: ["https://deliclink.vercel.app", "http://localhost:5173"],
  }),
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
