const {
  step1A,
  step1B,
  step1C,
  step2,
  step3,
  step4,
  step5,
  stemmer
} = require("./stemmer");

describe("stemmer", () => {
  describe("step 1", () => {
    describe("step1A", () => {
      test("ponies -> poni", () => {
        expect(step1A("ponies")).toBe("poni");
      });

      test("ties -> ti", () => {
        expect(step1A("ties")).toBe("ti");
      });

      test("caress -> caress", () => {
        expect(step1A("caress")).toBe("caress");
      });

      test("cats -> cat", () => {
        expect(step1A("cats")).toBe("cat");
      });
    });

    describe("step1B", () => {
      test("feed -> feed", () => {
        expect(step1B("feed")).toBe("feed");
      });

      test("agreed -> agree", () => {
        expect(step1B("agreed")).toBe("agree");
      });

      test("plastered -> plaster", () => {
        expect(step1B("plastered")).toBe("plaster");
      });

      test("bled -> bled", () => {
        expect(step1B("bled")).toBe("bled");
      });

      test("motoring -> motor", () => {
        expect(step1B("motoring")).toBe("motor");
      });

      test("sing -> sing", () => {
        expect(step1B("sing")).toBe("sing");
      });

      test("troubled -> trouble", () => {
        expect(step1B("troubled")).toBe("trouble");
      });

      test("sized -> size", () => {
        expect(step1B("sized")).toBe("size");
      });

      test("hopping -> hop", () => {
        expect(step1B("hopping")).toBe("hop");
      });

      test("tanned -> tan", () => {
        expect(step1B("tanned")).toBe("tan");
      });

      test("falling -> fall", () => {
        expect(step1B("falling")).toBe("fall");
      });

      test("hissing -> hiss", () => {
        expect(step1B("hissing")).toBe("hiss");
      });

      test("fizzed -> fizz", () => {
        expect(step1B("fizzed")).toBe("fizz");
      });

      test("failing -> fail", () => {
        expect(step1B("failing")).toBe("fail");
      });

      test("filing -> file", () => {
        expect(step1B("filing")).toBe("file");
      });
    });

    describe("step1C", () => {
      test("happy -> happi", () => {
        expect(step1C("happy")).toBe("happi");
      });

      test("sky -> sky", () => {
        expect(step1C("sky")).toBe("sky");
      });
    });
  });

  describe("step2", () => {
    test("relational -> relate", () => {
      expect(step2("relational")).toBe("relate");
    });

    test("rational -> rational", () => {
      expect(step2("rational")).toBe("rational");
    });

    test("valenci -> valence", () => {
      expect(step2("valenci")).toBe("valence");
    });

    test("hesitanci -> hesitance", () => {
      expect(step2("hesitanci")).toBe("hesitance");
    });

    test("digitizer -> digitize", () => {
      expect(step2("digitizer")).toBe("digitize");
    });

    test("conformabli -> conformable", () => {
      expect(step2("conformabli")).toBe("conformable");
    });

    test("radicalli -> radical", () => {
      expect(step2("radicalli")).toBe("radical");
    });

    test("differentli -> different", () => {
      expect(step2("differentli")).toBe("different");
    });

    test("vileli -> vile", () => {
      expect(step2("vileli")).toBe("vile");
    });

    test("analogousli -> analagous", () => {
      expect(step2("analogousli")).toBe("analogous");
    });

    test("vietnamization -> vietnamize", () => {
      expect(step2("vietnamization")).toBe("vietnamize");
    });

    test("predication -> predicate", () => {
      expect(step2("predication")).toBe("predicate");
    });

    test("operator -> operate", () => {
      expect(step2("operator")).toBe("operate");
    });

    test("feudalism -> feudal", () => {
      expect(step2("feudalism")).toBe("feudal");
    });

    test("decisiveness -> decisive", () => {
      expect(step2("decisiveness")).toBe("decisive");
    });

    test("hopefulness -> hopeful", () => {
      expect(step2("hopefulness")).toBe("hopeful");
    });

    test("callousness -> callous", () => {
      expect(step2("callousness")).toBe("callous");
    });

    test("formaliti -> formal", () => {
      expect(step2("formaliti")).toBe("formal");
    });

    test("sensitiviti -> sensitive", () => {
      expect(step2("sensitiviti")).toBe("sensitive");
    });

    test("sensibiliti -> sensible", () => {
      expect(step2("sensibiliti")).toBe("sensible");
    });
  });

  describe("step 3", () => {
    test("triplicate -> triplic", () => {
      expect(step3("triplicate")).toBe("triplic");
    });

    test("formative -> form", () => {
      expect(step3("formative")).toBe("form");
    });

    test("electriciti -> electricit", () => {
      expect(step3("electriciti")).toBe("electric");
    });

    test("electrical -> electric", () => {
      expect(step3("electrical")).toBe("electric");
    });

    test("hopeful -> hope", () => {
      expect(step3("hopeful")).toBe("hope");
    });

    test("goodness -> good", () => {
      expect(step3("goodness")).toBe("good");
    });
  });

  describe("step 4", () => {
    test("revival -> reviv", () => {
      expect(step4("revival")).toBe("reviv");
    });

    test("allowance -> allow", () => {
      expect(step4("allowance")).toBe("allow");
    });

    test("inference -> infer", () => {
      expect(step4("inference")).toBe("infer");
    });

    test("airliner -> airlin", () => {
      expect(step4("airliner")).toBe("airlin");
    });

    test("gyroscopic -> gyroscop", () => {
      expect(step4("gyroscopic")).toBe("gyroscop");
    });

    test("adjustable -> adjust", () => {
      expect(step4("adjustable")).toBe("adjust");
    });

    test("defensible -> defens", () => {
      expect(step4("defensible")).toBe("defens");
    });

    test("irritant -> irrit", () => {
      expect(step4("irritant")).toBe("irrit");
    });

    test("replacement -> replac", () => {
      expect(step4("replacement")).toBe("replac");
    });

    test("adjustment -> adjust", () => {
      expect(step4("adjustment")).toBe("adjust");
    });

    test("dependent -> depend", () => {
      expect(step4("dependent")).toBe("depend");
    });

    test("adoption -> adoption", () => {
      expect(step4("adoption")).toBe("adopt");
    });

    test("homologou -> homolog", () => {
      expect(step4("homologou")).toBe("homolog");
    });

    test("communism -> commun", () => {
      expect(step4("communism")).toBe("commun");
    });

    test("activate -> activ", () => {
      expect(step4("activate")).toBe("activ");
    });

    test("angulariti -> angular", () => {
      expect(step4("angulariti")).toBe("angular");
    });

    test("homologous -> homolog", () => {
      expect(step4("homologous")).toBe("homolog");
    });

    test("effective -> effect", () => {
      expect(step4("effective")).toBe("effect");
    });

    test("bowdlerize -> bowdler", () => {
      expect(step4("bowdlerize")).toBe("bowdler");
    });
  });

  describe("step5", () => {
    test("probate -> probat", () => {
      expect(step5("probate")).toBe("probat");
    });

    test("rate -> rate", () => {
      expect(step5("rate")).toBe("rate");
    });

    test("cease -> ceas", () => {
      expect(step5("cease")).toBe("ceas");
    });

    test("controll -> control", () => {
      expect(step5("controll")).toBe("control");
    });

    test("roll -> roll", () => {
      expect(step5("roll")).toBe("roll");
    });
  });

  describe("general stemming", () => {
    test("relate -> relat", () => {
      expect(stemmer("relate")).toBe("relat");
    });

    test("derivate -> deriv", () => {
      expect(stemmer("derivate")).toBe("deriv");
    });

    test("probate -> probat", () => {
      expect(stemmer("probate")).toBe("probat");
    });

    test("activate -> activ", () => {
      expect(stemmer("activate")).toBe("activ");
    });

    test("conflate -> conflat", () => {
      expect(stemmer("conflate")).toBe("conflat");
    });

    test("demonstrate -> demonstrat", () => {
      expect(stemmer("demonstrate")).toBe("demonstr");
    });

    test("pirate -> pirat", () => {
      expect(stemmer("pirate")).toBe("pirat");
    });

    test("necessitate -> necessit", () => {
      expect(stemmer("necessitate")).toBe("necessit");
    });

    test("prelate -> prelat", () => {
      expect(stemmer("prelate")).toBe("prelat");
    });

    test("renovate -> renov", () => {
      expect(stemmer("renovate")).toBe("renov");
    });
  });
});
