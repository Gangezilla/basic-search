const express = require("express");
const bodyParser = require("body-parser");
const queryController = require("./src/queryController");

const router = express.Router();

router.get("/health/", (req, res) => {
  res.json({
    status: "200"
  });
});

router.post("/query/", queryController);

module.exports = router;
