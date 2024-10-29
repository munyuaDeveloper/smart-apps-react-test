import React from "react";

export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface SetFieldAction {
  type: "SET_FIELD";
  field: string;
  value: string;
}

export interface SetUserAction {
  type: "SET_USER";
  user: UserInterface;
}

export interface ClearFormAction {
  type: "CLEAR_FORM";
}

export type ActionType = SetFieldAction | SetUserAction | ClearFormAction;

export interface AddUserFormProps {
  addUser: (user: UserInterface) => void;
  isEditMode: boolean;
  currentUser: UserInterface | null;
  handleUpdate: (user: UserInterface) => void;
}

export interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isEditMode: boolean;
}

export interface UserTableProps {
  users: UserInterface[];
  handleEdit: (user: UserInterface) => void;
  handleDelete: (id: string) => void;
  handleCreateUser: () => void;
}
