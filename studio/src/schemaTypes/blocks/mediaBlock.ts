import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const mediaBlock = defineType({
  name: 'mediaBlock',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Untitled Media',
        subtitle: 'Media',
        media,
      }
    },
  },
})
