import { makeStyles } from '@material-ui/core'

export const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
    "& p": {
      color: `#898a8b`,
    },
  },
  button: {
    margin: `0 auto`,
    display: `block`,
    width: `15em`,
  },
  buttonSave: {
    left: `-7em`,
    [theme.breakpoints.down(`xs`)]: {
      left: 0,
    },
  },
  textBold: {
    fontWeight: `bold`,
    fontSize: `1.2rem`,
  },
  buttonSucursal: {
    padding: `5em`,
    background: `#FFF`,
    color: `#abaaaa`,
  },
  buttonSucursalActive: {
    color: `#FFF`,
    background: `#fead4c`,
  },
  textSucursal: {
    color: `#423b3b !important`,
    marginTop: `0.5em`,
  },
  margionTop: {
    marginTop: `-2em`,
    [theme.breakpoints.down(`sm`)]: {
      marginTop: 0,
    },
  },
  boxSucursalMargionTop: {
    marginTop: `-5em`,
    [theme.breakpoints.down(`sm`)]: {
      marginTop: 0,
    },
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  buttonOptionColor: {
    color: `#898a8b`,
    background: `transparent`,
  },
  boxSucursal: {
    padding: `0.5em`,
    textAlign: `center`,
    borderRadius: `1em`,
  },
  boxSucursalActive: {
    background: `#e4d9d9`,
  },
  textConfirm: {
    width: `100%`,
    textAlign: `center`,
  },
  qr: {
    background: `#585858`,
    borderRadius: `50%`,
    width: `50%`,
    display: `block`,
    margin: `auto`,
  },
  qrIcon: {
    width: `1.8em`,
  },
}))

export const stylesForm = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
    '& p': {
      color: `#898a8b`,
    },
    '& input': {
      border: `2px solid #e1e0e0`,
      background: `#f6f6f6`,
    },
  },
  errorMessage: {
    paddingBottom: theme.spacing(3),
  },
  buttonMap: {
    backgroundColor: `#f6f6f6`,
    border: `2px solid #e1e0e0`,
    color: `#c8cacc`,
    height: `2.5em`,
    width: `94.5%`,
    marginLeft: `0.4em`,
    marginBottom: `1em`,
    [theme.breakpoints.down(`xs`)]: {
      fontSize: `0.6em`,
    },
  },
  buttonMapIcon: {
    left: `5.5em`,
    position: `relative`,
    [theme.breakpoints.down(`xs`)]: {
      left: 0,
    },
  },
}))
