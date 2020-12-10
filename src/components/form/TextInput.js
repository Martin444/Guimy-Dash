import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputWrapper from './InputWrapper'
import StatusIcon from './StatusIcon'
import { inputCommonStyles, generateInputSuccessStyles, formatter } from 'utils'
/*
  Manejo de errores
  Hay inputs que muestran mensajes abajos y otros que no
  Por lo que el prop "error" puede ser Boolean o String
*/
const TextInputWrapper = ({
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
  adornmentText = false,
  rules = [],
  ...rest
}) => {
  const inputStyles = inputCommonStyles()
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
      {type === `label` ? null : (
        <TextField
          placeholder={placeholder}
          id={name}
          value={value}
          name={name}
          type={type}
          disabled={disabled}
          onChange={({ target: { value, name } }) => {
            if (format) {
              value = formatter[format](value)
            }
            onChange({ name, value, id })
          }}
          variant={variant}
          onBlur={({ target: { value, name } }) =>
            onBlur ? onBlur({ name, value }) : null
          }
          error={error}
          label={variant === `outlined` ? label : null}
          className={className}
          autoComplete="nope"
          InputProps={{
            classes: generateInputSuccessStyles({
              classes: inputStyles,
              isValid,
              value,
              error,
            }),
            endAdornment: (
              <React.Fragment>
                {rules.includes(`percentage`) && <Typography>%</Typography>}
                <StatusIcon error={error} value={value} />
              </React.Fragment>
            ),
            startAdornment:
              type === `money` || adornmentText ? (
                <InputAdornment position="start">
                  {adornmentText ? adornmentText : `$`}
                </InputAdornment>
              ) : null,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          multiline={multiline}
          rows={rows}
        />
      )}
    </InputWrapper>
  )
}

export default TextInputWrapper
