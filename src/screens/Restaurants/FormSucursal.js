import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { TextInput } from 'components/form/index'
import ErrorMessage from '../Login/ErrorMessage'
import { stylesForm } from './styles'

function FormSucursal({
  onMapActive
}) {
  const classes = stylesForm()
  const [fields, setFields] = useState({
    comida: { value: ``, error: false },
    pais: { value: ``, error: false },
    ciudad: { value: ``, error: false },
    map: { value: ``, error: false },
    direccion: { value: `Av. San Martin 353`, error: false },
  })
  const [error, setError] = useState(``)

  const onChangeFields = ({ name, value }) => {
    setFields({
      ...fields,
      [name]: { error: ``, value },
    })
  }

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
      >
        <Grid item md={12}>
          <TextInput
            error={fields.comida.error}
            placeholder="Nombre de la sucursal"
            type="text"
            onChange={onChangeFields}
            fullWidth={true}
            name="comida"
            value={fields.comida.value}
          />
          {error && (
            <ErrorMessage
              message={error}
              onClose={setError}
              className={classes.errorMessage}
            />
          )}
          <TextInput
            error={fields.pais.error}
            placeholder="País"
            type="text"
            onChange={onChangeFields}
            fullWidth={true}
            name="pais"
            value={fields.pais.value}
          />
          {error && (
            <ErrorMessage
              message={error}
              onClose={setError}
              className={classes.errorMessage}
            />
          )}
          <TextInput
            error={fields.ciudad.error}
            placeholder="Ciudad"
            type="text"
            onChange={onChangeFields}
            fullWidth={true}
            name="ciudad"
            value={fields.ciudad.value}
          />
          <Button
            fullWidth={true}
            className={classes.buttonMap}
            endIcon={<ArrowRightIcon className={classes.buttonMapIcon} />}
            onClick={() => onMapActive()}
          >
            Añadir dirección
          </Button>
          {error && (
            <ErrorMessage
              message={error}
              onClose={setError}
              className={classes.errorMessage}
            />
          )}
          <Typography>{fields.direccion.value}</Typography>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FormSucursal
