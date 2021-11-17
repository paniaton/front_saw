import { FieldArrayRenderProps } from "formik";
import React, { FC } from "react";
import { Button } from "@vadiun/react-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
interface Props {
  arrayHelpers: FieldArrayRenderProps;
  createField: () => any;
  addButton?: React.ReactNode;
  addLabel?: string;
  removeButton?: React.ReactNode;
}

export const FormRepeater: FC<Props> = (props) => {
  const baseRemoveButton = (index: number) => (
    <Button
      variant="light"
      shape="circle"
      type="button"
      color="red"
      onClick={() => props.arrayHelpers.remove(index)}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </Button>
  );

  const customRemoveButton = (index: number) =>
    props.removeButton &&
    React.isValidElement(props.removeButton) &&
    React.cloneElement(props.removeButton, {
      onClick: () => props.arrayHelpers.remove(index),
    });

  const baseAddButton = (
    <Button
      variant="contained"
      type="button"
      onClick={() => props.arrayHelpers.push(props.createField())}
    >
      {props.addLabel || "+ Add new"}
    </Button>
  );

  const customAddButton =
    props.addButton &&
    React.isValidElement(props.addButton) &&
    React.cloneElement(props.addButton, {
      onClick: () => props.arrayHelpers.push(props.createField()),
    });

  return (
    <>
      {React.Children.map(props.children, (child, index) => (
        <div className="flex items-center space-x-4 mb-4">
          {child}
          {customRemoveButton(index) || baseRemoveButton(index)}
        </div>
      ))}
      {customAddButton || baseAddButton}
    </>
  );
};
