import React from "react";

interface Props {
  categories: string[];
}

export const Subheader = (props: Props) => {
  return (
    <div className="bg-primary-500 text-white">
      <div className="container flex overflow-hidden">
        {props.categories.map((cat) => (
          <button className="text-white transition duration-300 ease-in-out hover:bg-primary-600 py-2 px-4 whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
