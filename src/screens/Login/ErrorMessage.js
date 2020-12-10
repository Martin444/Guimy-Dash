import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const errorStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  alert: {
    opacity: `1`,
  },
}))

export default function ErrorMessage(props) {
  const {
    type = `error`,
    message = ``,
    onClose = () => {},
    className,
    justify = `center`,
  } = props
  const classes = errorStyles()

  function callParentToClose() {
    onClose(null)
  }

  return (
    <Grid
      container
      justify={justify}
      className={`${classes.container} ${className}`}
    >
      <Alert
        variant="filled"
        severity={type}
        elevation={6}
        onClose={callParentToClose}
        className={classes.alert}
      >
        {message}
      </Alert>
    </Grid>
  )
}
