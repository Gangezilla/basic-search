const fs = require("fs");

const findPostings = query => {
  // O(n^2) but its ok for now
  // plus i get this gut feeling that accessing the global object is bad
  // but its probably less bad than doing a file read every query.
  const invertedIndex = JSON.parse(global.invertedIndex);
  const parsedQuery = query.toLowerCase().split(" ");
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
  // finding all occurences of each matched word
  const allPostings = Object.keys(postings).map(
    term => postings[term].postings_list
  );

  // flattening the array and counting the number of occurences
  const flattenedPostings = [].concat.apply([], allPostings);
  const count = {};
  flattenedPostings.forEach(num => {
    count[num] = count[num] ? count[num] + 1 : 1;
  });

  // find elements that appear the same number of times as the input arrays,
  // this will show us if the term has appeared in all the documents documents
  const numberOfMatchingDocuments = Object.keys(postings).length;
  const results = Object.keys(count).filter(
    num => count[num] >= numberOfMatchingDocuments
  );

  return results;
};

const getTermsInDocument = documents => {
  let termIndex = {};
  documents.forEach(doc => {
    fs.readFile(doc, "utf-8", (err, data) => {
      const content = JSON.parse(data);
      // console.log(content);
    });
  });
};

const handleQuery = (req, res) => {
  const query = req.body.query;
  const postings = findPostings(query);
  const commonPostings = findCommonPostings(postings);
  console.log(commonPostings);
  const documents = commonPostings.map(
    num => global.documentIndex[num].filename
  );
  console.log(documents);
  getTermsInDocument(documents);

  res.sendStatus(200);
};

module.exports = handleQuery;
