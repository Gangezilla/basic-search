const { step1A, step1B, step1C } = require("./stemmer");

describe("stemmer", () => {
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
