import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  var loggedIn = false;
  if (
    localStorage.getItem("Authorization") == null ||
    localStorage.getItem("Authorization") == "" ||
    localStorage.getItem("Authorization") == undefined
  )
    loggedIn = false;
  else loggedIn = true;

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
