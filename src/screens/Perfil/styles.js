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
    margin: `0 auto`,
    display: `block`,
    width: `15em`,
    [theme.breakpoints.down(`xs`)]: {
      marginBottom: `1em`,
    },
  },
  buttonSave: {
    left: `-7em`,
    [theme.breakpoints.down(`xs`)]: {
      left: 0,
      marginTop: `1em`,
    },
  },
  textBold: {
    fontWeight: `bold`,
    fontSize: `1.2rem`,
  },
  buttonReporSuge: {
    background: `transparent`,
    border: `2px solid #b9babc`,
    color: `#8e9298`,
    float: `right`,
    width: `20em`,
    height: `3.4em`,
    [theme.breakpoints.down(`xs`)]: {
      float: `none`,
      width: `100%`,
    },
  },
  errorMessage: {
    paddingBottom: theme.spacing(3),
  },
  textInput: {
    width: `50%`,
    [theme.breakpoints.down(`xs`)]: {
      width: `100%`,
    },
  },
}))
