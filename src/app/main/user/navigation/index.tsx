import { useAuthService } from "app/auth/services";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { UserListPage } from "../pages/UserListPage";

export const UserNavigation = () => {
  const authSrv = useAuthService();
  //const userQuery = useSuperQuery(authSrv.getLoggedUser);
  let { path } = useRouteMatch();

  let AllowedRoutes: React.ReactNode = null;
  if (authSrv.isAdmin) {
    AllowedRoutes = (
      <>
        <Route path={`${path}/list`}>
          <UserListPage />
        </Route>
      </>
    );
  }

  return <Switch>{AllowedRoutes}</Switch>;
};
