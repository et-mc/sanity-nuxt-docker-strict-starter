import {useCallback, useEffect, useId, useState} from 'react'
import {set, unset, useClient, useFormValue, type StringInputProps} from 'sanity'
import {TextInput} from '@sanity/ui'

/**
 * Custom combobox input for product attribute values.
 *
 * Shows predefined options from the referenced attributeDefinition as
 * suggestions via a native datalist. Editors can pick an existing value
 * or type a new one — new values are automatically saved back to the
 * attributeDefinition's options list on blur.
 */
export function AttributeValueInput(props: StringInputProps) {
  const {onChange, value = '', elementProps} = props
  const client = useClient({apiVersion: '2025-10-20'})
  const listId = useId()

  // Read the definition._ref from the sibling field in the parent object
  const definitionRef = useFormValue([
    ...props.path.slice(0, -1),
    'definition',
    '_ref',
  ]) as string | undefined

  const [options, setOptions] = useState<string[]>([])

  // Fetch predefined options whenever the definition reference changes
  useEffect(() => {
    if (!definitionRef) {
      setOptions([])
      return
    }

    const publishedId = definitionRef.replace(/^drafts\./, '')
    client
      .fetch<string[] | null>(
        `*[_id in [$id, "drafts." + $id]] | order(_id desc)[0].options`,
        {id: publishedId},
      )
      .then((result) => setOptions(result || []))
  }, [definitionRef, client])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.currentTarget.value
      onChange(next ? set(next) : unset())
    },
    [onChange],
  )

  // On blur, persist any new value back to the attributeDefinition
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Preserve Sanity's own blur handling
      elementProps.onBlur(event)

      if (!value || !definitionRef) return

      const publishedId = definitionRef.replace(/^drafts\./, '')

      if (!options.includes(value)) {
        client
          .patch(publishedId)
          .setIfMissing({options: []})
          .append('options', [value])
          .commit()
          .then(() => setOptions((prev) => [...prev, value]))
          .catch(() => {
            // Value is still saved on the product — silent fail is acceptable
          })
      }
    },
    [value, definitionRef, options, client, elementProps],
  )

  return (
    <>
      <TextInput
        {...elementProps}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        list={listId}
        placeholder={definitionRef ? 'Type or select a value' : 'Select an attribute first'}
        disabled={!definitionRef}
      />
      {options.length > 0 && (
        <datalist id={listId}>
          {options.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      )}
    </>
  )
}
