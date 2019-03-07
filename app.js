const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
