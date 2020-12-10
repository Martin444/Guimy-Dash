import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from 'context'
import {
  StylesProvider,
  createGenerateClassName,
  ThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import 'typeface-roboto'
import 'typeface-roboto-slab'
import theme from 'config/theme'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import { REACT_APP_API_URL, REACT_APP_API_TOKEN } from './env'
import 'leaflet/dist/leaflet.css'

const httpLink = createHttpLink({
  uri: REACT_APP_API_URL,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: `Bearer yourauthtoken`,
      },
    },
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': REACT_APP_API_TOKEN,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: `GUIMY-`,
})

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </StylesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
