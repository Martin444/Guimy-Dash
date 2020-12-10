import React, {
  useState,
  useEffect,
  Fragment
} from 'react'
import {
  Grid,
  Typography,
  Divider,
  MenuItem,
  FormControl,
  Select,
  Avatar,
  IconButton
} from '@material-ui/core'
import { Cancel as CancelIcon } from '@material-ui/icons'
import { TextInput } from 'components/form/index'
import { Button, Snackbar, ModalWrapper } from 'components'
import ErrorMessage from '../Login/ErrorMessage'
import { styles } from './styles'
import { valuesRange, employeesData } from './data'

function Employees() {
  const classes = styles()
  const [fields, setFields] = useState({
    usuario: { value: ``, error: false },
    email: { error: ``, value: `` },
    rol: { value: 0, error: false },
    sucursal: { value: 0, error: false },
  })
  const [modal, setModal] = useState({
    open: false,
    title: `Eliminar empleado`,
    cancelText: `Cancelar`,
    acceptText: `Aceptar`,
    type: `delete`,
    employeeId: 0,
  })
  const [error, setError] = useState(``)
  const [isValid, setIsValid] = useState(false)
  const [snackbar, setSnackbar] = useState({
    active: false,
    text: ``,
  })
  const [employees, setEmployees] = useState(employeesData)
  const onChangeFields = ({ name, value }) => {
    setFields({
      ...fields,
      [name]: { error: ``, value },
    })
  }

  const hideSnackba = () => {
    setSnackbar({
      active: false,
      text: ``,
    })
  }

  const handleSaveEmployees = () => {
    hideSnackba()
    const nextId = employees.length + 1
    const nextEmployees = Object.assign(employees)
    nextEmployees.unshift({
      id: nextId,
      name: fields.usuario.value,
      avatar: `https://res.cloudinary.com/guimyapp/image/upload/v1596144962/japekao2nufkrpbmblci.jpg`,
      email: fields.email.value,
      rol: valuesRange.rol[fields.rol.value].text,
      sucursal: valuesRange.sucursal[fields.sucursal.value].text,
    })
    setEmployees(prevData => [...prevData, nextEmployees])
    setFields({
      ...fields,
      usuario: { error: ``, value: `` },
      email: { error: ``, value: `` },
      rol: { error: ``, value: 0 },
      sucursal: { error: ``, value: 0 },
    })
    setSnackbar({
      active: true,
      text: `Trabajador añadido exitosamente.`,
    })
  }

  const onCloseModal = () => {
    setModal({
      ...modal,
      open: false
    })
  }

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter(employee => employee.id !== modal.employeeId))
    setModal({
      ...modal,
      open: false,
      employeeId: 0
    })
    setSnackbar({
      active: true,
      text: `Trabajador eliminado exitosamente.`,
    })
  }

  useEffect(() => {
    let nextIsValid = true
    Object.keys(fields).forEach(name => {
      const { value } = fields[name]
      if (!value) {
        nextIsValid = false
      }
    })
    setIsValid(nextIsValid)
  }, [fields])

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
      >
        <Grid item xs={12} md={9}>
          <Typography className={`${classes.textBold} ${classes.marginBottom}`}>Añadir trabajador</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} md={2} className={classes.boxMarginTop}>
          <TextInput
            error={fields.usuario.error}
            placeholder="Usuario"
            type="text"
            onChange={onChangeFields}
            fullWidth={true}
            name="usuario"
            value={fields.usuario.value}
            className={classes.textInput}
          />
          {error && (
            <ErrorMessage
              message={error}
              onClose={setError}
              className={classes.errorMessage}
            />
          )}
        </Grid>
        <Grid item xs={12} md={2} className={`${classes.boxMarginLeft}${classes.boxMarginTop}`}>
          <TextInput
            error={fields.email.error}
            placeholder="Correo"
            type="email"
            onChange={onChangeFields}
            fullWidth={true}
            name="email"
            value={fields.email.value}
            className={classes.textInput}
          />
          {error && (
            <ErrorMessage
              message={error}
              onClose={setError}
              className={classes.errorMessage}
            />
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl required className={classes.formControl}>
            <Select
              labelId="add-rol-select-required-label"
              id="add-rol-select-required"
              name="rol"
              value={fields.rol.value}
              onChange={event => onChangeFields({ name: `rol`, value: event.target.value })}
            >
              {valuesRange.rol.map(range => (
                <MenuItem
                  key={`menu-item-${range.value}`}
                  value={range.value}
                  disabled={range.disabled}
                >
                  {range.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl required className={classes.formControl}>
            <Select
              labelId="add-sucursal-select-required-label"
              id="add-sucursal-select-required"
              name="sucursal"
              value={fields.sucursal.value}
              onChange={event => onChangeFields({ name: `sucursal`, value: event.target.value })}
            >
              {valuesRange.sucursal.map(range => (
                <MenuItem
                  key={`menu-item-${range.value}`}
                  value={range.value}
                  disabled={range.disabled}
                >
                  {range.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            disabled={!isValid}
            onClick={() => handleSaveEmployees()}
          >
            Aceptar
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography className={`${classes.textBold} ${classes.textTitleAddEmployees}`}>Trabajadores añadidos</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}></Grid>
        {employees.length === 0 && (
          <Grid item xs={12} className={classes.boxEmptyDatamarginTop}>
            <Typography>No existen registros</Typography>
          </Grid>
        )}
        {employees.map(employee => {
          if (!employee.id) return (<></>)
          return (
            <Fragment key={`employee-${employee.id}`}>
              <Grid item xs={2} md={1}>
                <Avatar alt={employee.name} src={employee.avatar} className={`${classes.avatar} ${classes.margin}`} />
              </Grid>
              <Grid item xs={2} md={2}>
                <Typography className={classes.textListTrabajadores}>{employee.name}</Typography>
              </Grid>
              <Grid item xs={3} md={2}>
                <Typography className={classes.textListTrabajadores}>{employee.email}</Typography>
              </Grid>
              <Grid item xs={2} md={1}>
                <Typography className={classes.textListTrabajadores}>{employee.rol}</Typography>
              </Grid>
              <Grid item xs={2} md={2}>
                <Typography className={classes.textListTrabajadores}>{employee.sucursal}</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => {
                    hideSnackba()
                    setModal({
                      ...modal,
                      open: true,
                      employeeId: employee.id
                    })
                  }}
                >
                  <CancelIcon className={classes.cancelIcon} />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={9}>
                <Divider />
              </Grid>
              <Grid item xs={12}></Grid>
            </Fragment>
          )
        })}
      </Grid>
      {modal.type === `delete` && modal.open && (
        <ModalWrapper
          title={modal.title}
          onClose={onCloseModal}
          onCancel={onCloseModal}
          onAccept={() => handleDeleteEmployee()}
        >
          <Typography className={classes.textConfirm}>
            {`¿Está seguro que desea eliminar al empleado?`}
          </Typography>
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

export default Employees
