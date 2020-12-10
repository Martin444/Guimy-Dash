import React from 'react'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(({ palette }) => ({
  check: {
    fill: palette.success.main,
  },
}))

const StatusIcon = ({ error, value, className, loading }) => {
  const classes = useStyles()
  if (loading) {
    return (
      <InputAdornment position="end" className={className}>
        <CircularProgress size={20} />
      </InputAdornment>
    )
  }
  if (error) {
    return (
      <InputAdornment position="end" className={className}>
        <ErrorOutlineIcon color="error" />
      </InputAdornment>
    )
  }
  if (value) {
    return (
      <InputAdornment position="end" className={className}>
        <CheckRoundedIcon className={classes.check} />
      </InputAdornment>
    )
  }

  return <React.Fragment></React.Fragment>
}

export default StatusIcon
