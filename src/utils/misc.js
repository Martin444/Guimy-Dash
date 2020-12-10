/* eslint-disable camelcase */
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

export const havePermissionToPage = ({ permission, user }) => {
  // TODO: Mejorar
  if (user.permisos.find(value => value === ``)) {
    return user.permisos.filter(value => permission.includes(value)).length
  } else {
    const nextUserPermissions = user.permisos
    nextUserPermissions.push(``)
    return nextUserPermissions
      .map(value => value)
      .filter(value => permission.includes(value)).length
  }
}

export const handleError = error => {
  if (Array.isArray(error)) {
    let nextErrors = ``
    error.forEach(e => {
      nextErrors += `${e} \n`
    })
    return nextErrors
  } else if (typeof error === `string` && error.length > 0) {
    return error
  }
  return `Ha ocurrido un problema inesperado, por favor intentar más tarde.`
}

export const getLabelInSelect = (id, value, fieldsById) => {
  const val = parseInt(value, 10)
  return fieldsById[id].items.find(x => parseInt(x.value, 10) === val).label
}

export const getLabelInSelectMultiple = (id, value, fieldsById) => {
  const nextLabel = fieldsById[id].items.find(
    x => value.find(y => y === x.value) !== undefined,
  )
  return nextLabel ? nextLabel.label : `-`
}

export const inputCommonStyles = (parentTheme = false) => {
  const getClasses = ({ palette: { success, primary } }) => ({
    successRoot: {
      border: `2px solid ${success.main}`,
      borderRadius: `2em`,
      background: success.background,
      '& input': {
        background: success.background,
      },
      '& > div': {
        background: success.background,
      },
    },
    successInput: {
      background: success.background,
    },
    successDateInput: {
      border: `2px solid ${success.main}`,
      borderRadius: `2em`,
      background: success.background,
      '& input': {
        background: success.background,
      },
      '& > div': {
        border: `none`,
        background: success.background,
      },
    },
    nobackground: {
      background: `none`,
      '& input': {
        background: `none`,
      },
      '& > div': {
        background: `none`,
      },
    },
    inputsWrapperSuccess: {
      borderRadius: `2em`,
      border: `2px solid ${success.main}`,
      background: success.background,
      '&:focus': {
        background: primary.light,
      },
    },
    inputsWrapper: {
      borderRadius: `2em`,
      border: `2px solid ${primary.light}`,
      background: primary.light,
    },
  })
  if (parentTheme) {
    return getClasses(parentTheme)
  }
  return makeStyles(theme => getClasses(theme))()
}

export function generateInputSuccessStyles(
  { classes, isValid = true, value, error },
  kind = undefined,
  debugLabel = undefined,
) {
  let isSuccess = undefined
  isSuccess = Array.isArray(value)
    ? isValid && value.length > 0 && !error
    : isValid && value && value !== -1 && !error
  // if (debugLabel) {
  //   console.log({ debugLabel, isSuccess, isValid, value, error })
  // }
  if (kind === `inputWrapper`) {
    return {
      inputs: isSuccess ? classes.inputsWrapperSuccess : classes.inputsWrapper,
    }
  }
  if (isSuccess) {
    if (kind === `dateInput`) {
      return {
        root: classes.successDateInput,
        input: classes.successInput,
      }
    }
    return {
      root: classes.successRoot,
      input: classes.successInput,
    }
  }
  return {}
}

export function getBlob(file) {
  const url = window.URL.createObjectURL(new Blob([file]))
  return url
}

export function objectSeparateWithCommas(entity) {
  return Object.values(entity).join(`,`)
}

export function setPagination(data) {
  return {
    total: data.total,
    perPage: data.per_page,
    currentPage: data.current_page,
  }
}

export const initModal = {
  data: null,
  show: false,
  type: ``,
}

export const replacePhone = value => {
  if (value) {
    return value.replace(`+56`, ``)
  }
  return value
}

export const getEdad = FechaNacimiento => {
  const today = moment()
  const nacimiento = moment(FechaNacimiento)
  return today.diff(nacimiento, `years`)
}

/**
 * generate Random number by limit
 *
 * @export
 * @param {number} [maxLimit=9999]
 * @returns
 */
export function randomNumber(maxLimit = 9999) {
  return Math.round(Math.random() * maxLimit)
}

/**
 * Generate Random keys for iteration
 *
 * @export
 * @param {string} [prefix=`random-key`]
 * @param {*} [params=[]]
 */
export function generateRandomKey(prefix = `random-key`, param = ``) {
  return `${prefix}-${randomNumber()}-${param}`
}
