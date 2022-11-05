import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticated } from 'utils/sessionManagement';

function PublicRoutes() {
  if (isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default PublicRoutes;
