import React from 'react'
import {
  Grid,
  Typography,
  Divider,
  TextareaAutosize,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { Button } from 'components'
import { DropzoneArea } from 'material-ui-dropzone'
import { styles } from './styles'
import './styles.css'

function Settings() {
  const classes = styles()
  const history = useHistory()

  const onRestaurant = () => {
    history.push(`/restaurants`)
  }

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
      >
        <Grid item xs={12} md={2}>
          <div className="box__logo">
            <DropzoneArea
              dropzoneClass={`${classes.dropzoneAreaLogo}`}
              acceptedFiles={[`image/*`]}
              dropzoneText={``}
              onChange={(files) => console.log(`Files:`, files)}
              Icon={AddIcon}
              showPreviewsInDropzone={false}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Button
            variant="contained"
            className={`${classes.button} ${classes.addLogo}`}
          >
            Añadir logo
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <br />
          <Typography className={classes.textBold}>Nombre del restaurante</Typography>
          <Typography>La pancha</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            className={classes.button}
          >
            Cambiar nombre
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <Divider />
          <br />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.textBold}>Descripción</Typography>
          <TextareaAutosize className={classes.textarea} placeholder="Escribe aquí..." />
        </Grid>
        <Grid item xs={12} md={10}>
          <br />
          <Divider />
          <br />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.textBold}>Imagen portada</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <div>
            <DropzoneArea
              className={classes.dropzoneArea}
              acceptedFiles={[`image/*`]}
              dropzoneText={``}
              onChange={(files) => console.log(`Files:`, files)}
              Icon={AddIcon}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            className={classes.button}
          >
            Añadir imágen
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <br />
          <Divider />
          <br />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.textBold}>Planes</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.textBold}>Plan básico</Typography>
          <Typography>Fecha inicio: 16 de Junio 2020</Typography>
          <Typography>Fecha finalización: 16 de Julio 2020</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            className={classes.button}
          >
            Pagar plan
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <br />
          <Divider />
          <br />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            className={`${classes.button} ${classes.buttonReporSuge} ${classes.buttonSave}`}
          >
            Reportes & Sugerencias
          </Button>
          <br />
          <Grid container>
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12} md={3}>
              <Button
                className={`${classes.button} ${classes.buttonCancel}`}
                onClick={onRestaurant}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                className={`${classes.button} ${classes.buttonSave}`}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Settings
