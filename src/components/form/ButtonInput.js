import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import InputWrapper from './InputWrapper'

const useStyles = makeStyles(() => ({
  button: {
    minHeight: `39px`,
    width: `100%`,
    padding: 0,
    marginBottom: `2px`,
  },
}))

function ButtonInput({
  buttonText,
  xs = 12,
  md = 6,
  name,
  onChange,
  value,
  disabled = false,
  ...rest
}) {
  const { button } = useStyles()
  const onClickHandle = () => {
    onChange({ name, value: !value })
  }
  return (
    <InputWrapper label="" md={md} xs={xs} disabled={disabled} {...rest}>
      <Button className={button} onClick={onClickHandle} disabled={disabled}>
        {buttonText}
      </Button>
    </InputWrapper>
  )
}

export default ButtonInput
