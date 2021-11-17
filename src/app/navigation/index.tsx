import { AuthNavigation } from "app/auth/navigation";
import { useAuthService } from "app/auth/services";
import { MainNavigation } from "app/main/navigation";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

interface Props {}

export const AppNavigation = (props: Props) => {
  const authService = useAuthService();
  return (
    <Switch>
      <Route path="/auth" render={(props) => <AuthNavigation />} />
      <Route path="/main" render={(props) => <MainNavigation />} />
      <Redirect to="/main/publication" />
    </Switch>
  );
};
