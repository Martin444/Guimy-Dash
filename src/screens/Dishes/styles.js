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
    minWidth: `10em`,
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
  textSubtitle: {
    fontSize: `0.6em`,
    textAlign: `center`,
  },
  buttonDishes: {
    minWidth: `80%`,
  },
  buttonStyleDishes: {
    background: `#FFF`,
    border: `2px solid #b9babc`,
    color: `#8e9298`,
  },
  buttonAddDishes: {
    borderRadius: `100%`,
    margin: `0 auto`,
    display: `block`,
    height: `6em`,
    width: `6.3em`,
  },
  boxTextDishe: {
    marginTop: `-9em`,
    [theme.breakpoints.down(`sm`)]: {
      marginTop: `4em`,
    },
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  containerButtonDishes: {
    background: `#e9ebee`,
    padding: `0.5em`,
    marginTop: `-9em`,
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
}))

export const stylesForm = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
    '& p': {
      color: `#898a8b`,
    },
    '& input[type=text]': {
      border: `2px solid #e1e0e0`,
      background: `#f6f6f6`,
    },
    '& input[type=number]': {
      paddingRight: `1em`,
    },
  },
  errorMessage: {
    paddingBottom: theme.spacing(3),
  },
  addItem: {
    color: `#fead4c`,
  },
  addItemMarginLeft: {
    marginLeft: `1em`,
  },
  formControl: {
    width: `95%`,
    border: `2px solid #e1e0e0`,
    borderRadius: `1em`,
    margin: `auto`,
    marginLeft: `0.2em`,
    marginBottom: `1.5em`,
  },
  select: {
    background: `#f6f6f6`,
    border: `2px solid transparent`,
    height: `2.3em`,
  },
  buttonDishes: {
    background: `#FFF`,
    border: `2px solid #b9babc`,
    color: `#8e9298`,
  },
  buttonAddDishes: {
    borderRadius: `100%`,
    margin: `0 auto`,
    display: `block`,
    height: `6em`,
    width: `6.3em`,
  },
  textCenter: {
    textAlign: `center`,
  },
  imgUpload: {
    display: `none`,
  },
  precioMoneda: {
    padding: `0.6em`,
    borderRadius: `1em 0 0 1em`,
    background: `#f6f6f6`,
    border: `2px solid #e1e0e0`,
    display: `inline-block`,
    fontWeight: `bold`,
    height: `2.82em`,
  },
  inputPrecio: {
    width: `88%`,
    borderRadius: `0 1em 1em 0`,
    background: `#f6f6f6`,
    marginLeft: `-0.2em`,
    height: `2.04em`,
    border: `2px solid #e1e0e0`,
    marginBottom: `1.5em`,
    position: `relative`,
    top: `-2.05em`,
    left: `2.1em`,
  },
  boxSucursal: {
    padding: `0.5em`,
    textAlign: `center`,
    borderRadius: `1em`,
  },
  buttonSucursal: {
    padding: `5em`,
    background: `#FFF`,
    color: `#abaaaa`,
  },
  textSucursal: {
    color: `#423b3b !important`,
    marginTop: `0.5em`,
  },
}))

export const stylesRestaurant = makeStyles(theme => ({
  boxSucursal: {
    padding: `0.5em`,
    textAlign: `center`,
    borderRadius: `1em`,
  },
  boxSucursalActive: {
    background: `#e4d9d9`,
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
}))
