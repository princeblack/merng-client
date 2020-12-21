import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContent } from '../content/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContent);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;