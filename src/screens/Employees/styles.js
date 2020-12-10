import { makeStyles } from '@material-ui/core'

export const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
    '& p': {
      color: `#898a8b`,
    },
  },
  button: {
    width: `15em`,
    [theme.breakpoints.down(`xs`)]: {
      width: `100%`,
    },
  },
  textBold: {
    fontWeight: `bold`,
    fontSize: `1.2rem`,
  },
  textTitleAddEmployees: {
    marginTop: `1em`,
    marginBottom: `1em`,
  },
  errorMessage: {
    paddingBottom: theme.spacing(3),
  },
  formControl: {
    minWidth: `10em`,
    marginLeft: `0.4em`,
    [theme.breakpoints.down(`xs`)]: {
      minWidth: `100%`,
      marginLeft: 0,
      marginBottom: `0.4em`,
    },
  },
  margin: {
    marginTop: `-0.2em`,
  },
  marginBottom: {
    marginBottom: `1em`,
  },
  boxEmptyDatamarginTop: {
    marginTop: `-3em`,
    [theme.breakpoints.down(`xs`)]: {
      marginTop: `-1em`,
    },
  },
  cancelIcon: {
    color: `#ff6161`,
  },
  textListTrabajadores: {
    [theme.breakpoints.down(`xs`)]: {
      fontSize: `0.4em`,
      overflow: `auto`,
    },
  },
  textConfirm: {
    width: `100%`,
    textAlign: `center`,
  },
  boxMarginTop: {
    [theme.breakpoints.down(`xs`)]: {
      marginTop: `0.5em`,
    },
  },
  boxMarginLeft: {
    marginLeft: `0.3em !important`,
    [theme.breakpoints.down(`xs`)]: {
      marginLeft: `0 !important`,
    },
  },
  avatar: {
    [theme.breakpoints.down(`xs`)]: {
      width: `1em`,
      height: `1em`,
      marginTop: `2px`,
    },
  },
}))
