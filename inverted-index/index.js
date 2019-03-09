const fs = require("fs");
const path = require("path");
const natural = require("natural");
const { stemmer } = require("porter-port");

console.log(stemmer("guidance"));

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
          __dirname + `/../term-doc-frequencies/${file.split(".")[0]}.index`
        );
        natural.PorterStemmer.attach();
        natural.LancasterStemmer.attach();

        const content = JSON.parse(fs.readFileSync(dir + "/" + file));
        const normalisedText = normaliseText(content.text);
        const stemmedText = normalisedText.tokenizeAndStem();
        const index = calculateTokenFrequency(stemmedText);
        fs.writeFile(newPath, JSON.stringify(index, null, 2), (err, _data) => {
          if (err) throw err;
        });
      });
    } catch (err) {
      console.error("Something went wrong sorry!", err);
    }
  });
};

module.exports = processDocuments;

// would like to write a stemmer and tokenizer tho.
