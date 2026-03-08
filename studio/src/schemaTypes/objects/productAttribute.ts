import {defineField, defineType} from 'sanity'

export const productAttribute = defineType({
  name: 'productAttribute',
  title: 'Product Attribute',
  type: 'object',
  fields: [
    defineField({
      name: 'definition',
      title: 'Attribute',
      type: 'reference',
      to: [{type: 'attributeDefinition'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      definitionName: 'definition.name',
      definitionUnit: 'definition.unit',
      value: 'value',
    },
    prepare({definitionName, definitionUnit, value}) {
      const displayValue = definitionUnit ? `${value} ${definitionUnit}` : value
      return {
        title: `${definitionName ?? 'Unknown'}: ${displayValue ?? ''}`,
      }
    },
  },
})
