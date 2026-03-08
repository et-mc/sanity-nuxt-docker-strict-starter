import { describe, expect, it } from "vitest";
import { blockContent } from "../src/schemaTypes/objects/blockContent";

describe("blockContent schema", () => {
  const blockMember = (blockContent as any).of[0];
  const linkAnnotation = blockMember.marks.annotations.find(
    (a: any) => a.name === "link",
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

  it("has a link annotation with all required fields", () => {
    const fieldNames = linkAnnotation.fields.map((f: any) => f.name);
    expect(fieldNames).toEqual([
      "linkType",
      "href",
      "page",
      "post",
      "product",
      "openInNewTab",
    ]);
  });

  it("defaults linkType to href", () => {
    const linkTypeField = linkAnnotation.fields.find(
      (f: any) => f.name === "linkType",
    );
    expect(linkTypeField.initialValue).toBe("href");
  });

  it("validates href is required when link type is href", () => {
    const hrefField = linkAnnotation.fields.find((f: any) => f.name === "href");
    const customFn = extractCustomFn(hrefField.validation);

    expect(customFn(undefined, { parent: { linkType: "href" } })).toBe(
      "URL is required when Link Type is URL",
    );

    expect(
      customFn("https://example.com", { parent: { linkType: "href" } }),
    ).toBe(true);
  });

  it("validates page ref is required when link type is page", () => {
    const pageField = linkAnnotation.fields.find((f: any) => f.name === "page");
    const customFn = extractCustomFn(pageField.validation);

    expect(customFn(undefined, { parent: { linkType: "page" } })).toBe(
      "Page reference is required when Link Type is Page",
    );

    expect(
      customFn({ _ref: "page-123" }, { parent: { linkType: "page" } }),
    ).toBe(true);
  });

  it("validates post ref is required when link type is post", () => {
    const postField = linkAnnotation.fields.find((f: any) => f.name === "post");
    const customFn = extractCustomFn(postField.validation);

    expect(customFn(undefined, { parent: { linkType: "post" } })).toBe(
      "Post reference is required when Link Type is Post",
    );

    expect(
      customFn({ _ref: "post-456" }, { parent: { linkType: "post" } }),
    ).toBe(true);
  });

  it("defaults openInNewTab to false", () => {
    const openInNewTab = linkAnnotation.fields.find(
      (f: any) => f.name === "openInNewTab",
    );
    expect(openInNewTab.initialValue).toBe(false);
  });
});
