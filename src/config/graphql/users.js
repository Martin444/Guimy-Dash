import gql from 'graphql-tag'

export const GET_USER = gql`
  query MyQuery {
    users {
      id
      email
      name
      password
      tokenUser
    }
  }
`