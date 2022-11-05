import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticated } from 'utils/sessionManagement';

function PrivateRoute() {
  if (isAuthenticated()) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}

export default PrivateRoute;
