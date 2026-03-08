import { describe, expect, it } from "vitest";
import { formField } from "../src/schemaTypes/objects/formField";

describe("formField schema", () => {
  it("has all expected fields", () => {
    const fieldNames = formField.fields.map((f) => f.name);
    expect(fieldNames).toEqual(["label", "fieldType", "required"]);
  });

  it("has radio layout for fieldType", () => {
    const fieldType = formField.fields.find((f) => f.name === "fieldType");
    expect((fieldType as any).options?.layout).toBe("radio");
  });

  it("has correct fieldType options", () => {
    const fieldType = formField.fields.find((f) => f.name === "fieldType");
    const values = (fieldType as any).options?.list.map(
      (item: any) => item.value,
    );
    expect(values).toEqual(["text", "email", "textarea"]);
  });

  describe("preview.prepare", () => {
    const prepare = formField.preview!.prepare!;

    it("shows label as title and fieldType as subtitle", () => {
      const result = prepare({
        title: "Your Name",
        fieldType: "text",
        required: false,
      });
      expect(result.title).toBe("Your Name");
      expect(result.subtitle).toBe("text");
    });

    it("shows (required) in subtitle when required", () => {
      const result = prepare({
        title: "Email",
        fieldType: "email",
        required: true,
      });
      expect(result.subtitle).toBe("email (required)");
    });

    it("falls back when label is empty", () => {
      const result = prepare({
        title: undefined,
        fieldType: undefined,
        required: false,
      });
      expect(result.title).toBe("Untitled Field");
    });
  });
});
