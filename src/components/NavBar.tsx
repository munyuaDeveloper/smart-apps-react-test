
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full min-h-[70px] bg-red-300 flex justify-between items-center shadow-lg fixed">
      <div>
        <h1 className="text-3xl ml-10 uppercase font-serif font-bold">CRUD React App</h1>
      </div>
      <nav className="flex gap-5 mr-10">
        <Link to={''}>Dashboard</Link>
        <Link to={''}>Logout</Link>
      </nav>
    </div>
  );
};

export default NavBar;
