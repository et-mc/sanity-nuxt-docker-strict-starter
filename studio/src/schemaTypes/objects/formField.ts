import { EditIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Form field schema object. Defines a single field in a contact form.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const formField = defineType({
  name: "formField",
  title: "Form Field",
  type: "object",
  icon: EditIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fieldType",
      title: "Field Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Text Area", value: "textarea" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      fieldType: "fieldType",
      required: "required",
    },
    prepare({ title, fieldType, required }) {
      return {
        title: title || "Untitled Field",
        subtitle: `${fieldType || "text"}${required ? " (required)" : ""}`,
      };
    },
  },
});
