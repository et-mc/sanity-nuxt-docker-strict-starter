import { describe, expect, it } from "vitest";
import { productCategory } from "../src/schemaTypes/documents/productCategory";

describe("productCategory schema", () => {
  it("has all expected fields", () => {
    const fieldNames = productCategory.fields.map((f) => f.name);
    expect(fieldNames).toEqual(["name", "slug", "description"]);
  });

  it("derives slug from name field", () => {
    const slugField = productCategory.fields.find((f) => f.name === "slug");
    expect((slugField as any).options?.source).toBe("name");
  });

  describe("preview.prepare", () => {
    const prepare = productCategory.preview!.prepare!;

    it("uses name as title", () => {
      const result = prepare({ title: "Electronics" });
      expect(result.title).toBe("Electronics");
      expect(result.subtitle).toBe("Product Category");
    });

    it("falls back when name is empty", () => {
      const result = prepare({ title: undefined });
      expect(result.title).toBe("Untitled Category");
    });
  });
});
