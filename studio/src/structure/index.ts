import {CogIcon, BasketIcon, FolderIcon, MenuIcon, ControlsIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {map, startWith, switchMap} from 'rxjs/operators'
import {of, Observable} from 'rxjs'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = [
  'settings',
  'configuration',
  'navigation',
  'assist.instruction.context',
  'product',
  'productCategory',
  'variantType',
  'attributeDefinition',
  'person',
  'page',
  'post',
]

interface SiteConfig {
  enablePages?: boolean
  enablePosts?: boolean
  enableStore?: boolean
  enablePeople?: boolean
  enableCollections?: boolean
  enableAttributes?: boolean
  enableVariants?: boolean
}

const CONFIG_QUERY = `*[_id == "siteConfiguration" || _id == "drafts.siteConfiguration"] | order(_id asc)[0]{ enablePages, enablePosts, enableStore, enablePeople, enableCollections, enableAttributes, enableVariants }`

function buildStructure(S: StructureBuilder, config: SiteConfig | null) {
  const client = S.context.getClient({apiVersion: '2025-10-20'})

  const enablePages = config?.enablePages !== false
  const enablePosts = config?.enablePosts !== false
  const enableStore = config?.enableStore !== false
  const enablePeople = config?.enablePeople !== false
  const enableCollections = config?.enableCollections !== false
  const enableAttributes = config?.enableAttributes !== false
  const enableVariants = config?.enableVariants !== false

  return S.list()
    .title('Website Content')
    .items(
      [
        // Auto-generated document type items (excluding manually managed types)
        ...S.documentTypeListItems()
          .filter(
            (listItem) => !DISABLED_TYPES.includes(listItem.getId() as string),
          )
          .map((listItem) => {
            return listItem.title(pluralize(listItem.getTitle() as string))
          }),

        enablePages
          ? S.documentTypeListItem('page').title('Pages')
          : null,

        enablePosts
          ? S.documentTypeListItem('post').title('Posts')
          : null,

        enablePeople
          ? S.documentTypeListItem('person').title('People')
          : null,

        S.documentTypeListItem('navigation').title('Menus').icon(MenuIcon),

        S.divider(),

        // Store section
        enableStore
          ? S.listItem()
              .title('Store')
              .icon(BasketIcon)
              .child(
                S.list()
                  .title('Store')
                  .items(
                    [
                      S.listItem()
                        .title('Products')
                        .icon(BasketIcon)
                        .child(() => {
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
                      enableCollections
                        ? S.documentTypeListItem('productCategory').title('Collections')
                        : null,
                      enableAttributes
                        ? S.documentTypeListItem('attributeDefinition').title('Attributes')
                        : null,
                      enableVariants
                        ? S.documentTypeListItem('variantType').title('Variants')
                        : null,
                    ].filter(Boolean),
                  ),
              )
          : null,

        S.divider(),

        // Settings with sidebar sub-items
        S.listItem()
          .title('Settings')
          .icon(CogIcon)
          .child(
            S.list()
              .title('Settings')
              .items([
                S.listItem()
                  .title('About')
                  .icon(CogIcon)
                  .child(
                    S.document()
                      .schemaType('settings')
                      .documentId('siteSettings')
                      .title('About'),
                  ),
                S.listItem()
                  .title('Configuration')
                  .icon(ControlsIcon)
                  .child(
                    S.document()
                      .schemaType('configuration')
                      .documentId('siteConfiguration')
                      .title('Configuration'),
                  ),
              ]),
          ),
      ].filter(Boolean),
    )
}

export const structure: StructureResolver = (S: StructureBuilder) => {
  const client = S.context.getClient({apiVersion: '2025-10-20'})

  return client.listen<SiteConfig>(CONFIG_QUERY).pipe(
    map((event) => ('result' in event ? event.result : null)),
    startWith(null as SiteConfig | null),
    switchMap((config) => {
      // On first load or reconnect, fetch the current state
      if (config === null) {
        return of(client.fetch<SiteConfig | null>(CONFIG_QUERY)).pipe(
          switchMap((promise) => promise),
          map((fetched) => buildStructure(S, fetched)),
        )
      }
      return of(buildStructure(S, config))
    }),
  ) as Observable<ReturnType<typeof buildStructure>>
}
