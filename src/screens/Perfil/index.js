import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Divider,
} from '@material-ui/core'
import { Button, Snackbar } from 'components'
import { TextInput } from 'components/form/index'
import ErrorMessage from '../Login/ErrorMessage'
import { useAuth } from 'context'
import { styles } from './styles'

import {firestore} from '../../config/Firebase'

function Perfil() {
  const classes = styles()
  const { user } = useAuth()
  const [error, setError] = useState(``)
  const [fields, setFields] = useState({
    name: {
      value: `${user.name}`,
      error: false,
      active: false
    },
    password: {
      value: ``,
      error: false,
      active: false
    },
  })
  const [snackbar, setSnackbar] = useState({
    active: false,
    entity: ``,
  })

  const onChangeFields = ({ name, value }) => {
    setFields({
      ...fields,
      [name]: { error: ``, value, active: true },
    })
  }

  const hideSnackba = () => {
    setSnackbar({
      active: false,
      entity: ``,
    })
  }

  const handleEdit = name => {
    hideSnackba()
    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        active: true
      },
    })
  }

  const handleSave = () => {

    firestore.collection('users').doc(user.uid).update({
      'name' : fields.name.value
    }).then((u)=>{
      setSnackbar({
        active: true,
        entity: `Los datos han`
      })
    })

    setFields({
      ...fields,
      name: {
        ...fields.name,
        value: fields.name.value,
        active: false
      },
      password: {
        ...fields.password,
        value: fields.password.value,
        active: false
      },
    })
  }

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
      >
        <Grid item xs={12} md={10}>
          <Button
            variant="outlined"
            className={`${classes.button} ${classes.buttonReporSuge}`}
          >
            Reportes & Sugerencias
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.textBold}>Nombre</Typography>
          {fields.name.active ? (
            <>
              <TextInput
                error={fields.name.error}
                placeholder="Nombre"
                type="text"
                onChange={onChangeFields}
                name="name"
                value={fields.name.value}
                className={classes.textInput}
              />
              {error && (
                <ErrorMessage
                  message={error}
                  onClose={setError}
                  className={classes.errorMessage}
                />
              )}
            </>
          ) : (
            <Typography>{fields.name.value}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleEdit('name')}
          >
            Cambiar nombre
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.textBold}>Cuenta</Typography>
          <Typography>Usuario: {user.name}</Typography>
          {fields.password.active && (
            <>
              <br />
              <Typography className={classes.textBold}>Contraseña</Typography>
              <TextInput
                error={fields.password.error}
                placeholder="Contraseña"
                type="password"
                onChange={onChangeFields}
                name="password"
                value={fields.password.value}
                className={classes.textInput}
              />
              {error && (
                <ErrorMessage
                  message={error}
                  onClose={setError}
                  className={classes.errorMessage}
                />
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleEdit('password')}
          >
            Cambiar contraseña
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={`${classes.button} ${classes.buttonSave}`}
            onClick={() => handleSave()}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
      {snackbar.active && (
        <Snackbar
          type={`success`}
          message={`${snackbar.entity} sido actualizado exitosamente.`}
        />
      )}
    </Grid>
  )
}

export default Perfil
