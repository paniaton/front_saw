import React, { FC } from "react";

interface Props {}

export const PageContainer: FC<Props> = (props) => {
  return (
    <div className="sm:w-full sm:space-y-4 md:flex p-4 pt-6 md:space-x-4 md:space-y-0 xl:px-40">
      {props.children}
    </div>
  );
};
