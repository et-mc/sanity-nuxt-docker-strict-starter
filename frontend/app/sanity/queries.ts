import { defineQuery } from "groq";

const linkReference = /* groq */ `
_type == "link" => {
	"page": page->slug.current,
	"post": post->slug.current
}
`;

const linkFields = /* groq */ `
link {
	...,
	${linkReference}
	}
`;

export const postsQuery =
  defineQuery(`*[_type == "post"] | order(date desc, _updatedAt desc) {
		...
	}`);
export const somePostsQuery = defineQuery(/* groq */ `
		*[_type == "post" && slug.current != $skip][0...$limit] | order(date desc, _updatedAt desc) {
			...
		}`);
export const postQuery = defineQuery(/* groq */ `
		*[_type == "post" && defined(slug.current) && slug.current == $slug][0]{
			...,
			content[]{
						...,
						markDefs[]{
							...,
							_type == "link" => {
								"link": {
									...,
									${linkReference}
								}
							},
						}
					},
			"author": author->{..., "picture": picture.asset._ref}
		}`);

export const pageQuery = defineQuery(/* groq */ `
		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
			...,
			"pageBuilder": pageBuilder[]{
				...,
				_type == "callToAction" => {
					${linkFields},
				},
				_type == "infoSection" => {
					content[]{
						...,
						markDefs[]{
							...,
							_type == "link" => {
								"link": {
									...,
									${linkReference}
								}
							},
						}
					}
				},
			}
		}`);

// Product queries
export const productsQuery = defineQuery(/* groq */ `
		*[_type == "product" && status == "active"] | order(title asc) {
			_id,
			title,
			"slug": slug.current,
			sku,
			price,
			stock,
			status,
			mainImage,
			collections[]->{_id, name, "slug": slug.current}
		}`);

export const productQuery = defineQuery(/* groq */ `
		*[_type == "product" && defined(slug.current) && slug.current == $slug][0]{
			...,
			description[]{
				...,
				markDefs[]{
					...,
					_type == "link" => {
						"link": {
							...,
							${linkReference}
						}
					},
				}
			},
			collections[]->{_id, name, "slug": slug.current},
			variants[]{
				...,
				options[]{
					...,
					type->{_id, name}
				}
			},
			attributes[]{
				...,
				definition->{_id, name, unit, valueType}
			}
		}`);

export const productCategoriesQuery = defineQuery(/* groq */ `
		*[_type == "productCategory"] | order(name asc) {
			_id,
			name,
			"slug": slug.current,
			description,
			"parent": parent->{_id, name, "slug": slug.current},
			"productCount": count(*[_type == "product" && status == "active" && references(^._id)])
		}`);

export const productsByCategoryQuery = defineQuery(/* groq */ `
		*[_type == "product" && status == "active" && $categoryId in collections[]._ref] | order(title asc) {
			_id,
			title,
			"slug": slug.current,
			sku,
			price,
			stock,
			status,
			mainImage,
			collections[]->{_id, name, "slug": slug.current}
		}`);

export const storeSettingsQuery = defineQuery(/* groq */ `
		*[_type == "settings"][0]{
			storeBaseSlug,
			useCollectionRouting,
			createCollectionPages
		}`);

export const collectionBySlugQuery = defineQuery(/* groq */ `
		*[_type == "productCategory" && slug.current == $slug][0]{
			_id,
			name,
			"slug": slug.current,
			description,
			image,
			"parent": parent->{_id, name, "slug": slug.current}
		}`);

export const settingsQuery = defineQuery(/* groq */ `
		*[_type == "settings"][0]{
			title,
			description[]{
						...,
						markDefs[]{
							...,
							_type == "link" => {
								"link": {
									...,
									${linkReference}
								}
							},
						}
					},
			"ogImage": ogImage.asset->url,
			storeBaseSlug,
			useCollectionRouting,
			createCollectionPages
		}`);
