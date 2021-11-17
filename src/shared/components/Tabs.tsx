import React from "react";

interface TabItemProps {
  isSelected?: boolean;
  onSelect?: () => void;
  value: string;
  children: React.ReactNode;
}
export const TabItem = (props: TabItemProps) => {
  return (
    <div
      className={
        props.isSelected
          ? " text-center cursor-pointer border-primary-500 border-b-4"
          : " text-center cursor-pointer"
      }
      onClick={props.onSelect}
    >
      {props.children}
    </div>
  );
};
interface Props {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactElement | React.ReactElement[];
}

export const Tabs = (props: Props) => {
  return (
    <div className="flex justify-between">
      {React.Children.map(props.children, (child) => {
        console.log(child.props.value);
        return React.cloneElement(child, {
          ...child.props,
          isSelected: props.value === child.props.value,
          onSelect: () => {
            console.log("tabs", child.props.value);
            props.onChange(child.props.value);
          },
        });
      })}
    </div>
  );
};
