import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ spacing }) => ({
  loading: {
    width: `100%`,
    padding: spacing(2, 3, 4),
    background: `rgba(255,255,255,0.8)`,
  },
  icon: {
    color: `#024176`,
  },
}))

function Loader({ height = `100vh` }) {
  const classes = useStyles()
  return (
    <Grid
      className={classes.loading}
      item
      container
      xs={12}
      justify="center"
      alignItems="center"
      style={{ height }}
    >
      <CircularProgress className={classes.icon} />
    </Grid>
  )
}

export default Loader
