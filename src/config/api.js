import { GET_USER } from './graphql/users'
import { REACT_APP_API_URL } from '../env'

const API = {}
const baseURL = REACT_APP_API_URL || `http://localhost:4000/api/`

API.baseURL = baseURL

API.me = () => {
  // TODO: implementar verificación de token activo
}

API.logIn = (client, parameters) => {
  return client.query({
    query: GET_USER
  })
}

export default API
