import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Product category schema. Define and edit the fields for the 'productCategory' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Category",
        subtitle: "Product Category",
      };
    },
  },
});
