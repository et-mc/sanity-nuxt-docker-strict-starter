import {defineArrayMember, defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const cards = defineType({
  name: 'cards',
  title: 'Cards',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small accent text above the title, e.g. "Aviation & Aircraft"',
    }),
    defineField({
      name: 'heading',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({type: 'cardBlock'})],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Cards',
        subtitle: 'Cards',
      }
    },
  },
})
