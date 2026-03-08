import {defineField, defineArrayMember, defineType} from 'sanity'

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name, e.g. "Red / Large"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Variant-specific SKU',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Variant price — overrides the base product price when set',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description: 'Available inventory count',
      validation: (rule) => rule.min(0).precision(0),
      initialValue: 0,
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      description: 'The option selections that define this variant',
      of: [defineArrayMember({type: 'variantOption'})],
      validation: (rule) => rule.min(1).error('Add at least one option'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sku: 'sku',
      price: 'price',
      media: 'image',
    },
    prepare({title, sku, price, media}) {
      const subtitle = [sku, price != null ? `$${price}` : null].filter(Boolean).join(' · ')
      return {title, subtitle, media}
    },
  },
})
