const fs = require("fs");
const path = require("path");
const { stemmer } = require("porter-port");
const jsonFile = require("jsonfile");

const calculateTokenFrequency = tokens => {
  const unsortedTokens = tokens.reduce((count, word) => {
    count[word] = (count[word] || 0) + 1;
    return count;
  }, {});

  const sortedTokens = {};
  Object.keys(unsortedTokens)
    .sort()
    .forEach(key => (sortedTokens[key] = unsortedTokens[key]));
  return sortedTokens;
};

const tokenizeText = text => text.split(" ");

const normaliseText = text =>
  text.toLowerCase().replace(/[.,\/#!?$%\^&\*;:\[\]{}=\-_`~()"']/gm, "");

const processDocuments = () => {
  const dir = path.join(__dirname + "/../documents");
  fs.readdir(dir, (err, files) => {
    try {
      files.forEach(file => {
        const newPath = path.join(
          __dirname + `/../term-doc-frequencies/${file.split(".")[0]}.json`
        );
        const docId = files.findIndex(fileIndex => fileIndex === file);
        const content = JSON.parse(fs.readFileSync(dir + "/" + file));
        const normalisedText = normaliseText(content.text);
        const tokenizedText = tokenizeText(normalisedText);
        const stemmedText = tokenizedText.map(word => stemmer(word));
        const termDocFreqIndex = calculateTokenFrequency(stemmedText);
        const toWrite = {
          docId: docId,
          content: termDocFreqIndex
        };
        jsonFile.writeFile(newPath, toWrite, { spaces: 2 }, function(err) {
          if (err) console.error(err);
        });
      });
    } catch (err) {
      console.error("Something went wrong, sorry!", err);
    }
  });
};

module.exports = processDocuments;
