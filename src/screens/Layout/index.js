import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import SideBar from './SideBar'

const drawerWidth = 220

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: `100vh`,
    display: `flex`,
  },
  content: {
    flexGrow: 1,
    width: `100%`,
    marginTop: `8rem`,
    [theme.breakpoints.up(`sm`)]: {
      width: `calc(100% - 175px - ${drawerWidth}px)`,
      padding: theme.spacing(2, 1),
      marginTop: `9rem`,
      marginLeft: `96px`,
    },
    background: `#f2f3f5`,
  },
}))

function Layout({ routes, user, children, restaurant }) {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Header user={user} restaurant={restaurant}/>
      <SideBar routes={routes} user={user} />
      <Grid container className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}
export default Layout
