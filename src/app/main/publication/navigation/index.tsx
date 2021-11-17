import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PublicationListPage } from "../pages/PublicationListPage";
import { PublicationCreatePage } from "../pages/PublicationCreatePage";
import { PublicationMyListPage } from "../pages/PublicationMyListPage";
import { PublicationPendingApprovalPage } from "../pages/PublicationPendingApprovalPage";
import { useAuthService } from "app/auth/services";
import { useSuperQuery } from "@vadiun/react-hooks";
import { UserRole } from "app/auth/models";

export const PublicationNavigation = () => {
  const authSrv = useAuthService();
  //const userQuery = useSuperQuery(authSrv.getLoggedUser);
  let { path } = useRouteMatch();

  let AllowedRoutes: React.ReactNode = null;
  if (authSrv.isAuthenticated && authSrv.isAdmin) {
    AllowedRoutes = (
      <>
        <Route path={`${path}/pending-approval`}>
          <PublicationPendingApprovalPage />
        </Route>
      </>
    );
  }
  if (authSrv.isAuthenticated && !authSrv.isAdmin) {
    AllowedRoutes = (
      <>
        <Route path={`${path}/my-publications`}>
          <PublicationMyListPage />
        </Route>
        <Route path={`${path}/create`}>
          <PublicationCreatePage />
        </Route>
      </>
    );
  }

  if (!authSrv.isAuthenticated) {
    AllowedRoutes = (
      <>
        <Route path={`${path}/list`}>
          <PublicationListPage />
        </Route>
      </>
    );
  }
  return <Switch>{AllowedRoutes}</Switch>;
};
