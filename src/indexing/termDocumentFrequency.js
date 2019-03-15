const path = require("path");
const { stemmer } = require("porter-port");
const jsonFile = require("jsonfile");
const { readdirAsync, readFileAsync } = require("../helpers");

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
  readdirAsync(dir)
    .then(filenames => {
      const pathName = filename =>
        path.join(__dirname + "/../documents/" + filename);

      return Promise.all(
        filenames.map(filename => readFileAsync(pathName(filename)))
      );
    })
    .then(files => {
      files.forEach(file => {
        const content = JSON.parse(file);
        const newPath = path.join(
          __dirname + `/../term-doc-frequencies/${content.filename}`
        );
        const normalisedText = normaliseText(content.text);
        const tokenizedText = tokenizeText(normalisedText);
        const stemmedText = tokenizedText.map(word => stemmer(word));
        const termDocFreqIndex = calculateTokenFrequency(stemmedText);
        const docId = content.id;
        const toWrite = {
          docId: docId,
          content: termDocFreqIndex
        };
        jsonFile.writeFile(newPath, toWrite, { spaces: 2 }, err => {
          if (err) console.error(err);
        });
      });
    });
};

module.exports = processDocuments;
