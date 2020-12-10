import React from 'react'
import { Grid, Typography } from '@material-ui/core'

function NotFound() {
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Typography>Página no encontrada o</Typography>
      <Typography>No tiene permisos para acceder</Typography>
    </Grid>
  )
}

export default NotFound
