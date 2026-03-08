import { defineQuery } from "groq";

const linkReference = /* groq */ `
_type == "link" => {
	"page": page->slug.current,
	"post": post->slug.current,
	"product": product->slug.current
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
				_type == "hero" => {
					${linkFields},
				},
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
				_type == "contactForm" => {
					...
				},
			}
		}`);

export const productsQuery = defineQuery(/* groq */ `
		*[_type == "product"] | order(name asc) {
			...,
			"category": category->{name, slug}
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
			"category": category->{name, slug},
			${linkFields}
		}`);

export const navigationQuery = defineQuery(/* groq */ `
		*[_type == "navigation"][0]{
			headerLinks[]{
				...,
				${linkFields}
			},
			footerGroups[]{
				...,
				links[]{
					...,
					${linkFields}
				}
			}
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
			"ogImage": ogImage.asset->url
		}`);
