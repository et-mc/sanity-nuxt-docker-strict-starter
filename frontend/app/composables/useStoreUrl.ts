import { storeSettingsQuery } from "~/sanity/queries";
import type { StoreSettingsQueryResult } from "~/sanity/types";

type StoreSettings = NonNullable<StoreSettingsQueryResult>;

export async function useStoreUrl() {
  const { data: settings } =
    await useSanityQuery<StoreSettingsQueryResult>(storeSettingsQuery);

  function productUrl(productSlug: string, collectionSlug?: string | null) {
    const parts: string[] = [];

    if (settings.value?.storeBaseSlug) {
      parts.push(settings.value.storeBaseSlug);
    }

    if (settings.value?.useCollectionRouting && collectionSlug) {
      parts.push(collectionSlug);
    }

    parts.push(productSlug);

    return `/${parts.join("/")}`;
  }

  function collectionUrl(collectionSlug: string) {
    const parts: string[] = [];

    if (settings.value?.storeBaseSlug) {
      parts.push(settings.value.storeBaseSlug);
    }

    parts.push(collectionSlug);

    return `/${parts.join("/")}`;
  }

  function storeIndexUrl() {
    if (settings.value?.storeBaseSlug) {
      return `/${settings.value.storeBaseSlug}`;
    }
    return "/";
  }

  return {
    settings: settings as Ref<StoreSettings | null>,
    productUrl,
    collectionUrl,
    storeIndexUrl,
  };
}
