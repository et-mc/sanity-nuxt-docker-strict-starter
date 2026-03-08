import { MenuIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Navigation schema Singleton. Manages header and footer navigation links.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "headerLinks",
      title: "Header Links",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "footerGroups",
      title: "Footer Groups",
      type: "array",
      of: [{ type: "navGroup" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation",
      };
    },
  },
});
