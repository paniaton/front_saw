import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  toolbar?: React.ReactNode;
}

export const PageHeader = (props: Props) => {
  return (
    <div className="bg-white px-8  flex justify-between items-center h-12">
      <div className="flex space-x-2 items-center">
        <h1 className="font-medium text-gray-700 mr-1">{props.title}</h1>
        <h1 className=" text-xs text-gray-400">{props.subtitle}</h1>
      </div>
      <div className="flex space-x-2">{props.toolbar}</div>
    </div>
  );
};
