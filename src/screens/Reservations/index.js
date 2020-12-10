import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Grid,
  Typography,
  Divider,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
} from '@material-ui/icons'
import {
  Button,
  ModalWrapper,
  TableWrapper,
  UIFullCalendar
} from 'components'
import {
  chairs2,
  chairs4,
  chairs6
} from 'assets/img'

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    width: `100%`,
    '& p': {
      color: `#898a8b`,
    },
  },
  buttonAddFuntionBooking: {
    margin: `0 auto`,
    display: `block`,
    width: `30em`,
    marginTop: `10em`,
    [theme.breakpoints.down(`xs`)]: {
      width: `26em`,
    },
  },
  buttonPadding: {
    padding: `2em`,
  },
  textButton: {
    color: `#FFF !important`,
    marginTop: `-0.9em`,
    fontSize: `1.5em`,
    fontWeight: `bold`,
  },
  textBold: {
    fontWeight: `bold`,
    fontSize: `1.2rem`,
  },
  buttonOptionColor: {
    color: `#898a8b`,
    background: `transparent`,
  },
  marginTop: {
    marginTop: `-2em`,
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  marginLeft: {
    marginLeft: `2em`,
  },
  button: {
    minWidth: `15em`,
    [theme.breakpoints.down(`xs`)]: {
      width: `100%`,
      marginLeft: `0.5em`,
      marginBottom: `0.5em`,
    },
  },
  buttonOptionWidth: {
    minWidth: `96%`,
    [theme.breakpoints.down(`sm`)]: {
      fontSize: `0.6em`,
    },
  },
  buttonOption: {
    background: `#FFF`,
    border: `2px solid #FEAD4C`,
    color: `#FEAD4C`,
  },
  gridMarginRight: {
    marginRight: `1em`,
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  gridMarginTop: {
    marginTop: `-7em`,
    [theme.breakpoints.down(`sm`)]: {
      marginTop: `-5em`,
    },
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  gridDividerMarginTop: {
    marginTop: `-10em`,
    [theme.breakpoints.down(`sm`)]: {
      marginTop: `-8em`,
    },
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  gridChairsMarginTop: {
    marginTop: `-13em`,
    [theme.breakpoints.down(`sm`)]: {
      marginTop: `-12em`,
    },
    [theme.breakpoints.down(`xs`)]: {
      marginTop: 0,
    },
  },
  textAlign: {
    textAlign: `center`,
  },
  textChairs: {
    color: `#FEAD4C !important`,
    fontWeight: `bold`,
  },
  gridButton: {
    cursor: `pointer`,
    padding: `0.5em`,
    borderRadius: `1em`,
    [theme.breakpoints.down(`xs`)]: {
      marginTop: `0.5em`,
    },
  },
  boxChairActive: {
    background: `#e4d9d9`,
  },
  textConfirm: {
    width: `100%`,
    textAlign: `center`,
  },
  formControl: {
    width: `98%`,
    marginLeft: `0.4em`,
    marginBottom: `0.5em`,
    [theme.breakpoints.down(`xs`)]: {
      width: `98%`,
    },
  },
  formYearControl: {
    [theme.breakpoints.down(`xs`)]: {
      marginTop: `0.5em`,
    },
  },
  boxFullCalendar: {
    background: `#d2d2d2`,
    boxShadow: `0 0 10px -3px #c3c1c1`,
  },
  textStatus: {
    color: `#fead4c !important`,
    fontWeight: `bold`,
    fontSize: `1.4em`,
  },
}))

const initialButtonOptions = [
  {
    text: `Añadir mesa`,
    icon: <AddCircleIcon />,
    active: true,
  },
  {
    text: `Solicitudes`,
    icon: <NotificationsIcon />,
    active: false,
  },
  {
    text: `Reservaciones`,
    icon: <EventIcon />,
    active: false,
  },
]

const initialListChairs = [
  {
    icon: chairs6,
    text: `6 Personas`,
    active: false,
  },
  {
    icon: chairs2,
    text: `2 Personas`,
    active: false,
  },
  {
    icon: chairs4,
    text: `4 Personas`,
    active: false,
  },
]

const initialTableBody = [
  {
    id: 1,
    name: `Test 1`,
    chair: `Mesa 2 personas`,
    date: `2020-09-13`,
    status: `Confirmado`,
  },
  {
    id: 2,
    name: `Test 2`,
    chair: `Mesa 4 personas`,
    date: `2020-09-10`,
    status: `Por confirmar`,
  },
  {
    id: 3,
    name: `Test 3`,
    chair: `Mesa 6 personas`,
    date: `2020-09-10`,
    status: `Cancelada`,
  },
]

const yearNow = new Date().getFullYear()
const monthNow = new Date().getMonth() + 1
const dayNow = new Date().getDate()

const getDay = () => {
  const item = []
  for (let i = 1; i <= 31; i++ ) {
    item.push({
      value: i,
      text: i
    })
  }

  return item
}

const getMonth = () => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const item = []

  months.forEach((month, index) => {
    item.push({
      value: index + 1,
      text: month
    })
  })

  return item
}

