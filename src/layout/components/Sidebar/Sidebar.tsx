import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faListUl,
  faPlusCircle,
  faCheckCircle,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarHeader, SidebarItem } from ".";
import { useAuthService } from "app/auth/services";

export type SideBarStatus =
  | {
      platform: "mobile";
      status: "open" | "closed";
    }
  | {
      platform: "desktop";
      status: "collapsed" | "expanded";
    };
interface Props {
  status: SideBarStatus;
  toggleCollapse: () => void;
}
interface PropsSidebarSection {
  titulo: string;
  isCollapsed: boolean;
}

const SidebarSection = ({ titulo, isCollapsed }: PropsSidebarSection) => {
  return (
    <h1 className="mt-7 text-blueGray-700 px-8 font-semibold text-xs mb-4">
      {!isCollapsed ? titulo : <FontAwesomeIcon icon={faEllipsisH} size="1x" />}
    </h1>
  );
};

export const Sidebar = ({ status, toggleCollapse }: Props) => {
  const authSrv = useAuthService();
  //const userQuery = useSuperQuery(authSrv.getLoggedUser);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isTemporarilyExpanded, setIsTemporarilyExpanded] = useState(false);
  const history = useHistory();
  const isCollapsed =
    status.platform === "desktop" &&
    status.status === "collapsed" &&
    !isTemporarilyExpanded;

  useEffect(() => {
    setSelectedItem(history.location.pathname);
    history.listen((hist) => {
      setSelectedItem(hist.pathname);
    });
  }, [history]);

  const colapsedClass = () => {
    const baseClass =
      "bg-blueGray-800 min-h-full shadow-md flex-shrink-0 transition-all duration-300 ease-in-out";
    if (status.platform === "mobile") {
      const mobileBaseClass = `${baseClass} fixed`;
      const mobileClosedClass = `${mobileBaseClass} hidden hide-sidebar`;
      return status.status === "closed" ? mobileClosedClass : mobileBaseClass;
    }
    if (status.platform === "desktop") {
      const desktopBaseClass = `${baseClass} block show-sidebar relative`;
      const desktopCollapsedClass = `${desktopBaseClass} w-20`;
      const desktopExpandedClass = `${desktopBaseClass} w-60`;
      return !isCollapsed ? desktopExpandedClass : desktopCollapsedClass;
    }
  };

  const onMouseOver = () => {
    if (status.platform === "desktop" && status.status === "collapsed") {
      setIsTemporarilyExpanded(true);
    }
  };

  const onMouseOut = () => {
    if (status.platform === "desktop" && status.status === "collapsed") {
      setIsTemporarilyExpanded(false);
    }
  };

  let SideBarItems: React.ReactNode = null;
  if (authSrv.isAuthenticated && authSrv.isAdmin) {
    SideBarItems = (
      <>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faCheckCircle} size="1x" />}
          label="Publicaciones pendientes"
          isCollapsed={isCollapsed}
          redirectTo="/main/publication/pending-approval"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faUserAlt} size="1x" />}
          label="Usuarios"
          isCollapsed={isCollapsed}
          redirectTo="/main/user/list"
        />
      </>
    );
  }
  if (authSrv.isAuthenticated && !authSrv.isAdmin) {
    SideBarItems = (
      <>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faPlusCircle} size="1x" />}
          label="Crear publicación"
          isCollapsed={isCollapsed}
          redirectTo="/main/publication/create"
        />
        <SidebarItem
          icon={<FontAwesomeIcon icon={faListUl} size="1x" />}
          label="Mis publicaciones"
          isCollapsed={isCollapsed}
          redirectTo="/main/publication/my-publications"
        />
      </>
    );
  }

  if (!authSrv.isAuthenticated) {
    SideBarItems = (
      <>
        <SidebarItem
          icon={<FontAwesomeIcon icon={faListUl} size="1x" />}
          label="Publicaciones"
          isCollapsed={isCollapsed}
          redirectTo="/main/publication/list"
        />
      </>
    );
  }

  return (
    <>
      <div
        className={colapsedClass()}
        style={{ zIndex: 500, backgroundColor: "#1e1e2d" }}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseOut}
      >
        <SidebarHeader
          toggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
          isMobile={status.platform === "mobile"}
          logo={""}
        />
        {SideBarItems}
      </div>
    </>
  );
};
