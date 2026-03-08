import { describe, expect, it } from "vitest";
import { schemaTypes } from "../src/schemaTypes";

describe("schema registry", () => {
  it("exports all schema types", () => {
    const typeNames = schemaTypes.map((t) => t.name);
    expect(typeNames).toEqual([
      "settings",
      "navigation",
      "page",
      "post",
      "person",
      "product",
      "productCategory",
      "blockContent",
      "infoSection",
      "callToAction",
      "contactForm",
      "hero",
      "formField",
      "link",
      "navItem",
      "navGroup",
    ]);
  });

  it("has correct number of schema types", () => {
    expect(schemaTypes).toHaveLength(16);
  });
});
