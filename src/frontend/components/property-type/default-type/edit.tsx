/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useEffect, useState } from 'react'
import Select from 'react-select'
import { DefaultTheme, withTheme } from 'styled-components'
import { FormGroup, FormMessage, Input, selectStyles } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}

const Edit: FC<CombinedProps> = (props) => {
  const { property, record } = props
  const error = record.errors?.[property.path]

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      {property.availableValues ? <SelectEdit {...props} /> : <TextEdit {...props} />}
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

const SelectEdit: FC<CombinedProps> = (props) => {
  const { theme, record, property, onChange } = props
  if (!property.availableValues) {
    return null
  }
  const propValue = record.params?.[property.path] ?? ''
  const styles = selectStyles(theme)
  const selected = property.availableValues.find(av => av.value === propValue)

  return (
    <Select
      isClearable
      styles={styles}
      value={selected}
      options={property.availableValues}
      onChange={s => onChange(property.path, s?.value ?? '')}
      isDisabled={property.isDisabled}
      {...property.props}
    />
  )
}

const TextEdit: FC<CombinedProps> = (props) => {
  const { property, record, onChange } = props
  const propValue = record.params?.[property.path] ?? ''
  const [value, setValue] = useState(propValue)

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue])

  useEffect(() => {
    const hasError = !!record.errors?.[property.path]
    const userStartedTyping = value !== propValue

    if (hasError && userStartedTyping) {
      onChange(property.path, value)
    }
  }, [onChange, propValue, property.path, record.errors, value])

  return (
    <Input
      id={property.path}
      name={property.path}
      onChange={e => setValue(e.target.value)}
      onBlur={() => onChange(property.path, value)}
      // handle clicking ENTER
      onKeyDown={e => e.keyCode === 13 && onChange(property.path, value)}
      value={value}
      disabled={property.isDisabled}
      {...property.props}
    />
  )
}

export default withTheme(memo(Edit, recordPropertyIsEqual))
