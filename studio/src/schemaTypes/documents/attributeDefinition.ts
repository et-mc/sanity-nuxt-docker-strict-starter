import {InlineElementIcon} from '@sanity/icons'
import {defineField, defineArrayMember, defineType} from 'sanity'

export const attributeDefinition = defineType({
  name: 'attributeDefinition',
  title: 'Attribute Definition',
  type: 'document',
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Width, Thickness, Weight',
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
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Optional measurement unit, e.g. mm, cm, kg, lbs',
    }),
    defineField({
      name: 'valueType',
      title: 'Value Type',
      type: 'string',
      description: 'What kind of value editors will enter',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Number', value: 'number'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Predefined Values',
      type: 'array',
      description:
        'Known values for this attribute. New values entered on products are added here automatically.',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      unit: 'unit',
      valueType: 'valueType',
    },
    prepare({title, unit, valueType}) {
      const parts = [valueType]
      if (unit) parts.push(unit)
      return {
        title,
        subtitle: parts.join(' · '),
      }
    },
  },
})
