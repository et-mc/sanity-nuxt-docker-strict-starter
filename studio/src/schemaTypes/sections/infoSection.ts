import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  icon: TextIcon,
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
      fieldset: 'header',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
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
      subtitle: 'subheading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Info Section',
        subtitle: 'Info Section',
      }
    },
  },
})
