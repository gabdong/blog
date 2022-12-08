const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/index.js");
const PORT = process.env.port || 9411;

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server on PORT:${PORT}`);
});
