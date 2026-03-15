import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {product} from './documents/product'
import {productCategory} from './documents/productCategory'
import {variantType} from './documents/variantType'
import {attributeDefinition} from './documents/attributeDefinition'
import {form} from './documents/form'
import {settings} from './singletons/settings'
import {configuration} from './singletons/configuration'
import {navigation} from './singletons/navigation'
// Sections
import {hero} from './sections/hero'
import {cards} from './sections/cards'
import {callToAction} from './sections/callToAction'
import {infoSection} from './sections/infoSection'
import {productCarousel} from './sections/productCarousel'
import {customSection} from './sections/customSection'
// Blocks
import {formBlock} from './blocks/formBlock'
import {textBlock} from './blocks/textBlock'
import {mediaBlock} from './blocks/mediaBlock'
import {cardBlock} from './blocks/cardBlock'
// Objects
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
  form,
  // Sections
  hero,
  cards,
  callToAction,
  infoSection,
  productCarousel,
  customSection,
  // Blocks
  formBlock,
  textBlock,
  mediaBlock,
  cardBlock,
  // Objects
  blockContent,
  link,
  productVariant,
  variantOption,
  productAttribute,
  navigationItem,
]
