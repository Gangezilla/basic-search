// const stemmer = require("./stemmer");
// const tokenizer = require("./tokenizer");
const Snowball = require("snowball");
const fs = require("fs");
const path = require("path");

const stemmer = new Snowball("English");
// stemmer.setCurrent("guidance hello boys");
// stemmer.stem();
// console.log(stemmer.getCurrent());

const processDocuments = () => {
  const dir = path.join(__dirname + "/../documents");
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      const content = JSON.parse(fs.readFileSync(dir + "/" + file));
      stemmer.setCurrent(content.text);
      // stemmer.setCurrent("Creeps in this petty pace day by day");
      stemmer.stem();
      // console.log(stemmer.getCurrent());
    });
  });
};

module.exports = processDocuments;

// read file in from FS, run snowball
// generate a new inverted index JSON file.
