import { describe, expect, it } from "vitest";
import * as demo from "../src/lib/initialValues";
import { settings } from "../src/schemaTypes/singletons/settings";

describe("settings schema", () => {
  describe("preview.prepare", () => {
    const prepare = settings.preview!.prepare!;

    it("always returns 'Settings' as title", () => {
      const result = prepare({});
      expect(result.title).toBe("Settings");
    });
  });

  describe("initial values", () => {
    it("uses demo title as initial value for title field", () => {
      const titleField = settings.fields.find((f) => f.name === "title");
      expect(titleField?.initialValue).toBe(demo.title);
    });

    it("uses demo description as initial value for description field", () => {
      const descriptionField = settings.fields.find(
        (f) => f.name === "description",
      );
      expect(descriptionField?.initialValue).toBe(demo.description);
    });
  });

  describe("description block annotations", () => {
    const descriptionField = settings.fields.find(
      (f) => f.name === "description",
    );
    const blockMember = (descriptionField as any).of[0];
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

    it("has link annotation with href, page, and post fields", () => {
      const fieldNames = linkAnnotation.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("linkType");
      expect(fieldNames).toContain("href");
      expect(fieldNames).toContain("page");
      expect(fieldNames).toContain("post");
      expect(fieldNames).toContain("openInNewTab");
    });

    it("validates href is required when link type is href", () => {
      const hrefField = linkAnnotation.fields.find(
        (f: any) => f.name === "href",
      );
      const customFn = extractCustomFn(hrefField.validation);
      const result = customFn(undefined, {
        parent: { linkType: "href" },
      });
      expect(result).toBe("URL is required when Link Type is URL");
    });

    it("validates page ref is required when link type is page", () => {
      const pageField = linkAnnotation.fields.find(
        (f: any) => f.name === "page",
      );
      const customFn = extractCustomFn(pageField.validation);
      const result = customFn(undefined, {
        parent: { linkType: "page" },
      });
      expect(result).toBe("Page reference is required when Link Type is Page");
    });

    it("validates post ref is required when link type is post", () => {
      const postField = linkAnnotation.fields.find(
        (f: any) => f.name === "post",
      );
      const customFn = extractCustomFn(postField.validation);
      const result = customFn(undefined, {
        parent: { linkType: "post" },
      });
      expect(result).toBe("Post reference is required when Link Type is Post");
    });
  });
});
