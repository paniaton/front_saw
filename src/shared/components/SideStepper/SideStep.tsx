import React from "react";
import { overrideTailwindClasses } from "tailwind-override";

interface Props {
  icon: React.ReactNode;
  label: React.ReactNode;
  isSelected?: boolean;
  value: any;
}

export const SideStep = (props: Props) => {
  const arrow = (
    <div
      className={`absolute soft-transition w-6 h-6 -right-3 top-1/2  transform rotate-45 -translate-y-1/2 ${
        props.isSelected ? "bg-gray-100" : ""
      }`}
    ></div>
  );
  return (
    <div
      className={overrideTailwindClasses(
        `relative soft-transition p-4 rounded-md my-2 flex space-x-4 items-center ${
          props.isSelected ? "text-primary-500 bg-gray-100" : "text-gray-500"
        }`
      )}
    >
      {arrow}
      {props.icon}
      <span className="font-semibold text-xs">{props.label}</span>
    </div>
  );
};
