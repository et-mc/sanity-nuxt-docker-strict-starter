import { describe, expect, it } from "vitest";
import { linkResolver } from "../app/lib/utils";

describe("linkResolver", () => {
  it("returns null for undefined input", () => {
    expect(linkResolver(undefined)).toBeNull();
  });

  it("resolves href links", () => {
    const link = {
      _type: "link" as const,
      linkType: "href" as const,
      href: "https://example.com",
    };
    expect(linkResolver(link)).toBe("https://example.com");
  });

  it("resolves page links", () => {
    const link = {
      _type: "link" as const,
      linkType: "page" as const,
      page: "about",
    };
    expect(linkResolver(link)).toBe("/about");
  });

  it("resolves post links", () => {
    const link = {
      _type: "link" as const,
      linkType: "post" as const,
      post: "hello-world",
    };
    expect(linkResolver(link)).toBe("/posts/hello-world");
  });

  it("defaults to href when linkType is unset but href exists", () => {
    const link = { _type: "link" as const, href: "https://example.com" };
    expect(linkResolver(link)).toBe("https://example.com");
  });

  it("returns null for href link without href value", () => {
    const link = { _type: "link" as const, linkType: "href" as const };
    expect(linkResolver(link)).toBeNull();
  });
});
