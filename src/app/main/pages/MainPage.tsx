import { Header } from "layout/components";
import { SideBarStatus, Sidebar } from "layout/components/";
import { FC, useEffect, useState } from "react";
import useResponsiveBreakpoint from "shared/hooks/useResponsiveBreakpoint";

export const MainPage: FC = (props) => {
  const breakpoint = useResponsiveBreakpoint();
  const [sidebarStatus, setSidebarStatus] = useState<SideBarStatus>({
    platform: "desktop",
    status: "expanded",
  });

  useEffect(() => {
    if (breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md") {
      setSidebarStatus((status) => {
        if (status.platform === "desktop")
          return { platform: "mobile", status: "closed" };
        return status;
      });
      return;
    }
    setSidebarStatus((status) => {
      if (status.platform === "mobile")
        return { platform: "desktop", status: "expanded" };
      return status;
    });
  }, [breakpoint]);

  function dismissVisibleSidebar() {
    if (sidebarStatus.platform === "mobile") {
      setSidebarStatus({ platform: "mobile", status: "closed" });
    }
  }

  function toggleCollapse() {
    if ((sidebarStatus.platform = "desktop")) {
      setSidebarStatus((status) =>
        status.status === "expanded"
          ? { platform: "desktop", status: "collapsed" }
          : { platform: "desktop", status: "expanded" }
      );
    }
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar status={sidebarStatus} toggleCollapse={toggleCollapse} />

      <div
        className="min-h-full w-full overflow-auto"
        onClick={dismissVisibleSidebar}
        style={{ backgroundColor: "#eaedf5" }}
      >
        <Header
          toggleSidebar={(
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => {
            setSidebarStatus({ platform: "mobile", status: "open" });
            e.stopPropagation();
          }}
        />
        <div className="bg-blueGray-100"></div>
        {props.children}
      </div>
    </div>
  );
};
