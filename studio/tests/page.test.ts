import { describe, expect, it } from "vitest";
import { page } from "../src/schemaTypes/documents/page";

describe("page schema", () => {
  it("has content and seo groups", () => {
    const groupNames = page.groups!.map((g) => g.name);
    expect(groupNames).toEqual(["content", "seo"]);
  });

  it("has all expected fields", () => {
    const fieldNames = page.fields.map((f) => f.name);
    expect(fieldNames).toEqual([
      "name",
      "slug",
      "heading",
      "subheading",
      "pageBuilder",
      "seoTitle",
      "seoDescription",
    ]);
  });

  it("has SEO fields in seo group", () => {
    const seoTitle = page.fields.find((f) => f.name === "seoTitle");
    const seoDescription = page.fields.find((f) => f.name === "seoDescription");
    expect(seoTitle?.group).toBe("seo");
    expect(seoDescription?.group).toBe("seo");
  });

  it("derives slug from name field", () => {
    const slugField = page.fields.find((f) => f.name === "slug");
    expect((slugField as any).options?.source).toBe("name");
  });

  it("accepts callToAction and infoSection in pageBuilder", () => {
    const pageBuilder = page.fields.find((f) => f.name === "pageBuilder");
    const types = (pageBuilder as any).of.map((item: any) => item.type);
    expect(types).toEqual(["callToAction", "infoSection"]);
  });

  it("generates thumbnail URLs for page builder insert menu", () => {
    const pageBuilder = page.fields.find((f) => f.name === "pageBuilder");
    const gridView = (pageBuilder as any).options.insertMenu.views[0];
    expect(gridView.name).toBe("grid");
    expect(gridView.previewImageUrl("callToAction")).toBe(
      "/static/page-builder-thumbnails/callToAction.webp",
    );
    expect(gridView.previewImageUrl("infoSection")).toBe(
      "/static/page-builder-thumbnails/infoSection.webp",
    );
  });
});