const getYear = () => {
  const years = []
  const item = []

  for (let i = 2020; i <= yearNow; i++) {
    years.push(i )
  }

  years.forEach(year => {
    item.push({
      value: year,
      text: year
    })
  })

  return item
}

function Reservations() {
  const classes = styles()
  const [listChairs, setListChairs] = useState(initialListChairs)
  const [buttonOptions, setButtonOptions] = useState({})
  const [bookingsActive, setBookingsActive] = useState(!false)
  const [chairActive, setChairActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({
    open: false,
    title: `Añadir mesa`,
    cancelText: `Cancelar`,
    acceptText: `Guardar`,
    type: `mesa`
  })
  /*
  const [tableCells, setTableCells] = useState(initialTableCells)
  const [tableBody, setTableBody] = useState(initialTableBody)
  */
  const [fields, setFields] = useState({
    day: {
      value: dayNow,
      error: false,
      item: getDay(),
    },
    month: {
      value: monthNow,
      error: false,
      item: getMonth(),
    },
    year: {
      value: yearNow,
      error: false,
      item: getYear(),
    },
  })
  const [initialDate, setInitialDate] = useState(new Date())
  const initialTableCells = [
    {
      dataIndex: `name`,
    },
    {
      dataIndex: `chair`,
    },
    {
      dataIndex: `date`,
      width: `20m`,
      align: `center`,
    },
    {
      dataIndex: `status`,
      width: `15em`,
      align: `center`,
      component: status => {
        return (
          <Typography
            className={classes.textStatus}
          >
            {status}
          </Typography>
        )
      },
    },
  ]

  const tableCells = initialTableCells
  const tableBody = initialTableBody

  const onClickChair = indexChair => {
    const dataListChairs = listChairs.map((chair, index) => {
      chair.active = false

      if (indexChair === index) {
        setChairActive(true)
        chair.active = !chair.active
      }

      return chair
    })
    setListChairs(dataListChairs)
  }

  const onClickOption = indexOption => {
    const dataListOptions = buttonOptions.map((option, index) => {
      option.active = false

      if (indexOption === index) {
        setChairActive(false)
        onClickChair(false)
        option.active = !option.active
        if (option.on) {
          option.on()
        }
      }

      return option
    })
    setButtonOptions(dataListOptions)
  }

  const onCloseModal = () => {
    setModal({
      ...modal,
      open: false
    })
  }

  useEffect(() => {
    setButtonOptions(initialButtonOptions.map((buttonOption, index) => {
      if (index === 1) {
        buttonOption.on = () => setLoading(false)
      }

      return buttonOption
    }))
  }, [])

  const onChangeFields = ({ name, value, item }) => {
    setInitialDate(new Date(
      fields.year.value,
      fields.month.value,
      fields.day.value
    ))
    setFields({
      ...fields,
      [name]: { error: ``, value, item },
    })
  }

  return (
    <Grid container className={classes.container}>
      <Grid
        container
      >
        {bookingsActive && buttonOptions.length > 0 ? (
          <Grid
            container
          >
            <Grid
              container
            >
              {buttonOptions.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={2}
                  className={classes.gridMarginRight}
                  key={`${index} ${item.text}`}
                >
                  <Button
                    variant="outlined"
                    startIcon={item.icon}
                    className={`${classes.button} ${classes.buttonOptionWidth} ${item.active ? `` : classes.buttonOption}`}
                    onClick={() => onClickOption(index)}
                  >
                    {item.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
              className={classes.gridMarginTop}
            >
              {chairActive && (
                <>
                  <Grid item xs={6} sm={2} md={1}>
                    <Button
                      className={`${classes.buttonOptionColor} ${classes.marginLeft}`}
                      onClick={() => {}}
                    >
                      <VisibilityIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={2} md={1}>
                    <Button
                      className={classes.buttonOptionColor}
                      onClick={() => {
                        setModal({
                          ...modal,
                          title: `Eliminar mesa`,
                          type: `delete`,
                          open: true
                        })
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
            {!buttonOptions[1].active ? (
              <Grid item xs={12} className={classes.gridDividerMarginTop}>
                <Divider />
              </Grid>
            ) : (
              <br />
            )}
            <Grid
              container
              className={!buttonOptions[2].active ? classes.gridChairsMarginTop : ``}
            >
              {buttonOptions[0].active && listChairs.map((chair, index) => (
                <Grid
                  item
                  xs={6}
                  md={2}
                  className={classes.textAlign}
                  key={`${index} ${chair.text}`}
                  onClick={() => onClickChair(index)}
                >
                  <div className={`${classes.gridButton} ${chair.active ? classes.boxChairActive : ``}`}>
                    <img src={chair.icon} alt={chair.text} />
                    <Typography className={classes.textChairs}>
                      {chair.text}
                    </Typography>
                  </div>
                </Grid>
              ))}
              {buttonOptions[1].active && (
                <TableWrapper
                  loading={loading}
                  tableCells={tableCells}
                  tableBody={tableBody}
                />
              )}
              {buttonOptions[2].active && (
                <Grid
                  container
                  justify="center"
                >
                  <Grid item xs={12}><br /></Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <FormControl required className={classes.formControl}>
                      <Select
                        labelId="add-day-select-required-label"
                        id="add-day-select-required"
                        name="day"
                        value={fields.day.value}
                        onChange={event => onChangeFields({
                          name: `day`,
                          value: event.target.value,
                          item: fields.day.item
                        })}
                      >
                        {fields.day.item.map(range => (
                          <MenuItem
                            value={range.value}
                            disabled={range.disabled}
                          >
                            {range.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <FormControl required className={classes.formControl}>
                      <Select
                        labelId="add-month-select-required-label"
                        id="add-month-select-required"
                        name="month"
                        value={fields.month.value}
                        onChange={event => onChangeFields({
                          name: `month`,
                          value: event.target.value,
                          item: fields.month.item
                        })}
                      >
                        {fields.month.item.map(range => (
                          <MenuItem
                            value={range.value}
                            disabled={range.disabled}
                          >
                            {range.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={12} md={3}>
                    <FormControl required className={`${classes.formControl} ${classes.formYearControl}`}>
                      <Select
                        labelId="add-year-select-required-label"
                        id="add-year-select-required"
                        name="year"
                        value={fields.year.value}
                        onChange={event => onChangeFields({
                          name: `year`,
                          value: event.target.value,
                          item: fields.year.item
                        })}
                      >
                        {fields.year.item.map(range => (
                          <MenuItem
                            value={range.value}
                            disabled={range.disabled}
                          >
                            {range.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}><br /></Grid>
                  <Grid item xs={12} className={classes.boxFullCalendar}>
                    <UIFullCalendar
                      initialDate={initialDate}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Button
              className={`${classes.buttonAddFuntionBooking} ${classes.buttonPadding}`}
              onClick={() => setBookingsActive(true)}
            >
              <Typography className={classes.textButton}>
                Añadir función para reservas
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      {modal.type === `delete` && modal.open && (
        <ModalWrapper
          title={modal.title}
          onClose={onCloseModal}
          onCancel={onCloseModal}
          onAccept={onCloseModal}
        >
          <Typography className={classes.textConfirm}>
            {`¿Está seguro que desea eliminar la mesa?`}
          </Typography>
        </ModalWrapper>
      )}
    </Grid>
  )
}

export default Reservations
