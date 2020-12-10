import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Home from '@material-ui/icons/HomeRounded'
import Description from '@material-ui/icons/DescriptionRounded'
import Settings from '@material-ui/icons/SettingsRounded'
import Swap from '@material-ui/icons/SwapHoriz'
import PermData from '@material-ui/icons/PermDataSettingRounded'
import Assignment from '@material-ui/icons/AssignmentTurnedInRounded'
import FileCopy from '@material-ui/icons/FileCopyRounded'
import InsertChart from '@material-ui/icons/InsertChart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import LocalDiningIcon from '@material-ui/icons/LocalDining'
import StoreIcon from '@material-ui/icons/Store'
import EventIcon from '@material-ui/icons/Event'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.common.white,
  },
  expand: {
    width: `1.5rem`,
    height: `1.5rem`,
  },
  subitem: {
    width: `2rem`,
    height: `2rem`,
    marginLeft: `1rem`,
  },
}))

const SideBarIcon = ({ value, subitem = false }) => {
  const classes = useStyles()
  const className = `${classes.expand} ${classes.icon} ${subitem &&
    classes.subitem} `
  const icons = {
    home: <Home className={className} />,
    description: <Description className={className} />,
    settings: <Settings className={className} />,
    fileCopy: <FileCopy className={className} />,
    insertChart: <InsertChart className={className} />,
    swap: <Swap className={className} />,
    assignment: <Assignment className={className} />,
    perm: <PermData className={className} />,
    account: <AccountCircleIcon className={className} />,
    local: <LocalDiningIcon className={className} />,
    person: <PersonAddIcon className={className} />,
    store: <StoreIcon className={className} />,
    event: <EventIcon className={className} />,
    shopping: <ShoppingCartIcon className={className} />,
  }

  return icons[value] || null
}

export default SideBarIcon
