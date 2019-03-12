const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("./routes");
const generateTermDocumentFrequencies = require("./src/termDocumentFrequency");
const generateInvertedIndex = require("./src/invertedIndex");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
global.documentIndex = {};

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
    files.forEach(file => {
      const dir = path.join(__dirname + "/documents");
      const content = JSON.parse(fs.readFileSync(dir + "/" + file));
      // put all documents in a document index so we know which one to access later
      // bit crap that its here, and not in the termDocumentFrequency when we're reading the files
      // means we're double dipping but its ok for now.
      global.documentIndex = Object.assign(global.documentIndex, {
        [content.id]: {
          filename: path.join(__dirname + "/documents/" + file)
        }
      });
    });
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
