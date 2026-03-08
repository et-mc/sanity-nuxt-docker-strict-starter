import {TagIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'allowedAttributes',
      title: 'Allowed Attributes',
      type: 'array',
      description: 'Attributes that products in this collection can fill in',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'collectionAttribute',
          fields: [
            defineField({
              name: 'attribute',
              title: 'Attribute',
              type: 'reference',
              to: [{type: 'attributeDefinition'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'attribute.name',
              required: 'required',
            },
            prepare({title, required}) {
              return {
                title: title || 'Untitled',
                subtitle: required ? 'Required' : 'Optional',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'allowedVariantTypes',
      title: 'Allowed Variant Types',
      type: 'array',
      description: 'Variant types that products in this collection can use',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'collectionVariantType',
          fields: [
            defineField({
              name: 'variantType',
              title: 'Variant Type',
              type: 'reference',
              to: [{type: 'variantType'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'variantType.name',
              required: 'required',
            },
            prepare({title, required}) {
              return {
                title: title || 'Untitled',
                subtitle: required ? 'Required' : 'Optional',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      parentName: 'parent.name',
      media: 'image',
    },
    prepare({title, parentName, media}) {
      return {
        title,
        subtitle: parentName ? `↳ ${parentName}` : undefined,
        media,
      }
    },
  },
})
