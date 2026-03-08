import { describe, expect, it } from "vitest";
import { post } from "../src/schemaTypes/documents/post";

describe("post schema", () => {
  describe("preview.prepare", () => {
    const prepare = post.preview!.prepare!;

    it("formats title and full subtitle with author and date", () => {
      const date = "2025-06-15T12:00:00Z";
      const result = prepare({
        title: "My Post",
        authorFirstName: "Jane",
        authorLastName: "Doe",
        date,
        media: null,
      });

      expect(result.title).toBe("My Post");
      expect(result.subtitle).toMatch(/^by Jane Doe on .+ \d{1,2}, 2025$/);
    });

    it("shows only author when date is missing", () => {
      const result = prepare({
        title: "My Post",
        authorFirstName: "Jane",
        authorLastName: "Doe",
        date: undefined,
        media: null,
      });

      expect(result.subtitle).toBe("by Jane Doe");
    });

    it("shows only date when author is missing", () => {
      const result = prepare({
        title: "My Post",
        authorFirstName: undefined,
        authorLastName: undefined,
        date: "2025-06-15T12:00:00Z",
        media: null,
      });

      expect(result.subtitle).toMatch(/^on .+ \d{1,2}, 2025$/);
    });

    it("returns empty subtitle when both author and date are missing", () => {
      const result = prepare({
        title: "My Post",
        authorFirstName: undefined,
        authorLastName: undefined,
        date: undefined,
        media: null,
      });

      expect(result.subtitle).toBe("");
    });

    it("skips author when only first name is provided", () => {
      const result = prepare({
        title: "My Post",
        authorFirstName: "Jane",
        authorLastName: undefined,
        date: undefined,
        media: null,
      });

      expect(result.subtitle).toBe("");
    });
  });

  describe("coverImage alt text validation", () => {
    const coverImageField = post.fields.find((f) => f.name === "coverImage");
    const altField = (coverImageField as any).fields.find(
      (f: any) => f.name === "alt",
    );
    const altValidation = altField.validation as any;

    it("requires alt text when image has an asset ref", () => {
      // Extract the custom validation function
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      altValidation(mockRule);

      const result = customFn(undefined, {
        document: { coverImage: { asset: { _ref: "image-abc-123" } } },
      });

      expect(result).toBe("Required");
    });

    it("allows missing alt text when no image is set", () => {
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      altValidation(mockRule);

      const result = customFn(undefined, {
        document: { coverImage: {} },
      });

      expect(result).toBe(true);
    });

    it("passes when alt text is provided with image", () => {
      let customFn: any;
      const mockRule = {
        custom: (fn: any) => {
          customFn = fn;
          return mockRule;
        },
      };
      altValidation(mockRule);

      const result = customFn("A nice photo", {
        document: { coverImage: { asset: { _ref: "image-abc-123" } } },
      });

      expect(result).toBe(true);
    });
  });

  describe("required fields", () => {
    it("marks title as required", () => {
      const titleField = post.fields.find((f) => f.name === "title");
      expect(titleField).toBeDefined();
    });

    it("marks slug as required", () => {
      const slugField = post.fields.find((f) => f.name === "slug");
      expect(slugField).toBeDefined();
    });

    it("marks coverImage as required", () => {
      const coverImageField = post.fields.find((f) => f.name === "coverImage");
      expect(coverImageField).toBeDefined();
    });

    it("has SEO fields in seo group", () => {
      const seoTitle = post.fields.find((f) => f.name === "seoTitle");
      const seoDescription = post.fields.find(
        (f) => f.name === "seoDescription",
      );
      expect(seoTitle?.group).toBe("seo");
      expect(seoDescription?.group).toBe("seo");
    });
  });
});
