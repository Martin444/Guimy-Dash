import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import InputWrapper from './InputWrapper'

const useStyles = makeStyles(({ palette }) => ({
  checked: {
    '& svg': {
      fill: palette.success.main,
    },
  },
  root: {
    fontSize: `18px`,
  },
  white: {
    color: `#ffffff`,
  },
}))

const CheckboxWrapper = ({
  label,
  error,
  isRequired = false,
  onChange,
  value,
  name,
  disabled = false,
  align = `left`,
  fullWidth = false,
  md = 12,
  xs = 12,
  callbacks = null,
  id,
  className = {},
  justify = `flex-start`,
  positionLabel = `right`,
  white = false,
  unCheckNull = false,
  ...rest
}) => {
  const classes = useStyles()
  const onChangeHandle = ({ target: { name, checked } }) => {
    if (typeof onChange === `function`) {
      const nextChecked = unCheckNull && !checked ? null : checked
      onChange({ name, value: nextChecked, id })
    } else {
      const { callback, fieldsToUpdate } = onChange
      callbacks[callback]({ fieldsToUpdate, value: !value, name, id })
    }
  }
  return (
    <InputWrapper
      label={label}
      error={error}
      isRequired={isRequired}
      align={align}
      fullWidth={fullWidth}
      positionLabel={positionLabel}
      md={md}
      xs={xs}
      disabled={disabled}
      className={className}
      justify={justify}
      {...rest}
    >
      <Checkbox
        disabled={disabled}
        checked={value}
        onChange={onChangeHandle}
        name={name}
        className={`${classes.root} ${white ? classes.white : ``}`}
        classes={{
          checked: classes.checked,
        }}
      />
    </InputWrapper>
  )
}

export default CheckboxWrapper
