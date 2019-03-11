const parseQuery = query => {};

const handleQuery = (req, res) => {
  const invertedIndex = global.invertedIndex;
  const query = req.body.query;
  const isSingleWord = query.match(/NOT|OR|AND/);
  const onlyAnd = query.match(/^((?!(OR|NOT)).)*$/);
  const onlyOr = query.match(/^((?!(NOT|AND)).)*$/);
  if (isSingleWord === null) {
    const normalisedQuery = query.toLowerCase();
    const location = invertedIndex[normalisedQuery];
    if (location) {
      res.status(200);
      res.json(location);
    } else {
      res.sendStatus(404);
    }
  } else if (onlyAnd) {
    const normalisedQuery = query
      .split("AND")
      .map(term => term.toLowerCase().trim());
    console.log(normalisedQuery);
    Object.keys(invertedIndex).forEach(term => {
      // console.log(term);
    });
    res.sendStatus(200);
  }
  // parseQuery(query);
};
// one word
// multiple words with AND
// multiple words with OR
// multiple words with NOT
// probably need to clean the query up a bit, do it here and then maybe do it on the FE later?
// or just do it here, then send the cleaned query to the FE and display it there.
// split by AND and OR then lowercase

// if we've only got AND, then we find the indexes for each term in the index, then get the intersection
// if we've only got OR then we find the indexes for each term in the index, then get the diff
// if we've only got NOT then we find the indexes for each term in the index... dunno...
// anyway, if we get these, we can then start splitting the query up using some regex magic, or like some bigram sorta shit
// then stitch it together.

// for (var key in myObj){
//   if (key == selUser){
//       for (var date in myObj[key]["dates & times"]){
//           console.log("Date: " + date + "; " + "weight: " + myObj[key]["dates & times"][date]);
//           var dtTag = "<dt class=\"date\"><span>Date: </span>" + date + " </dt>";
//           var ddTag = "<dd class=\"value\"><span>Time: </span>" + myObj[key]["dates & times"][date] + "</dd>";
//           output.innerHTML += dtTag;
//           output.innerHTML += ddTag;
//       }
//   } // if
// }

module.exports = handleQuery;
