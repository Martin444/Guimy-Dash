import { makeStyles } from '@material-ui/core'

export const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
    '& p': {
      color: `#898a8b`,
    },
    '& textarea::placeholder': {
      color: '#FFF'
    },
  },
  button: {
    margin: `0 auto`,
    display: `block`,
    width: `16em`,
    [theme.breakpoints.down(`xs`)]: {
      marginTop: `0.5em`,
      marginBottom: `0.5em`,
    },
  },
  buttonSave: {
    [theme.breakpoints.down(`xs`)]: {
      left: 0,
    },
  },
  buttonCancel: {
    background: `grey`,
    [theme.breakpoints.down(`xs`)]: {
      left: 0,
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
  },
  textarea: {
    background: `#706c6c`,
    width: `100%`,
    height: `13em !important`,
    color: `#FFF`,
    marginTop: `1em`,
    padding: `1em`,
  },
  dropzoneAreaLogo: {
    borderRadius: `100%`,
    width: `7em`,
    minHeight: `0em`,
    margin: `auto`,
    padding: `2em`,
    [theme.breakpoints.down(`xs`)]: {
      marginBottom: `0.5em`,
    },
    textContainer: {
      marginTop: `-4em`,
    },
  },
  dropzoneArea: {
    borderRadius: `100%`,
    width: `11em`,
    minHeight: `11em`,
    margin: `auto`,
    [theme.breakpoints.down(`xs`)]: {
      marginBottom: `0.5em`,
    },
  },
  addIcon: {
    marginTop: `1.6em`,
  },
  right: {
    float: `right`,
    [theme.breakpoints.down(`xs`)]: {
      float: `none`,
      marginTop: `0.5em`,
        marginBottom: `0.5em`,
    },
  },
  addLogo: {
    float: `left`,
    marginTop: `3.7em`,
    [theme.breakpoints.down(`xs`)]: {
      float: `none`,
      marginTop: `0em`,
    },
  }
}))
