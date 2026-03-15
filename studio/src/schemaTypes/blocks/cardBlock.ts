import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const cardBlock = defineType({
  name: 'cardBlock',
  title: 'Card',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Card',
        subtitle: 'Card',
      }
    },
  },
})
