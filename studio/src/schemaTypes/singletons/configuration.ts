import {ControlsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Configuration schema Singleton.
 * Controls content type visibility and store settings.
 */

export const configuration = defineType({
  name: 'configuration',
  title: 'Configuration',
  type: 'document',
  icon: ControlsIcon,
  fieldsets: [
    {
      name: 'content',
      title: 'Content',
      description: 'Choose which content types are available in the Studio and on the site.',
      options: {columns: 3},
    },
    {
      name: 'storeFeatures',
      title: 'Store Features',
      description: 'Control which store features are visible in the Studio.',
      options: {columns: 2},
      hidden: ({document}) => document?.enableStore === false,
    },
    {
      name: 'storeRouting',
      title: 'Store Routing',
      description: 'Configure how product URLs are structured on the site.',
      hidden: ({document}) => document?.enableStore === false,
    },
  ],
  fields: [
    // Content type visibility
    defineField({
      name: 'enablePages',
      title: 'Pages',
      type: 'boolean',
      initialValue: true,
      fieldset: 'content',
    }),
    defineField({
      name: 'enablePosts',
      title: 'Posts',
      type: 'boolean',
      initialValue: true,
      fieldset: 'content',
    }),
    defineField({
      name: 'enablePeople',
      title: 'People',
      type: 'boolean',
      initialValue: true,
      fieldset: 'content',
    }),
    defineField({
      name: 'enableStore',
      title: 'Store',
      type: 'boolean',
      initialValue: true,
      fieldset: 'content',
    }),

    // Store sub-options
    defineField({
      name: 'enableCollections',
      title: 'Collections',
      type: 'boolean',
      initialValue: true,
      fieldset: 'storeFeatures',
      hidden: ({document}) => document?.enableStore === false,
    }),
    defineField({
      name: 'enableAttributes',
      title: 'Attributes',
      type: 'boolean',
      initialValue: true,
      fieldset: 'storeFeatures',
      hidden: ({document}) => document?.enableStore === false,
    }),
    defineField({
      name: 'enableVariants',
      title: 'Variants',
      type: 'boolean',
      initialValue: true,
      fieldset: 'storeFeatures',
      hidden: ({document}) => document?.enableStore === false,
    }),

    // Store URL configuration
    defineField({
      name: 'storeBaseSlug',
      title: 'Store Base URL',
      type: 'string',
      description:
        'Base URL segment for products (e.g. "products", "shop"). Leave empty to serve product pages from the site root.',
      fieldset: 'storeRouting',
      hidden: ({document}) => document?.enableStore === false,
    }),
    defineField({
      name: 'useCollectionRouting',
      title: 'Use collections in product URLs',
      type: 'boolean',
      description:
        'Include the collection slug in product URLs (e.g. /products/clothing/product-name)',
      initialValue: false,
      fieldset: 'storeRouting',
      hidden: ({document}) => document?.enableStore === false,
    }),
    defineField({
      name: 'createCollectionPages',
      title: 'Create collection index pages',
      type: 'boolean',
      description: 'Generate browsable listing pages for each collection',
      initialValue: false,
      fieldset: 'storeRouting',
      hidden: ({document}) => document?.enableStore === false,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuration',
      }
    },
  },
})
