import { describe, expect, it } from "vitest";
import { infoSection } from "../src/schemaTypes/objects/infoSection";

describe("infoSection schema", () => {
  describe("preview.prepare", () => {
    const prepare = infoSection.preview!.prepare!;

    it("uses heading as title", () => {
      const result = prepare({ title: "About Us" });
      expect(result.title).toBe("About Us");
      expect(result.subtitle).toBe("Info Section");
    });

    it("falls back to 'Untitled Info Section' when heading is empty", () => {
      const result = prepare({ title: undefined });
      expect(result.title).toBe("Untitled Info Section");
    });

    it("falls back when heading is empty string", () => {
      const result = prepare({ title: "" });
      expect(result.title).toBe("Untitled Info Section");
    });
  });
});
