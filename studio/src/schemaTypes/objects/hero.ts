import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Hero schema object. A full-width hero section for use in the page builder.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: HomeIcon,
  validation: (Rule) =>
    Rule.custom((fields) => {
      const { buttonText, link } = fields || {};
      if ((buttonText && link) || (!buttonText && !link)) {
        return true;
      }
      return "Both Button text and Button link must be set, or both must be empty";
    }),
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
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
        },
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Button text",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Button link",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Hero",
        subtitle: "Hero",
        media,
      };
    },
  },
});
