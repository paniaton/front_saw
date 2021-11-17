import React, { FC, useEffect, useState } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
interface Props {
  icon?: React.ReactNode;
  label: string;
  isSelected?: boolean;
  isOpen?: boolean;
  onChildOpened?: (x: boolean) => void;
  isCollapsed: boolean;
  redirectTo?: string;
}

export const SidebarItem: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isOpen !== undefined) {
      setIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  const LinkComponent = props.redirectTo
    ? Link
    : (props: any) => (
        <div {...props} onClick={() => setIsOpen((open) => !open)} />
      );

  return (
    <>
      <LinkComponent
        className={
          "flex px-8 py-2 hover:text-blueGray-200 cursor-pointer items-center " +
          (props.isSelected ? "text-blueGray-200" : "text-blueGray-500")
        }
        to={props.redirectTo}
        style={props.isSelected ? { backgroundColor: "#1a1a27" } : {}}
      >
        {props.icon ? (
          <div className={"w-4 hover:text-primary-600 "}>{props.icon}</div>
        ) : (
          <FiberManualRecordIcon style={{ width: 8 }} />
        )}
        <h1
          className={
            "soft-transition delay-75 text-xs" +
            (props.isCollapsed ? " opacity-0" : " opacity-100 ml-4")
          }
        >
          {props.label}
        </h1>

        {isOpen
          ? props.children && (
              <ExpandMoreIcon
                className={
                  "soft-transition delay-75 " +
                  (props.isCollapsed ? "opacity-0" : "opacity-100")
                }
                style={{ width: 20, marginLeft: "auto" }}
              />
            )
          : props.children && (
              <NavigateNextIcon
                className={
                  "soft-transition " +
                  (props.isCollapsed ? "opacity-0" : "opacity-100")
                }
                style={{ width: 20, marginLeft: "auto" }}
              />
            )}
      </LinkComponent>
      {!props.isCollapsed ? (
        <div
          className="ml-8 transition-all duration-500 ease-in-out overflow-hidden"
          style={{ maxHeight: isOpen ? 500 : 0 }}
        >
          {props.children}
        </div>
      ) : null}
    </>
  );
};
