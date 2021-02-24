import React from 'react'
import { Redirect, Route } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {

  var loggedIn = (localStorage.getItem('Authorization')  != "undefined" ) ? true : false

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute