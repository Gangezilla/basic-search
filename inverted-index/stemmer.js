// This is a port of the porter stemmer as found here: https://tartarus.org/martin/PorterStemmer/js.txt
// I wanted to rewrite this to get a better understanding of how a stemmer works

const consonant = "[^aeiou]";
const vowel = "[aeiouy]";
const consonantSequence = `${consonant}[^aeiouy]*`;
const vowelSequence = vowel + "[aeiouy]*";

const rootRegex = `^(${consonantSequence})?`;
const vowelInStem = `${rootRegex}${vowel}`;

const matchGroup0 = new RegExp(
  `${rootRegex}${vowelSequence}${consonantSequence}`
);
const matchGroup1 = new RegExp(
  `${rootRegex}${vowelSequence}${consonantSequence}${vowelSequence}${consonantSequence}`
);

const step1A = word => {
  // converts SSES -> SS, IES -> I, SS -> SS, S -> null
  let stemmedWord = word;
  const ssRegex = /^(.+?)(ss|i)es$/;
  const endingSRegex = /^(.+?)([^s])s$/;

  if (ssRegex.test(word)) {
    stemmedWord = stemmedWord.replace(ssRegex, "$1$2");
  } else if (endingSRegex.test(word)) {
    stemmedWord = stemmedWord.replace(endingSRegex, "$1$2");
  }
  return stemmedWord;
};

const step1B = word => {
  let stemmedWord = word;
  const eedRegex = /^(.+?)eed/;
  const edIngRegex = /^(.+?)(ed|ing)$/;
  if (eedRegex.test(word)) {
    // EED -> EE
    const [_, stem] = eedRegex.exec(stemmedWord);
    if (matchGroup0.test(stem)) {
      stemmedWord = stemmedWord.replace(/.$/, "");
    }
  } else if (edIngRegex.test(stemmedWord)) {
    // ED -> _, ING -> _
    const [_, stem] = edIngRegex.exec(word);
    const vowelInStemRegex = new RegExp(vowelInStem);
    if (vowelInStemRegex.test(stem)) {
      stemmedWord = stem;
      const vowelsOrOthers = new RegExp("([^aeiouylsz])\\1$");
      const vowelsUncommonEnding = new RegExp(
        `^${consonantSequence}${vowel}[^aeiouwxy]$`
      );
      if (
        /(at|bl|iz)$/.test(stemmedWord) ||
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
    const [_, stem] = yRegex.exec(word);
    const vowelInStemRegex = new RegExp(vowelInStem);
    if (vowelInStemRegex.test(stem)) {
      stemmedWord = stem + "i";
    }
  }
  return stemmedWord;
};

const step2 = word => {
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
  let stemmedWord = word;
  const regex = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  if (regex.test(word)) {
    const [_, stem, suffix] = regex.exec(word);
    if (matchGroup0.test(stem)) {
      stemmedWord = stem + step2List[suffix];
    }
  }
  return stemmedWord;
};

const step3 = word => {
  const step3List = {
    icate: "ic",
    ative: "",
    alize: "al",
    iciti: "ic",
    ical: "ic",
    ful: "",
    ness: ""
  };
  let stemmedWord = word;
  const wordEndRegex = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  if (wordEndRegex.test(word)) {
    const [_, stem, suffix] = wordEndRegex.exec(word);
    const matchGroupRegex = matchGroup0;
    if (matchGroupRegex.test(stem)) {
      stemmedWord = stem + step3List[suffix];
    }
  }
  return stemmedWord;
};

const step4 = word => {
  let stemmedWord = word;
  const wordEndingRegex = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  const regex = /^(.+?)(s|t)(ion)$/;
  if (wordEndingRegex.test(word)) {
    const [_, stem] = wordEndingRegex.exec(word);
    if (matchGroup1.test(stem)) {
      stemmedWord = stem;
    }
  } else if (regex.test(word)) {
    const [_, stem, suffix] = regex.exec(word);
    const rootWord = stem + suffix;
    if (matchGroup1.test(rootWord)) {
      stemmedWord = rootWord;
    }
  }
  return stemmedWord;
};

const step5 = word => {
  let stemmedWord = word;
  const re = /^(.+?)e$/;
  if (re.test(word)) {
    const [_, stem] = re.exec(word);
    const re2 = new RegExp(
      `${rootRegex}${vowelSequence}${consonantSequence}(${vowelSequence})?$`
    );
    const re3 = new RegExp("^" + consonantSequence + vowel + "[^aeiouwxy]$");
    if (matchGroup1.test(stem) || (re2.test(stem) && !re3.test(stem))) {
      stemmedWord = stem;
    }
  }

  const doubleLRegex = /ll$/;
  if (doubleLRegex.test(word) && matchGroup1.test(word)) {
    stemmedWord = stemmedWord.replace(/.$/, "");
  }

  return stemmedWord;
};

const stemmer = originalWord => {
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
  word = step2(word);
  word = step3(word);
  word = step4(word);
  word = step5(word);

  if (firstCharacter === "y") {
    word = firstCharacter.toLowerCase() + word.substr(1);
  }

  return word;
};

module.exports = {
  step1A,
  step1B,
  step1C,
  step2,
  step3,
  step4,
  step5,
  stemmer
};
