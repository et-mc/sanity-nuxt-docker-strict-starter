import {BasketIcon} from '@sanity/icons'
import {defineField, defineArrayMember, defineType} from 'sanity'
import {ProductAttributesInput} from '../../components/ProductAttributesInput'
import {ProductVariantsInput} from '../../components/ProductVariantsInput'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'variants', title: 'Variants & Attributes'},
    {name: 'seo', title: 'SEO'},
  ],
  fieldsets: [
    {name: 'priceStock', title: 'Price & Stock', options: {columns: 2}},
    {name: 'variantsAttributes', title: 'Variants & Attributes'},
    {
      name: 'seo',
      title: 'SEO Overrides',
      description: 'If left empty, the product title and description are used instead',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    // Content
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock Keeping Unit — a unique product identifier',
      validation: (rule) =>
        rule.custom(async (sku, context) => {
          if (!sku) return true
          const client = context.getClient({apiVersion: '2025-10-20'})
          const id = context.document?._id?.replace(/^drafts\./, '')
          const existing = await client.fetch(
            `count(*[_type == "product" && sku == $sku && !(_id in [$publishedId, $draftId])])`,
            {sku, publishedId: id, draftId: `drafts.${id}`},
          )
          return existing === 0 || 'A product with this SKU already exists'
        }),
      group: 'content',
    }),

    // Collections — must be above variants/attributes since those inputs read collections
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'productCategory'}]})],
      group: 'content',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.mainImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Base price in your default currency',
      validation: (rule) => rule.min(0),
      fieldset: 'priceStock',
      group: 'content',
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description: 'Available inventory. Use -1 for "Always in stock"',
      validation: (rule) => rule.min(-1).precision(0),
      initialValue: -1,
      fieldset: 'priceStock',
      group: 'content',
    }),

    // Variants & Attributes (driven by collection config)
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      description: 'Add variants when this product comes in different options like size or color',
      of: [defineArrayMember({type: 'productVariant'})],
      components: {
        input: ProductVariantsInput,
      },
      fieldset: 'variantsAttributes',
      group: 'variants',
    }),
    defineField({
      name: 'attributes',
      title: 'Attributes',
      type: 'array',
      description: 'Specifications defined by this product\'s collections',
      of: [defineArrayMember({type: 'productAttribute'})],
      components: {
        input: ProductAttributesInput,
      },
      fieldset: 'variantsAttributes',
      group: 'variants',
    }),

    // SEO (collapsible)
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description:
        'Title used for search engines and social media sharing (recommended: 50-60 characters)',
      fieldset: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description:
        'Description used for search engines and social media sharing (recommended: 150-160 characters)',
      fieldset: 'seo',
      group: 'seo',
    }),

    // Status (below SEO)
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Active', value: 'active'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sku: 'sku',
      price: 'price',
      status: 'status',
      media: 'mainImage',
    },
    prepare({title, sku, price, status, media}) {
      const parts = [sku, price != null ? `$${price}` : null, status].filter(Boolean)
      return {
        title,
        subtitle: parts.join(' · '),
        media,
      }
    },
  },
})
