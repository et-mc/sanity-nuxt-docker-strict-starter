import { describe, expect, it } from "vitest";
import { schemaTypes } from "../src/schemaTypes";

describe("schema registry", () => {
  it("exports all schema types", () => {
    const typeNames = schemaTypes.map((t) => t.name);
    expect(typeNames).toEqual([
      "settings",
      "page",
      "post",
      "person",
      "blockContent",
      "infoSection",
      "callToAction",
      "link",
    ]);
  });

  it("has correct number of schema types", () => {
    expect(schemaTypes).toHaveLength(8);
  });
});
