import React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPencil, FaPlus, FaTrashCan } from "react-icons/fa6";
import { UserTableProps } from "../model/interfaces";

const UserTable = ({ users, handleEdit, handleDelete, handleCreateUser }: UserTableProps) => {

  const [searchTerm, setSearchTerm] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  // Handle search input
  const handleSearch = useCallback(() => {
    const value = searchRef.current && searchRef.current.value;
    setSearchTerm(value!);
  }, []);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  return (
    <div className="container mx-auto mt-[150px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">All Users</h1>
        <div className="min-w-[500px] shadow-md flex">
          <input className="w-full outline-none h-10 px-4 py-1" type="text" placeholder="Search by name" ref={searchRef} />
          <button className="bg-red-300 px-4 rounded-e-lg" onClick={handleSearch}><FaSearch /></button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mb-4 mr-7 flex items-center gap-3"
          onClick={handleCreateUser}
        >
          <FaPlus /> Create New User
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-red-200">
            <tr>
              <th className="px-6 py-4 border-b-2 border-gray-300 text-left leading-4 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 border-b-2 border-gray-300 text-left leading-4 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 border-b-2 border-gray-300 text-left leading-4 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 border-b-2 border-gray-300 leading-4 uppercase tracking-wider text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index: number) => (
              <tr className="" key={index}>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user?.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user?.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user?.phone}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 flex gap-2 items-center"
                    onClick={() => handleEdit(user)}
                  >
                    <FaPencil />
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-700 flex gap-2 items-center"
                    onClick={() => handleDelete(user.id!)}
                  >
                    <FaTrashCan />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
