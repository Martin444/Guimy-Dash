import React, { useState } from 'react'
import {
  Grid,
  Typography,
} from '@material-ui/core'
import {
  Add as AddIcon,
} from '@material-ui/icons'
import { Button, ModalWrapper } from 'components'
import Form from './Form'
import { styles } from './styles'

const listOptionDishes = [`Comida`, `Postre`, `Bebida`]

function Dishes() {
  const classes = styles()
  const [dishesSelect, setDishesSelect] = useState(listOptionDishes[0])
  const [modal, setModal] = useState({
    open: false,
  })
  const [fields, setFields] = useState({
    comida: { value: ``, error: false },
    insumo: {
      1: { value: ``, error: false }
    },
    categoria: {
      1: { value: `0`, error: false }
    },
    precio: { value: 0, error: false },
    tiempo: { value: `0`, error: false },
    sucursal: { value: ``, error: false },
  })
  const [error, setError] = useState(``)
  const [categoriesInputs, setCategoriesInputs] = useState([{ id: 1 }])
  const [insumoInputs, setInsumoInputs] = useState([{ id: 1 }])

  const handleError = value => {
    setError(value)
  }

  const handleAddCategory = () => {
    const id = categoriesInputs.length + 1
    setFields({
      ...fields,
      categoria: {
        ...fields.categoria,
        [id]: { error: ``, value: 0 }
      },
    })

    const nextCategoriesInputs = Object.assign(categoriesInputs)
    nextCategoriesInputs.push({ id })
    setCategoriesInputs(prevData => [...prevData, nextCategoriesInputs])
  }

  const handleAddInsumo = () => {
    const id = insumoInputs.length + 1
    setFields({
      ...fields,
      insumo: {
        ...fields.insumo,
        [id]: { error: ``, value: `` }
      },
    })

    const nextInsumoInputs = Object.assign(insumoInputs)
    nextInsumoInputs.push({ id })
    setInsumoInputs(prevData => [...prevData, nextInsumoInputs])
  }

  const onCloseModal = () => {
    setModal({
      ...modal,
      open: false
    })
  }

  const handleSaveDishes = () => {
    setModal({
      ...modal,
      open: false
    })
  }

  const onChangeFields = ({ index, name, value }) => {
    if (index) {
      setFields({
        ...fields,
        [name]: {
          ...fields[name],
          [index]: { error: ``, value }
        },
      })
    } else {
      setFields({
        ...fields,
        [name]: { error: ``, value },
      })
    }
  }

  return (
    <Grid container className={classes.container}>
      {listOptionDishes.map(item => (
        <Grid item xs={12} md={2}>
          <Button
            variant="outlined"
            className={`${classes.button} ${classes.buttonDishes} ${classes.buttonStyleDishes}`}
            onClick={() => setDishesSelect(item)}
          >
            {item}
          </Button>
        </Grid>
      ))}
      {dishesSelect && (
        <Grid container className={classes.boxTextDishe}>
          <Grid item xs={12}>
            <Typography className={classes.textBold} display="block">
              {`${dishesSelect}s`}
            </Typography>
          </Grid>
          <Grid container className={classes.containerButtonDishes}>
            <Grid item xs={6} md={2}>
              <Button
                variant="outlined"
                className={`${classes.buttonAddDishes} ${classes.buttonStyleDishes}`}
                onClick={() => setModal({
                  ...modal,
                  open: true
                })}
              >
                <AddIcon />
              </Button>
              <Typography className={classes.textSubtitle}>
                {`Añadir ${dishesSelect}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      {modal.open && (
        <ModalWrapper
          onCancel={onCloseModal}
          onClose={onCloseModal}
          onAccept={handleSaveDishes}
          maxWidth={`1000px`}
          isDisabledOnAccept={(fields.comida.value === ``)}
        >
          <Form
            error={error}
            fields={fields}
            categoriesInputs={categoriesInputs}
            insumoInputs={insumoInputs}
            onChangeFields={onChangeFields}
            handleAddCategory={handleAddCategory}
            handleAddInsumo={handleAddInsumo}
            handleError={handleError}
          />
        </ModalWrapper>
      )}
    </Grid>
  )
}

export default Dishes
