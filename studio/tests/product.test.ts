import { describe, expect, it } from "vitest";
import { product } from "../src/schemaTypes/documents/product";

describe("product schema", () => {
  it("has content and seo groups", () => {
    const groupNames = product.groups!.map((g) => g.name);
    expect(groupNames).toEqual(["content", "seo"]);
  });

  it("has all expected fields", () => {
    const fieldNames = product.fields.map((f) => f.name);
    expect(fieldNames).toEqual([
      "name",
      "slug",
      "description",
      "price",
      "image",
      "category",
      "link",
      "seoTitle",
      "seoDescription",
    ]);
  });

  it("has SEO fields in seo group", () => {
    const seoTitle = product.fields.find((f) => f.name === "seoTitle");
    const seoDescription = product.fields.find(
      (f) => f.name === "seoDescription",
    );
    expect(seoTitle?.group).toBe("seo");
    expect(seoDescription?.group).toBe("seo");
  });

  it("derives slug from name field", () => {
    const slugField = product.fields.find((f) => f.name === "slug");
    expect((slugField as any).options?.source).toBe("name");
  });

  describe("preview.prepare", () => {
    const prepare = product.preview!.prepare!;

    it("uses name as title and category as subtitle", () => {
      const result = prepare({
        title: "Widget",
        categoryName: "Gadgets",
        media: null,
      });
      expect(result.title).toBe("Widget");
      expect(result.subtitle).toBe("Gadgets");
    });

    it("falls back when name is empty", () => {
      const result = prepare({
        title: undefined,
        categoryName: undefined,
        media: null,
      });
      expect(result.title).toBe("Untitled Product");
      expect(result.subtitle).toBe("No category");
    });
  });

  describe("image alt text validation", () => {
    const imageField = product.fields.find((f) => f.name === "image");
    const altField = (imageField as any).fields.find(
      (f: any) => f.name === "alt",
    );

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

    it("requires alt text when image has asset", () => {
      const customFn = extractCustomFn(altField.validation);
      const result = customFn(undefined, {
        document: { image: { asset: { _ref: "image-123" } } },
      });
      expect(result).toBe("Required");
    });

    it("allows empty alt when no image set", () => {
      const customFn = extractCustomFn(altField.validation);
      const result = customFn(undefined, {
        document: { image: {} },
      });
      expect(result).toBe(true);
    });
  });
});
