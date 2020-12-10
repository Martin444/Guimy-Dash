import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { logoGuimy } from 'assets/img'
import { useAuth } from 'context'

const useStyles = makeStyles((theme) => ({
  userName: {
    fontSize: `1.3em`,
  },
  appBar: {
    zIndex: 10,
    width: `100%`,
    [theme.breakpoints.up(`sm`)]: {
      width: `calc(100% - ${theme.spacing(12)}px)`,
    },
  },
  content: {
    width: `100%`,
    justifyContent: `space-between`,
    padding: theme.spacing(0, 1),
    minHeight: `8rem`,
    [theme.breakpoints.up(`sm`)]: {
      padding: theme.spacing(0, 6),
      minHeight: `9rem`,
    },
    [theme.breakpoints.down(`xs`)]: {
      padding: theme.spacing(0, 2),
    },
  },
  subtitle: {
    color: `#ff2e3b`,
    fontSize: `0.6em`,
  },
  iconLocation: {
    height: `0.5em`,
    marginLeft: `-0.2em`,
  },
  logoGuimy: {
    width: `8em`,
  },
}))

function Header() {
  const classes = useStyles()

 const {user, restaurant} = useAuth();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.content}>
           <Grid item xs={5}>
            <Typography variant="h1" component="h5" className={classes.title}>
              <b>Bienvenido</b><br />
              <b className={classes.userName}>
                {user.name}
              </b>
            </Typography>
            <Typography variant="body1" className={classes.subtitle}>
              <LocationOnIcon className={classes.iconLocation} />{restaurant.name}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <img alt="Logo FIBE" src={logoGuimy} className={classes.logoGuimy} />
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
