import {ControlsIcon} from '@sanity/icons'
import {defineField, defineArrayMember, defineType} from 'sanity'

export const variantType = defineType({
  name: 'variantType',
  title: 'Variant Type',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Color, Size, Material',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      description: 'Predefined options for this variant type',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variantTypeOption',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Display name, e.g. "Red", "Large"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Machine-readable value, e.g. "red", "lg"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).error('Add at least one option'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      options: 'options',
    },
    prepare({title, options}) {
      const count = options?.length ?? 0
      return {
        title,
        subtitle: `${count} option${count === 1 ? '' : 's'}`,
      }
    },
  },
})
