import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, Link } from "react-router-dom";
import AllTask from "../pages/AllTask";
import ImportantTask from "../pages/ImportantTask";

function Home() {
  return (
    <div className="flex h-[98vh] gap-4 ">
      <div className="w-1/6 border rounded-xl border-gray-500 p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-5/6  border rounded-xl border-gray-500 p-4">
        <Outlet/>
      </div>
    </div>
  );
}

export default Home;
