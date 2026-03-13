import {CogIcon, BasketIcon, FolderIcon, MenuIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = [
  'settings',
  'navigation',
  'assist.instruction.context',
  'product',
  'productCategory',
  'variantType',
  'attributeDefinition',
  'person',
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

      S.documentTypeListItem('navigation').title('Menus').icon(MenuIcon),

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
                .child(() => {
                  const client = S.context.getClient({apiVersion: '2025-10-20'})
                  return client
                    .fetch<Array<{_id: string; name: string}>>(
                      `*[_type == "productCategory"] | order(name asc) { _id, name }`,
                    )
                    .then((collections) =>
                      S.list()
                        .title('Products')
                        .items([
                          S.listItem()
                            .title('All Products')
                            .icon(BasketIcon)
                            .child(
                              S.documentList()
                                .title('All Products')
                                .filter('_type == "product"'),
                            ),
                          S.divider(),
                          ...collections.map((col) =>
                            S.listItem()
                              .title(col.name)
                              .icon(FolderIcon)
                              .child(
                                S.documentList()
                                  .title(col.name)
                                  .filter(
                                    '_type == "product" && $categoryId in collections[]._ref',
                                  )
                                  .params({categoryId: col._id}),
                              ),
                          ),
                        ]),
                    )
                }),
              S.documentTypeListItem('productCategory').title('Collections'),
              S.divider(),
              S.documentTypeListItem('attributeDefinition').title('Attributes'),
            ]),
        ),

      S.divider(),

      // Settings Singleton
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('siteSettings')),
    ])
