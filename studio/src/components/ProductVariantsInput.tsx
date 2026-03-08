import {useEffect, useState} from 'react'
import {useClient, useFormValue, type ArrayOfObjectsInputProps} from 'sanity'
import {Badge, Card, Flex, Stack, Text} from '@sanity/ui'

type VariantTypeDef = {
  _id: string
  name: string
}

type AllowedVariantType = {
  def: VariantTypeDef
  required: boolean
}

/**
 * Wraps the default variants array input with an info banner
 * showing which variant types are available from the product's
 * collections, so editors know what options to create variants for.
 */
export function ProductVariantsInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({apiVersion: '2025-10-20'})

  const collections = useFormValue(['collections']) as
    | Array<{_ref: string; _key: string}>
    | undefined

  const [allowedTypes, setAllowedTypes] = useState<AllowedVariantType[]>([])

  useEffect(() => {
    const refs = collections?.map((c) => c._ref).filter(Boolean) || []
    if (!refs.length) {
      setAllowedTypes([])
      return
    }

    client
      .fetch<Array<{allowedVariantTypes?: AllowedVariantType[]}>>(
        `*[_type == "productCategory" && _id in $refs]{
          allowedVariantTypes[]{
            "def": variantType->{_id, name},
            required
          }
        }`,
        {refs},
      )
      .then((results) => {
        const seen = new Map<string, AllowedVariantType>()
        for (const col of results) {
          for (const item of col.allowedVariantTypes || []) {
            if (!item.def?._id) continue
            const existing = seen.get(item.def._id)
            seen.set(item.def._id, {
              def: item.def,
              required: existing?.required || item.required,
            })
          }
        }
        setAllowedTypes(Array.from(seen.values()))
      })
  }, [collections, client])

  return (
    <Stack space={3}>
      {!collections?.length && (
        <Card padding={3} border radius={2} tone="caution">
          <Text size={1} muted>
            Assign this product to a collection to see available variant types.
          </Text>
        </Card>
      )}

      {collections?.length && allowedTypes.length > 0 ? (
        <Card padding={3} border radius={2} tone="primary">
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Available variant types
            </Text>
            <Flex gap={2} wrap="wrap">
              {allowedTypes.map(({def, required}) => (
                <Badge
                  key={def._id}
                  tone={required ? 'critical' : 'default'}
                  fontSize={1}
                  padding={2}
                >
                  {def.name}
                  {required ? ' (required)' : ''}
                </Badge>
              ))}
            </Flex>
          </Stack>
        </Card>
      ) : null}

      {props.renderDefault(props)}
    </Stack>
  )
}
