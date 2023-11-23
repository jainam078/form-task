import { ReactNode, createContext, useContext, useState } from "react";
import { FormData } from "../types";
import { useFormContext } from "./FormContext";

type User = {
  id: number;
  data: FormData;
};

type UserContextType = {
  users: User[];
  userToEdit?: User;
  addUser: (userData: FormData) => void;
  updateUser: (updatedData: FormData) => void;
  editUser: (id: User['id']) => void;
  deleteUser: (id: User['id']) => void;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUserToEdit: React.Dispatch<React.SetStateAction<User | undefined>>
};

const initialUsers: User[] = [];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [userToEdit, setUserToEdit] = useState<User>();
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { resetForm, setFormData } = useFormContext();

  const addUser = (userData: FormData) => {
    const newUser: User = {
      id: Date.now(),
      data: userData,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    resetForm()
  };

  const editUser = (id: User['id']) => {
    const userToEdit = users.find(user => user.id === id)

    if (!userToEdit) return

    setUserToEdit(userToEdit)

    setFormData(userToEdit.data)
  }

  const deleteUser = (id: User['id']) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
  };

  const updateUser = (updatedData: FormData) => {
    setUsers(prevUsers => prevUsers.map((user) => user.id === userToEdit?.id ? { ...user, data: { ...user.data, ...updatedData } } : user))
    setUserToEdit(undefined)
    resetForm()
  }

  const userContextValue: UserContextType = {
    users,
    userToEdit,
    addUser,
    editUser,
    deleteUser,
    updateUser,
    isFormOpen,
    setIsFormOpen,
    setUserToEdit
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};