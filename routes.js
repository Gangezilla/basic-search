const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.get("/health/", (req, res) => {
  res.json({
    status: "200"
  });
});

module.exports = router;
