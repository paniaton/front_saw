import React from "react";

interface Props {
  children: React.ReactNode;
}

export const CardHeader = ({ children }: Props) => {
  return (
    <div className="flex justify-between py-4 px-8 items-center border-solid border-gray-100 border-b-4">
      {children}
    </div>
  );
};
