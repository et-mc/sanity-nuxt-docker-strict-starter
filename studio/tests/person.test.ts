import { describe, expect, it } from "vitest";
import { person } from "../src/schemaTypes/documents/person";

describe("person schema", () => {
  describe("preview.prepare", () => {
    const prepare = person.preview!.prepare!;

    it("concatenates first and last name", () => {
      const result = prepare({
        firstName: "Jane",
        lastName: "Doe",
        picture: null,
      });

      expect(result.title).toBe("Jane Doe");
      expect(result.subtitle).toBe("Person");
    });
  });

  describe("picture alt text validation", () => {
    const pictureField = person.fields.find((f) => f.name === "picture");
    const altField = (pictureField as any).fields.find(
      (f: any) => f.name === "alt",
    );
    const altValidation = altField.validation as any;

    it("requires alt text when picture has an asset ref", () => {
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      altValidation(mockRule);

      const result = customFn(undefined, {
        document: { picture: { asset: { _ref: "image-abc-123" } } },
      });

      expect(result).toBe("Required");
    });

    it("allows missing alt text when no picture is set", () => {
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      altValidation(mockRule);

      const result = customFn(undefined, {
        document: { picture: {} },
      });

      expect(result).toBe(true);
    });

    it("passes when alt text is provided", () => {
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      altValidation(mockRule);

      const result = customFn("Portrait photo", {
        document: { picture: { asset: { _ref: "image-abc-123" } } },
      });

      expect(result).toBe(true);
    });
  });
});
