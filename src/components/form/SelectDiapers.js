import React from 'react'
import {
  MenuItem,
  Select,
  Grid,
  Typography,
  Checkbox,
  makeStyles,
} from '@material-ui/core'
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
  checkboxDiapers: {
    marginLeft: `2.6em`,
  },
  checkboxDiapersVisible: {
    visibility: `visible`,
  },
  checkboxDiapersHidden: {
    visibility: `hidden`,
  },
}))

const Icon = {
  select: UnfoldMoreRoundedIcon,
  check: CheckRoundedIcon,
}

const SelectDiapersWrapper = ({
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
  type,
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
  checkbox,
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

  const getNextCheckboxs = index => {
    checkbox.items[index].value = !checkbox.items[index].value
    return checkbox.items
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
      onChange({ name, value, id })
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

  if (openList) {
    props = {
      ...props,
      open: false,
    }
  }

  const isChecked = itemValue => {
    const item = value.find(x => x === itemValue)
    return item !== undefined
  }

  return (
    <Grid item md={4}>
      <InputWrapper
        label={label}
        error={error}
        isRequired={isRequired}
        align={align}
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
                      type,
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
            {withSelectOption && (
              <MenuItem value={-1} disabled>
                {placeholder}
              </MenuItem>
            )}
            {items.map(({ value: itemValue, label: itemLabel }, i) => (
              <MenuItem
                key={`${i}-${itemLabel}`}
                value={itemValue === 0 ? `0` : itemValue}
              >
                {itemLabel}
              </MenuItem>
            ))}
          </Select>
        )}
      </InputWrapper>
      {checkbox && (
        <Grid
          className={`${
            checkbox.enabledValue === value
              ? classes.checkboxDiapersVisible
              : classes.checkboxDiapersHidden
          }
        ${classes.checkboxDiapers}`}
        >
          Tipo de pañales (*)
          {checkbox.items.map(({ value: itemValue, text: itemLabel }, i) => (
            <>
              <Checkbox
                key={`${i}-${itemLabel}`}
                id={`${i}-${itemLabel}`}
                value={itemValue}
                checked={itemValue}
                classes={{
                  checked: classes.checked,
                }}
                onChange={({ target: { checked } }) => {
                  onChange({
                    name,
                    type,
                    value: checked,
                    items: getNextCheckboxs(i),
                  })
                }}
              />
              {itemLabel}
            </>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default SelectDiapersWrapper
