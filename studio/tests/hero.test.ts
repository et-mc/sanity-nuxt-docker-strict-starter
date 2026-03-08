import { describe, expect, it } from "vitest";
import { hero } from "../src/schemaTypes/objects/hero";

describe("hero schema", () => {
  it("has all expected fields", () => {
    const fieldNames = hero.fields.map((f) => f.name);
    expect(fieldNames).toEqual([
      "heading",
      "tagline",
      "image",
      "buttonText",
      "link",
    ]);
  });

  describe("object-level validation", () => {
    const validation = hero.validation as any;

    function extractCustomFn(validationFn: any) {
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      validationFn(mockRule);
      return customFn;
    }

    it("passes when both buttonText and link are set", () => {
      const customFn = extractCustomFn(validation);
      const result = customFn({
        buttonText: "Learn More",
        link: { href: "https://example.com" },
      });
      expect(result).toBe(true);
    });

    it("passes when both buttonText and link are empty", () => {
      const customFn = extractCustomFn(validation);
      const result = customFn({});
      expect(result).toBe(true);
    });

    it("fails when buttonText is set but link is missing", () => {
      const customFn = extractCustomFn(validation);
      const result = customFn({ buttonText: "Learn More" });
      expect(result).toBe(
        "Both Button text and Button link must be set, or both must be empty",
      );
    });

    it("fails when link is set but buttonText is missing", () => {
      const customFn = extractCustomFn(validation);
      const result = customFn({
        link: { href: "https://example.com" },
      });
      expect(result).toBe(
        "Both Button text and Button link must be set, or both must be empty",
      );
    });

    it("passes when fields are undefined", () => {
      const customFn = extractCustomFn(validation);
      const result = customFn(undefined);
      expect(result).toBe(true);
    });
  });

  describe("preview.prepare", () => {
    const prepare = hero.preview!.prepare!;

    it("uses heading as title with Hero subtitle", () => {
      const result = prepare({ title: "Welcome", media: null });
      expect(result.title).toBe("Welcome");
      expect(result.subtitle).toBe("Hero");
    });

    it("falls back when heading is empty", () => {
      const result = prepare({ title: undefined, media: null });
      expect(result.title).toBe("Untitled Hero");
      expect(result.subtitle).toBe("Hero");
    });
  });
});
