const knownThumbnails = new Set<string>([])
const defaultThumbnail = '/static/page-builder-thumbnails/default.webp'

export function blockThumbnailUrl(schemaTypeName: string): string {
  if (knownThumbnails.has(schemaTypeName)) {
    return `/static/page-builder-thumbnails/${schemaTypeName}.webp`
  }
  return defaultThumbnail
}
