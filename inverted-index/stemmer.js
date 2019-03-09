// This is a port of the porter stemmer as found here: https://tartarus.org/martin/PorterStemmer/js.txt
// I wanted to rewrite this to get a better understanding of how a stemmer works, as well as make the code a bit cleaner

const step2List = {
  ational: "ate",
  tional: "tion",
  enci: "ence",
  anci: "ance",
  izer: "ize",
  bli: "ble",
  alli: "al",
  entli: "ent",
  eli: "e",
  ousli: "ous",
  ization: "ize",
  ation: "ate",
  ator: "ate",
  alism: "al",
  iveness: "ive",
  fulness: "ful",
  ousness: "ous",
  aliti: "al",
  iviti: "ive",
  biliti: "ble",
  logi: "log"
};

const step3List = {
  icate: "ic",
  ative: "",
  alize: "al",
  iciti: "ic",
  ical: "ic",
  ful: "",
  ness: ""
};

const consonant = "[^aeiou]";
const vowel = "[aeiouy]";
const consonantSequence = consonant + "[^aeiouy]*";
const vowelSequence = vowel + "[aeiouy]*";

// no clue wtf these do, rename them when you understand them
// m is measure, which is a word or word part
const rootRegex = `^(${consonantSequence})?`;
//mgr0 is matchGroup0?
const matchGroup0 = `${rootRegex}${vowelSequence}${consonantSequence}`;
const meq1 = `${rootRegex}${vowelSequence}${consonantSequence}(${vowelSequence})?$`;
const mgr1 = `${rootRegex}${vowelSequence}${consonantSequence}${vowelSequence}${consonantSequence}`;
const vowelInStem = `${rootRegex}${vowel}`;

const step1A = word => {
  // converts SSES -> SS, IES -> I, SS -> SS, S -> null
  let stemmedWord = word;
  const re = /^(.+?)(ss|i)es$/;
  const re2 = /^(.+?)([^s])s$/;

  if (re.test(word)) {
    stemmedWord = stemmedWord.replace(re, "$1$2");
  } else if (re2.test(word)) {
    stemmedWord = stemmedWord.replace(re2, "$1$2");
  }
  return stemmedWord;
};

const step1B = word => {
  let stemmedWord = word;
  const eedRegex = /^(.+?)eed/;
  const edIngRegex = /^(.+?)(ed|ing)$/;
  if (eedRegex.test(word)) {
    // EED -> EE
    const matchGroupRegex = new RegExp(matchGroup0);
    const matches = eedRegex.exec(stemmedWord);
    if (matchGroupRegex.test(matches[1])) {
      stemmedWord = stemmedWord.replace(/.$/, "");
    }
  } else if (edIngRegex.test(stemmedWord)) {
    // ED -> _, ING -> _
    const matches = edIngRegex.exec(word);
    const stem = matches[1];
    const vowelInStemRegex = new RegExp(vowelInStem);
    if (vowelInStemRegex.test(stem)) {
      stemmedWord = stem;
      const atBlIzRegex = /(at|bl|iz)$/;
      const vowelsOrOthers = new RegExp("([^aeiouylsz])\\1$");
      const vowelsUncommonEnding = new RegExp(
        `^${consonantSequence}${vowel}[^aeiouwxy]$`
      );
      if (
        atBlIzRegex.test(stemmedWord) ||
        vowelsUncommonEnding.test(stemmedWord)
      ) {
        stemmedWord = `${stemmedWord}e`;
      } else if (vowelsOrOthers.test(stemmedWord)) {
        stemmedWord = stemmedWord.replace(/.$/, "");
      }
    }
  }
  return stemmedWord;
};

const step1C = word => {
  // Y -> I
  let stemmedWord = word;
  const yRegex = /^(.+?)y$/;
  if (yRegex.test(word)) {
    var matches = yRegex.exec(word);
    const stem = matches[1];
    const vowelInStemRegex = new RegExp(vowelInStem);
    if (vowelInStemRegex.test(stem)) {
      stemmedWord = stem + "i";
    }
  }
  return stemmedWord;
};

const step2 = word => {
  let stemmedWord = word;
  const step2Regex = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  if (step2Regex.test(word)) {
    const [_, stem, suffix] = step2Regex.exec(word);
    const matchGroupRegex = new RegExp(matchGroup0);
    if (matchGroupRegex.test(stem)) {
      stemmedWord = stem + step2List[suffix];
    }
  }
  return stemmedWord;
};

const stemmer = originalWord => {
  let stem;
  let suffix;
  let firstch;
  let re;
  let re2;
  let re3;
  let re4;
  let word = originalWord;

  if (word.length < 3) {
    return word;
  }

  firstCharacter = word.substr(0, 1);
  if (firstCharacter === "y") {
    word = firstCharacter.toUpperCase() + word.substr(1);
  }

  word = step1A(word);
  word = step1B(word);
  word = step1C(word);

  return word;
};

module.exports = {
  step1A,
  step1B,
  step1C,
  step2,
  stemmer
};
