import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Text',
        subtitle: 'Text',
      }
    },
  },
})
