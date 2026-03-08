import { describe, expect, it } from "vitest";
import { navItem } from "../src/schemaTypes/objects/navItem";

describe("navItem schema", () => {
  it("has all expected fields", () => {
    const fieldNames = navItem.fields.map((f) => f.name);
    expect(fieldNames).toEqual(["label", "link"]);
  });

  it("uses link type for link field", () => {
    const linkField = navItem.fields.find((f) => f.name === "link");
    expect(linkField?.type).toBe("link");
  });

  describe("preview.prepare", () => {
    const prepare = navItem.preview!.prepare!;

    it("uses label as title", () => {
      const result = prepare({ title: "About Us" });
      expect(result.title).toBe("About Us");
    });

    it("falls back when label is empty", () => {
      const result = prepare({ title: undefined });
      expect(result.title).toBe("Untitled Link");
    });
  });
});
