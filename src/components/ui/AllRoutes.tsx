import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserTable } from "./UserTable";
import { UserRbac } from "./userRbac";
import Navbar from "./Navbar";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";

const AllRoute: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/user" element={<UserRbac />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
      </div>
    </div>
  );
};

export default AllRoute;
