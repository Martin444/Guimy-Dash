import React from 'react'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import InputWrapper from './InputWrapper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const switchStyles = makeStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
  },
  rootMargin: {
    margin: theme.spacing(3.5),
  },
  switchBase: {
    padding: 0,
    '&$checked': {
      transform: `translateX(17px)`,
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.success.main,
        opacity: 1,
        border: `none`,
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.success.main,
      border: `6px solid ${theme.palette.success.background}`,
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create([`background-color`, `border`]),
  },
  checked: {},
  focusVisible: {},
}))

function SwitchInput({
  value,
  name,
  onChange,
  className: parentClasses,
  label,
  id,
  inline = false, // Mostrar compent sin margin y asi tenerlo en línea
  ...rest
}) {
  const classes = switchStyles()
  return (
    <InputWrapper name={name} {...rest}>
      <Grid container alignItems="center">
        <Typography className={classes.label}>{label}</Typography>
        <Switch
          name={name}
          checked={value}
          onChange={({ target: { checked } }) =>
            onChange({ name, value: checked, id })
          }
          color="primary"
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: `${classes.root} ${inline ? `` : classes.rootMargin}`,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
        />
      </Grid>
    </InputWrapper>
  )
}

export default SwitchInput
