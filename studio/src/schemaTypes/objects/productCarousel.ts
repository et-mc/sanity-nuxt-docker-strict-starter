import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const productCarousel = defineType({
  name: 'productCarousel',
  title: 'Product Carousel',
  type: 'object',
  icon: InlineIcon,
  fieldsets: [
    {
      name: 'display',
      title: 'Display',
      options: {columns: 2},
    },
    {
      name: 'filter',
      title: 'Filter Products',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section heading. Defaults to the collection name if left empty.',
      fieldset: 'display',
    }),
    defineField({
      name: 'viewAllText',
      title: 'View All Text',
      type: 'string',
      description: 'Defaults to "View All"',
      fieldset: 'display',
    }),
    defineField({
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'link',
      fieldset: 'display',
    }),
    defineField({
      name: 'maxItems',
      title: 'Max Items',
      type: 'number',
      description: 'Maximum number of products to show. Defaults to 8.',
      validation: (Rule) => Rule.min(1).max(50),
      initialValue: 8,
      fieldset: 'display',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'productCategory'}],
      description: 'Filter products by collection',
      fieldset: 'filter',
    }),
    defineField({
      name: 'filterByAttribute',
      title: 'Filter by Attribute',
      type: 'object',
      description: 'Narrow results to products matching a specific attribute value',
      fieldset: 'filter',
      fields: [
        defineField({
          name: 'attribute',
          title: 'Attribute',
          type: 'reference',
          to: [{type: 'attributeDefinition'}],
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          description: 'The attribute value to match',
        }),
      ],
    }),
    defineField({
      name: 'filterByVariant',
      title: 'Filter by Variant',
      type: 'object',
      description: 'Narrow results to products with a specific variant option',
      fieldset: 'filter',
      fields: [
        defineField({
          name: 'variantType',
          title: 'Variant Type',
          type: 'reference',
          to: [{type: 'variantType'}],
        }),
        defineField({
          name: 'optionValue',
          title: 'Option Value',
          type: 'string',
          description: 'The variant option value to match',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      collectionName: 'collection.name',
    },
    prepare({title, collectionName}) {
      return {
        title: title || collectionName || 'Untitled Carousel',
        subtitle: 'Product Carousel',
      }
    },
  },
})
