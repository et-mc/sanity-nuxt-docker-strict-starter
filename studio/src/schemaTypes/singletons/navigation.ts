import {MenuIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Navigation schema for managing site menus.
 * Supports multiple navigations (e.g. Header, Footer, Sidebar)
 * with either hierarchical menu items or custom blocks.
 */
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name for this navigation (e.g. "Header", "Footer", "Sidebar")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'menuItems',
      options: {
        list: [
          {title: 'Menu', value: 'menuItems'},
          {title: 'Blocks', value: 'blocks'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Menu',
      type: 'array',
      of: [defineArrayMember({type: 'navigationItem'})],
      hidden: ({parent}) => parent?.type !== 'menuItems',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{type: 'callToAction'}, {type: 'infoSection'}],
      options: {
        addItemLabel: 'Add block',
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
      hidden: ({parent}) => parent?.type !== 'blocks',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare({title, type}) {
      return {
        title: title || 'Untitled',
        subtitle: type === 'blocks' ? 'Blocks' : 'Menu',
      }
    },
  },
})
