import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Navigation item schema object. A single navigation link with label.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Link",
      };
    },
  },
});
