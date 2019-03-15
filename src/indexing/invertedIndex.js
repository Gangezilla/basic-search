const fs = require("fs");
const path = require("path");
const jsonFile = require("jsonfile");
const { readdirAsync, readFileAsync } = require("../helpers");

const generateInvertedIndex = () => {
  const dir = path.join(__dirname + "/../term-doc-frequencies");

  readdirAsync(dir)
    .then(filenames => {
      const pathName = filename =>
        path.join(__dirname + "/../term-doc-frequencies/" + filename);
      return Promise.all(
        filenames.map(filename => readFileAsync(pathName(filename)))
      );
    })
    .then(files => {
      const finalInvertedIndex = {};
      files.forEach(file => {
        const parsedFile = JSON.parse(file);
        const docId = parsedFile.docId;
        const content = parsedFile.content;
        Object.keys(content).reduce((invertedIndex, term) => {
          if (invertedIndex.hasOwnProperty(term)) {
            invertedIndex[term] = {
              doc_freq: invertedIndex[term].doc_freq + content[term],
              postings_list: invertedIndex[term].postings_list.concat(docId)
            };
          } else {
            invertedIndex[term] = {
              doc_freq: content[term],
              postings_list: [docId]
            };
          }
          return invertedIndex;
        }, finalInvertedIndex);

        const invertedIndexPath = path.join(
          __dirname + `/../inverted-index/index.json`
        );
        global.invertedIndex = finalInvertedIndex;
        jsonFile.writeFile(invertedIndexPath, finalInvertedIndex, {
          spaces: 2
        });
      });
    })
    .catch(err => console.error("oops, sorry", err));
};

module.exports = generateInvertedIndex;
