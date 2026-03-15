import {defineField, defineType} from 'sanity'
import {FeedbackIcon} from '@sanity/icons'

export const formBlock = defineType({
  name: 'formBlock',
  title: 'Form',
  type: 'object',
  icon: FeedbackIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{type: 'form'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      formTitle: 'form.title',
    },
    prepare({title, formTitle}) {
      return {
        title: title || formTitle || 'Untitled Form Block',
        subtitle: 'Form',
      }
    },
  },
})
