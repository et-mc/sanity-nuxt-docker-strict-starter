import {useCallback, useEffect, useMemo, useState} from 'react'
import {set, unset, useClient, useFormValue, type ArrayOfObjectsInputProps} from 'sanity'
import {Autocomplete, Badge, Card, Flex, Label, Stack, Text} from '@sanity/ui'

type AttributeDef = {
  _id: string
  name: string
  unit?: string
  options?: string[]
}

type AllowedAttribute = {
  def: AttributeDef
  required: boolean
}

type AttributeItem = {
  _key: string
  _type: 'productAttribute'
  definition: {_type: 'reference'; _ref: string}
  value: string
}

type AttributeOption = {
  value: string
}

function generateKey(): string {
  return Math.random().toString(36).slice(2, 14)
}

/**
 * Replaces the default array input for the product `attributes` field.
 *
 * Instead of an "add item" list, this component reads the product's
 * collections, fetches which attributes each collection allows, and
 * renders a structured form with one row per allowed attribute.
 * Required attributes are badged, and new values typed into the
 * autocomplete are automatically saved back to the attribute definition.
 */
export function ProductAttributesInput(props: ArrayOfObjectsInputProps) {
  const {onChange, value: rawValue} = props
  const value = (rawValue || []) as AttributeItem[]
  const client = useClient({apiVersion: '2025-10-20'})

  const collections = useFormValue(['collections']) as
    | Array<{_ref: string; _key: string}>
    | undefined

  const [allowedAttributes, setAllowedAttributes] = useState<AllowedAttribute[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch allowed attributes from all assigned collections
  useEffect(() => {
    const refs = collections?.map((c) => c._ref).filter(Boolean) || []
    if (!refs.length) {
      setAllowedAttributes([])
      return
    }

    setLoading(true)
    client
      .fetch<Array<{allowedAttributes?: AllowedAttribute[]}>>(
        `*[_type == "productCategory" && _id in $refs]{
          allowedAttributes[]{
            "def": attribute->{_id, name, unit, options},
            required
          }
        }`,
        {refs},
      )
      .then((results) => {
        // Union across collections — required if ANY collection says required
        const seen = new Map<string, AllowedAttribute>()
        for (const col of results) {
          for (const item of col.allowedAttributes || []) {
            if (!item.def?._id) continue
            const existing = seen.get(item.def._id)
            seen.set(item.def._id, {
              def: item.def,
              required: existing?.required || item.required,
            })
          }
        }
        setAllowedAttributes(Array.from(seen.values()))
      })
      .finally(() => setLoading(false))
  }, [collections, client])

  // Map definition ID → current stored value + key
  const valueMap = useMemo(() => {
    const map = new Map<string, {key: string; value: string}>()
    for (const item of value) {
      if (item.definition?._ref) {
        map.set(item.definition._ref, {key: item._key, value: item.value})
      }
    }
    return map
  }, [value])

  const handleValueChange = useCallback(
    (defId: string, newValue: string) => {
      const current = [...value]
      const existingIndex = current.findIndex((item) => item.definition?._ref === defId)

      if (!newValue) {
        // Remove the item
        if (existingIndex >= 0) {
          current.splice(existingIndex, 1)
          onChange(current.length ? set(current) : unset())
        }
        return
      }

      const item: AttributeItem = {
        _key: existingIndex >= 0 ? current[existingIndex]._key : generateKey(),
        _type: 'productAttribute',
        definition: {_type: 'reference', _ref: defId},
        value: newValue,
      }

      if (existingIndex >= 0) {
        current[existingIndex] = item
      } else {
        current.push(item)
      }

      onChange(set(current))
    },
    [value, onChange],
  )

  // Save new values back to the attribute definition's options list
  const saveNewOption = useCallback(
    (defId: string, val: string) => {
      if (!val) return

      const attr = allowedAttributes.find((a) => a.def._id === defId)
      if (attr?.def.options?.includes(val)) return

      client
        .patch(defId)
        .setIfMissing({options: []})
        .append('options', [val])
        .commit()
        .then(() => {
          setAllowedAttributes((prev) =>
            prev.map((a) =>
              a.def._id === defId
                ? {...a, def: {...a.def, options: [...(a.def.options || []), val]}}
                : a,
            ),
          )
        })
        .catch(() => {
          // Value is still saved on the product
        })
    },
    [allowedAttributes, client],
  )

  if (!collections?.length) {
    return (
      <Card padding={3} border radius={2} tone="caution">
        <Text size={1} muted>
          Assign this product to a collection to see available attributes.
        </Text>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card padding={3} border radius={2}>
        <Text size={1} muted>
          Loading attributes…
        </Text>
      </Card>
    )
  }

  if (!allowedAttributes.length) {
    return (
      <Card padding={3} border radius={2}>
        <Text size={1} muted>
          No attributes configured for the assigned collections.
        </Text>
      </Card>
    )
  }

  return (
    <Stack space={4}>
      {allowedAttributes.map(({def, required}) => {
        const entry = valueMap.get(def._id)
        const options: AttributeOption[] = (def.options || []).map((opt) => ({value: opt}))

        return (
          <Stack key={def._id} space={2}>
            <Flex align="center" gap={2}>
              <Label size={1}>
                {def.name}
                {def.unit ? ` (${def.unit})` : ''}
              </Label>
              {required && (
                <Badge tone="critical" fontSize={0}>
                  Required
                </Badge>
              )}
            </Flex>
            <Autocomplete
              id={`attr-${def._id}`}
              options={options}
              value={entry?.value || ''}
              placeholder={`Enter ${def.name.toLowerCase()}`}
              openButton
              onSelect={(val: string) => {
                handleValueChange(def._id, val)
              }}
              onQueryChange={(query: string | null) => {
                if (query !== null) {
                  handleValueChange(def._id, query)
                }
              }}
              onChange={(val: string) => {
                handleValueChange(def._id, val)
                saveNewOption(def._id, val)
              }}
              renderOption={(option: AttributeOption) => (
                <Card as="button" padding={3}>
                  <Text size={1}>{option.value}</Text>
                </Card>
              )}
            />
          </Stack>
        )
      })}
    </Stack>
  )
}
