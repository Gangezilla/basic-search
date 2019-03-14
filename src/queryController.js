const fs = require("fs");
const { readFileAsync } = require("./helpers");
const { stemmer } = require("porter-port");

const findPostings = query => {
  // O(n^2) but its ok for now
  // plus i get this gut feeling that accessing the global object is bad
  // but its probably less bad than doing a file read every query.
  const parsedQuery = query.toLowerCase().split(" ");
  const invertedIndex = JSON.parse(global.invertedIndex);
  let tempIndex = {};
  Object.keys(invertedIndex).forEach(term => {
    parsedQuery.forEach(queryTerm => {
      if (term === queryTerm) {
        tempIndex = Object.assign(tempIndex, {
          [queryTerm]: invertedIndex[term]
        });
      }
    });
  });
  return tempIndex;
};

const findCommonPostings = postings => {
  // finding all occurences of each matched word and flattening
  const flattenedPostings = Object.keys(postings)
    .map(term => postings[term].postings_list)
    .flat(1);

  const count = {};
  flattenedPostings.forEach(num => {
    count[num] = count[num] ? count[num] + 1 : 1;
  });

  // find elements that appear the same number of times as the input arrays,
  // this will show us if the term has appeared in all the documents
  const numberOfMatchingDocuments = Object.keys(postings).length;
  const results = Object.keys(count).filter(
    num => count[num] >= numberOfMatchingDocuments
  );

  return results;
};

const getTermsInDocument = (filenames, queryTerms, resolve) => {
  Promise.all(filenames.map(filename => readFileAsync(filename))).then(
    files => {
      let termIndex = {};
      files.forEach(file => {
        const parsedFile = JSON.parse(file);
        const documentName = parsedFile.title;
        const text = parsedFile.text;

        const splitText = text.split(" ");
        const splitNormalisedText = text.toLowerCase().split(" ");
        const stemmedText = splitNormalisedText.map(term => stemmer(term));
        queryTerms.reduce((acc, term) => {
          const firstOccurence = stemmedText.findIndex(text => text === term);
          const termList = splitText.slice(
            firstOccurence - 5,
            firstOccurence + 6
          );
          termList[5] = `<mark>${termList[5]}</mark>`;
          if (acc.hasOwnProperty(documentName)) {
            return (acc[documentName][term] = termList.join(" "));
          } else {
            return Object.assign(acc, {
              [documentName]: {
                [term]: termList.join(" ")
              }
            });
          }
        }, termIndex);
      });
      resolve(termIndex);
    }
  );
};

const handleQuery = (req, res) => {
  const query = req.body.query;
  const documentIndex = global.documentIndex;

  const postings = findPostings(query);
  const commonPostings = findCommonPostings(postings);
  const matchedPhrases = Object.keys(postings);

  const filenames = commonPostings.map(num => documentIndex[num].filename);

  const finalResultPromise = new Promise(resolve => {
    getTermsInDocument(filenames, matchedPhrases, resolve);
  });

  const documentNames = Object.keys(documentIndex).reduce((acc, key) => {
    acc = Object.assign(acc, {
      [key]: documentIndex[key].documentName
    });
    return acc;
  }, {});
  const unmatchedPhrases = query
    .split(" ")
    .filter(x => !matchedPhrases.includes(x));

  Promise.resolve(finalResultPromise).then(result =>
    res.status(200).send({ result, postings, documentNames, unmatchedPhrases })
  );
};

module.exports = handleQuery;
