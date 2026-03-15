import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  fieldsets: [
    {
      name: 'header',
      title: 'Header',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
      fieldset: 'header',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'header',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'button',
          title: 'Button',
          fields: [
            defineField({
              name: 'buttonText',
              title: 'Button text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Button link',
              type: 'link',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'buttonText'},
          },
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title,
        subtitle: 'Call to Action',
      }
    },
  },
})
