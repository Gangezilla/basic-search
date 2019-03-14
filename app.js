const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const queryController = require("./src/queryController");
const generateTermDocumentFrequencies = require("./src/termDocumentFrequency");
const generateInvertedIndex = require("./src/invertedIndex");

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const PORT = process.env.PORT || 3000;

  server.use(helmet());
  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  server.use(
    bodyParser.json({
      limit: "5mb"
    })
  );

  server.get("*", (req, res) => handle(req, res));

  server.post("/query/", queryController);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

global.documentIndex = {};

const initDocuments = () => {
  console.log("Documents out of sync, rebuilding documents");
  generateTermDocumentFrequencies();
  generateInvertedIndex();
  console.log("Rebuilding documents complete");
};

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
          filename: path.join(__dirname + "/documents/" + file),
          documentName: content.title
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

const invertedIndexPromise = new Promise(resolve => {
  fs.readFile("./inverted-index/index.json", "utf-8", (err, data) => {
    if (err) throw err;
    resolve(data);
  });
});

Promise.all([docsPromise, docFreqPromise, invertedIndexPromise]).then(
  values => {
    [docsLength, docFreqLength, invertedIndex] = values;
    if (docsLength !== docFreqLength || !invertedIndex) initDocuments();
  }
);

console.log("App has been initialised.");
