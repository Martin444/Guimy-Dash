import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import qrcode from 'qrcode'
import { Grid, Typography, Divider } from '@material-ui/core'
import {
  Button,
  ModalWrapper,
  Map,
  Snackbar
} from 'components'
import {
  BorderColor as BorderColorIcon,
  Add as AddIcon,
  StoreMallDirectory as StoreMallDirectoryIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import FormSucursal from './FormSucursal'
import qrCodeIcon from '../../assets/icons/qr-code.svg'
import { styles } from './styles'
import { useAuth } from 'context'

const initialListSucursals = [
  {
    id: 1,
    icon: <StoreMallDirectoryIcon />,
    text: `Miraflores de Piura 1`,
    active: false,
  },
  {
    id: 2,
    icon: <StoreMallDirectoryIcon />,
    text: `Miraflores de Piura 2`,
    active: false,
  },
  {
    id: 3,
    icon: <StoreMallDirectoryIcon />,
    text: `Miraflores de Piura 3`,
    active: false,
  },
  {
    id: null,
    icon: <AddIcon />,
    text: `Añadir sucursal`,
    active: false,
  },
]

const opts = {
  errorCorrectionLevel: `H`,
  type: `image/jpeg`,
  margin: 10,
  color: {
    dark: `#FFF`,
    light: `#585858`
  }
}

function Restaurants() {
  const classes = styles()
  const history = useHistory()
  const { branches } = useAuth()
  const [listSucursals, setListSucursals] = useState(branches)
  const [sucursalActive, setSucursalActive] = useState(true)
  const [qr, setQR] = useState(``)
  const [modal, setModal] = useState({
    open: false,
    title: `Añadir sucursal`,
    cancelText: `Cancelar`,
    acceptText: `Guardar`,
    type: `sucursal`
  })
  const [mapActive, setMapActive] = useState(false)
  const [snackbar, setSnackbar] = useState({
    active: false,
    text: ``,
  })

  const hideSnackba = () => {
    setSnackbar({
      active: false,
      text: ``,
    })
  }

  const onClickSucursal = indexSucursal => {
    const dataListSucursals = listSucursals.map((sucursal, index) => {
      sucursal.data().active = false

      // if (listSucursals.length - 1 === indexSucursal) {
      //   setSucursalActive(false)
      //   setModal({
      //     ...modal,
      //     type: `sucursal`,
      //     acceptText: `Guardar`,
      //     open: true
      //   })
      //   hideSnackba()

      //   return sucursal
      // }

      if (indexSucursal === index) {
        setSucursalActive(!sucursalActive)
        sucursal.data().active = !sucursal.data().active
      }

      return sucursal
    })
    setListSucursals(dataListSucursals)
  }

  const onCloseModal = () => {
    setModal({
      ...modal,
      open: false
    })
  }

  const handleDeleteRestaurant = () => {
    onCloseModal()
    const dataListSucursals = listSucursals.map(sucursal => {
      if (sucursal.active) return {}
      return sucursal
    })
    setListSucursals(dataListSucursals)
    hideSnackba()
    setSnackbar({
      active: true,
      text: `El restaurante ha sido eliminado exitosamente.`,
    })
  }

  const handleCopyQR = () => {
    hideSnackba()
    setSnackbar({
      active: true,
      text: `QR copiado exitosamente.`,
    })
  }

  const handleDownloadQR = () => {
    hideSnackba()
    setSnackbar({
      active: true,
      text: `QR descargado exitosamente.`,
    })
  }

  const onAcceptModal = () => {
    if (mapActive) {
      handleMapActive()
      return
    }

    setModal({
      ...modal,
      open: false
    })
  }

  const onSettings = () => {
    const dataListSucursals = listSucursals.map(sucursal => {
      sucursal.active = false
      return sucursal
    })
    setListSucursals(dataListSucursals)
    history.push(`/setting`)
  }

  const onQR = async () => {
    onGenerateQR({ alert: false })
    setModal({
      ...modal,
      title: ``,
      type: `qr`,
      open: true,
      cancelText: `Copiar`,
      acceptText: `Descargar`,
    })
  }

  const onGenerateQR = async ({ alert }) => {
    const url = `sucursal-qr`
    setQR(await qrcode.toDataURL(url, opts))
    if (alert) {
      hideSnackba()
      setSnackbar({
        active: true,
        text: `QR generado exitosamente.`,
      })
    }
  }

  const handleMapActive = () => {
    setMapActive(!mapActive)
  }

  return (
    <Grid container className={classes.container}>
      <Grid container item>
        {sucursalActive && (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
          >
            <Grid item xs={4} md={1}>
              <Button
                className={classes.buttonOptionColor}
                onClick={onQR}
              >
                <img src={qrCodeIcon} alt="QR icon" className={classes.qrIcon} />
              </Button>
            </Grid>
            <Grid item xs={4} md={1}>
              <Button
                className={classes.buttonOptionColor}
                onClick={onSettings}
              >
                <BorderColorIcon />
              </Button>
            </Grid>
            <Grid item xs={4} md={1}>
              <Button
                className={classes.buttonOptionColor}
                onClick={() => {
                  setModal({
                    ...modal,
                    title: `Eliminar sucursal`,
                    type: `delete`,
                    open: true
                  })
                }}
              >
                <DeleteIcon />
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.margionTop}>
              <Divider />
            </Grid>
          </Grid>
        )}
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={sucursalActive ? classes.boxSucursalMargionTop : ``}
        >
          {listSucursals.length > 0 && listSucursals.map((sucursal, index) => {
            console.log(sucursal.data().name)
            if (!sucursal.data().name) return <></>
            return (
              <Grid
                item
                xs={12}
                sm={5}
                md={3}
                className={`${classes.boxSucursal} ${sucursal.data().active ? classes.boxSucursalActive : ``}`}
                key={`${index} ${sucursal.data().name}`}
              >
                <Button
                  variant="contained"
                  className={`${classes.buttonSucursal} ${sucursal.data().active ? classes.buttonSucursalActive : ``}`}
                  onClick={() => onClickSucursal(index)}
                >
                  <StoreMallDirectoryIcon  fontSize='20'/>
                </Button>
                <Typography className={classes.textSucursal}>
                  {sucursal.data().name}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      {modal.type === `sucursal` && modal.open && (
        <ModalWrapper
          title={modal.title}
          onClose={onCloseModal}
          onAccept={onAcceptModal}
          onAcceptText={mapActive ? `Aceptar` : modal.acceptText}
        >
          {mapActive ? (
            <Map />
          ) : (
            <FormSucursal onMapActive={handleMapActive} />
          )}
        </ModalWrapper>
      )}
      {modal.type === `delete` && modal.open && (
        <ModalWrapper
          title={modal.title}
          onClose={onCloseModal}
          onCancel={onCloseModal}
          onAccept={handleDeleteRestaurant}
        >
          <Typography className={classes.textConfirm}>
            {`¿Está seguro que desea eliminar la sucursal?`}
          </Typography>
        </ModalWrapper>
      )}
      {modal.type === `qr` && modal.open && (
        <ModalWrapper
          title={modal.title}
          onClose={onCloseModal}
          onCancel={handleCopyQR}
          onAccept={handleDownloadQR}
          onCancelText={modal.cancelText}
          onAcceptText={modal.acceptText}
          buttonColorAccept={`secondary`}
        >
          <Grid
            item
            xs={12}
          >
            <img src={qr} alt="QR" className={classes.qr} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              className={classes.button}
              onClick={() => onGenerateQR({ alert: true })}
            >
              Generar código QR
            </Button>
            </Grid>
        </ModalWrapper>
      )}
      {snackbar.active && (
        <Snackbar
          type={`success`}
          message={snackbar.text}
        />
      )}
    </Grid>
  )
}

export default Restaurants
