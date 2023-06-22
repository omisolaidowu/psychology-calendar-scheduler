import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const AdminPrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/admin-console" />
//         )
//       }
//     />
//   );
// };

// export default AdminPrivateRoute;

const RoleBasedRoute = ({ component: Component, allowedRoles, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="." />
        )
      }
    />
  );
};

export default RoleBasedRoute;

