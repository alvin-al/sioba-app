import React from "react";

const Navbar = ({ children }) => {
  return (
    <div className='h-16 bg-green-600 text-xl font-medium text-center text-white flex items-center px-4 w-full'>
      {children}
    </div>
  );
};

export default Navbar;
