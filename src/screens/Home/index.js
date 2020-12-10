import React from 'react'
import {
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core'

function Home() {
  const classes = styles()

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
      >
        <Grid item xs={12} className={classes.subtitleContainer}>
          <Typography variant="h5" component="h5">
            Noticias
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="flex-end"
          justify="flex-start"
          className={classes.accesosDirectos}
        >
        </Grid>
      </Grid>
    </Grid>
  )
}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
  },
  accesosDirectos: {
    background: `#FFF`,
    borderRadius: `2em 2em 0 0`,
    height: `70vh !important`,
    marginTop: theme.spacing(2),
  },
  subtitleContainer: {
    marginTop: theme.spacing(3),
    textAlign: `center`,
  },
}))

export default Home
