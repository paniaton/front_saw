import React from "react";

interface Props {
  value: any;
  title: string;
  number?: number;
  description?: string;
  isSelected?: boolean;
}

export const Step = (props: Props) => {
  return (
    <div className="flex m-4">
      <div
        className={
          " w-12 h-12 rounded-lg font-bold mr-4 flex items-center justify-center " +
          (props.isSelected ? "bg-primary-200 text-primary-600" : "bg-gray-200")
        }
      >
        {props.number}
      </div>
      <div>
        <p className="font-bold">{props.title}</p>
        <p className="text-gray-600 max-w-sm text-sm">{props.description}</p>
      </div>
    </div>
  );
};
