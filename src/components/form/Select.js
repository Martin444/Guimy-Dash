import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import {
  UnfoldMoreRounded as UnfoldMoreRoundedIcon,
  CheckRounded as CheckRoundedIcon,
} from '@material-ui/icons'
import InputWrapper from './InputWrapper'
import { inputCommonStyles, generateInputSuccessStyles } from 'utils'

const useStyles = makeStyles(theme => ({
  ...inputCommonStyles(theme),
  chips: {
    display: `flex`,
    flexWrap: `wrap`,
    height: `36px`,
    overflowY: `auto`,
    alignItems: `center`,
    '&::-webkit-scrollbar': {
      width: `8px` /* Tamaño del scroll en vertical */,
      height: `8px` /* Tamaño del scroll en horizontal */,
    },
    /* Ponemos un color de fondo y redondeamos las esquinas del thumb */
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.terniary.dark,
      borderRadius: `4px`,
    },

    /* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: `#979797`,
      boxShadow: `0 0 2px 1px rgba(0, 0, 0, 0.2)`,
    },

    /* Cambiamos el fondo cuando esté en active */
    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor: `#979797`,
    },
    /* Ponemos un color de fondo y redondeamos las esquinas del track */
    '&::-webkit-scrollbar-track': {
      background: theme.palette.primary.light,
      borderRadius: `4px`,
    },

    /* Cambiamos el fondo cuando esté en active o hover */
    '&::-webkit-scrollbar-track:hover': {
      background: theme.palette.primary.light,
    },
    '&::-webkit-scrollbar-track:active': {
      background: theme.palette.primary.light,
    },
    '& p': {
      margin: 0,
      padding: 0,
    },
  },
  chip: {
    margin: 2,
  },
  check: {
    fill: theme.palette.success.main,
  },
  openList: {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: `5px`,
    maxHeight: `12rem`,
    minHeight: `12rem`,
    overflow: `hidden`,
    overflowY: `scroll`,
    width: `auto`,
  },
  emptyText: {
    textAlign: `center`,
  },
  filterInput: {
    background: `white`,
    border: `none`,
    borderBottom: `3px solid #dcdde5`,
  },
  checked: {
    '& svg': {
      fill: theme.palette.success.main,
    },
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: `auto`,
    },
  },
}

const Icon = {
  select: UnfoldMoreRoundedIcon,
  check: CheckRoundedIcon,
}

const SelectWrapper = ({
  id,
  label,
  error,
  isRequired = false,
  disabled = false,
  onChange,
  classes: classesParent,
  items = [],
  value,
  name,
  allowClear = false,
  hasSearch = true,
  mode = `default`,
  openList = false,
  placeholder = `Seleccione`,
  align = `left`,
  md = 12,
  xs = 12,
  variant = `standard`,
  withSelectOption = true,
  isValid,
  showNames = false,
  ...rest
}) => {
  const classes = useStyles()
  const iconName =
    isValid && value !== -1 && value !== null ? `check` : `select`
  const getNextValues = nextValue => {
    const exist = value.find(x => x === nextValue)
    if (exist) {
      return value.filter(x => x !== nextValue)
    }
    return [...value, nextValue]
  }
  const onHandleChange = ({ name, value: nextValue, id }) => {
    //Seleccionar todos
    if (Array.isArray(nextValue) && nextValue.find(x => x === `all`)) {
      let newValue = []
      if (items.length !== value.length) {
        newValue = items.map(({ value }) => value)
      }
      onChange({ name, value: newValue, id })
    } else {
      onChange({ name, value: nextValue, id })
    }
  }
  const isChecked = itemValue => {
    const item = value.find(x => x === itemValue)
    return item !== undefined
  }
  const isAllChecked = () => {
    const item = items.length === value.length
    return item
  }
  let props = {
    name,
    classes: {
      ...classesParent,
    },
    variant,
    mode, //MULTI DEFAULT ETC...,
    placeholder,
    value: value || [],
    disabled,
    allowClear,
    onChange: ({ target: { value, name } }) => {
      onHandleChange({ name, value, id })
    },
    showSearch: hasSearch,
    filterOption: (input, option) =>
      hasSearch
        ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        : null,
    IconComponent: Icon[iconName],
    inputProps: {
      classes: {
        icon: iconName === `check` ? classes.check : ``,
      },
    },
  }
  if (mode === `multiple`) {
    props = {
      ...props,
      multiple: true,
      input: <Input id="select-multiple-chip" />,
      MenuProps,
      value: value || [],
      // eslint-disable-next-line react/display-name
      renderValue: selected => {
        let response = ``
        if (showNames) {
          response = items
            .filter(item => selected.includes(item.value))
            .map(item => item.label)
            .join(`, `)
        } else {
          selected.forEach(
            (resp, index) =>
              (response = index === 0 ? `${resp}` : `${response}, ${resp}`),
          )
        }
        return (
          <div className={classes.chips}>
            <p>{response}</p>
          </div>
        )
      },
    }
  }
  if (openList) {
    props = {
      ...props,
      open: false,
    }
  }
  return (
    <InputWrapper
      label={label}
      error={error}
      isRequired={isRequired}
      align={align}
      md={md}
      xs={xs}
      disabled={disabled}
      classNames={generateInputSuccessStyles(
        { classes, isValid, value, error },
        `inputWrapper`,
      )}
      {...rest}
    >
      {openList ? (
        <Grid className={classes.openList}>
          {items.length > 0 ? (
            items.map(({ value: itemValue, label: itemLabel }, i) => (
              <Grid
                key={`${i}-${itemLabel}`}
                value={itemValue}
                id={itemValue}
                onChange={({ target: { value } }) => {
                  onChange({
                    name,
                    value: getNextValues(value),
                  })
                }}
              >
                <Checkbox
                  checked={isChecked(itemValue)}
                  id={itemValue}
                  value={itemValue}
                  classes={{
                    checked: classes.checked,
                  }}
                />
                {itemLabel}
              </Grid>
            ))
          ) : (
            <Typography className={classes.emptyText}>
              No existen datos
            </Typography>
          )}
        </Grid>
      ) : (
        <Select
          className={`${variant === `filled` ? classes.filterInput : ``} ${
            classes.nobackground
          }`}
          {...props}
        >
          {withSelectOption && mode !== `multiple` && (
            <MenuItem value={-1} disabled>
              {placeholder}
            </MenuItem>
          )}
          {mode === `multiple` && (
            <MenuItem value="all">
              <Checkbox
                checked={isAllChecked()}
                classes={{
                  checked: classes.checked,
                }}
              />
              Seleccionar todos
            </MenuItem>
          )}
          {items.map(({ value: itemValue, label: itemLabel }, i) => (
            <MenuItem
              key={`${i}-${itemLabel}`}
              value={itemValue === 0 ? `0` : itemValue}
            >
              {mode === `multiple` && (
                <Checkbox
                  checked={isChecked(itemValue)}
                  classes={{
                    checked: classes.checked,
                  }}
                />
              )}
              {itemLabel}
            </MenuItem>
          ))}
        </Select>
      )}
    </InputWrapper>
  )
}

export default SelectWrapper
