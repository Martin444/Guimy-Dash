import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar
} from '@material-ui/core'
import {
  Autorenew as AutorenewIcon,
  Settings as SettingsIcon,
  Cancel as CancelIcon,
  ExpandLess,
  ExpandMore
} from '@material-ui/icons'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import clsx from 'clsx'
import Icon from './SideBarIcon'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    position: `fixed`,
    zIndex: 20,
    [theme.breakpoints.up(`sm`)]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    transition: theme.transitions.create(`width`, {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: 0,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    transition: theme.transitions.create(`width`, {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: `hidden`,
    [theme.breakpoints.up(`sm`)]: {
      width: theme.spacing(12),
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  list: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: `calc(100% - 11rem)`,
    overflow: `hidden`,
    overflowY: `auto`,
    '&::-webkit-scrollbar': {
      width: `8px` /* Tamaño del scroll en vertical */,
      height: `8px` /* Tamaño del scroll en horizontal */,
    },
    /* Ponemos un color de fondo y redondeamos las esquinas del thumb */
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.terniary.dark,
      borderRadius: `4px`,
    },

    /* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: `#979797`,
      boxShadow: `0 0 2px 1px rgba(0, 0, 0, 0.2)`,
    },

    /* Cambiamos el fondo cuando esté en active */
    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor: `#979797`,
    },
    /* Ponemos un color de fondo y redondeamos las esquinas del track */
    '&::-webkit-scrollbar-track': {
      background: theme.palette.primary.light,
      borderRadius: `4px`,
    },

    /* Cambiamos el fondo cuando esté en active o hover */
    '&::-webkit-scrollbar-track:hover': {
      background: theme.palette.primary.light,
    },
    '&::-webkit-scrollbar-track:active': {
      background: theme.palette.primary.light,
    },
  },
  item: {
    marginBottom: 0,
    '&:hover': {
      backgroundColor: `#ff6d76 !important`,
    },
  },
  selected: {
    backgroundColor: `#ff6d76 !important`,
  },
  icon: {
    color: theme.palette.common.white,
  },
  expand: {
    width: `2.5rem`,
    height: `2.5rem`,
  },
  notIcon: {
    marginLeft: theme.spacing(7),
  },
  footer: {
    position: `absolute`,
    bottom: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
    textAlign: `center`,
  },
  mds: {
    opacity: 0.65,
    fontSize: `1.2rem`,
    color: `#FFFFFF`,
    width: `100%`,
    letterSpacing: `0.09px`,
    display: `flex`,
    alignItems: `center`,
  },
  divider: {
    opacity: 0.4,
    backgroundColor: `#fff`,
    margin: theme.spacing(1, 0),
    width: `100%`,
  },
  iconFooter: {
    color: theme.palette.common.white,
    cursor: `pointer`,
    fontSize: `1.2rem`,
    paddingTop: 2,
    marginRight: 5,
  },
  btnToggledMenu: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    color: `white`,
    width: theme.spacing(4),
    height: theme.spacing(4),
    textAlign: `center`,
    position: `fixed`,
    borderRadius: `50%`,
    backgroundColor: theme.palette.primary.dark,
    top: `11rem`,
    border: `1px solid white`,
    '&:hover': {
      cursor: `pointer`,
    },
    [theme.breakpoints.down(`sm`)]: {
      top: 62,
    },
  },
  btnToggledMenuClose: {
    left: -10,
    top: `6em`,
    transition: theme.transitions.create(`left`, {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up(`sm`)]: {
      left: theme.spacing(10) + 1,
      display: `none`,
    },
  },
  btnToggledMenuOpen: {
    left: drawerWidth - theme.spacing(2),
    transition: theme.transitions.create(`left`, {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  iconBtnToggledMenu: {
    height: `2.6rem`,
    width: `2.6rem`,
  },
  collapsedFooter: {
    justifyContent: `center`,
  },
  listItem: {
    padding: theme.spacing(1.2),
    display: `flex`,
    justifyContent: `center`,
  },
  itemContainer: {
    borderRadius: `50%`,
    overflow: `hidden`,
    margin: `auto`,
    width: `50%`,
    height: `1.7em`,
    marginBottom: `2em`,
    [theme.breakpoints.down(`xs`)]: {
      width: `100%`,
      borderRadius: `0%`,
      marginBottom: `1em`,
    },
  },
  menuIcon: {
    marginRight: 0,
  },
  menuList: {
    width: `100%`,
  },
  mb: {
    marginBottom: `1em`,
  }
}))

function SideBar({ routes, user }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState([])
  const [extended, setExtended] = useState(false)

  //TODO: SACAR PERMISOS DE LAS RUTAS
  const initOpen = () => {
    const opens = {}
    routes
      .filter(({ items }) => items)
      .forEach(({ key }) => {
        opens[key] = false
      })
    setOpen(opens)
  }

  const handleClick = (key, items, path) => {
    if (items) {
      if (!extended) {
        setExtended(true)
      }

      const keysOpen = Object.keys(open)
      const newOpen = {}

      keysOpen.forEach((item) => {
        newOpen[item] = false
        if (item === key.toString()) {
          newOpen[item] = !open[item]
        }
      })

      return setOpen(newOpen)
    }

    if (path) {
      setExtended(false)
      initOpen()
      history.push(path)
    }
  }

  const onReload = () => {
    window.location.reload()
  }

  const onSignOff = () => {
    localStorage.removeItem(`auth_guimy`)
    history.push(`/`)
    onReload()
  }

  const onSettings = () => {
    history.push(`/setting`)
  }

  useEffect(() => {
    initOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes])

  const RenderItem = ({
    title,
    openKey,
    icon = null,
    items,
    path = ``,
    show = true,
    subitem = false,
    classesExtra = ``,
  }) => {
    const selected = path === location.pathname
    if (show) {
      return (
        <ListItem
          button
          selected={selected}
          className={`${classes.item} ${classes.listItem} ${
            selected ? classes.selected : ``
          }`}
          onClick={() => handleClick(openKey, items, path)}
        >
          {icon && (
            <ListItemIcon className={classes.menuIcon}>
              <Icon
                value={icon}
                subitem={subitem}
                className={classes.menuIcon}
              />
            </ListItemIcon>
          )}

          {extended && (
            <ListItemText
              primary={title}
              className={`${!icon && classes.notIcon}`}
            />
          )}

          {items &&
            extended &&
            (open[openKey] ? (
              <ExpandLess className={classes.expand} />
            ) : (
              <ExpandMore className={classes.expand} />
            ))}
        </ListItem>
      )
    }

    return null
  }

  const handleDrawerToggle = () => {
    if (extended) {
      setExtended(false)
      initOpen()
    } else {
      setExtended(true)
    }
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: extended,
        [classes.drawerClose]: !extended,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: extended,
          [classes.drawerClose]: !extended,
        }),
      }}
    >
      <ListItem
        button
        className={`${classes.item} ${classes.listItem} ${classes.mb}`}
        onClick={() => handleClick(false, false, `/perfil`)}
      >
        <ListItemIcon className={classes.menuIcon}>
          <Avatar alt={user.name} src={user.avatar} />
        </ListItemIcon>
      </ListItem>
      <List
        component="nav"
        aria-label="Menu navegacion"
        className={classes.list}
      >
        {routes
          .filter(({ icon, hide }) => icon && !hide)
          .map(({ icon, title, path, key, items, show, classesExtra }) => {
            return (
              <Grid
                key={key}
                className={classes.itemContainer}
                justify="center"
                container
              >
                <RenderItem
                  icon={icon}
                  title={title}
                  openKey={key}
                  items={items}
                  path={path}
                  show={show}
                  classesExtra={classesExtra}
                />
                {items && (
                  <Collapse
                    in={open[key]}
                    timeout="auto"
                    unmountOnExit
                    className={classes.menuList}
                  >
                    {items.map(
                      ({ icon, title, path, key, show }) => {
                        return (
                          <RenderItem
                            key={key + title}
                            icon={icon}
                            title={title}
                            path={path}
                            show={show}
                            subitem={true}
                            classesExtra={classesExtra}
                          />
                        )
                      },
                    )}
                  </Collapse>
                )}
              </Grid>
            )
          })}
      </List>

    <span
        className={clsx(classes.btnToggledMenu, {
          [classes.btnToggledMenuOpen]: extended,
          [classes.btnToggledMenuClose]: !extended,
        })}
        onClick={handleDrawerToggle}
      >
        {extended ? (
          <ChevronLeftIcon className={classes.iconBtnToggledMenu} />
        ) : (
          <ChevronRightIcon className={classes.iconBtnToggledMenu} />
        )}
      </span>

      <Grid
        className={classes.footer}
        container
        justify="center"
        zeroMinWidth
        item
      >
        <Grid item xs={6}>
          <AutorenewIcon
            onClick={() => onReload()}
            className={classes.iconFooter}
          />
        </Grid>
        <Grid item xs={6}>
          <SettingsIcon
            onClick={() => onSettings()}
            className={classes.iconFooter}
          />
        </Grid>
        <Grid
          container
          justify="center"
        >
          <CancelIcon
            onClick={() => onSignOff()}
            className={classes.iconFooter}
          />
        </Grid>
      </Grid>
    </Drawer>
  )
}

export default SideBar
