import React from "react";
import { useAuthService } from "app/auth/services";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { LoginPage } from "app/auth/pages";

export const AuthNavigation = () => {
  const authSrv = useAuthService();
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/login`}>
        <LoginPage authSrv={authSrv} />
      </Route>
    </Switch>
  );
};
