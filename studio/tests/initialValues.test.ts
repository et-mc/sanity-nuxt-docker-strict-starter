import { describe, expect, it } from "vitest";
import { description, ogImageTitle, title } from "../src/lib/initialValues";

describe("initial values", () => {
  it("has a title", () => {
    expect(title).toBe("Sanity + Nuxt");
  });

  it("has an OG image title", () => {
    expect(ogImageTitle).toBe("A Nuxt + Sanity Website");
  });

  it("has a description with valid portable text structure", () => {
    expect(description).toHaveLength(1);
    expect(description[0]._type).toBe("block");
    expect(description[0].children.length).toBeGreaterThan(0);
    expect(description[0].markDefs.length).toBe(2);
  });

  it("contains links to Nuxt and Sanity in the description", () => {
    const hrefs = description[0].markDefs.map((m) => m.href);
    expect(hrefs).toContain("https://nuxt.com/");
    expect(hrefs).toContain("https://sanity.io/");
  });
});
