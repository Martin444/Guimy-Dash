import React from 'react'
import Typography from '@material-ui/core/Typography'
import InputWrapper from './InputWrapper'
/*
  Manejo de errores
  Hay inputs que muestran mensajes abajos y otros que no
  Por lo que el prop "error" puede ser Boolean o String
*/
const TextLabel = ({
  id,
  label,
  error, //Puede ser boolean o string
  isRequired = false,
  onChange,
  onBlur = null,
  value,
  rows,
  name,
  type = `text`,
  inputType = `text`,
  min = 0,
  items,
  multiline,
  max,
  disabled = false,
  placeholder = ``,
  align = `left`,
  fullWidth = false,
  xs = 12,
  md = 12,
  className = {},
  onSearchInput = null,
  variant = `standard`,
  inputSearchValue,
  setInputSearchValue,
  isValid = true,
  format = ``,
  ...rest
}) => {
  return (
    <InputWrapper
      label={label}
      isRequired={isRequired}
      align={align}
      type={inputType}
      error={error}
      fullWidth={fullWidth}
      xs={xs}
      md={md}
      disabled={disabled}
      variant={variant}
      {...rest}
    >
      {label}
      <Typography>{value}</Typography>
    </InputWrapper>
  )
}

export default TextLabel
