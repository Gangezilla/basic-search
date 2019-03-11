const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("./routes");
const generateTermDocumentFrequencies = require("./src/termDocumentFrequency");
const generateInvertedIndex = require("./src/invertedIndex");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const initDocuments = () => {
  console.log("Documents out of sync, rebuilding documents");
  generateTermDocumentFrequencies();
  generateInvertedIndex();
  console.log("Rebuilding documents complete");
};

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

const docsPromise = new Promise(resolve => {
  fs.readdir("./documents", (err, files) => {
    resolve(files.length);
  });
});

const docFreqPromise = new Promise(resolve => {
  fs.readdir("./term-doc-frequencies", (err, files) => {
    resolve(files.length);
  });
});

Promise.all([docsPromise, docFreqPromise]).then(values => {
  [docsLength, docFreqLength] = values;
  if (docsLength !== docFreqLength) initDocuments();
});

fs.readFile("./inverted-index/index.json", "utf-8", (err, data) => {
  if (err) console.error("panic time");
  global.invertedIndex = JSON.parse(data);
});

console.log("App has been initialised.");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
