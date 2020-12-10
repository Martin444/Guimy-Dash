import React, { useState,  useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { TextInput } from 'components/form/index'
import { Button } from 'components'
import { Link } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

import { AuthContext } from 'context'

const useStyles = makeStyles(({ spacing, fontSizes, palette }) => ({
  root: {
    height: `100vh`,
    backgroundColor: `#e9ebee`,
  },
  login: {
    maxWidth: `386px`,
    width: `100%`,
  },
  title: {
    color: `#ff2e3b`,
    textAlign: `center`,
    fontWeight: `bold`,
    fontSize: `26px`,
    lineHeight: `30px`,
    letterSpacing: `none`,
  },
  subtitle: {
    color: `#ff2e3b`,
    textAlign: `center`,
    marginBottom: `2em`,
    fontSize: `14px`,
  },
  button: {
    marginTop: spacing(3),
    marginBottom: spacing(3),
    width: `100%`,
  },
  linkWrapper: {
    width: `100%`,
  },
  link: {
    fontSize: fontSizes[1],
    color: palette.secondary.main,
  },
  errorMessage: {
    paddingBottom: spacing(3),
  },
  iconTextFooter: {
    color: `#fead4c`,
    top: `0.2em`,
    position: `relative`,
  }
}))


const Login = () => {

  const [error, setError] = useState(``)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const {logInHandel, fields, onChangeFields } = useContext(AuthContext)



  // useEffect(() => {
  //   let nextIsValid = true
  //   Object.keys(fields).forEach(name => {
  //     const { value } = fields[name]
  //     if (!value) {
  //       nextIsValid = false
  //     }
  //   })
  //   setIsValid(nextIsValid)
  // }, [fields])

  return (
    <Grid container className={classes.root}>
      <Grid item alignItems="center" justify="center" container>
        <Grid className={classes.login}>
          <Typography variant="h1" className={classes.title}>
            Ingresa
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            ¿Ya tienes tu cuenta creada?
          </Typography>
          <TextInput
            error={fields.name.error}
            placeholder="Email"
            type="email"
            inputType="email"
            onChange={onChangeFields}
            fullWidth={true}
            name="name"
            value={fields.name.value}
          />
          <TextInput
            error={fields.password.error}
            placeholder="Contraseña"
            type="password"
            onChange={onChangeFields}
            fullWidth={true}
            name="password"
            value={fields.password.value}
          />
          {error && (
            <ErrorMessage
              message={error}
              onClose={setError}
              className={classes.errorMessage}
            />
          )}
          <Button
            onClick={logInHandel}
            className={classes.button}
            disabled={false}
            loading={loading}
          >
            Ingresar
          </Button>
          <Grid>
            <Typography variant="body1">
              <PlayArrowIcon  className={classes.iconTextFooter} /> Si aun no posees una cuenta,&nbsp;
              <Link className={classes.link} to={`/register`}>
                Registrate
              </Link>
            </Typography>
            <Typography variant="body1">
              <PlayArrowIcon  className={classes.iconTextFooter} /> Olvidaste tu contraseña,&nbsp;
              <Link className={classes.link} to={`/recover-password`}>
                Recuperala
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
