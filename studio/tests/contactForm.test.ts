import { describe, expect, it } from "vitest";
import { contactForm } from "../src/schemaTypes/objects/contactForm";

describe("contactForm schema", () => {
  it("has all expected fields", () => {
    const fieldNames = contactForm.fields.map((f) => f.name);
    expect(fieldNames).toEqual(["heading", "text", "email", "fields"]);
  });

  it("accepts formField in fields array", () => {
    const fieldsField = contactForm.fields.find((f) => f.name === "fields");
    const types = (fieldsField as any).of.map((item: any) => item.type);
    expect(types).toEqual(["formField"]);
  });

  describe("email validation", () => {
    const emailField = contactForm.fields.find((f) => f.name === "email");
    const emailValidation = emailField!.validation as any;

    function extractCustomFn(validationFn: any) {
      let customFn: any;
      const mockRule = {
        required: () => mockRule,
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      validationFn(mockRule);
      return customFn;
    }

    it("rejects invalid email", () => {
      const customFn = extractCustomFn(emailValidation);
      const result = customFn("not-an-email");
      expect(result).toBe("Please enter a valid email address");
    });

    it("accepts valid email", () => {
      const customFn = extractCustomFn(emailValidation);
      const result = customFn("test@example.com");
      expect(result).toBe(true);
    });

    it("passes when value is empty", () => {
      const customFn = extractCustomFn(emailValidation);
      const result = customFn(undefined);
      expect(result).toBe(true);
    });
  });

  describe("preview.prepare", () => {
    const prepare = contactForm.preview!.prepare!;

    it("uses heading as title with Contact Form subtitle", () => {
      const result = prepare({ title: "Get in Touch" });
      expect(result.title).toBe("Get in Touch");
      expect(result.subtitle).toBe("Contact Form");
    });

    it("falls back when heading is empty", () => {
      const result = prepare({ title: undefined });
      expect(result.title).toBe("Untitled Contact Form");
    });
  });
});
