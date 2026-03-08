import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Product schema. Define and edit the fields for the 'product' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: BasketIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.image as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      group: "content",
    }),
    defineField({
      name: "link",
      title: "Buy Link",
      type: "link",
      group: "content",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description:
        "Title used for search engines and social media sharing (recommended: 50-60 characters)",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      description:
        "Description used for search engines and social media sharing (recommended: 150-160 characters)",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      categoryName: "category.name",
      media: "image",
    },
    prepare({ title, categoryName, media }) {
      return {
        title: title || "Untitled Product",
        subtitle: categoryName || "No category",
        media,
      };
    },
  },
});
