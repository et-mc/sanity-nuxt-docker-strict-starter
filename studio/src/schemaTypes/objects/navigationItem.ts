import {LinkIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Navigation item object schema.
 * Supports hierarchical (nested) menu items with drag-and-drop ordering.
 */
export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Relative or absolute URL. Use "#" for non-linking items.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from Iconify (e.g. "material-symbols:10k"). Browse at https://icon-sets.iconify.design/',
    }),
    defineField({
      name: 'children',
      title: 'Sub Items',
      type: 'array',
      of: [defineArrayMember({type: 'navigationItem'})],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
    },
  },
})
