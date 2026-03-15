import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {product} from './documents/product'
import {productCategory} from './documents/productCategory'
import {variantType} from './documents/variantType'
import {attributeDefinition} from './documents/attributeDefinition'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {configuration} from './singletons/configuration'
import {navigation} from './singletons/navigation'
import {link} from './objects/link'
import {navigationItem} from './objects/navigationItem'
import {blockContent} from './objects/blockContent'
import {productVariant} from './objects/productVariant'
import {variantOption} from './objects/variantOption'
import {productAttribute} from './objects/productAttribute'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  configuration,
  navigation,
  // Documents
  page,
  post,
  person,
  product,
  productCategory,
  variantType,
  attributeDefinition,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  productVariant,
  variantOption,
  productAttribute,
  navigationItem,
]
