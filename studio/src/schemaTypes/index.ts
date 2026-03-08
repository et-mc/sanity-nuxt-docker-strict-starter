import { page } from "./documents/page";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { product } from "./documents/product";
import { productCategory } from "./documents/productCategory";
import { blockContent } from "./objects/blockContent";
import { callToAction } from "./objects/callToAction";
import { contactForm } from "./objects/contactForm";
import { formField } from "./objects/formField";
import { hero } from "./objects/hero";
import { infoSection } from "./objects/infoSection";
import { link } from "./objects/link";
import { navGroup } from "./objects/navGroup";
import { navItem } from "./objects/navItem";
import { navigation } from "./singletons/navigation";
import { settings } from "./singletons/settings";

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  navigation,
  // Documents
  page,
  post,
  person,
  product,
  productCategory,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  contactForm,
  hero,
  formField,
  link,
  navItem,
  navGroup,
];
