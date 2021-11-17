import React from "react";
import { overrideTailwindClasses } from "tailwind-override";
import { CardHeader } from "./CardHeader";

interface Props {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  toolbar?: string | React.ReactNode;
  cardHeader?: React.ReactNode;
  className?: string;
  subtitle?: string | React.ReactNode;
}

export const Card = ({
  children,
  title,
  toolbar,
  subtitle,
  cardHeader = "",
  className = "",
}: Props) => {
  const cardHeaderElement = () => {
    if (title || toolbar)
      return (
        <CardHeader>
          <div className="flex items-center space-x-2">
            {React.isValidElement(title) ? (
              { title }
            ) : (
              <h1 className="font-semibold">{title}</h1>
            )}
            {React.isValidElement(subtitle) ? (
              { subtitle }
            ) : (
              <h1 className="font-medium text-xs text-gray-400">{subtitle}</h1>
            )}
          </div>

          {toolbar}
        </CardHeader>
      );

    return cardHeader ? cardHeader : null;
  };

  const classNameElem = `rounded-md bg-white text-gray-600 ${className}`;
  return (
    <div className={overrideTailwindClasses(classNameElem)}>
      {cardHeaderElement()}
      {children}
    </div>
  );
};
