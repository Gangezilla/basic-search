const { step1A, step1B, step1C, step2 } = require("./stemmer");

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
});
