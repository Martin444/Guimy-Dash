import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Divider,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import {
  Add as AddIcon,
} from '@material-ui/icons'
import { TextInput } from 'components/form/index'
import { Button, ModalWrapper } from 'components'
import ErrorMessage from '../Login/ErrorMessage'
import { stylesForm as styles } from './styles'
import Restaurants from './Restaurants'
import './styles.css'

function Form({
  error,
  fields,
  categoriesInputs,
  insumoInputs,
  onChangeFields,
  handleAddCategory,
  handleAddInsumo,
  handleError,
}) {
  const classes = styles()
  const [modal, setModal] = useState({
    open: false,
  })

  const onCloseModal = () => {
    setModal({
      ...modal,
      open: false
    })
  }

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
      >
        <Grid item xs={12} md={6}>
          <TextInput
            error={fields.comida.error}
            placeholder="Nombre de la comida"
            type="text"
            onChange={onChangeFields}
            fullWidth={true}
            name="comida"
            value={fields.comida.value}
          />
          {error && (
            <ErrorMessage
              message={error}
              onClose={handleError}
              className={classes.errorMessage}
            />
          )}
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item xs={12} md={2} className={classes.textCenter}>
          <Button
            variant="outlined"
            className={`${classes.buttonAddDishes} ${classes.buttonDishes}`}
          >
            <AddIcon />
          </Button>
          <Typography variant="caption" className={classes.addItem}>
            <label for="upload">
              + Añadir imagen
              <input type="file" id="upload" className={classes.imgUpload} />
            </label>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {categoriesInputs.map(categoriesInput => {
            if (!categoriesInput.id) return (<></>)
            return (
              <FormControl
                key={`form-input-category-${categoriesInput.id}`}
                required
                className={classes.formControl}
              >
                <Select
                  labelId={`add-categoria-${categoriesInput.id}-select-required-label`}
                  id={`add-categoria-${categoriesInput.id}-select-required`}
                  name={`categoria${categoriesInput.id}`}
                  value={fields.categoria[categoriesInput.id].value}
                  onChange={event => onChangeFields({
                    index: categoriesInput.id,
                    name: `categoria`,
                    value: event.target.value
                  })}
                  className={classes.select}
                >
                  <MenuItem value="0" disabled>
                    <em>Categoría</em>
                  </MenuItem>
                  <MenuItem value={1}>Categoría 1</MenuItem>
                  <MenuItem value={2}>Categoría 2</MenuItem>
                  <MenuItem value={3}>Categoría 3</MenuItem>
                </Select>
              </FormControl>
            )
          })}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="caption"
            className={`${classes.addItem} ${classes.addItemMarginLeft}`}
            onClick={handleAddCategory}
          >
            + Añadir otra categoría
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography>Insumo</Typography>
          <Divider />
          <br />
        </Grid>
        <Grid item xs={12} md={6}>
          {insumoInputs.map(insumoInput => {
              if (!insumoInput.id) return (<></>)
              return (
                <TextInput
                  type="text"
                  key={`form-input-insumo-${insumoInput.id}`}
                  onChange={event => onChangeFields({
                    index: insumoInput.id,
                    name: `insumo`,
                    value: event.value
                  })}
                  name={`insumo${insumoInput.id}`}
                  value={fields.insumo[insumoInput.id].value}
                  fullWidth={true}
                  error={fields.insumo[insumoInput.id].error}
                  placeholder={`Insumo ${insumoInput.id}`}
                />
              )
            })
          }
          {error && (
            <ErrorMessage
              message={error}
              onClose={handleError}
              className={classes.errorMessage}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="caption"
            className={`${classes.addItem} ${classes.addItemMarginLeft}`}
            onClick={handleAddInsumo}
          >
            + Añadir otro insumo
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography>Precio</Typography>
          <Divider />
          <br />
        </Grid>
        <Grid item md={12}>
          <Grid item xs={12} md={6}>
            <Typography className={classes.precioMoneda}>
              S/.
            </Typography>
            <TextInput
              error={fields.precio.error}
              placeholder="Precio"
              type="number"
              onChange={onChangeFields}
              fullWidth={true}
              name="precio"
              value={fields.precio.value}
              className={`box-input--precio ${classes.inputPrecio}`}
            />
            {error && (
              <ErrorMessage
                message={error}
                onClose={handleError}
                className={classes.errorMessage}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography>Tiempo</Typography>
          <Divider />
          <br />
        </Grid>
        <Grid item md={12}>
          <Grid item xs={12} md={6}>
            <FormControl
              key={`form-input-tiempo`}
              required
              className={classes.formControl}
            >
              <Select
                labelId={`add-tiempo-select-required-label`}
                id={`add-tiempo-select-required`}
                name={`tiempo`}
                value={fields.tiempo.value}
                onChange={event => onChangeFields({
                  name: `tiempo`,
                  value: event.target.value
                })}
                className={classes.select}
              >
                <MenuItem value="0" disabled selected>
                  <em>Tiempo estimado de entrega</em>
                </MenuItem>
                <MenuItem value={1}>1 hora</MenuItem>
                <MenuItem value={2}>2 hora</MenuItem>
                <MenuItem value={3}>3 hora</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography>Sucursal</Typography>
          <Divider />
          <br />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={3}
          className={classes.boxSucursal}
          key={`add-sucursal`}
        >
          <Button
            variant="contained"
            className={classes.buttonSucursal}
            onClick={() => {
              setModal({
                ...modal,
                open: true
              })
            }}
          >
            <AddIcon />
          </Button>
          <Typography className={classes.textSucursal}>
            Añadir sucursal
          </Typography>
        </Grid>
      </Grid>
      {modal.open && (
        <ModalWrapper
          onCancel={onCloseModal}
          onClose={onCloseModal}
          onAccept={onCloseModal}
          maxWidth={`1000px`}
        >
          <Restaurants />
        </ModalWrapper>
      )}
    </Grid>
  )
}

export default Form
