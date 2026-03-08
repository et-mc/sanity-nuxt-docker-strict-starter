import { describe, expect, it } from "vitest";
import { navGroup } from "../src/schemaTypes/objects/navGroup";

describe("navGroup schema", () => {
  it("has all expected fields", () => {
    const fieldNames = navGroup.fields.map((f) => f.name);
    expect(fieldNames).toEqual(["title", "links"]);
  });

  it("accepts navItem in links array", () => {
    const linksField = navGroup.fields.find((f) => f.name === "links");
    const types = (linksField as any).of.map((item: any) => item.type);
    expect(types).toEqual(["navItem"]);
  });

  describe("preview.prepare", () => {
    const prepare = navGroup.preview!.prepare!;

    it("shows title and link count", () => {
      const result = prepare({
        title: "Resources",
        links: [{}, {}, {}],
      });
      expect(result.title).toBe("Resources");
      expect(result.subtitle).toBe("3 links");
    });

    it("shows 0 links when empty", () => {
      const result = prepare({ title: "Empty", links: undefined });
      expect(result.subtitle).toBe("0 links");
    });

    it("falls back when title is empty", () => {
      const result = prepare({ title: undefined, links: [] });
      expect(result.title).toBe("Untitled Group");
    });
  });
});
