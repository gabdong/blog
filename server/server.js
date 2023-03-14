require("dotenv").config();

const helmet = require("helmet");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const apis = require("./apis/index.js");
const bodyParser = require("body-parser");
const limiter = require("./config/limiter.js");
const PORT = process.env.port || 9411;

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/apis", apis);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server on PORT:${PORT}`);
});
