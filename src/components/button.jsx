import React from "react";

const Button = ({ link, children, className, icon, onClick }) => {
  return (
    <a href={`/${link}`}>
      <button
        className={`flex gap-2 items-center py-2 px-4  rounded-md font-medium ${className} cursor-pointer`}
        onClick={onClick}
      >
        {children}
        <span>{icon}</span>
      </button>
    </a>
  );
};

export default Button;
