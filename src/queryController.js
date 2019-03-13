const fs = require("fs");
const { readFileAsync } = require("./helpers");

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

const getTermsInDocument = (filenames, queryTerms) => {
  Promise.all(filenames.map(filename => readFileAsync(filename))).then(
    files => {
      files.forEach(file => {
        const parsedFile = JSON.parse(file);
        const text = parsedFile.text;
        // console.log(text);
        // find word(s) in text, get words around them.
        const splitText = text.toLowerCase().split(" ");
        // splitText.forEach(docTerm => {
        //   queryTerms.forEach(term => {
        //     if (docTerm === term) {
        //       console.log("!!!!!!!!!!");
        //     }
        //   });
        // });
        console.log(splitText);
      });
    }
  );
};

const handleQuery = (req, res) => {
  const query = req.body.query;
  const postings = findPostings(query);
  const commonPostings = findCommonPostings(postings);
  const matchedPhrases = Object.keys(postings);
  const filenames = commonPostings.map(
    num => global.documentIndex[num].filename
  );
  getTermsInDocument(filenames, matchedPhrases);
  // want to also get non-matched phrases and chuck them back too.

  res.sendStatus(200);
};

module.exports = handleQuery;
