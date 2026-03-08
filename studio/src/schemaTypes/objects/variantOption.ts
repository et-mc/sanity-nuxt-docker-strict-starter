import {defineField, defineType} from 'sanity'

export const variantOption = defineType({
  name: 'variantOption',
  title: 'Variant Option',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Variant Type',
      type: 'reference',
      to: [{type: 'variantType'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The selected option value, e.g. "red" or "lg"',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      typeName: 'type.name',
      value: 'value',
    },
    prepare({typeName, value}) {
      return {
        title: `${typeName ?? 'Unknown'}: ${value ?? ''}`,
      }
    },
  },
})
