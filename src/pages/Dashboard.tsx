import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import axios from "axios";
import AddUserForm from "../components/AddUser";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { UserInterface } from "../model/interfaces";

const Dashboard = () => {
  const [users, setUsers] = useLocalStorage("users", []);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    if (users.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users: ", error));
    }
  }, [users, setUsers]);



  // Add new user
  const addUser = (newUser: UserInterface) => {
    setUsers([newUser, ...users]);
    setIsModalOpen(false);
    toast.success('User created successfully')
  };

  // Edit user
  const handleEdit = (user: UserInterface) => {
    setIsEditMode(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedUser: UserInterface) => {
    const updatedUsers = users.map((user: UserInterface) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setIsModalOpen(false);
    toast.success('User updated successfully')
  };

  // Delete user
  const handleDelete = (userId: string) => {
    const updatedUsers = users.filter((user: UserInterface) => user.id !== userId);
    setUsers(updatedUsers);
    toast.success('User deleted successfully')
  };

  // Open modal for user creation
  const handleCreateUser = () => {
    setIsModalOpen(true)
    setIsEditMode(false);
  }

  return (
    <div>
      <UserTable
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCreateUser={handleCreateUser}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isEditMode={isEditMode}>
        <AddUserForm
          addUser={addUser}
          isEditMode={isEditMode}
          currentUser={currentUser}
          handleUpdate={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
