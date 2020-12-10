import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputWrapper from './InputWrapper'
import StatusIcon from './StatusIcon'
import {
  inputCommonStyles,
  generateInputSuccessStyles,
  replacePhone,
  formatter,
} from 'utils'

const useStyles = makeStyles(theme => ({
  ...inputCommonStyles(theme),
  prefix: {
    width: `73px`,
  },
  icon: {
    marginRight: theme.spacing(0),
  },
  input: {
    width: `calc(100% - 73px)`,
  },
}))

function PhoneInput({
  label,
  error, //Puede ser boolean o string
  isRequired = false,
  onChange,
  value,
  name,
  isValid,
  disabled = false,
  xs = 12,
  md = 12,
  id,
  ...rest
}) {
  const classes = useStyles()
  const prefix = `+56`
  const onChangeHandle = ({ target: { value, name } }) => {
    const nextValue = formatter.number(value)
    return onChange({ name, value: `${prefix}${nextValue}`, id })
  }
  return (
    <InputWrapper
      label={label}
      isRequired={isRequired}
      error={error}
      xs={xs}
      md={md}
      disabled={disabled}
      {...rest}
      classNames={generateInputSuccessStyles(
        { classes, isValid, value, error },
        `inputWrapper`,
      )}
    >
      <TextField
        value={prefix}
        name={`prefix`}
        type={`text`}
        className={classes.prefix}
        classes={{
          root: classes.nobackground,
          focused: classes.nobackground,
          input: classes.nobackground,
        }}
      />
      <TextField
        value={value ? replacePhone(value) : value}
        name={name}
        type={`text`}
        disabled={disabled}
        onChange={onChangeHandle}
        error={error}
        className={classes.input}
        InputProps={{
          endAdornment: <StatusIcon error={error} value={value} />,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        classes={{
          root: classes.nobackground,
          focused: classes.nobackground,
          input: classes.nobackground,
        }}
        id={id}
      />
    </InputWrapper>
  )
}

export default PhoneInput
