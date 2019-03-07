const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("./routes");
const generateInvertedIndex = require("./inverted-index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  bodyParser.json({
    limit: "5mb"
  })
);

app.use("/", routes);

console.log("App has been initialised.");
generateInvertedIndex();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// for now lets just store then docs in memory when we start the server, bit shit but its ok for now.
