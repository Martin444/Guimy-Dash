import React from 'react'

export const valuesRange = {
  rol: [
    {
      value: 0,
      text: <em>Añadir rango</em>,
      disabled: true,
    },
    {
      value: 1,
      text: `Asistente`,
      disabled: false,
    },
    {
      value: 2,
      text: `Supervisor`,
      disabled: false,
    },
    {
      value: 3,
      text: `Gerente`,
      disabled: false,
    },
  ],
  sucursal: [
    {
      value: 0,
      text: <em>Añadir sucursal</em>,
      disabled: true,
    },
    {
      value: 1,
      text: `Miraflores de Piura 1`,
      disabled: false,
    },
    {
      value: 2,
      text: `Miraflores de Piura 2`,
      disabled: false,
    },
    {
      value: 3,
      text: `Miraflores de Piura 3`,
      disabled: false,
    },
  ],
}

export const employeesData = [
  {
    id: 1,
    name: `Alejandro Mancilla 1`,
    avatar: `https://res.cloudinary.com/guimyapp/image/upload/v1596144962/japekao2nufkrpbmblci.jpg`,
    email: `ale1@ale.com`,
    rol: `Asistente`,
    sucursal: `Miraflores de Piura 1`,
  },
  {
    id: 2,
    name: `Alejandro Mancilla 2`,
    avatar: `https://res.cloudinary.com/guimyapp/image/upload/v1596144962/japekao2nufkrpbmblci.jpg`,
    email: `ale2@ale.com`,
    rol: `Supervisor`,
    sucursal: `Miraflores de Piura 1`,
  },
]