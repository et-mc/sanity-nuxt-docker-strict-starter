import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Contact form schema object. A form section for use in the page builder.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
    defineField({
      name: "email",
      title: "Recipient Email",
      description: "The email address form submissions are sent to",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
          }
          return true;
        }),
    }),
    defineField({
      name: "fields",
      title: "Form Fields",
      type: "array",
      of: [{ type: "formField" }],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Contact Form",
        subtitle: "Contact Form",
      };
    },
  },
});
