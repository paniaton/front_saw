import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { MainPage } from "app/main/pages";
import { PublicationNavigation } from "../publication/navigation";
import { UserNavigation } from "../user/navigation";
import { useAuthService } from "app/auth/services";

export const MainNavigation = () => {
  let { path } = useRouteMatch();
  const authService = useAuthService();
  return (
    <MainPage>
      <Switch>
        <Route path={`${path}/publication`}>
          <PublicationNavigation />
        </Route>
        {!authService.isAuthenticated && <Redirect to="/auth/login" />}
        <Route path={`${path}/user`}>
          <UserNavigation />
        </Route>
      </Switch>
    </MainPage>
  );
};
