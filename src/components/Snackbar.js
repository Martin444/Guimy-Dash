import React, { useState } from 'react'
import MuiSnackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function Snackbar({
  type = `error`,
  message = ``,
  vertical = `bottom`,
  horizontal = `right`,
  duration = 10000,
  setError = false,
}) {
  const [open, setOpen] = useState(true)
  const handleClose = (event, reason) => {
    if (reason === `clickaway`) {
      return
    }
    setError && setError(``)
    setOpen(false)
  }
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      style={{ whiteSpace: `pre-wrap` }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
