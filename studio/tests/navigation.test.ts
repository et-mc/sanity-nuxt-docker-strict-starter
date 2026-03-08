import { describe, expect, it } from "vitest";
import { navigation } from "../src/schemaTypes/singletons/navigation";

describe("navigation schema", () => {
  it("has all expected fields", () => {
    const fieldNames = navigation.fields.map((f) => f.name);
    expect(fieldNames).toEqual(["headerLinks", "footerGroups"]);
  });

  it("accepts navItem in headerLinks", () => {
    const headerLinks = navigation.fields.find((f) => f.name === "headerLinks");
    const types = (headerLinks as any).of.map((item: any) => item.type);
    expect(types).toEqual(["navItem"]);
  });

  it("accepts navGroup in footerGroups", () => {
    const footerGroups = navigation.fields.find(
      (f) => f.name === "footerGroups",
    );
    const types = (footerGroups as any).of.map((item: any) => item.type);
    expect(types).toEqual(["navGroup"]);
  });

  describe("preview.prepare", () => {
    const prepare = navigation.preview!.prepare!;

    it("always returns Navigation as title", () => {
      const result = prepare({});
      expect(result.title).toBe("Navigation");
    });
  });
});
