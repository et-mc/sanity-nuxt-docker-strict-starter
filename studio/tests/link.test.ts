import { describe, expect, it } from "vitest";
import { link } from "../src/schemaTypes/objects/link";

describe("link schema", () => {
  describe("href validation", () => {
    const hrefField = link.fields.find((f) => f.name === "href");
    const hrefValidation = hrefField!.validation as any;

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

    it("requires URL when link type is href", () => {
      const customFn = extractCustomFn(hrefValidation);
      const result = customFn(undefined, {
        parent: { linkType: "href" },
      });
      expect(result).toBe("URL is required when Link Type is URL");
    });

    it("passes when URL is provided for href type", () => {
      const customFn = extractCustomFn(hrefValidation);
      const result = customFn("https://example.com", {
        parent: { linkType: "href" },
      });
      expect(result).toBe(true);
    });

    it("does not require URL when link type is page", () => {
      const customFn = extractCustomFn(hrefValidation);
      const result = customFn(undefined, {
        parent: { linkType: "page" },
      });
      expect(result).toBe(true);
    });
  });

  describe("page reference validation", () => {
    const pageField = link.fields.find((f) => f.name === "page");
    const pageValidation = pageField!.validation as any;

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

    it("requires page reference when link type is page", () => {
      const customFn = extractCustomFn(pageValidation);
      const result = customFn(undefined, {
        parent: { linkType: "page" },
      });
      expect(result).toBe("Page reference is required when Link Type is Page");
    });

    it("passes when page reference is provided", () => {
      const customFn = extractCustomFn(pageValidation);
      const result = customFn(
        { _ref: "page-123" },
        {
          parent: { linkType: "page" },
        },
      );
      expect(result).toBe(true);
    });

    it("does not require page reference when link type is href", () => {
      const customFn = extractCustomFn(pageValidation);
      const result = customFn(undefined, {
        parent: { linkType: "href" },
      });
      expect(result).toBe(true);
    });
  });

  describe("post reference validation", () => {
    const postField = link.fields.find((f) => f.name === "post");
    const postValidation = postField!.validation as any;

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

    it("requires post reference when link type is post", () => {
      const customFn = extractCustomFn(postValidation);
      const result = customFn(undefined, {
        parent: { linkType: "post" },
      });
      expect(result).toBe("Post reference is required when Link Type is Post");
    });

    it("passes when post reference is provided", () => {
      const customFn = extractCustomFn(postValidation);
      const result = customFn(
        { _ref: "post-456" },
        {
          parent: { linkType: "post" },
        },
      );
      expect(result).toBe(true);
    });
  });

  describe("product reference validation", () => {
    const productField = link.fields.find((f) => f.name === "product");
    const productValidation = productField!.validation as any;

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

    it("requires product reference when link type is product", () => {
      const customFn = extractCustomFn(productValidation);
      const result = customFn(undefined, {
        parent: { linkType: "product" },
      });
      expect(result).toBe(
        "Product reference is required when Link Type is Product",
      );
    });

    it("passes when product reference is provided", () => {
      const customFn = extractCustomFn(productValidation);
      const result = customFn(
        { _ref: "product-789" },
        {
          parent: { linkType: "product" },
        },
      );
      expect(result).toBe(true);
    });

    it("does not require product reference when link type is href", () => {
      const customFn = extractCustomFn(productValidation);
      const result = customFn(undefined, {
        parent: { linkType: "href" },
      });
      expect(result).toBe(true);
    });
  });
});
