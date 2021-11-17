import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleCollapse: () => void;
  title?: string;
  logo?: any;
}

export const SidebarHeader = ({
  isCollapsed,
  toggleCollapse,
  title,
  logo,
  isMobile,
}: Props) => {
  const history = useHistory();

  return (
    <div
      className={
        "h-16 bg-blueGray-900 items-center flex p-4 " +
        (isCollapsed ? "justify-center" : "justify-between")
      }
      style={{ backgroundColor: "#1a1a27" }}
    >
      {title ? (
        <h1
          className={isCollapsed ? "hidden" : "font-black text-lg text-gray-50"}
        >
          {title}
        </h1>
      ) : null}
      {logo ? (
        <img
          src={logo}
          width="100px"
          className={
            "soft-transition text-xs " +
            (isCollapsed
              ? " w-0 "
              : "font-black text-lg text-gray-50 cursor-pointer mr-4")
          }
          onClick={() => history.push("/main/landing")}
          alt=""
        />
      ) : null}
      <button
        className="text-primary-600 focus:outline-none"
        onClick={toggleCollapse}
      >
        {isMobile ? null : isCollapsed ? (
          <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x" />
        )}
      </button>
    </div>
  );
};
