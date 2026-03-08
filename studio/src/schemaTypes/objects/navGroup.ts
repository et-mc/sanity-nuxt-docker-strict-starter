import { MenuIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Navigation group schema object. A group of navigation links with a title, used in footers.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const navGroup = defineType({
  name: "navGroup",
  title: "Navigation Group",
  type: "object",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "navItem" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links }) {
      return {
        title: title || "Untitled Group",
        subtitle: `${links?.length || 0} links`,
      };
    },
  },
});
