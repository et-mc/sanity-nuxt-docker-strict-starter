import { describe, expect, it } from "vitest";
import { callToAction } from "../src/schemaTypes/objects/callToAction";

describe("callToAction schema", () => {
  describe("object-level validation", () => {
    const validation = callToAction.validation as any;

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
        buttonText: "Click me",
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
      const result = customFn({ buttonText: "Click me" });
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
    const prepare = callToAction.preview!.prepare!;

    it("uses heading as title with CTA subtitle", () => {
      const result = prepare({ title: "Get Started" });
      expect(result.title).toBe("Get Started");
      expect(result.subtitle).toBe("Call to Action");
    });
  });
});
