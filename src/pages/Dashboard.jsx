import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import RolesTable from "./RolesTable";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  // Load users and roles from localStorage when the component mounts
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(savedUsers);
    setRoles(savedRoles);
  }, []);

  // Persist users and roles to localStorage when they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  return (
    <div className="dashboard">
      <nav className="dashboard-nav flex justify-center bg-gradient-to-r from-cyan-300 to-purple-200 py-4">
        <button
          className={`mx-2 px-6 py-2 rounded-full font-semibold ${
            activeTab === "users"
              ? "bg-stone-700 text-white transition duration-300 hover:scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 "
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button
          className={`mx-2 px-6 py-2 rounded-full font-semibold ${
            activeTab === "roles"
              ? "bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          Role Management
        </button>
      </nav>

      <div className="dashboard-content p-6">
        {activeTab === "users" ? (
          <UsersTable users={users} setUsers={setUsers} roles={roles} />
        ) : (
          <RolesTable roles={roles} setRoles={setRoles} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
