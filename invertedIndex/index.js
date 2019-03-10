const fs = require("fs");
const path = require("path");
const jsonFile = require("jsonfile");

const generateInvertedIndex = () => {
  let finalInvertedIndex = {};
  const dir = path.join(__dirname + "/../term-doc-frequencies");

  fs.readdir(dir, (err, files) => {
    // currently (i think) overwriting itself but its late and im tired
    try {
      files.forEach(file => {
        const filePath = `${dir}/${file}`;
        const newPath = path.join(__dirname + `/../inverted-index/index.json`);
        fs.readFile(filePath, (err, data) => {
          if (err) {
            throw err;
          }
          const content = JSON.parse(data.toString());
          const nestedContent = content.content;
          Object.keys(nestedContent).reduce((invertedIndex, term) => {
            if (invertedIndex.hasOwnProperty(term)) {
              invertedIndex[term] = {
                doc_freq: invertedIndex[term].doc_freq + nestedContent[term],
                postings_list: invertedIndex[term].postings_list.concat(
                  content.docId
                )
              };
            } else {
              invertedIndex[term] = {
                doc_freq: nestedContent[term],
                postings_list: [content.docId]
              };
            }
            return invertedIndex;
          }, finalInvertedIndex);
          jsonFile.writeFile(newPath, finalInvertedIndex, { spaces: 2 });
        });
      });
    } catch (err) {
      console.error("Something went wrong, sorry!", err);
    }
  });
};

module.exports = generateInvertedIndex;
