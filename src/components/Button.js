import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'

function ButtonWrapper({ loading = false, children, ...props }) {
  return (
    <Button {...props}>
      {loading ? <CircularProgress color="secondary" /> : children}
    </Button>
  )
}

export default ButtonWrapper
