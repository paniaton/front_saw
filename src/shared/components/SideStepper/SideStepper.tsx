import React, { FC } from "react";

interface Props {
  value: any;
}

export const SideStepper: FC<Props> = (props) => {
  return (
    <div>
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child)) return;
        return React.cloneElement(child, {
          isSelected: props.value === child.props.value,
          number: index + 1,
        });
      })}
    </div>
  );
};
