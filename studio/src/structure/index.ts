import {CogIcon, BasketIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = [
  'settings',
  'assist.instruction.context',
  'product',
  'productCategory',
  'variantType',
  'attributeDefinition',
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        // Remove types that are grouped separately or are singletons
        .filter(
          (listItem) => !DISABLED_TYPES.includes(listItem.getId() as string),
        )
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),

      S.divider(),

      // Store section
      S.listItem()
        .title('Store')
        .icon(BasketIcon)
        .child(
          S.list()
            .title('Store')
            .items([
              S.listItem()
                .title('Products')
                .icon(BasketIcon)
                .child(
                  S.list()
                    .title('Products')
                    .items([
                      S.listItem()
                        .title('All Products')
                        .child(
                          S.documentList()
                            .title('All Products')
                            .filter('_type == "product"'),
                        ),
                      S.listItem()
                        .title('By Collection')
                        .child(
                          S.documentTypeList('productCategory')
                            .title('Select a Collection')
                            .child((categoryId) =>
                              S.documentList()
                                .title('Products')
                                .filter(
                                  '_type == "product" && $categoryId in collections[]._ref',
                                )
                                .params({categoryId}),
                            ),
                        ),
                    ]),
                ),
              S.documentTypeListItem('productCategory').title('Collections'),
              S.divider(),
              S.documentTypeListItem('variantType').title('Variants'),
              S.documentTypeListItem('attributeDefinition').title('Attributes'),
            ]),
        ),

      S.divider(),

      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
