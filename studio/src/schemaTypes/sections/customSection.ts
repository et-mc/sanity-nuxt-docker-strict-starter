import {defineArrayMember, defineField, defineType} from 'sanity'
import {InlineElementIcon} from '@sanity/icons'
import {blockThumbnailUrl} from '../objects/blockThumbnails'

export const customSection = defineType({
  name: 'customSection',
  title: 'Custom Section',
  type: 'object',
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          title: 'Column',
          fields: [
            defineField({
              name: 'span',
              title: 'Column Width',
              type: 'number',
              description: 'Width on a 12-column grid. 6 = half, 12 = full, 4 = third',
              initialValue: 6,
              validation: (Rule) => Rule.required().min(1).max(12),
            }),
            defineField({
              name: 'blocks',
              title: 'Blocks',
              type: 'array',
              of: [
                defineArrayMember({type: 'textBlock'}),
                defineArrayMember({type: 'mediaBlock'}),
                defineArrayMember({type: 'cardBlock'}),
                defineArrayMember({type: 'formBlock'}),
              ],
              options: {
                insertMenu: {
                  views: [
                    {
                      name: 'grid',
                      previewImageUrl: blockThumbnailUrl,
                    },
                  ],
                },
              },
            }),
          ],
          preview: {
            select: {
              blocks: 'blocks',
              span: 'span',
            },
            prepare({blocks, span}) {
              const count = blocks?.length ?? 0
              return {
                title: `Column (span ${span ?? 6})`,
                subtitle: `${count} block${count === 1 ? '' : 's'}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
    },
    prepare({title, columns}) {
      const count = columns?.length ?? 0
      return {
        title: title || 'Custom Section',
        subtitle: `Custom Section · ${count} column${count === 1 ? '' : 's'}`,
      }
    },
  },
})
