import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { Layout } from 'screens'
import NotFound from 'screens/public/NotFound'
import { privateRoutes, publicRoutes } from 'routes'
import { useAuth } from 'context'

function App() {
  const { user, restaurant } = useAuth()
  const redirect = `home`

  return (
    <Router>
      {user ? (
        <Layout user={user} routes={privateRoutes} restaurant={restaurant}>
          <Switch>
            {privateRoutes
              .map(({ path, component, permission, items }) => (
                <Route
                  key={path}
                  path={path}
                  exact
                  component={component}
                />
            ))}
            <Route component={NotFound} />
            <Redirect to={redirect} />
          </Switch>
        </Layout>
      ) : (
        <Switch>
          {publicRoutes.map(({ path, component }) => (
            <Route key={path} path={path} exact component={component} />
          ))}
          <Redirect to={publicRoutes[0].path} />
        </Switch>
      )}
    </Router>
  )
}

export default App
